import React from 'react'

import '@auguststurm/react-d3-charts/dist/index.css';
import './App.sass';

import {
  BarChart,
  PieChart,
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
        diameter: 450,
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
      }
    }

  }

  render() {

    return(

      <div className="example">

        <h1>BarChart</h1>
        <BarChart
          width={this.state.barChart.width}
          height={this.state.barChart.height}
          margin={this.state.barChart.margin}
          data={this.state.barChart.data}
        />

        <h1>PieChart</h1>
        <PieChart
          diameter={this.state.pieChart.diameter}
          innerRadius={this.state.pieChart.innerRadius}
          labelSize={this.state.pieChart.labelSize}
          data={this.state.pieChart.data}

        />

      </div>
    )

  }
}

export default App
