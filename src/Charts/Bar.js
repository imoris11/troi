import React, { useContext, useEffect } from 'react'
import { store, StateProvider } from '../store'
import * as d3 from 'd3'

const BarChart = () => {
  const globalState = useContext(store)
  const { locations, range } = globalState.state

  const myRef = React.createRef()
  const w = 900
  const h = 600

  useEffect(() => {
    //map
    var svg = d3.select(myRef.current).attr('width', 900).attr('height', 600)

    const locationAndValues = []
    let x,
      y = 0
    Object.keys(locations).forEach((location) => {
      if (location === 'Kohsoom') {
        x = 590
        y = 195
      }
      if (location === 'Boonsri') {
        x = 470
        y = 115
      }
      if (location === 'Chai') {
        x = 520
        y = 280
      }
      if (location === 'Somchair') {
        x = 350
        y = 260
      }
      if (location === 'Kannika') {
        x = 545
        y = 420
      }
      if (location === 'Sakda') {
        x = 470
        y = 510
      }
      if (location === 'Busarakhan') {
        x = 590
        y = 250
      }
      if (location === 'Tansanee') {
        x = 350
        y = 400
      }
      if (location === 'Decha') {
        x = 240
        y = 350
      }
      if (location === 'Achara') {
        x = 405
        y = 200
      }

      const records = locations[location]

      let average = 0
      records.forEach((chemical) => (average += Number(chemical.Value) || 0))
      average = average / records.length
      const data = {
        location,
        x,
        y,
        value: average,
      }
      locationAndValues.push(data)
    })

    //Get a general average to use for color determination
    let generalAverage = 0
    locationAndValues.forEach((location) => (generalAverage += location.value))
    generalAverage = generalAverage / locationAndValues.length

    const min = range.min || 0 //default min
    const max = range.max || 100 //default max

    let sizeScale = d3.scaleLinear().domain([min, max]).range([50, 600])

    svg
      .append('image')
      .attr('xlink:href', './wf.jpg')
      .attr('width', w)
      .attr('height', h)

    let arc = d3
      .symbol()
      .type(d3.symbolCircle)
      .size(function (d) {
        return sizeScale(d.value)
      })
    let group = svg.append('g').attr('transform', 'translate(' + 0 + ',' + 0 + ')')

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
        return 'translate(' + d.x + ',' + d.y + ')'
      })
      .attr('fill', (d) => {
        return d.value > generalAverage ? 'red' : 'black'
      })
      .attr('opacity', 0.8)
    // eslint-disable-next-line
  }, [locations])

  return (
    <StateProvider>
      <svg ref={myRef}></svg>
    </StateProvider>
  )
}

export default BarChart
