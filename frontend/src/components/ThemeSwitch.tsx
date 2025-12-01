import { MdLightMode, MdDarkMode } from 'react-icons/md';

interface ThemeSwitchProps {
    theme: string;
    onToggle: () => void;
}

export default function ThemeSwitch({ theme, onToggle }: ThemeSwitchProps) {
    return (
        <button
            onClick={onToggle}
            className={`border-2 hover:scale-110 px-3 py-2 rounded-lg transition-all ${
                theme === 'light' 
                    ? 'border-accent-dark' 
                    : 'border-accent-light'
            }`}
        >
            {theme === 'light' ? 
                <MdDarkMode className='text-xl text-accent-dark'>
                </MdDarkMode>
                : 
                <MdLightMode className='text-xl text-accent-light'>
                </MdLightMode>}
        </button>
    )
}