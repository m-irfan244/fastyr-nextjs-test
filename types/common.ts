export type SortDirection = 'asc' | 'desc';

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
}

export interface QueryOptions {
  paginate?: {
    page: number;
    limit: number;
  };
  sort?: {
    field: string;
    direction: SortDirection;
  };
  search?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  username: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export interface UserInput {
  name: string;
  email: string;
  username: string;
  phone: string;
  website?: string;
}

export interface UsersResponse {
  users: {
    data: User[];
    meta: {
      totalCount: number;
    };
  };
}

export interface Album {
  id: string;
  title: string;
  userId: string;
  photos?: Photo[];
}

export interface Photo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface AlbumInput {
  title: string;
  userId: string;
}

export interface AlbumsResponse {
  albums: {
    data: Album[];
    meta: {
      totalCount: number;
    };
  };
}

export interface AlbumImportRow {
  title: string;
  userId: string;
  [key: string]: string;
}

export interface TableProps<T> {
  data: T[];
  columns: unknown;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onSortChange?: (field: string, direction: SortDirection) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}