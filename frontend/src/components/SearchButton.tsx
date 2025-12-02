import { FaSearch } from "react-icons/fa";

interface SearchButtonProps {
  theme: string;
  onClick?: () => void;
}

function SearchButton({ theme, onClick }: SearchButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 text-white font-semibold rounded-lg px-3 py-3 ${
        theme === 'dark' 
          ? 'bg-accent-light hover:bg-accent-light/80' 
          : 'bg-accent-dark hover:bg-accent-dark/80'
      }`}
    > 
      <FaSearch className='text-lg' />
    </button>
  )
}

export default SearchButton
