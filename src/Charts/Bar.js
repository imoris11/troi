import React, { useContext, useEffect, useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { store, TimePeriod, StateProvider } from '../store'

import * as d3 from 'd3'

const sliderContainer = {
  marginBottom: '20px',
  width: '600px'
}

const coordinates = {
  'Kohsoom': [590, 195],
  'Boonsri': [470, 115],
  'Chai': [520, 280],
  'Somchair': [350, 260],
  'Kannika': [545, 420],
  'Sakda': [470, 510],
  'Busarakhan': [590, 250],
  'Tansanee': [350, 400],
  'Decha': [240, 350],
  'Achara': [402, 200]
}

const years = ['98', '99', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Jun', 'Aug', 'Sep', '0ct', 'Nov', 'Dec'];

const monthsYears = [];
years.map(yr => months.map(mo => monthsYears.push(`${mo} ${yr}`)))

const BarChart = () => {
  const globalState = useContext(store)
  const {locations, range, timePeriod} = globalState.state
  const [sliderValue, setSliderValue] = useState(0);

  const getGroupedData = () => {
    let group = {};

    Object.entries(locations).forEach(([key, data]) => {
      data.forEach(d => {
        // eslint-disable-next-line
        const [_, mo, yr] = (d['Sample date'] || ' - - ').split('-');
  
        if (timePeriod === TimePeriod.MONTHLY && years.includes(yr) && months.includes(mo)) {
          let timeKey = `${mo} ${yr}`;
  
          if (!group[timeKey]) {
            group[timeKey] = {};
          }
  
          if (Array.isArray(group[timeKey][key])){
            group[timeKey][key].push(d);
          } else {
            group[timeKey][key] = [d]
          }

        } else if(timePeriod === TimePeriod.YEARLY && years.includes(yr)) {
          if (!group[yr]) {
            group[yr] = {}
          }

          if (Array.isArray(group[yr][key])){
            group[yr][key].push(d);
          } else {
            group[yr][key] = [d]
          }
        }
      })
    })

    return group;
  }
  
  const selectData = (sliderValue) => {
    let data = getGroupedData();
    if (data && timePeriod === TimePeriod.MONTHLY) {
      return data[monthsYears[sliderValue]];
    } else if (data && timePeriod === TimePeriod.YEARLY){
      return data[years[sliderValue]];
    } else {
      return locations;
    }
  }

  const getTimeText = () => {
    if (timePeriod === TimePeriod.MONTHLY) {
      return monthsYears[sliderValue];
    } else if (timePeriod === TimePeriod.YEARLY){
      return 'Year of ' + years[sliderValue];
    }
  }

  const myRef = React.createRef()
  const w = 900
  const h = 600

  const getSliderMax = () => {
    if (timePeriod === TimePeriod.YEARLY) {
      return years.length - 1;
    } else {
      return years.length * months.length - 1;
    }
  }

  const selectedData = selectData(sliderValue);

  useEffect(() => {
    //map
    var svg = d3.select(myRef.current).attr('width', 900).attr('height', 600)

    const locationAndValues = []
    let x,
      y = 0

    Object.entries(selectedData || {}).forEach(([location, records]) => {
      x = coordinates[location][0];
      y = coordinates[location][1];

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
  }, [selectedData])

  return (
    <StateProvider>
      <svg ref={myRef}></svg>
      { timePeriod !== TimePeriod.ALL &&
        <>
          <div style={sliderContainer}>
            <Slider min={0} max={getSliderMax()} included={false} value={sliderValue} onChange={(value) => setSliderValue(value)}/>
          </div>
          <div>{getTimeText()}</div>
        </>
      }
    </StateProvider>
  )
}

export default BarChart
