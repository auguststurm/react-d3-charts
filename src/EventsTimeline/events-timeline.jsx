import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

import './events-timeline.sass';

const EventsTimeline = ({dark, width, barHeight, margin, dateFormat, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotChart(svg);
    plotAxis(svg);
  });

  const height = data.length * barHeight + margin.top + margin.bottom;

  var allDates = [];

  data.forEach(group => {
    group.events.forEach(event => {
      allDates.push(moment(event.start, dateFormat).toDate());
      allDates.push(moment(event.end, dateFormat).toDate());
      event.groupTitle = group.title;
    });
  });

  const xScale = d3.scaleUtc()
                  .domain(d3.extent(allDates)).nice()
                  .range([margin.left, width - margin.right]);

  const yScale = d3.scaleBand()
                  .domain(data.map(datum => datum.title))
                  .range([margin.top, height - margin.bottom])
                  .padding(0.2);

  const colorScale = d3.scaleOrdinal()
                      .domain(data.map(datum => datum.title))
                      .range(d3.schemeSpectral[data.length])
                      .unknown('#ccc');

  const plotAxis = (svg) => {

    const xAxis = d3.axisBottom(xScale).ticks(width / 40).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.selectAll('.domain').remove());

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove());
  };

  const plotChart = (svg) => {
    svg.append('g')
      .selectAll('g')
      .data(data)
        .join('g')
        .attr('fill', datum => colorScale(datum.title))
        .attr('stroke', (dark) ? '' : 'black')
        .attr('stroke-width', 0.25)
        .attr('stroke-opacity', 0.5)
        .selectAll('rect')
        .data(datum => datum.events)
          .join('rect')
          .attr('x', event => xScale(moment(event.start, dateFormat).toDate()))
          .attr('y', event => yScale(event.groupTitle))
          .attr('width', event => xScale(moment(event.end, dateFormat).toDate()) - xScale(moment(event.start, dateFormat).toDate()))
          .attr('height', yScale.bandwidth());
  };

  const style = (dark) ? 'eventsTimeline eventsTimeline__dark' : 'eventsTimeline';

  return(
    <div className={style}>
      <svg
        viewBox={`0, 0, ${width}, ${height}`}
        width={width}
        height={height}
        ref={chartRef}
      />
    </div>
  );

}

export default EventsTimeline;
