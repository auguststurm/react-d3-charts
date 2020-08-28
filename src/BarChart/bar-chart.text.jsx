import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import BarChart from '.';


describe('BarChart component', () => {

  let component, $;
  const componentProps = dataExampleSpecs.appComponentStates.barChart;
  const element = document.createElement('div');

  beforeAll((done) => {
    document.body.appendChild(element);
    component = ReactDOM.render(<BarChart {...componentProps} />, element);
    setTimeout(function () {
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

  it('svg displays elements for all data values', () => {
    let valuesAllMatch = true;
    $('rect').toArray().forEach((rect, rectIndex) => {
      const datumValue = componentProps.data[rectIndex].value;
      const elementValue = $(rect).attr('value');
      if (datumValue != elementValue) { valuesAllMatch = false; }
    });
    expect(valuesAllMatch).toEqual(true);
  });

});
