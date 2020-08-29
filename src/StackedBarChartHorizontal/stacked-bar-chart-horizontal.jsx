import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './stacked-bar-chart-horizontal.sass';

// https://observablehq.com/@d3/stacked-horizontal-bar-chart

const StackedBarChartHorizontal = ({dark, width, barHeight, margin, dataKeys, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotChart(svg);
    plotAxis(svg);
  });

  const height = data.length * barHeight + margin.top + margin.bottom;

  const series = d3.stack()
                  .keys(dataKeys)
                  (data)
                  .map(datum => (datum.forEach(value => value.key = datum.key), datum));

  const xScale = d3.scaleLinear()
                  .domain([0, d3.max(series, datum => d3.max(datum, datum => datum[1]))])
                  .range([margin.left, width - margin.right]);

  const yScale = d3.scaleBand()
                  .domain(data.map(datum => datum.name))
                  .range([margin.top, height - margin.bottom])
                  .padding(0.08);

  const colorScale = d3.scaleOrdinal()
                      .domain(series.map(datum => datum.key))
                      .range(d3.schemeSpectral[series.length])
                      .unknown('#ccc');

  const plotAxis = (svg) => {

    const xAxis = d3.axisTop(xScale).ticks(width / 100, 's');
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(0, ${margin.top})`)
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
      .attr('x', datum => xScale(datum[0]))
      .attr('y', (datum, index) => yScale(datum.data.name))
      .attr('width', datum => xScale(datum[1]) - xScale(datum[0]))
      .attr('height', yScale.bandwidth())
      .append('title')
      .text(datum => `${datum.data.name} ${datum.key} ${datum.data[datum.key]}`);
  };

  const style = (dark) ? 'stackedBarChartHorizontal stackedBarChartHorizontal__dark' : 'stackedBarChartHorizontal';

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

export default StackedBarChartHorizontal;
