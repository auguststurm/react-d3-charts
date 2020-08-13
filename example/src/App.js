import React from 'react'

import '@auguststurm/react-d3-charts/dist/index.css';
import './App.sass';

import {
  dataBarChart,
  dataPieChart,
  dataLineChart,
  dataHexbinChart,
  dataMultiLineChart,
  dataStackedBarChart,
  dataEventsTimeline,
  dataExampleSpecs
} from './data';

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



function Specs(props) {
  return(
    <div className='example__specs'>
      <div className='example__specs--item'>
        <h3>Data:</h3>
        <pre>
          <code>
            {props.data}
          </code>
        </pre>
      </div>
      <div className='example__specs--item'>
        <h3>Markup:</h3>
        <pre>
          <code>
            {props.markup}
          </code>
        </pre>
      </div>
    </div>
  )
}


///////////////////////////////////////////////////////////////////////////////


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
        width: 1200,
        barHeight: 20,
        barPadding: 0.2,
        margin: {
          top: 10,
          right: 15,
          bottom: 20,
          left: 80
        },
        dateFormat: 'YYYY-MM-DD',
        data: dataEventsTimeline
      }
    }

  }

  render() {

    return(


      <div className="example example__dark">

        <h1>@auguststurm/react-d3-charts</h1>
        <hr />

        <h2>Events Timeline</h2>
        <EventsTimeline
          dark={true}
          width={this.state.eventsTimeline.width}
          barHeight={this.state.eventsTimeline.barHeight}
          barPadding={this.state.eventsTimeline.barPadding}
          margin={this.state.eventsTimeline.margin}
          data={this.state.eventsTimeline.data}
        />
        <Specs data={dataExampleSpecs.eventsTimelineData} markup={dataExampleSpecs.eventsTimelineMarkup} />
        <hr />

        <h2>Stacked Bar Chart Horizontal</h2>
        <StackedBarChartHorizontal
          dark={true}
          width={this.state.stackedBarChartHorizontal.width}
          barHeight={this.state.stackedBarChartHorizontal.barHeight}
          margin={this.state.stackedBarChartHorizontal.margin}
          data={this.state.stackedBarChartHorizontal.data}
        />
        <Specs data={dataExampleSpecs.stackedBarChartData} markup={dataExampleSpecs.stackedBarChartHorizontalMarkup} />
        <hr />

        <h2>Stacked Bar Chart</h2>
        <StackedBarChart
          dark={true}
          width={this.state.stackedBarChart.width}
          height={this.state.stackedBarChart.height}
          margin={this.state.stackedBarChart.margin}
          data={this.state.stackedBarChart.data}
        />
        <Specs data={dataExampleSpecs.stackedBarChartData} markup={dataExampleSpecs.stackedBarChartMarkup} />
        <hr />

        <h2>Multi Line Chart</h2>
        <MultiLineChart
          dark={true}
          width={this.state.multiLineChart.width}
          height={this.state.multiLineChart.height}
          margin={this.state.multiLineChart.margin}
          data={this.state.multiLineChart.data}
        />
        <Specs data={dataExampleSpecs.multiLineChartData} markup={dataExampleSpecs.multiLineChartMarkup} />
        <hr />

        <h2>Hexbin Chart</h2>
        <HexbinChart
          dark={true}
          width={this.state.hexbinChart.width}
          height={this.state.hexbinChart.height}
          margin={this.state.hexbinChart.margin}
          radius={this.state.hexbinChart.radius}
          data={this.state.hexbinChart.data}
        />
        <Specs data={dataExampleSpecs.hexbinChartData} markup={dataExampleSpecs.hexbinChartMarkup} />
        <hr />

        <h2>Line Chart</h2>
        <LineChart
          dark={true}
          width={this.state.lineChart.width}
          height={this.state.lineChart.height}
          margin={this.state.lineChart.margin}
          dateFormat={this.state.lineChart.dateFormat}
          data={this.state.lineChart.data}
        />
        <Specs data={dataExampleSpecs.lineChartData} markup={dataExampleSpecs.lineChartMarkup} />
        <hr />

        <h2>Pie/Donut Chart</h2>
        <PieChart
          diameter={this.state.pieChart.diameter}
          innerRadius={this.state.pieChart.innerRadius}
          labelSize={this.state.pieChart.labelSize}
          data={this.state.pieChart.data}
        />
        <Specs data={dataExampleSpecs.pieChartData} markup={dataExampleSpecs.pieChartMarkup} />
        <hr />

        <h2>Bar Chart Horizontal</h2>
        <BarChartHorizontal
          dark={true}
          width={this.state.barChartHorizontal.width}
          barHeight={this.state.barChartHorizontal.barHeight}
          margin={this.state.barChartHorizontal.margin}
          data={this.state.barChartHorizontal.data}
        />
        <Specs data={dataExampleSpecs.barChartData} markup={dataExampleSpecs.barChartHorizontalMarkup} />
        <hr />

        <h2>Bar Chart</h2>
        <BarChart
          dark={true}
          width={this.state.barChart.width}
          height={this.state.barChart.height}
          margin={this.state.barChart.margin}
          data={this.state.barChart.data}
        />
        <Specs data={dataExampleSpecs.barChartData} markup={dataExampleSpecs.barChartMarkup} />

      </div>
    )

  }
}

export default App
