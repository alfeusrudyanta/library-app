import { Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

type SearchBarProps = {
  search: string;
  setSearch: (v: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = search.trim();

    const target =
      trimmed !== ''
        ? `/category?q=${encodeURIComponent(trimmed)}`
        : '/category';

    if (location.pathname !== '/category') {
      navigate(target);
    } else {
      navigate(target, { replace: true });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='relative flex-1 md:max-w-125'>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder='Search book'
        className='h-10 w-full rounded-full border border-neutral-300 bg-white py-2 pr-3 pl-10.5 md:h-11 md:max-w-125 md:pr-4'
      />

      <Search
        onClick={handleSearch}
        className='absolute top-1/2 left-4 size-5 -translate-y-1/2 cursor-pointer'
      />
    </div>
  );
};
