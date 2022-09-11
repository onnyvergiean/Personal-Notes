import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/local-data';
import MyNoteList from '../components/MyNoteList';
import SearchBar from '../components/SearchBar';
import '../styles/styles.css';
export default function HomePage() {
  const [notes, setNotes] = useState(getActiveNotes());
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultKeyword = searchParams.get('keyword');

  const [keyword, setKeyword] = useState(defaultKeyword || '');

  const onKeywordHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <>
      <h1 className="font-medium leading-tight text-3xl m-5">Notes</h1>
      <SearchBar keyword={keyword} keywordChange={onKeywordHandler} />
      <MyNoteList notes={filteredNotes} />
    </>
  );
}