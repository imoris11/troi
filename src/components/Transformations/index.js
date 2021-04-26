import React, { useContext } from 'react'
import { Text, Title } from '../components'
import styled from 'styled-components'
import { store, TimePeriod } from '../../store'

const Box = styled.div`
  border: 1px solid ${(props) => (props.active ? 'white' : 'grey')};
  background-color: ${(props) => (props.active ? 'blue' : 'white')};
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  color: ${(props) => (props.active ? 'white' : 'grey')};
  &:hover {
    cursor: pointer;
  }
`

const Tag = styled(Box)`
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`

const Container = styled.div`
  border-left: 1px solid lightgrey;
  width: 200px;
`
export const Transformations = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState
  const { timePeriod } = globalState.state;

  const handleTimePeriodChange = (input) => {
    dispatch({
      type: 'timePeriod',
      value: input
    })
  }
  
  return (
    <Container>
      <Title>Time Period</Title>
      <Box active={timePeriod === TimePeriod.ALL} onClick={() => handleTimePeriodChange(TimePeriod.ALL)}>All</Box>
      <Box active={timePeriod === TimePeriod.MONTHLY} onClick={() => handleTimePeriodChange(TimePeriod.MONTHLY)}>Monthly</Box>
      <Box active={timePeriod === TimePeriod.YEARLY} onClick={() => handleTimePeriodChange(TimePeriod.YEARLY)}>Yearly</Box>
      <Title>Transformations</Title>
      <Tag active>
        <Text>Boonsri</Text>
        <Text>X</Text>
      </Tag>
      <Tag active>
        <Text>Atrazine</Text>
        <Text>X</Text>
      </Tag>
      <Tag active>
        <Text>{'>.03'}</Text>
        <Text>X</Text>
      </Tag>
    </Container>
  )
}

export default Transformations
