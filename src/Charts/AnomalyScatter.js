import React, { useContext, useEffect } from 'react'
import 'rc-slider/assets/index.css'
import { store, StateProvider } from '../store'
import * as d3 from 'd3'

import { Text, Title } from '../components/components'

const AnomalyScatter = () => {
  const globalState = useContext(store)
  const { range, anomalies_detected, selectedChemical } = globalState.state

  const myRef = React.createRef()
  const w = 900
  const h = 600
  let padding = 40
  var margin = {
    top: 30,
    bottom: 40,
    left: 50,
    right: 20,
  }

  var width = w - margin.left - margin.right
  var height = h - margin.top - margin.bottom

  useEffect(() => {
    //map
    var svg = d3.select(myRef.current).attr('width', 900).attr('height', 600)
    svg.selectAll('*').remove()
    const locationAndValues = []

    anomalies_detected.records.forEach((record) => {
      const data = {
        yhat_lower: Number(record.yhat_lower).toFixed(2),
        yhat_upper: Number(record.yhat_upper).toFixed(2),
        yhat: Number(record.yhat).toFixed(2),
        fact: Number(record.fact).toFixed(2),
        anomaly: Number(record.anomaly),
        date: new Date(record.ds),
      }

      locationAndValues.push(data)
    })

    //Tooltip
    var tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('width', '100px')
      .style('font-size', '10px')
      .style('font-weight', '"bold')
      .style('overflow-wrap', 'break-word')
      .text('a simple tooltip')

    const min = range.min || 0 //default min
    const max = range.max || 100 //default max

    let sizeScale = d3.scaleLinear().domain([min, max]).range([5, 150])

    let xScale = d3
      .scaleTime()
      .domain(
        d3.extent(locationAndValues, function (d) {
          return new Date(d.date)
        }),
      )
      .range([0, width])

    let yScale = d3
      .scaleLinear()
      .domain([max, min])
      .range([0, height - 50])
    //Define X axis
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y-%m'))

    //Define Y axis
    let yAxis = d3.axisLeft(yScale)

    let arc = d3
      .symbol()
      .type(d3.symbolCircle)
      .size(function (d) {
        return sizeScale(d.fact)
      })

    let group = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + 0 + ')')
    group
      .selectAll('path')
      .data(locationAndValues)
      .enter()
      .append('path')
      .attr('size', function () {
        return 100
      })
      .attr('d', arc)
      .attr('transform', function (d) {
        return 'translate(' + xScale(d.date) + ',' + yScale(d.fact) + ')'
      })
      .attr('fill', (d) => {
        return d.anomaly !== 0 ? 'red' : 'green'
      })
      .attr('opacity', 0.8)
      .on('mouseover', function (event, d) {
        return tooltip.style('visibility', 'visible')
      })
      .on('mousemove', function (event, d) {
        return tooltip
          .text(
            `fact:${d.fact}\n yhat:${d.yhat} yhat_lower:${d.yhat_lower} yhat_upper:${d.yhat_upper}`,
          )
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px')
      })
      .on('mouseout', function (event, d) {
        return tooltip.style('visibility', 'hidden')
      })

    //Create X axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (height - padding) + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start')

    //Create Y axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(yAxis)
    // eslint-disable-next-line
  }, [anomalies_detected])

  return (
    <StateProvider>
      <div>
        <svg ref={myRef}></svg>
        <Title style={{ position: 'absolute', left: '50%', top: '5%' }}>
          {selectedChemical}
        </Title>
        <Text
          style={{
            position: 'absolute',
            left: '18%',
            top: '40%',
            transform: 'rotate(270deg)',
          }}
        >
          Measurement
        </Text>
        <Text style={{ position: 'absolute', left: '50%', top: '75%' }}>Time</Text>
      </div>
    </StateProvider>
  )
}

export default AnomalyScatter
