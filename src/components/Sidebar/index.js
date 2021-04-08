import React, { useState } from 'react'
import {
  DataContainer,
  Divider,
  TextSmall,
  Text,
  Row,
  Container,
  Content,
  Title,
  SubTitle,
} from '../components'
import FileReaderInput from 'react-file-reader-input'

export const Sidebar = () => {
  const [fileName, setFileName] = useState('')
  const handleChange = (e, results) => {
    results.forEach((result) => {
      const [e, file] = result
      console.log(e.target.result)
      setFileName(file.name)
    })
  }

  return (
    <Container>
      <DataContainer>
        <Title>Data Source</Title>
        <Divider />
        <FileReaderInput as="url" id="my-file-input" onChange={handleChange}>
          <SubTitle
            style={{ textAlign: 'center', color: 'grey', cursor: 'pointer' }}
          >
            {fileName || 'Select File'}
          </SubTitle>
        </FileReaderInput>

        <Divider />
      </DataContainer>

      <Divider />
      <Title>Categories</Title>
      <Divider />
      <Content>
        <SubTitle>Locations</SubTitle>
        <Row>
          <Text>Boonsri</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Chai</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Kannika</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>SomChair</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Sakda</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>SomChair</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Sakda</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>SomChair</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Sakda</Text>
          <TextSmall>1000</TextSmall>
        </Row>

        <SubTitle>Chemicals</SubTitle>
        <Row>
          <Text>Atrazine</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Copper</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Iron</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Magnesium</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Water Temperature</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Atrazine</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Copper</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Iron</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Magnesium</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Water Temperature</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Atrazine</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Copper</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Iron</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Magnesium</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Water Temperature</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Water Temperature Now What Say what</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Atrazine</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Copper</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Iron</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Magnesium</Text>
          <TextSmall>1000</TextSmall>
        </Row>
        <Row>
          <Text>Water Temperature</Text>
          <TextSmall>1000</TextSmall>
        </Row>
      </Content>
    </Container>
  )
}

export default Sidebar
