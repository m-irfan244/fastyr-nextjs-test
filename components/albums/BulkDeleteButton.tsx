import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DELETE_ALBUM, GET_ALBUMS } from '@/graphql/albums';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from '@/hooks/use-toast';

interface BulkDeleteButtonProps {
  ids: string[];
  onSuccess?: () => void;
}

export function BulkDeleteButton({ ids, onSuccess }: BulkDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteAlbum] = useMutation(DELETE_ALBUM);
  const { refetch } = useQuery(GET_ALBUMS, {
    skip: true 
  });

  const handleBulkDelete = async () => {
    setIsDeleting(true);
    setDeleteProgress(0);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (let i = 0; i < ids.length; i++) {
        try {
          await deleteAlbum({
            variables: { id: ids[i] },
          });
          successCount++;
          setDeleteProgress((prev) => prev + 1);
        } catch (error) {
          console.error(`Failed to delete album ${ids[i]}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        refetch()
        toast({
          title: "Success",
          description: `Successfully deleted ${successCount} album${successCount > 1 ? 's' : ''}${
            errorCount > 0 ? `. Failed to delete ${errorCount} album${errorCount > 1 ? 's' : ''}.` : ''
          }`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete albums. Please try again.",
        });
      }

      if (successCount > 0) {
        onSuccess?.();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during deletion",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setIsOpen(true)}
        disabled={ids.length === 0 || isDeleting}
      >
        {isDeleting ? (
          <>
            Deleting... ({deleteProgress}/{ids.length})
          </>
        ) : (
          `Delete Selected (${ids.length})`
        )}
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {ids.length} selected album{ids.length > 1 ? 's' : ''}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {isDeleting ? (
            <div className="flex flex-col items-center justify-center p-4">
              <LoadingSpinner size="md" />
              <p className="mt-2 text-sm text-muted-foreground">
                Deleting... ({deleteProgress}/{ids.length})
              </p>
            </div>
          ) : (
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleBulkDelete();
                }}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
