import { useRef, useEffect } from 'react';

interface SearchInputProps {
  theme: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function SearchInput({ theme, value, onChange, placeholder }: SearchInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 24;
      const maxHeight = lineHeight * 4;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }
  }, [value]);

  return (
    <textarea 
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={1}
      className={`border-2 rounded-lg w-4/5 p-2 resize-none overflow-y-auto ring-0 focus:ring-0 outline-2 outline-offset-2 ${
        theme === 'dark' 
          ? 'border-accent-light bg-ui-primary focus:outline-accent-light' 
          : 'border-accent-dark bg-ui-primary focus:outline-accent-dark'
      }`}
    />
  )
}

export default SearchInput
