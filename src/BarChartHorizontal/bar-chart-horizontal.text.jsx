import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import numbro from 'numbro';
import BarChartHorizontal from '.';

describe('BarChartHorizontal component', () => {

  const componentProps = dataExampleSpecs.appComponentStates.barChartHorizontal;

  let component, $;
  const element = document.createElement('div');

  beforeAll((done) => {
    document.body.appendChild(element);
    component = ReactDOM.render(<BarChartHorizontal {...componentProps} />, element);
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

  it('svg displays elements with all data values', () => {
    let valuesAllMatch = true;
    let datumValue, itemValue = '';
    $('rect').toArray().forEach((item, itemIndex) => {
      datumValue = componentProps.data[itemIndex].value;
      itemValue = $(item).attr('value');
      if (datumValue != itemValue) { valuesAllMatch = false; }
    });
    expect(valuesAllMatch).toEqual(true);
  });

  it('svg elements display value for each element', () => {
    let valuesAllMatch = true;
    let datumValue, itemValue = '';
    $('.barChartHorizontal__label').toArray().forEach((text, textIndex) => {
      datumValue = numbro(componentProps.data[textIndex].value).format({ output: 'percent', mantissa: 2});
      itemValue = $(text).html();
      if (datumValue != itemValue) { valuesAllMatch = false; }
    });
    expect(valuesAllMatch).toEqual(true);
  });

});
