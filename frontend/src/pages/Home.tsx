import { useState, useEffect } from 'react'
import ThemeSwitch from '../components/ThemeSwitch'

function Home() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Aply theme color
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex min-h-screen bg-ui-primary place-content-center">
      <div className='absolute right-8 top-5 z-50'>
        <ThemeSwitch theme={theme} onToggle={toggleTheme} />
      </div>
      <main className='mt-20 md:mt-5 text-center flex flex-col w-full items-center'>
        <h1 className={`text-2xl md:text-3xl xl:text-5xl font-semibold ${ 
          theme === 'dark' ? 'text-accent-light' : 'text-accent-dark'
          } `}>
            Trip Recommendator
        </h1>
        <p className='text-md mt-52 md:text-lg xl:text-xl font-semibold text-ui-text-primary '>
          Write your dream trip
        </p>

        {/* Input component TODO: make custom input */}
        <input type="text" className={`border-2 rounded-lg p-2 mt-5 w-11/12 max-w-5xl ${ 
          theme === 'dark' ? 
          'border-accent-light bg-ui-primary' : 
          'border-accent-dark bg-ui-primary'}`}/>

        {/* Button component TODO: make custom button */}
        <div className='mt-4'>
          <button className={`text-white font-semibold rounded-lg px-4 py-1 ${ 
            theme === 'dark' ? 'bg-accent-light' : 'bg-accent-dark'}`}> 
            Search
          </button>
        </div>

      </main>
    </div>
  )
}

export default Home
