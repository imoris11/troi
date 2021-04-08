import React from 'react'
import { Text, Title } from '../components'
import styled from 'styled-components'

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
  return (
    <Container>
      <Title>Time Period</Title>
      <Box active>
        <Text>Daily</Text>
      </Box>
      <Box>Weekly</Box>
      <Box>Monthly</Box>
      <Box>Yearly</Box>
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
