import React from 'react'

import '@auguststurm/react-d3-charts/dist/index.css';
import './App.sass';

import dataBarChart from './data/data_bar.js';
import dataPieChart from './data/data_pie.js';
import dataLineChart from './data/data_line.js';

import {
  BarChart,
  PieChart,
  LineChart
} from '@auguststurm/react-d3-charts';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      barChart: {
        width: 850,
        height: 275,
        margin: {
          top: 15,
          right: 0,
          bottom: 20,
          left: 35
        },
        data: dataBarChart
      },
      pieChart: {
        diameter: 300,
        innerRadius: 0.618,
        labelSize: 11,
        data: dataPieChart
      },
      lineChart: {
        width: 900,
        height: 305,
        margin: {
          top: 15,
          right: 0,
          bottom: 20,
          left: 35
        },
        dateFormat: 'YYYY-MM-DD',
        data: dataLineChart
      }
    }

  }

  render() {

    return(

      <div className="example">

        <h1>Examples</h1>

        <h2>LineChart</h2>
        <LineChart
          width={this.state.lineChart.width}
          height={this.state.lineChart.height}
          margin={this.state.lineChart.margin}
          dateFormat={this.state.lineChart.dateFormat}
          data={this.state.lineChart.data}
        />

        <h2>PieChart</h2>
        <PieChart
          diameter={this.state.pieChart.diameter}
          innerRadius={this.state.pieChart.innerRadius}
          labelSize={this.state.pieChart.labelSize}
          data={this.state.pieChart.data}
        />

        <h2>BarChart</h2>
        <BarChart
          width={this.state.barChart.width}
          height={this.state.barChart.height}
          margin={this.state.barChart.margin}
          data={this.state.barChart.data}
        />

      </div>
    )

  }
}

export default App
