import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

import { FC, FormEvent, useState } from 'react';
import { SearchBarProps } from '../../types';

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [term, setTerm] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (term.trim() === '') {
      toast.error('Please enter a correct value to search for !');
      setTerm('');
      return;
    }

    onSubmit(term.trim());
    setTerm('');
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          name="name"
          value={term}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
          onChange={event => setTerm(event.target.value)}
        />
        <Toaster position="top-right" reverseOrder={false} />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
