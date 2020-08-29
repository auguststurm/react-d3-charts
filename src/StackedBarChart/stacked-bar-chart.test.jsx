import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import numbro from 'numbro';
import StackedBarChart from '.';

describe('StackedBarChart component', () => {

  const componentProps = dataExampleSpecs.appComponentStates.stackedBarChart;

  let component, $;
  const element = document.createElement('div');

  beforeAll((done) => {
    document.body.appendChild(element);
    component = ReactDOM.render(<StackedBarChart {...componentProps} />, element);
    setTimeout(function() {
      done();
      $ = cheerio.load(element.innerHTML);
    }, 0);
  });

  afterAll(() => {
    document.body.removeChild(element);
  });

  it(`svg element is ${componentProps.width} wide`, () => {
    const width = $('svg').attr('width');
    expect(width).toEqual(componentProps.width.toString());
  });

  it(`svg element is ${componentProps.height} high`, () => {
    const height = $('svg').attr('height');
    expect(height).toEqual(componentProps.height.toString());
  });

  it('svg displays element for all data values', () => {
    const items = $('rect').toArray();
    expect(items.length).toEqual(componentProps.data.length * componentProps.dataKeys.length);
  });

});
