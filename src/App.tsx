import './App.css';

import React from 'react';

import UserSwitcher from './components/UserSwitcher';

const App = (): React.ReactElement => {
  return (
    <div className="App bg-slate-950">
      <UserSwitcher />
    </div>
  );
};

export default App;
