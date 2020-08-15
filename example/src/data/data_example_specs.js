import {
  dataBarChart,
  dataPieChart,
  dataLineChart,
  dataHexbinChart,
  dataMultiLineChart,
  dataStackedBarChart,
  dataEventsTimeline
} from '.';

const appComponentStates = {
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

const eventsTimelineData =
`[
  {
    "_id": "5ed86e0fedfd3cdc808ae374",
    "title": "Sociosqu",
    "events": [
      {
        "_id": "5ed86e30edfd3cdc808ae375",
        "start": "1987-07-01",
        "end": "1996-08-15",
        "title": "Donec euismod",
        "description": ""
      },
      ...
    ],
  },
  ...
]`;

const eventsTimelineMarkup =
`<EventsTimeline
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
/>`;

const stackedBarChartData =
`[
  {
    "name": "CA",
    "<10": 5038433,
    "10-19": 5170341,
    "20-29": 5809455,
    "30-39": 5354112,
    "40-49": 5179258,
    "50-59": 5042094,
    "60-69": 3737461,
    "70-79": 2011678,
    "≥80": 1311374,
    "total": 38654206
  },
  ...
]`;

const stackedBarChartHorizontalMarkup =
`<StackedBarChartHorizontal
  dark={true}
  width={900}
  barHeight={20}
  margin={{
    top: 10,
    right: 15,
    bottom: 20,
    left: 80
  }}
  data={dataStackedBarChart}
/>`;

const stackedBarChartMarkup =
`<StackedBarChart
  dark={true}
  width={900}
  height={500}
  margin={{
    top: 10,
    right: 0,
    bottom: 20,
    left: 35
  }}
  data={dataStackedBarChart}
/>`;

const multiLineChartData =
`{
  "y": "% Unemployment",
  "series": [
    {
      "name": "Lorem Ipsum",
      "values": [1.0, 2.0, 3.0, 4.0, 5.0, ...]
    },
    ...
  ],
  "dates": [
    "2000-01-01T00:00:00.000Z",
    "2000-02-01T00:00:00.000Z",
    "2000-03-01T00:00:00.000Z",
    "2000-04-01T00:00:00.000Z",
    "2000-05-01T00:00:00.000Z",
    ...
  ]
}`;

const multiLineChartMarkup =
`<MultiLineChart
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
/>`;

const hexbinChartData =
`[
  {"x":0.23,"y":326},
  {"x":0.21,"y":326},
  {"x":0.23,"y":327},
  ...
]`;

const hexbinChartMarkup =
`<HexbinChart
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
/>`;

const lineChartData =
`[
  {date: '2007-04-23', value: 93.24},
  {date: '2007-04-24', value: 95.35},
  {date: '2007-04-25', value: 98.84},
  {date: '2007-04-26', value: 99.92},
  {date: '2007-04-29', value: 99.8},
  ...
]`;

const lineChartMarkup =
`<LineChart
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
/>`;

const pieChartData =
`[
  {name: "<5", value: 19912018},
  {name: "5-9", value: 20501982},
  {name: "10-14", value: 20679786},
  {name: "15-19", value: 21354481},
  {name: "20-24", value: 22604232},
  ...
]`;

const pieChartMarkup =
`<PieChart
  diameter={300}
  innerRadius={0.618}
  labelSize={11}
  data={dataPieChart}
/>`;

const barChartData =
`[
  {
    "name": "E",
    "value": 0.12702
  },
  {
    "name": "T",
    "value": 0.09056
  },
  {
    "name": "A",
    "value": 0.08167
  },
  {
    "name": "O",
    "value": 0.07507
  },
  {
    "name": "I",
    "value": 0.06966
  },
  ...
]`;

const barChartHorizontalMarkup =
`<BarChartHorizontal
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
/>`;

const barChartMarkup =
`<BarChart
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
/>`;


export default {
  eventsTimelineData,
  eventsTimelineMarkup,
  stackedBarChartData,
  stackedBarChartMarkup,
  stackedBarChartHorizontalMarkup,
  multiLineChartData,
  multiLineChartMarkup,
  hexbinChartData,
  hexbinChartMarkup,
  lineChartData,
  lineChartMarkup,
  pieChartData,
  pieChartMarkup,
  barChartData,
  barChartHorizontalMarkup,
  barChartMarkup,
  appComponentStates
}
