const CounterDisplay = ({ count }) => {
  const display = document.createElement('div');
  display.className = "text-7xl sm:text-8xl font-mono font-bold text-gray-800 mb-8 p-4 bg-gray-200 rounded-lg shadow-inner select-none text-center";
  display.textContent = count;
  return display;
};

const Button = ({ onClick, children, className = '', ariaLabel, disabled = false, textColor = 'text-white' }) => {
  const baseClasses = `font-semibold ${textColor} rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100`;
  const interactiveClasses = "transform hover:scale-105 active:scale-95";
  const disabledClasses = "opacity-60 cursor-not-allowed";

  const button = document.createElement('button');
  button.addEventListener('click', onClick);
  button.className = `${baseClasses} ${disabled ? disabledClasses : interactiveClasses} ${className}`;
  if (ariaLabel) {
    button.setAttribute('aria-label', ariaLabel);
  }
  if (disabled) {
    button.disabled = true;
  }
  button.innerHTML = children;

  return button;
};

const PlusIcon = ({ className }) => `<svg class="${className}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" /></svg>`;
const MinusIcon = ({ className }) => `<svg class="${className}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" /></svg>`;
const RefreshIcon = ({ className }) => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"/></svg>`;

const LOCAL_STORAGE_KEY = 'tallyCounterProCount';

const App = () => {
  let count = localStorage.getItem(LOCAL_STORAGE_KEY) ? parseInt(localStorage.getItem(LOCAL_STORAGE_KEY), 10) : 0;

  const appElement = document.createElement('div');
  appElement.className = "min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-800 selection:bg-amber-500 selection:text-white";

  const mainElement = document.createElement('main');
  mainElement.className = "bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm";

  const render = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
    mainElement.innerHTML = ''; // Clear previous content

    const counterDisplay = CounterDisplay({ count });

    const handleDecrement = () => {
      count--;
      render();
    };

    const handleIncrement = () => {
      count++;
      render();
    };

    const handleReset = () => {
      count = 0;
      render();
    };

    const buttonGrid = document.createElement('div');
    buttonGrid.className = "grid grid-cols-2 gap-4 mb-4";

    const decrementButton = Button({
      onClick: handleDecrement,
      className: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 flex items-center justify-center p-4 text-base sm:text-lg",
      ariaLabel: "Decrement count",
      children: MinusIcon({ className: "w-6 h-6 sm:w-7 sm:h-7" })
    });

    const incrementButton = Button({
      onClick: handleIncrement,
      className: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 flex items-center justify-center p-4 text-base sm:text-lg",
      ariaLabel: "Increment count",
      children: PlusIcon({ className: "w-6 h-6 sm:w-7 sm:h-7" })
    });

    buttonGrid.appendChild(decrementButton);
    buttonGrid.appendChild(incrementButton);

    const resetContainer = document.createElement('div');
    const resetButton = Button({
      onClick: handleReset,
      className: "bg-gray-300 hover:bg-gray-400 focus:ring-gray-500 w-full flex items-center justify-center p-4 text-base sm:text-lg",
      ariaLabel: "Reset count",
      children: RefreshIcon({ className: "w-6 h-6 sm:w-7 sm:h-7" }),
      textColor: 'text-gray-800'
    });
    resetContainer.appendChild(resetButton);

    mainElement.appendChild(counterDisplay);
    mainElement.appendChild(buttonGrid);
    mainElement.appendChild(resetContainer);
  };

  appElement.appendChild(mainElement);
  render();

  return appElement;
};

document.body.appendChild(App());