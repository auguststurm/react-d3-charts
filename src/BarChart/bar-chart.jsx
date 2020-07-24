import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './bar-chart.sass';

// Source: https://observablehq.com/@d3/bar-chart

const BarChart = ({width, height, margin, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();
    plotChart(svg);
    plotdAxes(svg);
  });

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const xScale = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .range([margin.left, width - margin.right])
                  .padding(0.1);

  const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.value)])
                  .range([height - margin.bottom, margin.top]);


  const plotdAxes = (svg) => {

    const xAxis = d3.axisBottom(xScale).tickFormat(i => data[i].name).tickSizeOuter(0);
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  };

  const plotChart = (svg) => {

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'barChart__viz--bar')
      .attr('x', (datum, index) => {
        return xScale(index)
      })
      .attr('y', (datum, index) => {
        return yScale(datum.value);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', datum => yScale(0) - yScale(datum.value))
      .attr('fill', (datum) => colorScale(datum.name));
  };

  return(
    <div className='barChart'>

      <svg
        viewBox={`0, 0, ${width}, ${height}`}
        width={width}
        height={height}
        ref={chartRef}
      />

    </div>
  );

};

export default BarChart;
