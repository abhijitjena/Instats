import './App.css';

import React, { useState } from 'react';

import UserSwitcher from './components/UserSwitcher';
import logo from './logo.svg';

const App = (): React.ReactElement => {
  const [count, setCount] = useState(0);

  return (
    <div className="App bg-slate-950">
      <UserSwitcher />
    </div>
  );
};

export default App;
