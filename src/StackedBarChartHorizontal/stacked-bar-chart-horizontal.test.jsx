import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import numbro from 'numbro';
import StackedBarChartHorizontal from '.';

describe('StackedBarChartHorizontal component', () => {

  const componentProps = dataExampleSpecs.appComponentStates.stackedBarChartHorizontal;

  let component, $;
  const element = document.createElement('div');

  beforeAll((done) => {
    document.body.appendChild(element);
    component = ReactDOM.render(<StackedBarChartHorizontal {...componentProps} />, element);
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

  it('svg displays element for all data values', () => {
    const items = $('rect').toArray();
    const itemDepthLimiter = 2; // 2 to exclude the 'name' and 'total' [other data] properties
    const itemsDepthFactor = Object.keys(componentProps.data[0]).length - itemDepthLimiter;
    expect(items.length).toEqual(componentProps.data.length * itemsDepthFactor);
  });

});
