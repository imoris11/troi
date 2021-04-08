import React from 'react'
import Sidebar from './components/Sidebar'
import GraphContainer from './components/GraphContainer'
import Transformations from './components/Transformations'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
`
export const Layout = () => {
  return (
    <Container>
      <Sidebar />
      <GraphContainer />
      <Transformations />
    </Container>
  )
}
