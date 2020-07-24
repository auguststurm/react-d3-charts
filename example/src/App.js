import React from 'react'

import '@auguststurm/react-d3-charts/dist/index.css';
import './App.sass';

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
        data: [
          { name: 'alpha', value: 1.0 },
          { name: 'bravo', value: 2.0 },
          { name: 'charlie', value: 3.0},
          { name: 'delta', value: 4.0},
          { name: 'echo', value: 5.0},
        ]
      },
      pieChart: {
        diameter: 300,
        innerRadius: 0.618,
        labelSize: 11,
        data: [
          {name: "<5", value: 19912018},
          {name: "5-9", value: 20501982},
          {name: "10-14", value: 20679786},
          {name: "15-19", value: 21354481},
          {name: "20-24", value: 22604232},
          {name: "25-29", value: 21698010},
          {name: "30-34", value: 21183639},
          {name: "35-39", value: 19855782},
          {name: "40-44", value: 20796128},
          {name: "45-49", value: 21370368},
          {name: "50-54", value: 22525490},
          {name: "55-59", value: 21001947},
          {name: "60-64", value: 18415681},
          {name: "65-69", value: 14547446},
          {name: "70-74", value: 10587721},
          {name: "75-79", value: 7730129},
          {name: "80-84", value: 5811429},
          {name: "≥85", value: 5938752}
        ]
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
        data: [
          {date: '2007-04-23', value: 93.24},
          {date: '2007-04-24', value: 95.35},
          {date: '2007-04-25', value: 98.84},
          {date: '2007-04-26', value: 99.92},
          {date: '2007-04-29', value: 99.8},
          {date: '2007-05-01', value: 99.47},
          {date: '2007-05-02', value: 100.39},
          {date: '2007-05-03', value: 100.4},
          {date: '2007-05-04', value: 100.81},
          {date: '2007-05-07', value: 103.92},
          {date: '2007-05-08', value: 105.06},
          {date: '2007-05-09', value: 106.88},
          {date: '2007-05-09', value: 107.34},
          {date: '2007-05-10', value: 108.74},
          {date: '2007-05-13', value: 109.36},
          {date: '2007-05-14', value: 107.52},
          {date: '2007-05-15', value: 107.34},
          {date: '2007-05-16', value: 109.44},
          {date: '2007-05-17', value: 110.02},
          {date: '2007-05-20', value: 111.98},
          {date: '2007-05-21', value: 113.54},
          {date: '2007-05-22', value: 112.89},
          {date: '2007-05-23', value: 110.69},
          {date: '2007-05-24', value: 113.62},
          {date: '2007-05-28', value: 114.35},
          {date: '2007-05-29', value: 118.77},
          {date: '2007-05-30', value: 121.19},
          {date: '2007-06-01', value: 118.4},
          {date: '2007-06-04', value: 121.33},
          {date: '2007-06-05', value: 122.67},
          {date: '2007-06-06', value: 123.64},
          {date: '2007-06-07', value: 124.07},
          {date: '2007-06-08', value: 124.49},
          {date: '2007-06-10', value: 120.19},
          {date: '2007-06-11', value: 120.38},
          {date: '2007-06-12', value: 117.5},
          {date: '2007-06-13', value: 118.75},
          {date: '2007-06-14', value: 120.5},
          {date: '2007-06-17', value: 125.09},
          {date: '2007-06-18', value: 123.66}
        ]
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
