import React, { Component } from 'react';
import '../css/App.css';
import ProgressBars from './ProgressBars';
import ProgressBarsControl from './ProgressBarsControl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'ready': false
    };
  }
  componentDidMount() {
    fetch('http://pb-api.herokuapp.com/bars')
      .then((res) => res.json())
      .then((data) => this.setState({
        'data': data,
        'buttons': data.buttons,
        'bars': data.bars,
        'limit': data.limit,
        'ready': true
      }));
  }
  render() {
    if (this.state.ready) {
      return (
        <div className="App">
          <pre>{JSON.stringify(this.state.data)}</pre>
          <ProgressBars bars={this.state.bars} limit={this.state.limit}/>
          <ProgressBarsControl bars={this.state.bars} buttons={this.state.buttons}/>
        </div>
      );
    } else return null;
  }
}

export default App;
