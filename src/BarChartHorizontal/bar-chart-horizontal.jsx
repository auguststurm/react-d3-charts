import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './bar-chart-horizontal.sass';

// https://observablehq.com/@d3/horizontal-bar-chart

const BarChartHorizontal = ({dark, width, barHeight, margin, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();
    plotChart(svg);
    plotAxis(svg);
  });

  const chartHeight = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const xScale = d3.scaleLinear()
                  .domain([0, d3.max(data, datum => datum.value)])
                  .range([margin.left, width - margin.right]);

  const yScale = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .rangeRound([margin.top, chartHeight - margin.bottom])
                  .padding(0.1);



  const plotAxis = (svg) => {

    const xAxis = d3.axisTop(xScale).ticks(width / 80, '%');

    svg.append('g')
      .attr('transform', `translate(0, ${margin.top})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove());

    const yAxis = d3.axisLeft(yScale).tickFormat(index => data[index].name).tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove());
  };


  const plotChart = (svg) => {

    const format = xScale.tickFormat(20, '%');

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', datum => colorScale(datum.name))
      .attr('x', xScale(0))
      .attr('y', (datum, index) => yScale(index))
      .attr('width', (datum) => xScale(datum.value) - xScale(0))
      .attr('height', yScale.bandwidth());

    svg.append('g')
      .attr('fill', 'white')
      .attr('text-anchor', 'end')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 11)
      .attr('font-weight', 'bold')
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('x', (datum) => xScale(datum.value))
      .attr('y', (datum, index) => yScale(index) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('dx', -4)
      .text(datum => format(datum.value))
      .call(text => text.filter(datum => xScale(datum.value) - xScale(0) < 20)
      .attr('dx', +4)
      .attr('fill', (dark) ? 'white' : 'black')
      .attr('text-anchor', 'start'));

  };

  const style = (dark) ? 'barChartHorizontal barChartHorizontal__dark' : 'barChartHorizontal';

  return(
    <div className={style}>

      <svg
        viewBox={`0, 0, ${width}, ${chartHeight}`}
        width={width}
        height={chartHeight}
        ref={chartRef}
      />

    </div>
  );

};

export default BarChartHorizontal;
