import React, { Component } from 'react';
import '../css/App.css';
import ProgressBars from './ProgressBars';
import ProgressBarsControl from './ProgressBarsControl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <ProgressBars />
        <ProgressBarsControl />
      </div>
    );
  }
}

export default App;
