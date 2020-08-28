import React from 'react';
import ReactDOM from 'react-dom';
import { dataExampleSpecs } from '../../example/src/data';
import cheerio from 'cheerio';
import numbro from 'numbro';
import EventsTimeline from '.';

describe('EventsTimeline component', () => {

  const componentProps = dataExampleSpecs.appComponentStates.eventsTimeline;

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

    let allDatumItems = [];
    componentProps.data.forEach((group) => {
      group.events.forEach((event) => {
        allDatumItems.push(event);
      });
    });

    items.toArray().forEach((item, itemIndex) => {
      datumValue = allDatumItems[itemIndex].title;
      itemValue = $(item).html();
      if (datumValue != itemValue) { valuesAllMatch = false; }
    });

    expect(valuesAllMatch).toEqual(true);
    expect(items.length).toEqual(allDatumItems.length);
  });


});
