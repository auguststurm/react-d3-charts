import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './bar-chart.sass';

const BarChart = ({width, height, margin, data}) => {

  const chartRef = useRef(null);


  useEffect(() => {

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const viz = svg.append("g")
                  .attr('class', 'barChart__viz')
                  .attr('transform', `translate(${margin.left}, ${margin.top})`);

    buildChart(viz);
    buildAxes(viz);

  });

  const buildChart = (viz) => {

  };

  const buildAxes = (viz) => {

  };

  return(
    <div className="barChart">

      <svg
        width={width}
        height={height}
        ref={chartRef}
      />

    </div>
  );

};

export default BarChart;
