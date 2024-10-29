'use client'
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALBUMS } from '@/graphql/albums';
import { AlbumTable } from '@/components/albums/AlbumTable';
import { AlbumImport } from '@/components/albums/AlbumImport';
import { BulkDeleteButton } from '@/components/albums/BulkDeleteButton';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AlbumsResponse } from '@/types/common';

export default function AlbumsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data, loading, error } = useQuery<AlbumsResponse>(GET_ALBUMS);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Albums</h1>
        <div className="space-x-2">
          <AlbumImport />
          {selectedIds.length > 0 && (
            <BulkDeleteButton ids={selectedIds} onSuccess={() => setSelectedIds([])} />
          )}
        </div>
      </div>
      <AlbumTable
        data={data?.albums.data || []}
        onSelectionChange={setSelectedIds}
      />
    </div>
  );
}