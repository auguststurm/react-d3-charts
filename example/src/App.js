import React from 'react'

import '@auguststurm/react-d3-charts/dist/index.css';
import './App.sass';

import dataBarChart from './data/data_bar.js';
import dataPieChart from './data/data_pie.js';
import dataLineChart from './data/data_line.js';
import dataHexbinChart from './data/data_hexbin.js';
import dataMultiLineChart from './data/data_multiline.js';
import dataStackedBarChart from './data/data_stackedBar.js';
import dataEventsTimeline from './data/data_eventsTimeline.js';

import {
  BarChart,
  BarChartHorizontal,
  PieChart,
  LineChart,
  HexbinChart,
  MultiLineChart,
  StackedBarChart,
  StackedBarChartHorizontal,
  EventsTimeline
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
      barChartHorizontal: {
        width: 850,
        barHeight: 16,
        margin: {
          top: 30,
          right: 0,
          bottom: 10,
          left: 30
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
        height: 300,
        margin: {
          top: 15,
          right: 50,
          bottom: 20,
          left: 35
        },
        dateFormat: 'YYYY-MM-DD',
        data: dataLineChart
      },
      multiLineChart: {
        width: 900,
        height: 300,
        margin: {
          top: 15,
          right: 0,
          bottom: 20,
          left: 35
        },
        data: dataMultiLineChart
      },
      hexbinChart: {
        width: 800,
        height: 500,
        margin: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        radius: 5,
        data: dataHexbinChart
      },
      stackedBarChart: {
        width: 900,
        height: 500,
        margin: {
          top: 10,
          right: 0,
          bottom: 20,
          left: 35
        },
        data: dataStackedBarChart
      },
      stackedBarChartHorizontal: {
        width: 900,
        barHeight: 16,
        margin: {
          top: 30,
          right: 0,
          bottom: 0,
          left: 35
        },
        data: dataStackedBarChart
      },
      eventsTimeline: {
        width: 1000,
        barHeight: 20,
        barPadding: 0.2,
        margin: {
          top: 10,
          right: 15,
          bottom: 20,
          left: 75
        },
        dateFormat: 'YYYY-MM-DD',
        data: dataEventsTimeline
      }
    }

  }

  render() {

    return(

      <div className="example">

        <h1>Examples ({Object.keys(this.state).length})</h1>

        <h2>EventsTimeline</h2>
        <EventsTimeline
          dark={false}
          width={this.state.eventsTimeline.width}
          barHeight={this.state.eventsTimeline.barHeight}
          barPadding={this.state.eventsTimeline.barPadding}
          margin={this.state.eventsTimeline.margin}
          data={this.state.eventsTimeline.data}
        />

        <h2>StackedBarChartHorizontal</h2>
        <StackedBarChartHorizontal
          dark={false}
          width={this.state.stackedBarChartHorizontal.width}
          barHeight={this.state.stackedBarChartHorizontal.barHeight}
          margin={this.state.stackedBarChartHorizontal.margin}
          data={this.state.stackedBarChartHorizontal.data}
        />

        <h2>StackedBarChart</h2>
        <StackedBarChart
          dark={false}
          width={this.state.stackedBarChart.width}
          height={this.state.stackedBarChart.height}
          margin={this.state.stackedBarChart.margin}
          data={this.state.stackedBarChart.data}
        />

        <h2>MultiLineChart</h2>
        <MultiLineChart
          dark={false}
          width={this.state.multiLineChart.width}
          height={this.state.multiLineChart.height}
          margin={this.state.multiLineChart.margin}
          data={this.state.multiLineChart.data}
        />

        <h2>HexbinChart</h2>
        <HexbinChart
          dark={false}
          width={this.state.hexbinChart.width}
          height={this.state.hexbinChart.height}
          margin={this.state.hexbinChart.margin}
          radius={this.state.hexbinChart.radius}
          data={this.state.hexbinChart.data}
        />

        <h2>LineChart</h2>
        <LineChart
          dark={false}
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

        <h2>BarChartHorizontal</h2>
        <BarChartHorizontal
          dark={false}
          width={this.state.barChartHorizontal.width}
          barHeight={this.state.barChartHorizontal.barHeight}
          margin={this.state.barChartHorizontal.margin}
          data={this.state.barChartHorizontal.data}
        />

        <h2>BarChart</h2>
        <BarChart
          dark={false}
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
