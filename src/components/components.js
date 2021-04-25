import styled from 'styled-components'

const Container = styled.div`
  max-width: 250px;
  border-right: 1px solid lightgrey;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px;
  background-color: ${(props) => (props.active ? 'green' : 'none')};
  color: ${(props) => (props.active ? 'white' : 'black')};
`
const Text = styled.p`
  padding: 0px;
  margin: 5px;
  font-size: 0.8em;
  font-weight: 600;
`

const TextSmall = styled(Text)`
  color: lightgrey;
  font-size: 10px;
  font-weight: 600;
`

const Title = styled.h3`
  text-align: center;
  font-size: 14px;
  margin: 10px;
`
const Divider = styled.div`
  height: 1px;
  background-color: grey;
`

const Content = styled(Container)`
  padding: 5px 20px;
  border: none;
  max-height: 75%;
  overflow-y: scroll;
`

const SubTitle = styled.h5`
  margin-top: 20px;
  margin-bottom: 10px;
`

const DataContainer = styled.div`
  margin-bottom: 50px;
  height: 10%;
`

export {
  DataContainer,
  SubTitle,
  Content,
  Container,
  Divider,
  Title,
  TextSmall,
  Row,
  Text,
}
