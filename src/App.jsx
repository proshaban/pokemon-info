import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImg from './assets/pokemon-bg.jpg';

function App() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const fetchPokemon = async () => {
    if (!search.trim()) {
      toast.error('Please enter a Pokémon name!');
      return;
    }
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      const pokemonData = {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(type => type.type.name).join(', '),
        stats: data.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat })),
      };
      setPokemon(pokemonData);
      setHistory(prev => [...prev, pokemonData]);
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      toast.error('Pokémon not found!');
      setPokemon(null);
    }
  };

  const navigateHistory = (direction) => {
    if (history.length === 0) return;
    let newIndex = currentIndex + direction;
    if (newIndex >= history.length) newIndex = 0;
    if (newIndex < 0) newIndex = history.length - 1;
    setCurrentIndex(newIndex);
    setPokemon(history[newIndex]);
  };

  return (
    <div
      className="w-full h-[100vh] flex flex-col items-center p-6"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='w-full h-full backdrop-blur-md max-w-[1200px] rounded-[18px] flex flex-col items-center p-6'>
        <div className='flex gap-4 mb-6'>
          <input
            type='text'
            placeholder='Search Pokémon...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={fetchPokemon}
            className='bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition'
          >
            Search
          </button>
        </div>
        {pokemon && (
          <div className='bg-white p-6 rounded-lg shadow-lg text-center flex flex-col h-auto w-full max-w-[500px]'>
            <img src={pokemon.image} alt={pokemon.name} className='w-32 mx-auto' />
            <h2 className='text-xl font-bold mt-2 capitalize'>{pokemon.name}</h2>
            <p><strong>Types:</strong> {pokemon.types}</p>
            <div className='mt-2'>
              <h3 className='font-bold'>Stats:</h3>
              <ul>
                {pokemon.stats.map((stat, index) => (
                  <li key={index}>{stat.name}: {stat.value}</li>
                ))}
              </ul>
            </div>
            <div className='flex justify-between mt-4'>
              <button 
                onClick={() => navigateHistory(-1)}
                className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition'>
                Previous
              </button>
              <button 
                onClick={() => navigateHistory(1)}
                className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition'>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position='top-right' autoClose={2000} />
    </div>
  );
}

export default App;
