import React, { useContext, useState } from 'react'
import BarChart from '../../Charts/Bar'
import AnomalyScatter from '../../Charts/AnomalyScatter'
import styled from 'styled-components'
import { store, ChemicalsWithAnomaliesDetected } from '../../store'
import AnomalyModal from '../AnomalyDetectionModal'

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  marginleft: 10px;
  marginright: 10px;
`

export const Button = styled.button`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid white;
  color: ${(props) => (props.primary || props.secondary ? '#fff' : '#000')};
  background-color: ${(props) =>
    props.primary ? '#8E6262' : props.secondary ? '#399700' : '#fff'};
  &:hover {
    cursor: pointer;
  }
`

export const GraphContainer = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState
  const { selectedChemical, current_view } = globalState.state
  const [modalIsOpen, setIsOpen] = useState(false)

  const setTimeSeries = () => {
    dispatch({
      type: 'current_view',
      value: 'time_series',
    })
  }
  return (
    <Row>
      {current_view === 'anomaly_detection' ? <AnomalyScatter /> : <BarChart />}
      {selectedChemical && (
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <Button onClick={setTimeSeries} primary>
            Time Series
          </Button>
          {ChemicalsWithAnomaliesDetected.includes(selectedChemical) && (
            <Button secondary onClick={() => setIsOpen(true)}>
              Anomaly Detection
            </Button>
          )}
        </div>
      )}
      <AnomalyModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </Row>
  )
}

export default GraphContainer
