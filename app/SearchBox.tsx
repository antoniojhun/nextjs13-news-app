'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

function SearchBox() {
  const [searchKeyword, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!searchKeyword) return;
    router.push(`/search?term=${searchKeyword}`);
    console.log(searchKeyword);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-6xl mx-auto flex justify-between items-center px-5"
    >
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Keywords..."
        className="w-full h-14 rounded-sm placeholder-gray-500 text-gray-500 outline-none flex-1 dark:text-orange-400"
      />

      <button
        type="submit"
        disabled={!searchKeyword}
        className="text-orange-400 disabled:text-gray-400"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBox;
