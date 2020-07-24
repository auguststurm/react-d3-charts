import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import './line-chart.sass';

// Source: https://observablehq.com/@d3/line-chart

const LineChart = ({width, height, margin, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotAxis(svg);
    plotChart(svg);
  });

  const plotAxis = (svg) => {

    const xScale = d3.scaleUtc()
                    .domain(d3.extent(data, datum => moment(datum.date, 'YYYY-MM-DD').toDate()))
                    .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, datum => datum.value)]).nice()
                    .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  };


  const plotChart = (svg) => {

  };


  return(
    <div className='lineChart'>

      <svg
        width={width}
        height={height}
        ref={chartRef}
      />

    </div>
  );

};

export default LineChart;
