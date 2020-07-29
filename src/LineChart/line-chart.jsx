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
    plotChart(svg);
    plotAxis(svg);
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

    const path = svg.append('path')
                  .datum(data)
                  .attr('fill', 'none')
                  .attr('stroke', 'steelblue')
                  .attr('stroke-width', 3)
                  .attr('stroke-linejoin', 'round')
                  .attr('stroke-linecap', 'round')
                  .attr('d', line);


    function hover(svg, path) {

      if ('ontouchstart' in document) {
        svg.style("-webkit-tap-highlight-color", "transparent")
          .on('touchmove', moved)
          .on('touchstart', entered)
          .on('touchend', exited)
      } else {
        svg.on('mousemove', moved)
          .on('mouseenter', entered)
          .on('mouseleave', exited);
      }

      const bar = svg.append('line')
                  .attr('stroke', '#999')
                  .attr('stroke-width', 0.5)
                  .attr('stroke-dasharray', '5 2')
                  .attr('display', 'none')
                  .attr('y1', margin.top)
                  .attr('y2', height - margin.bottom);

      const dot = svg.append('g')
                    .attr('display', 'none')

      dot.append('circle')
        .attr('r', 5)
        .attr('fill', 'red');

      const output = dot.append('text')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .attr('y', -30);



      function moved()
      {
        const mouse = d3.mouse(this);
        const xMouse = xScale.invert(mouse[0]);
        const yMouse = yScale.invert(mouse[1]);

        var insertionPoint = d3.bisectLeft(data.map(datum => moment(datum.date)), xMouse);
        insertionPoint = (insertionPoint <= (data.length - 1)) ? insertionPoint : data.length - 1;

        const insertionPointResult = data[insertionPoint].date;
        const xValue = moment(data[insertionPoint].date || '').toDate();
        const yValue = data[insertionPoint].value;

        dot.attr('transform', `translate(${xScale(xValue)},${yScale(yValue)})`);
        output.text(`${moment(xValue).format('MMM Do YYYY')}: ${yValue}`);
        bar.attr('x1', xScale(xValue)).attr('x2', xScale(xValue));
      }

      function entered() {
        dot.attr('display', null);
        bar.attr('display', null);
      }

      function exited() {
        dot.attr('display', 'none');
        bar.attr('display', 'none');
      }


    }

    svg.call(hover, path);

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
