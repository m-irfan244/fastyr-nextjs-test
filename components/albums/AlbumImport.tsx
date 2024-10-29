'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ALBUM } from '@/graphql/albums';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  Edit2, Save, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AlbumInput } from '@/types/common';
import { parseFileData } from '@/lib/file-import';
import { DataTable } from '../ui/DataTable';

interface ImportRow extends AlbumInput {
    id: string;
    isValid: boolean;
    errors: string[];
    isEditing?: boolean;
    draftTitle?: string;
    draftUserId?: string;
  }
export function AlbumImport({ onSuccess }: { onSuccess?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [importData, setImportData] = useState<ImportRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [createAlbum] = useMutation(CREATE_ALBUM);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const parsedData = await parseFileData(file);
      
      const validatedData: ImportRow[] = (parsedData as Partial<AlbumInput>[]).map((row, index) => ({
        id: `import-${index}`,
        title: row.title || '',
        userId: row.userId || '',
        isValid: Boolean(row.title && row.userId),
        errors: validateRow(row),
      }));
      setImportData(validatedData);
    } catch  {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to parse file. Please check the format and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateRow = (row: Partial<AlbumInput>): string[] => {
    const errors: string[] = [];
    if (!row.title) errors.push('Title is required');
    if (!row.userId) errors.push('User ID is required');
    return errors;
  };

  const handleRowEdit = (id: string) => {
    setImportData(prev =>
      prev.map(row =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  const handleRowDelete = (id: string) => {
    setImportData(prev => prev.filter(row => row.id !== id));
  };

  const handleRowUpdate = (id: string, updatedData: Partial<AlbumInput>) => {
    setImportData(prev =>
      prev.map(row => {
        if (row.id === id) {
          const newRow = {
            ...row,
            ...updatedData,
            isEditing: false,
          };
          return {
            ...newRow,
            errors: validateRow(newRow),
            isValid: validateRow(newRow).length === 0,
          };
        }
        return row;
      })
    );
  };

  const handleImport = async () => {
    const validRows = importData.filter(row => row.isValid);
    if (validRows.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No valid data to import.",
      });
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const [index, row] of validRows.entries()) {
        try {
          await createAlbum({
            variables: {
              input: {
                title: row.title,
                userId: row.userId,
              },
            },
          });
          successCount++;
          setUploadProgress(Math.round(((index + 1) / validRows.length) * 100));
        } catch (error) {
          errorCount++;
          console.error('Failed to import row:', error);
        }
      }

      toast({
        title: "Import Complete",
        description: `Successfully imported ${successCount} albums${
          errorCount > 0 ? `. Failed to import ${errorCount} albums.` : ''
        }`,
      });

      if (successCount > 0) {
        onSuccess?.();
        setIsOpen(false);
      }
    } catch  {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to complete import.",
      });
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }:{ row: { original: ImportRow } }) => {
        const data = row.original;
        return data.isEditing ? (
          <Input
            defaultValue={data.title}
            onChange={(e) => handleRowUpdate(data.id, { title: e.target.value })}
          />
        ) : (
          <span className={data.errors.includes('Title is required') ? 'text-red-500' : ''}>
            {data.title || 'No title'}
          </span>
        );
      },
    },
    {
      accessorKey: "userId",
      header: "User ID",
      cell: ({ row }:{ row: { original: ImportRow } }) => {
        const data = row.original;
        return data.isEditing ? (
          <Input
            defaultValue={data.userId}
            onChange={(e) => handleRowUpdate(data.id, { userId: e.target.value })}
          />
        ) : (
          <span className={data.errors.includes('User ID is required') ? 'text-red-500' : ''}>
            {data.userId || 'No user ID'}
          </span>
        );
      },
    },
    {
      id: "errors",
      header: "Validation",
      cell: ({ row }:{ row: { original: ImportRow } }) => {
        const errors = row.original.errors;
        return errors.length > 0 ? (
          <div className="text-red-500 text-sm">
            {errors.join(', ')}
          </div>
        ) : (
          <div className="text-green-500 text-sm">Valid</div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }:{ row: { original: ImportRow } }) => {
        const data = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRowEdit(data.id)}
            >
              {data.isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRowDelete(data.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Import Albums</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Import Albums</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              disabled={isLoading}
            />

            {importData.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">
                    Preview ({importData.filter(row => row.isValid).length} valid rows)
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setImportData([])}
                  >
                    Clear All
                  </Button>
                </div>
                
                <DataTable
                  columns={columns}
                  data={importData}
                />
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center p-4">
                <LoadingSpinner size="lg" />
                {uploadProgress > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-center mt-2">{uploadProgress}% Complete</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={isLoading || importData.filter(row => row.isValid).length === 0}
            >
              {isLoading ? 'Importing...' : `Import ${importData.filter(row => row.isValid).length} Albums`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}