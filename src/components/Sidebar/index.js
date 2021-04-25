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
import {store} from '../../store';
import FileReaderInput from 'react-file-reader-input'
import csvtojson from 'csvtojson'

export const Sidebar = () => {
  const globalState = useContext(store);
  const {dispatch} = globalState;
  const {fileName, chemicals, locations} = globalState.state;

  console.log('log form sidebar', globalState);
  
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
      type: 'fileName', value: file.name
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
    console.log("Processing Records")
    let chemicalsObject = {}
    let chemicalsByLocation = {}
    for(let i=0; i<records.length; i++) {
      const record = records[i]
      let chemical = record['Measure']
      let location = record['location']
      const date = record['Sample date']
      const dateArray = date.split("-")
      const monthsMap ={
          "Jan":"01",
          "Feb":"02",
          "Mar":"03",
          "Apr":"04",
          "May":"05",
          "Jun":"06",
          "Jul":"07",
          "Aug":"08",
          "Sep":"09",
          "Oct":"10",
          "Nov":"11",
          "Dec":"12"
      }
      const year = Number(dateArray[2]) >=90 ? `19${dateArray[2]}` :  `20${dateArray[2]}`

      const newDate = year +'-'+ monthsMap[dateArray[1]] +'-'+dateArray[0]
      record['Sample date'] = newDate

      if(!chemicalsByLocation[location]) {
        chemicalsByLocation[location] = []
      }
      if(!chemicalsObject[chemical]) {
        chemicalsObject[chemical] = []
      }
      chemicalsObject[chemical].push(record)
      chemicalsByLocation[location].push(record)
    }
    dispatch({
      type: 'chemicals', value: chemicalsObject
    })
    dispatch({
      type: 'locations', value: chemicalsByLocation
    })

    console.log('received state', globalState)
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
        {Object.keys(locations).map((location)=>
          <Row key={location}>
          <Text>{location}</Text>
          <TextSmall>{locations[location].length}</TextSmall>
        </Row>
        )}

        <SubTitle>Chemicals</SubTitle>
        {Object.keys(chemicals).map((key)=>
         <Row key={key}>
          <Text>{key}</Text>
          <TextSmall>{chemicals[key].length}</TextSmall>
       </Row>
        )}
      </Content>
    </Container>
  )
}

export default Sidebar
