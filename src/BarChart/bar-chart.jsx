import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './bar-chart.sass';

/*
 Adapted from experience and: https://observablehq.com/@d3/bar-chart
*/

const BarChart = ({width, height, margin, data}) => {

  const chartRef = useRef(null);


  useEffect(() => {

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const viz = svg.append("g")
                  .attr('class', 'barChart__viz');

    buildChart(viz);
    buildAxes(viz);
  });


  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);


  const xScale = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .range([margin.left, width - margin.right])
                  .padding(0.1);

  const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.value)])
                  .range([height - (margin.top + margin.bottom), margin.top]);


  const buildAxes = (viz) => {

    const xAxis = d3.axisBottom(xScale).tickFormat(i => data[i].name).tickSizeOuter(0);

    viz.append('g')
      .attr('transform', `translate(0, ${height - (margin.top + margin.bottom)})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);

    viz.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
  };

  const buildChart = (viz) => {};

  return(
    <div className="barChart">

      <svg
        viewBox={`0, 0, ${width}, ${height}`}
        preserveAspectRatio="xMinYMin meet"
        width={width}
        height={height}
        ref={chartRef}
      />

    </div>
  );

};

export default BarChart;
