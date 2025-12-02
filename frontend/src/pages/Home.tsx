import { useState, useEffect } from 'react'
import ThemeSwitch from '../components/ThemeSwitch'
import SearchInput from '../components/SearchInput'
import SearchButton from '../components/SearchButton'
import Footer from '../components/Footer'
import Map from '../components/Map'
import { getApiRecommendations } from '../services/api_service'

function Home() {
  const [theme, setTheme] = useState('dark')
  const [searchValue, setSearchValue] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])

  const handleSearch = async () => {
    if (searchValue.trim()) {
      try {
        setLoading(true);
        setHasSearched(true);
        const response = await getApiRecommendations(searchValue);
        console.log('api response:', response, "api typeof", typeof response);
        
        
        // Imprimir cada recomendación una a una
        response.forEach((item: any, index: number) => {
          console.log(`Recommendation ${index + 1}:`);
          console.log(`  Location: ${item.locationName}`);
          console.log(`  Description: ${item.description}`);
          console.log(`  Coordinates: ${item.latitude}, ${item.longitude}`);
        });

        setRecommendations(response);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
      
      setSearchValue('');
    }
  }

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
    <div className="flex flex-col min-h-screen bg-ui-primary">
      <div className='absolute right-8 top-5 z-50'>
        <ThemeSwitch theme={theme} onToggle={toggleTheme} />
      </div>
      
      <h1 className={`mt-20 text-2xl md:text-3xl xl:text-5xl font-semibold text-center ${ 
        theme === 'dark' ? 'text-accent-light' : 'text-accent-dark'
      }`}>
        Trip Recommendator
      </h1>

      {!hasSearched ? (
        <main className='flex-1 flex flex-col w-full items-center justify-center'>
          <p className='text-md md:text-lg xl:text-xl font-semibold text-ui-text-primary'>
            Write your dream trip
          </p>

          <div className='flex gap-2 items-center text-center place-content-center w-full mt-5'>
            <SearchInput theme={theme} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <SearchButton theme={theme} onClick={handleSearch} />
          </div>
        </main>
      ) : (
        <>
          <main className='flex-1 flex flex-col w-full items-center pt-10'>
            <div className='w-4/5 max-w-4xl h-[400px] mt-10'>
            {loading ? (
              <p className='text-center text-ui-text-primary'>Loading recommendations...</p>
            ) : (   
              error ? (
                <p className='text-center text-red-600'>Error loading recommendations. Please try again.</p>
              ) : (     
              <Map locations={recommendations}/> 
              )
            )}
            </div>
            <p className='mt-6 text-md md:text-lg xl:text-xl font-semibold text-ui-text-primary'>
              Here are some options for your dream trip:
            </p>
            <ul className='list-disc list-inside mt-2'>
              {recommendations.map((item, index) => (
                <li key={index}>
                  Option {index + 1}: {item.locationName}
                </li>
              ))}
            </ul>
          </main>

          <div className='flex gap-2 items-center text-center place-content-center w-full py-6 mb-12'>
            <SearchInput theme={theme} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <SearchButton theme={theme} onClick={handleSearch} />
          </div>
        </>
      )}
      
      <Footer theme={theme} />
    </div>
  )
}

export default Home
