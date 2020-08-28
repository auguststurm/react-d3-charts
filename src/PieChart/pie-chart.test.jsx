import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import PieChart from '.';

describe('PieChart component', () => {

  let component, $;
  const componentProps = dataExampleSpecs.appComponentStates.pieChart;
  const element = document.createElement('div');

  beforeAll((done) => {
    document.body.appendChild(element);
    component = ReactDOM.render(<PieChart {...componentProps} />, element);
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
    expect(width).toEqual(componentProps.diameter.toString());
  });

  it(`svg element is ${componentProps.height} high`, () => {
    const height = $('svg').attr('height');
    expect(height).toEqual(componentProps.diameter.toString());
  });

  it('svg displays path for all data values', () => {
    let valuesAllMatch = true;
    let datumValue, itemValue = '';
    const items = $('path').toArray();
    items.forEach((item, itemIndex) => {
      datumValue = componentProps.data[itemIndex].value;
      itemValue = $(item).attr('value');
      if (datumValue != itemValue) { valuesAllMatch = false; }
    });
    expect(valuesAllMatch).toEqual(true);
    expect(items.length).toEqual(componentProps.data.length);
  });

});
