import React, {Component} from 'react';
import {RouteHandler} from 'react-router';

class App extends Component {

  constructor() {
  }

  render() {
    return (
      <div>
        <h1>React!</h1>
        <RouteHandler/>
      </div>
    );
  }
}

export default App;
