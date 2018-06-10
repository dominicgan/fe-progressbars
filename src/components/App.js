import React, { Component } from 'react';
import 'normalize.css';
import '../css/App.css';
import ProgressBars from './ProgressBars';
import ProgressBarsControl from './ProgressBarsControl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'ready': false,
      'interval': null
    };
  }
  componentDidMount() {
    fetch('https://pb-api.herokuapp.com/bars')
      .then((res) => res.json())
      .then((data) => this.setState({
        'data': JSON.parse(JSON.stringify(data)),
        'buttons': data.buttons.sort((a, b) => (a - b)),
        'bars': data.bars,
        'barsFinal': data.bars,
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
    let newBars = JSON.parse(JSON.stringify(this.state.barsFinal));
    let curVal = parseInt(newBars[targetId], 10);
    let newVal = curVal + parseInt(el,10);

    // - if (newValue < 0) set newValue to 0
    if (newVal < 0) { newVal = 0; }

    this.progressBarValue(targetId, newVal);

    // store value in temp array: 
    // for reference at start of function
    // if function is triggered before previous instance 
    // has completed, value to increment will be wrong if
    // this.state.bars is used in setting new value
    newBars[targetId] = newVal;
    this.setState({'barsFinal': newBars});
  }
  progressBarValue(targetId, newVal) {
    // clearInterval (if exists)
    clearInterval(this.state.interval);
    let intervalObj;
    if (this.state.bars[targetId] < newVal) {
      // increment bar
      intervalObj = setInterval(() => {
        let newBars = this.state.bars;
        if (newBars[targetId] < newVal) {
          newBars[targetId]++;
        }
        this.setState({'bars': newBars});
      }, 8);
    } else {
      // decrement bar
      intervalObj = setInterval(() => {
        let newBars = this.state.bars;
        if (newBars[targetId] > newVal) {
          newBars[targetId]--;
        }
        this.setState({'bars': newBars});
      }, 8);
    }

    this.setState({'interval': intervalObj});
  }
  render() {
    if (this.state.ready) {
      return (
        <div className="App">
          <article>
            <header>
              <h1>Progress Bars</h1>
              <p className="desc">Use the select bar <span className='desk'>on the left</span><span className="mob" aria-hidden="true">below</span> to select the progress bar to change</p>
              <p className="desc">Click on the buttons <span className="desk">on the right</span><span className="mob" aria-hidden="true">below that</span> to increment or decrement values of the targeted progress bar.</p>
            </header>
          </article>
          <ProgressBars bars={this.state.bars} limit={this.state.limit} />
          <ProgressBarsControl bars={this.state.bars} selectValue={this.state.targetBarIndex} onChangeTarget={this.handleTargetChange.bind(this)} buttons={this.state.buttons} onClickButton={this.handleButtonClick.bind(this)}/>
          
          {/** debug only
          <div className="debug">
            <pre>{JSON.stringify(this.state)}</pre>
            <pre>{JSON.stringify(this.state.bars)}</pre>
            <pre>{JSON.stringify(this.state.barsFinal)}</pre>
          </div>
          **/}

        </div>
      );
    } else return null;
  }
}

export default App;
