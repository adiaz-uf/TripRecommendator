import { FaHeart } from "react-icons/fa";

interface FooterProps {
  theme: string;
}

function Footer({ theme }: FooterProps) {
  return (
    <footer className={`absolute bottom-0 w-full py-4 text-center border-t ${
      theme === 'dark' ? 'text-ui-text-primary border-white/30' : 
      'text-ui-text-primary border-accent-dark/30'
    }`}>
      <p className="text-xs mt-1 opacity-70 flex items-center justify-center gap-1">
        Made with <FaHeart className={theme === 'dark' ? 'text-accent-light' : 'text-accent-dark'} /> 
        by <a href="https://github.com/adiaz-uf" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">adiaz-uf</a>
      </p>
    </footer>
  )
}

export default Footer
