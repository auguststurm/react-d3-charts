import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

const EventsTimeline = ({width, barHeight, margin, data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotChart(svg);
    plotAxis(svg);
  });

  const height = data.length * barHeight + margin.top + margin.bottom;

  const plotAxis = (svg) => {

  };

  const plotChart = (svg) => {

  };

  return(
    <div className='eventsTimeline'>

      <svg
        viewBox={`0, 0, ${width}, ${height}`}
        width={width}
        height={height}
        ref={chartRef}
      />

    </div>
  );

}

export default EventsTimeline;
