'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useFetchNotes } from '@/hooks/useFetchNotes';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './Notes.module.css';

export default function NotesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  useEffect(() => setCurrentPage(1), [debouncedSearch]);

  const {
    data: { notes = [], totalPages = 0 } = {},
    isFetching,
    isError,
    isSuccess,
  } = useFetchNotes({ search: debouncedSearch.trim(), page: currentPage });

  useEffect(() => {
    if (isSuccess && notes.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [notes, isSuccess, currentPage]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearchQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isError && <ErrorMessage message="Failed to load notes" />}

      {isFetching && <p>Loading, please wait...</p>}

      {!isFetching && notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}