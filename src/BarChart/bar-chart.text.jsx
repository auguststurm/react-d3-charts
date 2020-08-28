import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import BarChart from '.';

const barChartProps = dataExampleSpecs.appComponentStates.barChart;

describe('BarChart component', () => {

  let component, $;
  const element = document.createElement('div');

  beforeAll((done) => {
    document.body.appendChild(element);
    component = ReactDOM.render(<BarChart {...barChartProps} />, element);
    setTimeout(function () {
      done();
      $ = cheerio.load(element.innerHTML);
    }, 0);
  });

  afterAll(() => {
    document.body.removeChild(element);
  });

  it(`svg element is ${barChartProps.width} wide`, () => {
    const width = $('svg').attr('width');
    expect(width).toEqual(barChartProps.width.toString());
  });

  it(`svg element is ${barChartProps.height} high`, () => {
    const height = $('svg').attr('height');
    expect(height).toEqual(barChartProps.height.toString());
  });

  it('svg displays elements for all data values', () => {
    let valuesAllMatch = true;
    $('rect').toArray().forEach((rect, rectIndex) => {
      const datumValue = barChartProps.data[rectIndex].value;
      const elementValue = $(rect).attr('value');
      if (datumValue != elementValue) { valuesAllMatch = false; }
    });
    expect(valuesAllMatch).toEqual(true);
  });

});
