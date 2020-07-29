import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

const EventsTimeline = ({width, barHeight, margin, dateFormat, data}) => {

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
    });
  });

  const xScale = d3.scaleUtc()
                  .domain(d3.extent(allDates)).nice()
                  .range([margin.left, width - margin.right]);

  const yScale = d3.scaleBand()
                  .domain(data.map(datum => datum.title))
                  .range([margin.top, height - margin.bottom])
                  .padding(0.1);


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

  };

  return(
    <div className='eventsTimeline'>

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
