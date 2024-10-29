import { useQuery, useMutation } from '@apollo/client';
import { GET_ALBUMS, CREATE_ALBUM, UPDATE_ALBUM, DELETE_ALBUM, DELETE_ALBUMS } from '../albums';
import { AlbumsResponse } from '@/types/common';

export function useAlbums(options?: CacheQueryOptions) {
  const { data, loading, error, refetch } = useQuery<AlbumsResponse>(GET_ALBUMS, {
    variables: { options },
  });

  const [createAlbum] = useMutation(CREATE_ALBUM, {
    update(cache, { data: { createAlbum } }) {
      const { albums } = cache.readQuery<AlbumsResponse>({ query: GET_ALBUMS }) || { albums: { data: [] } };
      cache.writeQuery({
        query: GET_ALBUMS,
        data: {
          albums: {
            ...albums,
            data: [...albums.data, createAlbum],
          },
        },
      });
    },
  });

  const [updateAlbum] = useMutation(UPDATE_ALBUM);
  const [deleteAlbum] = useMutation(DELETE_ALBUM);
  const [deleteAlbums] = useMutation(DELETE_ALBUMS);

  return {
    albums: data?.albums.data || [],
    totalCount: data?.albums.meta.totalCount || 0,
    loading,
    error,
    refetch,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    deleteAlbums,
  };
}