import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import './line-chart.sass';

// Source: https://observablehq.com/@d3/line-chart

const LineChart = ({width, height, margin, dateFormat, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotAxis(svg);
    plotChart(svg);
  });

  const xScale = d3.scaleUtc()
                  .domain(d3.extent(data, datum => moment(datum.date, dateFormat).toDate()))
                  .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
                  .domain([
                    d3.min(data, datum => datum.value),
                    d3.max(data, datum => datum.value)
                  ]).nice()
                  .range([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale);

  const plotAxis = (svg) => {
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  };


  const plotChart = (svg) => {
    const line = d3.line()
                  .defined(datum => !isNaN(datum.value))
                  .x(datum => xScale(moment(datum.date, dateFormat).toDate()))
                  .y(datum => yScale(datum.value));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);
  };

  return(
    <div className='lineChart'>

      <svg
        viewBox={`0, 0, ${width}, ${height}`}
        width={width}
        height={height}
        ref={chartRef}
      />

    </div>
  );

};

export default LineChart;
