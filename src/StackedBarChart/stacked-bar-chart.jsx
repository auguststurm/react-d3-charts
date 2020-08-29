import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './stacked-bar-chart.sass';

// https://observablehq.com/@d3/stacked-bar-chart

const StackedBarChart = ({dark, width, height, margin, dataKeys, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotChart(svg);
    plotAxis(svg);
  });

  const series = d3.stack()
                  .keys(dataKeys)
                  (data)
                  .map(datum => (datum.forEach(value => value.key = datum.key), datum));

  const xScale = d3.scaleBand()
                  .domain(data.map(d => d.name))
                  .range([margin.left, width - margin.right])
                  .padding(0.1)

  const yScale = d3.scaleLinear()
                  .domain([0, d3.max(series, datum => d3.max(datum, datum => datum[1]))])
                  .rangeRound([height - margin.bottom, margin.top]);

  const colorScale = d3.scaleOrdinal()
                      .domain(series.map(datum => datum.key))
                      .range(d3.schemeSpectral[series.length])
                      .unknown('#ccc');


  const plotAxis = (svg) => {

    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(null, 's');

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
      .data(series)
      .join('g')
      .attr('fill', datum => colorScale(datum.key))
      .selectAll('rect')
      .data(datum => datum)
      .join('rect')
      .attr('x', (datum, index) => xScale(datum.data.name))
      .attr('y', datum => yScale(datum[1]))
      .attr('height', datum => yScale(datum[0]) - yScale(datum[1]))
      .attr('width', xScale.bandwidth())
      .append('title')
      .text(datum => `${datum.data.name} ${datum.key} ${datum.data[datum.key]}`);
  };

  const style = (dark) ? 'stackedBarChart stackedBarChart__dark' : 'stackedBarChart';

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

export default StackedBarChart;
