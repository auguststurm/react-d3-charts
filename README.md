# @auguststurm/react-d3-charts

> A React &amp; D3 charting package.

[![NPM](https://img.shields.io/npm/v/@auguststurm/react-d3-charts.svg)](https://www.npmjs.com/package/@auguststurm/react-d3-charts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Live Demo

### https://auguststurm.github.io/react-d3-charts/

## Install from NPM

```bash
yarn add @auguststurm/react-d3-charts
```
## Test Components


```bash
yarn test:components
```

## Run Example

```bash
/react-d3-charts/example

yarn install

yarn start
```

## Example Data

The examples data can be found in the following directory:

```bash
example/src/data
```

## Usage

```jsx
import React, { Component } from 'react'

import {
  dataBarChart,
  dataPieChart,
  dataLineChart,
  dataHexbinChart,
  dataMultiLineChart,
  dataStackedBarChart,
  dataEventsTimeline
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

import '@auguststurm/react-d3-charts/dist/index.css'

class Example extends Component {

  handleEventsTimelineEventSelection = (event) => {
    console.log('EventsTimeline:');
    console.log(event);
  }

  render() {
    return (

      <EventsTimeline
        dark={true}
        width={1200}
        barHeight={20}
        barPadding={0.2}
        margin={{
          top: 10,
          right: 15,
          bottom: 20,
          left: 80
        }},
        dateFormat={'YYYY-MM-DD'}
        data={dataEventsTimeline}
        showLabels={true}
        showTooltips={true}
        showLeftAxis={true}
        handler={this.handleEventsTimelineEventSelection}
      />

      <StackedBarChartHorizontal
        dark={true}
        width={900}
        barHeight={20}
        margin={{
          top: 10,
          right: 15,
          bottom: 20,
          left: 80
        }}
        dataKeys={['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '≥80']}
        data={dataStackedBarChart}
      />

      <StackedBarChart
        dark={true}
        width={900}
        height={500}
        margin={{
          top: 10,
          right: 0,
          bottom: 20,
          left: 35
        }}
        dataKeys={['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '≥80']}
        data={dataStackedBarChart}
      />

      <MultiLineChart
        dark={true}
        width={900}
        height={300}
        margin={{
          top: 15,
          right: 0,
          bottom: 20,
          left: 35
        }}
        data={dataMultiLineChart}
      />

      <HexbinChart
        dark={true}
        width={800}
        height={500}
        margin={{
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        }}
        radius={5}
        data={dataHexbinChart}
      />

      <LineChart
        dark={true}
        width={900}
        height={300}
        margin={{
          top: 15,
          right: 50,
          bottom: 20,
          left: 35
        }}
        dateFormat={'YYYY-MM-DD'}
        data={dataLineChart}
      />

      <PieChart
        diameter={300}
        innerRadius={0.618}
        labelSize={11}
        data={dataPieChart}
      />

      <BarChartHorizontal
        dark={true}
        width={850}
        barHeight={16}
        margin={{
          top: 30,
          right: 0,
          bottom: 10,
          left: 30
        }}
        data={dataBarChart}
      />

      <BarChart
        dark={true}
        width={850}
        height={275}
        margin={{
          top: 15,
          right: 0,
          bottom: 20,
          left: 35
        }}
        data={dataBarChart}
      />

    )
  }
}
```

## License

MIT © [August Sturm](https://github.com/auguststurm)
