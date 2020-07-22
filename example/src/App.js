import React from 'react'

import '@auguststurm/react-d3-charts/dist/index.css';
import './App.sass';

import { BarChart } from '@auguststurm/react-d3-charts';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      barchart: {
        width: 450,
        height: 175,
        margin: {
          top: 30,
          right: 0,
          bottom: 30,
          left: 40
        },
        data: [
          { name: 'alpha', value: 1.0 },
          { name: 'bravo', value: 2.0 },
          { name: 'charlie', value: 3.0}
        ]
      }
    }

  }

  render() {

    return(

      <div className="example">

        <h1>BarChart</h1>

        <BarChart
          width={this.state.barchart.width}
          height={this.state.barchart.height}
          margin={this.state.barchart.margin}
          data={this.state.barchart.data}
        />

      </div>

    )

  }

}


export default App
