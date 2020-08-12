# @auguststurm/react-d3-charts

> A React &amp; D3 charting package.

[![NPM](https://img.shields.io/npm/v/@auguststurm/react-d3-charts.svg)](https://www.npmjs.com/package/@auguststurm/react-d3-charts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @auguststurm/react-d3-charts
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
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [auguststurm](https://github.com/auguststurm)
