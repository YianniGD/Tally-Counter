const LOCAL_STORAGE_KEY = 'tallyCounters';
const CURRENT_COUNTER_ID_KEY = 'currentTallyCounterId';

const App = () => {
  let counters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  let currentCounterId = JSON.parse(localStorage.getItem(CURRENT_COUNTER_ID_KEY));

  if (counters.length === 0) {
    counters = [{ id: Date.now(), name: 'Main Counter', count: 0 }];
    currentCounterId = counters[0].id;
  }

  if (!currentCounterId || !counters.find(c => c.id === currentCounterId)) {
    currentCounterId = counters[0]?.id;
  }

  const root = document.getElementById('root');
  root.className = "min-h-screen bg-gray-100 flex flex-col items-center p-4 text-gray-800 selection:bg-amber-500 selection:text-white";

  const saveState = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(counters));
    localStorage.setItem(CURRENT_COUNTER_ID_KEY, JSON.stringify(currentCounterId));
  };

  const render = () => {
    saveState();
    root.innerHTML = ''; // Clear previous content

    const mainElement = document.createElement('main');
    mainElement.className = "w-full max-w-md";

    const currentCounter = counters.find(c => c.id === currentCounterId);

    // Counter selection and management
    const selectionContainer = document.createElement('div');
    selectionContainer.className = "bg-white p-4 rounded-xl shadow-lg mb-4";
    const selectionFlex = document.createElement('div');
    selectionFlex.className = "flex gap-4 items-center";
    const select = document.createElement('select');
    select.className = "flex-grow p-2 border rounded-lg";
    counters.forEach(counter => {
      const option = document.createElement('option');
      option.value = counter.id;
      option.textContent = counter.name;
      if (counter.id === currentCounterId) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    select.addEventListener('change', (e) => {
      currentCounterId = parseInt(e.target.value);
      render();
    });
    const deleteButton = document.createElement('button');
    deleteButton.className = "text-red-500 hover:text-red-700 font-bold py-2 px-2 rounded-lg";
    deleteButton.innerHTML = '&times;';
    deleteButton.addEventListener('click', () => {
      if (counters.length > 1) {
        counters = counters.filter(c => c.id !== currentCounterId);
        currentCounterId = counters[0].id;
        render();
      }
    });
    selectionFlex.appendChild(select);
    selectionFlex.appendChild(deleteButton);
    selectionContainer.appendChild(selectionFlex);

    // Form for adding new counters
    const form = document.createElement('form');
    form.className = "bg-white p-4 rounded-xl shadow-lg mb-4";
    form.innerHTML = `
      <div class="flex gap-4">
        <input type="text" id="new-counter-name" class="flex-grow p-2 border rounded-lg" placeholder="New Counter Name">
        <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg">Add</button>
      </div>
    `;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('new-counter-name');
      const name = input.value.trim();
      if (name) {
        const newCounter = { id: Date.now(), name, count: 0 };
        counters.push(newCounter);
        currentCounterId = newCounter.id;
        input.value = '';
        render();
      }
    });

    // Main counter display
    const counterContainer = document.createElement('div');
    counterContainer.className = "bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full";

    const counterDisplay = document.createElement('div');
    counterDisplay.className = "text-7xl sm:text-8xl font-mono font-bold text-gray-800 mb-8 p-4 bg-gray-200 rounded-lg shadow-inner select-none text-center";
    counterDisplay.textContent = currentCounter.count;

    const buttonGrid = document.createElement('div');
    buttonGrid.className = "grid grid-cols-2 gap-4 mb-4";

    const decrementButton = document.createElement('button');
    decrementButton.className = "bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-lg";
    decrementButton.textContent = '-';
    decrementButton.addEventListener('click', () => {
      currentCounter.count--;
      render();
    });

    const incrementButton = document.createElement('button');
    incrementButton.className = "bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-lg";
    incrementButton.textContent = '+';
    incrementButton.addEventListener('click', () => {
      currentCounter.count++;
      render();
    });

    buttonGrid.appendChild(decrementButton);
    buttonGrid.appendChild(incrementButton);

    const resetContainer = document.createElement('div');
    const resetButton = document.createElement('button');
    resetButton.className = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-4 rounded-lg w-full";
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', () => {
      currentCounter.count = 0;
      render();
    });
    resetContainer.appendChild(resetButton);

    counterContainer.appendChild(counterDisplay);
    counterContainer.appendChild(buttonGrid);
    counterContainer.appendChild(resetContainer);

    mainElement.appendChild(selectionContainer);
    mainElement.appendChild(form);
    mainElement.appendChild(counterContainer);
    root.appendChild(mainElement);
  };

  render();
};

App();