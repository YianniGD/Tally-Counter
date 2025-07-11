
import React, { useState, useCallback, useEffect } from 'react';
import CounterDisplay from './components/CounterDisplay';
import Button from './components/Button';
import PlusIcon from './components/icons/PlusIcon';
import MinusIcon from './components/icons/MinusIcon';
import RefreshIcon from './components/icons/RefreshIcon';

const LOCAL_STORAGE_KEY = 'tallyCounterProCount';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(() => {
    const savedCount = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
  }, [count]);

  const handleIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount(prevCount => prevCount - 1); 
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div className="min-h-screen bg-[#9c1a1e] flex flex-col items-center justify-center p-4 text-white selection:bg-red-900 selection:text-white">
      <main className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <CounterDisplay count={count} />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button 
            onClick={handleDecrement}
            className="bg-red-900/50 hover:bg-red-900/80 focus:ring-red-500 flex items-center justify-center p-4 text-base sm:text-lg"
            ariaLabel="Decrement count"
          >
            <MinusIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </Button>
          <Button 
            onClick={handleIncrement}
            className="bg-red-900/50 hover:bg-red-900/80 focus:ring-red-500 flex items-center justify-center p-4 text-base sm:text-lg"
            ariaLabel="Increment count"
          >
            <PlusIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </Button>
        </div>
        <div>
          <Button 
            onClick={handleReset}
            className="bg-black/30 hover:bg-black/40 focus:ring-red-600 w-full flex items-center justify-center p-4 text-base sm:text-lg"
            ariaLabel="Reset count"
          >
            <RefreshIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default App;