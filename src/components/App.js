import React, { Component } from 'react';

import Toolbar from './Toolbar/Index'
import Workspace from './Workspace/Index'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Toolbar />
        <Workspace />
      </div>
    );
  }
}

export default App;
