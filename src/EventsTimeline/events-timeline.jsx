import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

import './events-timeline.sass';

const EventsTimeline = ({
                          dark = false,
                          width = 500,
                          barHeight = 20,
                          barPadding = 0.2,
                          margin = {
                            top: 10,
                            left: 50,
                            bottom: 20
                          },
                          dateFormat,
                          data,
                          showLabels = true,
                          showTooltips = true,
                          showLeftAxis = true,
                          onLoadFitWidth = false,
                          handler = false
                        }) => {

  const [vizWidth, setVizWidth] = useState(width);

  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {

    const svg = d3.select(chartRef.current);

    if (onLoadFitWidth) { setVizWidth(containerRef.current.clientWidth); }

    svg.selectAll('*').remove();
    plotChart(svg);
    plotAxis(svg);
  });

  const height = data.length * barHeight + margin.top + margin.bottom;

  var allDates = [];

  data.forEach((group, groupIndex) => {
    group.events.forEach((event, eventIndex) => {
      allDates.push(moment(event.start, dateFormat).toDate());
      allDates.push(moment(event.end, dateFormat).toDate());
      event.groupTitle = group.title;
      event.groupIndex = groupIndex;
      event.eventIndex = eventIndex;
    });
  });

  const xScale = d3.scaleUtc()
                  .domain(d3.extent(allDates)).nice()
                  .range([margin.left, vizWidth - margin.right]);

  const yScale = d3.scaleBand()
                  .domain(data.map(datum => datum.title))
                  .range([margin.top, height - margin.bottom])
                  .padding(0.2);

  const colorScale = d3.scaleOrdinal()
                      .domain(data.map(datum => datum.title))
                      .range(d3.schemeSpectral[11])
                      .range(d3.schemeSet1)
                      .unknown('#ccc');

  const plotAxis = (svg) => {

    const xAxis = d3.axisBottom(xScale).ticks(vizWidth / 40).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.selectAll('.domain').remove());

    if (showLeftAxis) {
      svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis)
        .call(g => g.selectAll('.domain').remove());
    }

  };

  const plotChart = (svg) => {

    const mouseover = (datum, i, n) => {
      d3.select(n[i])
        .style('stroke', (dark) ? 'white' : 'black')
        .style('stroke-opacity', 1.0)
        .style('stroke-width', 2.0);

      tooltip
        .transition(200)
        .style('opacity', (showTooltips) ? 1.0 : 0);

      const start = moment(datum.start, dateFormat);
      const end = moment(datum.end, dateFormat);
      const startFormat = start.format('D MMM YYYY');
      const endFormat = end.format('D MMM YYYY');
      const duration = moment.duration(start.diff(end));
      const durationFormat = moment.duration(duration, 'days').humanize();

      tooltip
        .html(`<strong>${datum.title}:</strong>&nbsp;${startFormat}&nbsp;–&nbsp;${endFormat}&nbsp;[~${durationFormat}]`);
    };

    const mousemove = (datum, i, n) => {
      tooltip
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY - 30}px`);
    };

    const mouseleave = (datum, i, n) => {
      d3.select(n[i])
        .style('stroke', 'black')
        .style('stroke-opacity', 0.5)
        .style('stroke-width', 0.25);

      tooltip.transition(200).style('opacity', 0);
    };

    const eventClick = (event) => {
      if (handler) {
        tooltip.style('opacity', 0);
        handler(event);
      }
    }

    svg.append('g')
      .selectAll('g')
      .data(data)
        .join('g')
        .attr('fill', datum => colorScale(datum.title))
        .attr('stroke', (dark) ? '' : 'black')
        .attr('stroke-width', 0.25)
        .attr('stroke-opacity', 0.5)
        .selectAll('rect')
        .data((datum) => datum.events)
          .join('rect')
          .attr('class', 'eventsTimeline__event')
          .attr('x', event => xScale(moment(event.start, dateFormat).toDate()))
          .attr('y', event => yScale(event.groupTitle))
          .attr('width', event => xScale(moment(event.end, dateFormat).toDate()) - xScale(moment(event.start, dateFormat).toDate()))
          .attr('height', yScale.bandwidth())
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)
          .on('click', event => eventClick(event));

    if (showLabels)
    {
      svg.append('defs')
        .selectAll('clipPath')
        .data(data)
          .enter('clipPath')
          .selectAll('clipPath')
          .data((datum) => datum.events)
          .join('clipPath')
          .attr('id', (event) => `event-clip-path-${event.groupIndex}-${event.eventIndex}`)
          .append('rect')
          .attr('x', event => xScale(moment(event.start, dateFormat).toDate()))
          .attr('y', event => yScale(event.groupTitle))
          .attr('width', event => {
            let w = xScale(moment(event.end, dateFormat).toDate()) - xScale(moment(event.start, dateFormat).toDate()) - 3;
            return (w >= 0) ? w : 0;
          })
          .attr('height', yScale.bandwidth());

      svg.append('g')
        .selectAll('g')
        .data(data)
          .join('g')
          .selectAll('text')
            .data((datum) => datum.events)
            .join('text')
            .attr('clip-path', (event) => `url(#event-clip-path-${event.groupIndex}-${event.eventIndex})`)
            .attr('class', 'eventsTimeline__label')
            .attr('x', event => xScale(moment(event.start, dateFormat).toDate()))
            .attr('y', event => yScale(event.groupTitle) + yScale.bandwidth())
            .attr('dx', 3)
            .attr('dy', -3)
            .text(event => event.title);
    }

    const tooltip = d3.select(chartRef.current.parentElement)
                      .append('div')
                      .attr('class', 'eventsTimeline__tooltip')
                      .style('opacity', 0);

  };

  const style = (dark) ? 'eventsTimeline eventsTimeline__dark' : 'eventsTimeline';

  return(
    <div className={style} ref={containerRef}>
      <svg
        viewBox={`0, 0, ${vizWidth}, ${height}`}
        width={vizWidth}
        height={height}
        ref={chartRef}
      />
    </div>
  );

}

export default EventsTimeline;
