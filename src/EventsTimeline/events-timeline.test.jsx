import React from 'react';
import ReactDOM from 'react-dom';

import cheerio from 'cheerio';
import numbro from 'numbro';

import EventsTimeline from '.';
import { dataExampleSpecs } from '../../example/src/data';

// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({ adapter: new Adapter() });

import { renderHook, act } from '@testing-library/react-hooks';


describe('EventsTimeline component', () => {

  const componentProps = dataExampleSpecs.appComponentStates.eventsTimeline;
  let allDatumItems = [];
  componentProps.data.forEach((group) => {
    group.events.forEach((event) => {
      allDatumItems.push(event);
    });
  });

  let component, $;
  const element = document.createElement('div');

  beforeAll((done) => {
    document.body.appendChild(element);
    component = ReactDOM.render(<EventsTimeline {...componentProps} />, element);
    setTimeout(function() {
      done();
      $ = cheerio.load(element.innerHTML);
    }, 0);
  });

  afterAll(() => {
    document.body.removeChild(element);
  });

  it('svg displays elements for all data values', () => {
    const items = $('.eventsTimeline__event').toArray();
    let totalDatums = 0;
    componentProps.data.forEach((group) => {
      totalDatums += group.events.length;
    });
    expect(items.length).toEqual(totalDatums);
  });


  it('svg elements display value for each element', () => {
    let valuesAllMatch = true;
    let datumValue, itemValue = '';
    const items = $('.eventsTimeline__label');

    items.toArray().forEach((item, itemIndex) => {
      datumValue = allDatumItems[itemIndex].title;
      itemValue = $(item).html();
      if (datumValue != itemValue) { valuesAllMatch = false; }
    });

    expect(valuesAllMatch).toEqual(true);
    expect(items.length).toEqual(allDatumItems.length);
  });

  it('svg elements uses start and end times', () => {
    let valuesAllMatch = true;
    let datumStartValue, datumEndValue = '';
    let itemStartValue, itemEndValue = '';
    const items = $('.eventsTimeline__event');

    items.toArray().forEach((item, itemIndex) => {
      datumStartValue = allDatumItems[itemIndex].start;
      datumEndValue = allDatumItems[itemIndex].end;
      itemStartValue = $(item).attr('data-start');
      itemEndValue = $(item).attr('data-end');
      if (datumStartValue != itemStartValue) { valuesAllMatch = false; }
      if (datumEndValue != itemEndValue) { valuesAllMatch = false; }
    });

    expect(valuesAllMatch).toEqual(true);
  });

  it('should call setVizWidth method', () => {

    // const wrapper = shallow(<EventsTimeline {...componentProps} />);
    // console.log(wrapper)
    // const instance = wrapper.instance();
    // console.log(instance);
    // const value = 1975;
    // instance.setVizWidth(value);


    // const hookElement = document.createElement('div');

    // const wrapper = ({ children }) =>

    // const { result } = renderHook((hookElement) => EventsTimeline({...props}), { hookElement });

    const props = {...componentProps, testing: true };

    const { result } = renderHook((hookElement) => EventsTimeline({...props}));


    // console.log(result.current._owner.memoizedProps.callback().testSetVizWidth);

    // console.log(result.current)

    act(() => {
      // result.current.setVizWidth(1234);
    });

    // expect(result.current.vizWidth).toBe(500);



  })

});
