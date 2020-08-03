import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';

import './hexbin-chart.sass';

// Source: https://observablehq.com/@d3/hexbin

const HexbinChart = ({dark, width, height, margin, radius, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotChart(svg);
    plotAxis(svg);
  });

  const xScale = d3.scaleLog()
                  .domain(d3.extent(data, datum => datum.x))
                  .rangeRound([margin.left, width - margin.right]);

  const yScale = d3.scaleLog()
                  .domain(d3.extent(data, datum => datum.y))
                  .rangeRound([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(xScale).ticks(width / 80, '');
  const yAxis = d3.axisLeft(yScale).ticks(null, '.1s');

  const plotAxis = (svg) => {

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove());

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove());;
  };

  const plotChart = (svg) => {

    const hexes = hexbin()
                    .x(datum => xScale(datum.x))
                    .y(datum => yScale(datum.y))
                    .radius(radius)
                    .extent([
                      [margin.left, margin.top],
                      [width - margin.right, height - margin.bottom]
                    ]);

    const bins = hexes(data);

    const colorScale = d3.scaleSequential(d3.interpolateBuPu)
                        .domain([0, d3.max(bins, datum => datum.length) / 2]);

    svg.append('g')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.25)
      .selectAll('path')
      .data(bins)
      .join('path')
      .attr('d', hexes.hexagon())
      .attr("transform", datum => `translate(${datum.x},${datum.y})`)
      .attr('fill', datum => colorScale(datum.length));

  };

  const style = (dark) ? 'hexbinChart hexbinChart__dark' : 'hexbinChart';

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

export default HexbinChart;
