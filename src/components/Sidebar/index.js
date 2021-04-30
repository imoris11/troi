import React, { useContext } from 'react'
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
import { store, ChemicalsWithAnomaliesDetected } from '../../store'
import FileReaderInput from 'react-file-reader-input'
import csvtojson from 'csvtojson'

export const Sidebar = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState
  const { fileName, chemicals, locations, selectedChemical } = globalState.state

  const handleFileUpload = (e, results) => {
    results.forEach((result) => {
      // eslint-disable-next-line no-unused-vars
      const [e, file] = result
      if (file.type === 'text/csv' || 'application/vnd.ms-excel') {
        loadFile(file)
      } else alert('Invalid file type. Expected a csv file')
    })
  }

  const loadFile = async (file) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.fileName = file.name
    reader.onload = loadHandler
    dispatch({
      type: 'fileName',
      value: file.name,
    })
    reader.onerror = function () {
      alert('Unable to read ' + file.name)
    }
  }

  const loadHandler = (event) => {
    const csv = event.target.result
    csvReader(csv)
  }

  const csvReader = async (csv) => {
    const records = await csvtojson({
      output: 'json',
    }).fromString(csv)
    processRecords(records)
  }

  const processRecords = (records) => {
    let chemicalsObject = {}
    let chemicalsByLocation = {}
    for (let i = 0; i < records.length; i++) {
      const record = records[i]
      let chemical = record['Measure']
      let location = record['location']

      if (!chemicalsByLocation[location]) {
        chemicalsByLocation[location] = []
      }
      if (!chemicalsObject[chemical]) {
        chemicalsObject[chemical] = []
      }
      chemicalsObject[chemical].push(record)
      chemicalsByLocation[location].push(record)
    }
    dispatch({
      type: 'chemicals',
      value: chemicalsObject,
    })
    dispatch({
      type: 'locations',
      value: chemicalsByLocation,
    })
  }

  const filterByLocation = (records) => {
    let chemicalsByLocation = {}
    let max = Number(records[0].Value)
    let min = Number(records[0].Value)

    for (let i = 0; i < records.length; i++) {
      const record = records[i]
      let location = record['location']

      if (Number(record['Value']) > max) max = Number(record['Value'])
      if (Number(record['Value']) < min) min = Number(record['Value'])

      if (!chemicalsByLocation[location]) {
        chemicalsByLocation[location] = []
      }
      chemicalsByLocation[location].push(record)
    }

    dispatch({
      type: 'range',
      value: { max, min },
    })

    dispatch({
      type: 'locations',
      value: chemicalsByLocation,
    })
  }

  const handleApplyChemical = (chemical) => {
    dispatch({
      type: 'current_view',
      value: 'time_series',
    })

    dispatch({
      type: 'selectedChemical',
      value: chemical,
    })
    const chemicalBeingViewed = chemicals[chemical]
    filterByLocation(chemicalBeingViewed)
  }

  return (
    <Container>
      <DataContainer>
        <Title>Data Source</Title>
        <Divider />
        <FileReaderInput as="url" id="my-file-input" onChange={handleFileUpload}>
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
        {Object.keys(locations).map((location) => (
          <Row key={location}>
            <Text>{location}</Text>
            <TextSmall>{locations[location].length}</TextSmall>
          </Row>
        ))}

        <SubTitle>Chemicals</SubTitle>
        {Object.keys(chemicals).map((key) => (
          <Row
            active={selectedChemical === key}
            style={{ cursor: 'pointer', position: 'relative', padding: 5 }}
            onClick={() => handleApplyChemical(key)}
            key={key}
          >
            <Text>{key}</Text>
            <TextSmall>{chemicals[key].length}</TextSmall>
            <TextSmall
              style={{
                position: 'absolute',
                top: 18,
                marginTop: 5,
                color: 'orange',
                fontSize: 9,
                fontWeight: '600',
              }}
            >
              {ChemicalsWithAnomaliesDetected.includes(key) ? 'AD Enabled' : ''}
            </TextSmall>
          </Row>
        ))}
      </Content>
    </Container>
  )
}

export default Sidebar
