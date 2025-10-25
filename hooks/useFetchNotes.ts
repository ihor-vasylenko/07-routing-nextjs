import { fetchNotes, PER_PAGE } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface UseFetchNotesOptions {
  search: string;
  tag?: string | undefined;
  page?: number;
  perPage?: number;
}

export const useFetchNotes = ({
  search,
  tag = undefined,
  page = 1,
  perPage = PER_PAGE,
}: UseFetchNotesOptions) => {
  return useQuery({
    queryKey: ['notes', { search, tag, page, perPage }],
    queryFn: () => fetchNotes(search, tag, page, perPage),
    placeholderData: keepPreviousData,
  });
};
