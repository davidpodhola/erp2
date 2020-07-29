import React from 'react';

import { Ui, ServerTime } from '@erp2/ui';

export const App = () => {
  return (
    <div className="main-container">
      <div className="alert alert-app-level">Alert</div>
      <header className="header header-6">Header</header>
      <nav className="subnav">subnav</nav>
      <div className="content-container">
        <div className="content-area">
          <Ui />
          <ServerTime />
        </div>
        <nav className="sidenav">sidenav</nav>
      </div>
    </div>
  );
};

export default App;
