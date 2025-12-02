import { MdLightMode, MdDarkMode } from 'react-icons/md';

interface ThemeSwitchProps {
    theme: string;
    onToggle: () => void;
}

export default function ThemeSwitch({ theme, onToggle }: ThemeSwitchProps) {
    return (
        <button
            onClick={onToggle}
            className={`border-2 hover:scale-110 px-2 py-1 rounded-lg transition-all ${
                theme === 'light' 
                    ? 'border-accent-dark' 
                    : 'border-yellow-500'
            }`}
        >
            {theme === 'light' ? 
                <MdDarkMode className='text-xl text-accent-dark'>
                </MdDarkMode>
                : 
                <MdLightMode className='text-xl text-yellow-500'>
                </MdLightMode>}
        </button>
    )
}