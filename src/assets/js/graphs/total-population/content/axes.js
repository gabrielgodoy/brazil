import * as d3 from 'd3';
import {config, reusableTransition} from '../config';

export default function createScales(svgGroup, data) {
  let xScale = d3.scaleTime()
                 .domain([
                   d3.min(data, d => d3.min(d.years, yearObj => yearObj.year)),
                   d3.max(data, d => d3.max(d.years, yearObj => yearObj.year))
                 ])
                 .range([0, config.width]);
  let xAxis = d3.axisBottom(xScale);
  svgGroup.append('g')
          .attr('class', 'graph-axis x-axis')
          .attr('transform', `translate(0, ${config.height})`)
          .call(xAxis);

  let yScale = d3.scaleLinear()
                 .domain([
                   d3.min(data, d => d3.min(d.years, yearObj => yearObj.population)),
                   d3.max(data, d => d3.max(d.years, yearObj => yearObj.population)),
                 ])
                 .range([config.height, 0]);

  // SI is from the French language name Système International d'Unités
  // (also known as International System of Units).
  // SI-prefix with two significant digits, "42M"
  let formatValue = d3.format(".2s");
  let yAxis = d3.axisLeft(yScale).tickFormat(formatValue);
  svgGroup.append('g')
          .attr('class', 'graph-axis y-axis')
          .call(yAxis);

  svgGroup.append('g')
          .attr('transform', `translate(6, 3), rotate(90)`)
          .append('text')
          .attr('class', 'axis-title')
          .text('População em milhões');

  function updateScales(data) {
    yScale.domain([
      d3.min(data, d => d3.min(d.years, yearObj => yearObj.population)),
      d3.max(data, d => d3.max(d.years, yearObj => yearObj.population)),
    ]);
    yAxis = d3.axisLeft(yScale).tickFormat(formatValue);
    d3.select('.y-axis').transition(reusableTransition).call(yAxis);
  }

  return {xScale, yScale, updateScales}
}
