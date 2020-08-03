import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './pie-chart.sass';

// Source: https://observablehq.com/@d3/donut-chart

const PieChart = ({dark, diameter, innerRadius, labelSize, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotChart(svg);
  });

  const colorScale = d3.scaleOrdinal()
                      .domain(data.map(datum => datum.name))
                      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

  const radius = diameter / 2;

  const arc = d3.arc().innerRadius(radius * innerRadius).outerRadius(radius - 1);

  const pie = d3.pie()
              .padAngle(0.005)
              .sort(null)
              .value(datum => datum.value);

  const plotChart = (svg) => {

    const arcs = pie(data);

    svg.selectAll('paths')
      .data(arcs)
      .join('path')
      .attr('fill', datum => colorScale(datum.data.name))
      .attr('d', arc)
      .append('title')
      .text(datum => `${datum.data.name}: ${datum.data.value}`);

    svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', labelSize)
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', datum => `translate(${arc.centroid(datum)})`)
      .call(text => text.append('tspan')
                      .attr('y', '-0.4em')
                      .attr('font-weight', 'bold')
                      .text(datum => datum.data.name)
                    )
      .call(text => text.filter(datum => (datum.endAngle - datum.startAngle) > 0.25).append('tspan')
                      .attr('x', 0)
                      .attr('y', '0.7em')
                      .attr('fill-opacity', 0.7)
                      .text(datum => datum.data.value)
                    );

  };

  return(
    <div className='pieChart'>

      <svg
        viewBox={`${-diameter / 2}, ${-diameter / 2}, ${diameter}, ${diameter}`}
        width={diameter}
        height={diameter}
        ref={chartRef}
      />

    </div>
  );

};

export default PieChart;
