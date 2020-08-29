import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import numbro from 'numbro';
import EventsTimeline from '.';

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

});
