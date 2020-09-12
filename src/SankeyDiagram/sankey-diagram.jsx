import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import {
  sankey,
  sankeyLinkHorizontal
} from 'd3-sankey';

import moment from 'moment';
import ResizeObserver from 'react-resize-observer';

import './sankey-diagram.sass';

const SankeyDiagram = ({
  dark = true,
  width = 500,
  height = 500,
  margin = {
    top: 10,
    left: 50,
    bottom: 20
  },
  data,
  onLoadFitWidth = false,
  align = 'justify',   // left, right, center, justify
  edgeColor = 'input'    // input, output, path, none
}) => {

  const [vizWidth, setVizWidth] = useState(width);

  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {

    if (onLoadFitWidth) {
      setVizWidth(containerRef.current.clientWidth);
    } else {
      setVizWidth(width);
    }

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    plotDiagram(svg);

  });

  const color = (datum) => {
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    return colorScale(('category' in datum) ? datum.category : datum.name);
  }

  const format = (value) => {
    const format = d3.format(",.0f");
    return `${format(value)} ${data.units}`
  };

  const SankeyGraph = sankey(data)
                        .nodeId(datum => datum.name)
                        .nodeWidth(15)
                        .nodePadding(10)
                        .extent([[1, 5],  [width - 1, height - 5]]);

  const SankeyObjects = ({ nodes, links }) => SankeyGraph({
    nodes: nodes.map(datum => Object.assign({}, datum)),
    links: links.map(datum => Object.assign({}, datum))
  });


  const plotDiagram = (svg) => {

    const { nodes, links } = SankeyObjects(data);



    const link = svg.append('g')
                  .attr('fill', 'none')
                  .attr('stroke-opacity', 0.75)
                  .selectAll('g')
                  .data(links)
                  .join('g')
                  .style('mix-blend-mode', 'multiply');


    if (edgeColor === "path") {
      const gradient = link.append("linearGradient")
          .attr("id", d => Math.random())
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", d => d.source.x1)
          .attr("x2", d => d.target.x0);

      gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", d => color(d.source));

      gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", d => color(d.target));
    }


    link.append('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', datum => {
        return edgeColor === 'none' ? '#aaa'
            : edgeColor === 'path' ? datum.index
            : edgeColor === 'input' ? color(datum.source)
            : color(datum.target)
          })
      .attr('stroke-width', datum => Math.max(1, datum.width))

    link.append('title')
      .text(datum => `${datum.source.name} → ${datum.target.name}\n${format(datum.value)}`);

    svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', datum => datum.x0 < width / 2 ? datum.x1 + 6 : datum.x0 - 6)
      .attr('y', datum => (datum.y1 + datum.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', datum => datum.x0 < width / 2 ? 'start' : 'end')
      .attr('fill', (dark) ? 'white' : 'black')
      .text(datum => datum.name);

    svg.append('g')
      .attr('stroke', (dark) ? 'silver' : 'black')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', datum => datum.x0)
      .attr('y', datum => datum.y0)
      .attr('height', datum => datum.y1 - datum.y0)
      .attr('width', datum => datum.x1 - datum.x0)
      .attr('fill', color)
      .append('title')
      .text(datum => `${datum.name}\n${format(datum.value)}`)

  }



  const style = (dark) ? 'sankey sankey__dark' : 'sankey';

  return(

    <div className={style} ref={containerRef}>

      <svg
        viewBox={`0, 0, ${vizWidth}, ${height}`}
        width={vizWidth}
        height={height}
        ref={chartRef}
      />
      <ResizeObserver
        onResize={(rect) => {
          setVizWidth(rect.width);
        }}
      />

    </div>

  );

}


export default SankeyDiagram;
