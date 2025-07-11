
import React from 'react';

interface CounterDisplayProps {
  count: number;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
  return (
    <div className="text-7xl sm:text-8xl font-mono font-bold text-white mb-8 p-4 bg-black/30 rounded-lg shadow-inner select-none text-center">
      {count}
    </div>
  );
};

export default CounterDisplay;