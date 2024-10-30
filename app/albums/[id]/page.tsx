'use client'
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { GET_ALBUM, UPDATE_ALBUM, DELETE_ALBUM } from '@/graphql/albums';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { AlbumInput } from '@/types/common';
import { AlbumForm } from '@/components/albums/AlbumForm';
import { PhotoGrid } from '@/components/albums/PhotoGrid';
import { useToast } from '@/hooks/use-toast';

export default function AlbumDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast()
  const albumId = params.id as string;

  const { data, loading } = useQuery(GET_ALBUM, {
    variables: { id: albumId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const [updateAlbum] = useMutation(UPDATE_ALBUM, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Album updated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update album: ${error.message}`,
      });
    },
  });

  const [deleteAlbum] = useMutation(DELETE_ALBUM, {
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Album deleted successfully",
      });
      router.push('/albums');
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete album: ${error.message}`,
      });
    },
  });

  const handleUpdate = async (albumData: AlbumInput) => {
    await updateAlbum({
      variables: {
        id: albumId,
        input: albumData,
      },
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      await deleteAlbum({
        variables: { id },
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!data?.album) return <div>Album not found</div>;

  console.log(data, 'data')
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Album Details</h1>
        <Button variant="destructive" onClick={() => handleDelete(albumId)}>
          Delete Album
        </Button>
      </div>
      <AlbumForm album={data?.album} onSubmit={handleUpdate} />
      <PhotoGrid photos={data?.album?.photos?.data || []} />
    </div>
  );
}