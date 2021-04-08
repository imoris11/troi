import React from 'react'
import BarChart from '../../Charts/Bar'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  marginleft: 10px;
  marginright: 10px;
`

const Button = styled.button`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid grey;
  color: ${(props) => (props.primary || props.secondary ? '#fff' : '#000')};
  background-color: ${(props) =>
    props.primary ? '#8E6262' : props.secondary ? '#399700' : '#fff'};
  &:hover {
    cursor: pointer;
  }
`

export const GraphContainer = () => {
  return (
    <Row>
      <BarChart />
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <Button primary>Time Series</Button>
        <Button secondary>Anomaly Detection</Button>
        <Button>Reset</Button>
      </div>
    </Row>
  )
}

export default GraphContainer
