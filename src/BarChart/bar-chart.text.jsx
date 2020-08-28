// import { renderHook } from '@testing-library/react-hooks';
// import { dataExampleSpecs } from '../../example/src/data';
// import BarChart from '.';
//
// const { result } = renderHook(() => BarChart({...dataExampleSpecs.appComponentStates.barChart}));
//
//
// describe('BarChart component', () => {
//
//   const height = result.current.props.children.props.height;
//   const width = result.current.props.children.props.width;
//
//   it('should exist', () => {
//     expect(result);
//   });
//
//   it('should be type SVG', () => {
//     expect(result.current.props.children.type).toEqual('svg');
//   });
//
//   it(`should be ${height} high`, () => {
//     expect(height).toEqual(dataExampleSpecs.appComponentStates.barChart.height);
//   });
//
//   it(`should be ${width} wide`, () => {
//     expect(width).toEqual(dataExampleSpecs.appComponentStates.barChart.width);
//   });
//
// });


///////////////////////////////////////////////////////////////////////////////


// import React from 'react';
// import BarChart from '.';
// import { dataExampleSpecs } from '../../example/src/data';
// import { render } from '@testing-library/react';
//
// const component = (customProps = {}) => {
//   const defaultProps = dataExampleSpecs.appComponentStates.barChart;
//   const props = {...defaultProps, ...customProps};
//   return render(<BarChart {...props} />);
// }
// // console.log(component());
// // component().debug()
//
// describe('BarChart component', () => {
//   it('should exist', () => {
//     expect(component);
//   });
// });


///////////////////////////////////////////////////////////////////////////////


import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import BarChart from '.';

import cheerio from 'cheerio';

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
