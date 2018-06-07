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
    fetch('https://pb-api.herokuapp.com/bars')
      .then((res) => res.json())
      .then((data) => this.setState({
        'data': JSON.parse(JSON.stringify(data)),
        'buttons': data.buttons.sort((a, b) => (a - b)),
        'bars': data.bars,
        'limit': data.limit,
        'ready': true,
        'targetBarIndex': 0
      }));
  }
  handleTargetChange(e){
    // update target progress bar
    this.setState({'targetBarIndex': parseInt(e.target.value, 10)});
  }
  handleButtonClick(el){
    // update target bar value with with button amt
    let targetId = this.state.targetBarIndex;
    let newBars = this.state.bars;
    let newVal = newBars[targetId] + parseInt(el,10);

    // add delimiter logic
    // - if (newValue < 0) => newValue = 0
    if (newVal < 0) {
      newVal = 0;
    // - if (newValue > limit) => newValue = limit
    } else if (newVal > this.state.limit) {
      newVal = parseInt(this.state.limit, 10);
    }

    newBars[targetId] = newVal;
    this.setState({'bars': newBars});
  }
  render() {
    if (this.state.ready) {
      return (
        <div className="App">
          <pre>{JSON.stringify(this.state)}</pre>
          <ProgressBars bars={this.state.bars} limit={this.state.limit} />
          <ProgressBarsControl bars={this.state.bars} selectValue={this.state.targetBarIndex} onChangeTarget={this.handleTargetChange.bind(this)} buttons={this.state.buttons} onClickButton={this.handleButtonClick.bind(this)}/>
        </div>
      );
    } else return null;
  }
}

export default App;
