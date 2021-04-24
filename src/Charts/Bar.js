import React, { useContext, useEffect } from 'react'
import {store, StateProvider} from '../store';
import * as d3 from 'd3'
import {
  TextSmall,
  Text,
  Row,
} from '../components/components'
const BarChart = () => {
  const globalState = useContext(store);
  //const {dispatch} = globalState;
  const {fileName, chemicals, locations} = globalState.state;

  console.log(chemicals);

  const myRef = React.createRef()
  const data = [12, 36, 55, 25, 35, 10, 41];
  const w = 900
  const h = 600

  useEffect(() => {
    const accessToRef = d3
    .select(myRef.current)
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('padding', 10)
    .style('border', '1px solid grey')
    .style('margin-top', 10)

    accessToRef
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => h - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', (d, i) => (d > 35 ? 'tomato' : 'yellow'))
  })

  return <StateProvider>
      <div ref={myRef}></div>
    </StateProvider>
}

export default BarChart;
