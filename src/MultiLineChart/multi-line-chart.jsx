import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import { least } from 'd3-array';
import moment from 'moment';

import './multi-line-chart.sass';

// https://observablehq.com/@d3/multi-line-chart

const MultiLineChart = ({dark, width, height, margin, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotAxis(svg);
    plotChart(svg);
  });

  const xScale = d3.scaleUtc()
                  .domain(d3.extent(data.dates.map(datum => moment(datum).toDate())))
                  .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data.series, datum => d3.max(datum.values))]).nice()
                  .range([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale);

  const plotAxis = (svg) => {
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove());

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(data.y)
      );
  };

  const plotChart = (svg) => {

    const line = d3.line()
                  .defined(datum => !isNaN(datum))
                  .x((datum, index) => xScale(moment(data.dates[index]).toDate()))
                  .y(datum => yScale(datum));

    const path = svg.append('g')
                  .attr('fill', 'none')
                  .attr('stroke', (dark) ? 'orange' : 'steelblue')
                  .attr('stroke-width', 2)
                  .attr('stroke-opacity', 0.5)
                  .attr('stroke-linejoin', 'round')
                  .attr('stroke-linecap', 'round')
                  .selectAll('path')
                  .data(data.series)
                  .join('path')
                  .style('mix-blend-mode', 'overlay')
                  .attr('d', datum => line(datum.values));

    function hover(svg, path) {

      if ("ontouchstart" in document) {
        svg
          .style("-webkit-tap-highlight-color", "transparent")
          .on('touchmove', moved)
          .on('touchstart', entered)
          .on('touchend', left)
      } else {
        svg
          .on('mousemove', moved)
          .on('mouseenter', entered)
          .on('mouseleave', left);
      }

      const dot = svg.append('g')
          .attr('display', 'none');

      dot.append('circle')
          .attr('r', 3)
          .attr('fill', 'red');

      dot.append('text')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('text-anchor', 'middle')
          .attr('fill', (dark) ? 'white' : 'black')
          .attr('y', -8);

      function moved() {
        d3.event.preventDefault();
        const mouse = d3.mouse(this);
        const xm = xScale.invert(mouse[0]);
        const ym = yScale.invert(mouse[1]);
        const parsedDates = data.dates.map(datum => moment(datum).toDate());
        const i1 = d3.bisectLeft(parsedDates, xm, 1);
        const i0 = i1 - 1;
        const i = xm - moment(data.dates[i0]).toDate() > moment(data.dates[i1]).toDate() - xm ? i1 : i0;
        const s = least(data.series, d => Math.abs(d.values[i] - ym));

        const stroke = (dark) ? '#444' : '#ddd';

        path.attr('stroke', d => d === s ? null : stroke).filter(d => d === s).raise();

        const xPosDateString = data.dates[i];
        const xPosDateObject = moment(xPosDateString).toDate();

        dot.attr('transform', `translate(${xScale(xPosDateObject)},${yScale(s.values[i])})`);
        dot.select('text').text(s.name);
      }

      function entered() {
        path.style('mix-blend-mode', 'normal').attr('stroke', 'orange');
        dot.attr('display', null);
      }

      function left() {
        path.style('mix-blend-mode', 'overlay').attr('stroke', null);
        dot.attr('display', 'none');
      }
    }

    svg.call(hover, path);
  };

  const style = (dark) ? 'multiLineChart multiLineChart__dark' : 'multiLineChart';

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

};

export default MultiLineChart;
