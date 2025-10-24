import axios from 'axios';
import type { Note } from '@/types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

interface NoteResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 10
): Promise<NoteResponse> => {
  const params = { search, page, perPage };
  const { data } = await notehubApi.get<NoteResponse>('', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await notehubApi.get<Note>(`/${id}`);
  return data;
};

export const createNote = async (
  newNote: Pick<Note, 'title' | 'content' | 'tag'>
) => {
  const { data } = await notehubApi.post<Note>('', newNote);
  return data;
};

export const deleteNote = async (noteId: string) => {
  const { data } = await notehubApi.delete<Note>(`/${noteId}`);
  return data;
};