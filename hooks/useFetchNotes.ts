'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

interface UseNotesOptions {
  search: string;
  page?: number;
  perPage?: number;
}

export const useFetchNotes = ({
  search,
  page = 1,
  perPage = 10,
}: UseNotesOptions) => {
  return useQuery({
    queryKey: ['notes', { search, page, perPage }],
    queryFn: () => fetchNotes(search, page, perPage),
    retry: 1,
  });
};