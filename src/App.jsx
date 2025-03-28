import bgImg from './assets/pokemon-bg.jpg';

function App() {
  return (
    <div
      className="w-full h-[100vh] flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='w-full h-full backdrop-blur-md max-w-[1200px]'>

      </div>
    </div>
  );
}

export default App;
