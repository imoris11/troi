import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { store } from '../../store'
import csvtojson from 'csvtojson'

const Label = styled.label`
  font-size: 12px;
  color: grey;
  font-weight: bold;
`

const Select = styled.select`
  padding: 5px;
`
const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

const DOC_IDS = {
  Atrazine: {
    All: '1QbV1Z6dCBg5BXlPOoBlrkqy020TZrkwz9qarpbJh5-U',
    Achara: '1HeTAoiDC64T8afRfCjxhpUT0COutKqqFw08PyuIO998',
    Boonsri: '1HoVSjjeC9NyIlD_KEAg8cbJzLriZ0EUaiZ5uDaedG2M',
    Busarakhan: '1TAivtwLzxus2jbrWqOih5ee0QC8oArhWPbrwqbxjkWk',
    Chai: '1zIam_VG433MwKDX6YX6bPirrfKybEGywJemMnDyduys',
    Kannika: '1Pa0443FEDdXiMmlpOZVNNii62azBP51iNiQ8Jox7eUw',
    Kohsoom: '10RZY0_WKyjQHTynRvXQM3esEYhKYHNGdEGc6kJ3IPtI',
    Sakda: '14TEkexYY1M0SyBKee33iVLfproUwknyPKyoMN4BjfnE',
    Somchair: '1bSWQnebucgPmk_wrlSboVP5j_C5tUjsJdUV05-mIpPc',
    Tansanee: '1-at8DUqwMBzOcNqotnCsVpBB-DIdxs1zHRzFJzAHfGo',
  },
  Copper: {
    All: '19DMa-_EhwspM99KypQmVAMtVpMRo-XZ1ff4zHAuws1E',
    Achara: '18Ec3qqAvfgHSPOlc7MYWFrnXx7MaNj8eQXwcs2KlHSk',
    Boonsri: '1OJIiPtg-yqbl9SSDjRY7GqXDgQSaRTo8tgFgH-qyr9k',
    Busarakhan: '1QXe9Ya5E1w0PRs3oSGCOuSBa13s3nrR8ophAYXEEmGo',
    Chai: '1V561LaV_fdp76pkrvh56JeqqiXSmgIvkfq-PjfUQHIE',
    Decha: '1URTNkXdb27RfUbT9u2Wi89ywxKmdEiwEYEGipuo7tIc',
    Kannika: '1buqs03Regc3hzm5IfyvR38EePrkMett9d2z8koH_IoU',
    Kohsoom: '1OoARtgcM9flPmOihwlEkt98NJs1cB2pFTjlzSuzfhqU',
    Sakda: '1yfm69yk8ZwNrKRdhJGx3PQonAgZenZgbX6xRbTZvz-s',
    Somchair: '1yfm69yk8ZwNrKRdhJGx3PQonAgZenZgbX6xRbTZvz-s',
    Tansanee: '1gy9ptZLqbw5l7KEQVuNKQxvlZtE5CrV1LG0lnTHgrZY',
  },
  Iron: {
    All: '12EhGWQU4yehXfMTzNlW5fvn96jmNGChR4dvXihpd5jk',
    Achara: '1uKY4UAVRx2R_QRgJG3lZCf8yT1Kn_n7-w-9yrO2Wl1k',
    Boonsri: '18ocN-IH-B5j0MM0_634KqGtA3IQzf-xhvftcBOwqZUY',
    Busarakhan: '1OJFhqhqrtzDF4HVhydKbRuxC58M08ZsLLMXNr2j2omI',
    Chai: '1thKSZc619Nv2p-cW1EhVi3NoQdyBvtnEqeDmnufOfSI',
    Decha: '1C5tMHSrM0CUMVv6jCgto_pVicPTDOLEecvwgypReFCI',
    Kannika: '1buqs03Regc3hzm5IfyvR38EePrkMett9d2z8koH_IoU',
    Kohsoom: '1vbfxiEuXlMou46t70IpDmEP--m1TgrGIr_Yh9qjj7Dg',
    Sakda: '15uGh2njzdz23JyFm8xqhHxIxiGmZGh4qgB8RLA08xSs',
    Somchair: '1Tql4x7yJ2uITttxIDODDR5iiFCb_xEvBmHgiWHFko04',
    Tansanee: '1oUIVESIEEdDoNlQ3TzY8ruNMHPyLaw7cDvPG3pLcUTA',
  },
  Manganese: {
    All: '1GDkTjFQSJqV0yXHh5jp72QKbJAqn315IBPKhrv98yJI',
    Achara: '1YbVsX8pPuIblfWYLsRP7iwElSABl-zBv2nqehqP5wBU',
    Boonsri: '127ItsTR1qjdiKNd4Lvf-uLHpWt7l-B9tyoOjGcJy7Vw',
    Busarakhan: '1-UTHjHvJKtrNVjSVqwnKDYuutoy5_LPfUjYQWiTqn4g',
    Chai: '1qOwhtbdg-xIRXGd9QOmwkE9ME6kwMGjhAL-mA1BUcgE',
    Decha: '1aJI59G5FGix_UvsXnnqNh97sD6KSrsF458HtfieZ2Cs',
    Kannika: '1C_tBq-qQ3L53tNsSyMlGHja02J-eOoidp3-8JhrCVpI',
    Kohsoom: '1U_Te_fzcAnXMZSVWm1o3GNkjlkfYiaJN0kqNy-hqUwA',
    Sakda: '1QlSZG027m4PunTUe3Kg7AHtxEJ9su_UJ-6L53OBw1c4',
    Somchair: '1GHoj8iDeRoKUoJ2BzYKcNx47nJ2T44O7YySy0V4oUHM',
    Tansanee: '1BMYVLmJDxd6VuaeasQ0gKWbvCYne9n_aeTBC35fzSVE',
  },
  Methylosmoline: {
    All: '12dkWWDIUW6EUxi0iPVhoHlwR_RqmDNhRZGs_yK5XD-I',
    Busarakhan: '1oJ3cl34PbircqMiYwUQ-tLF2gHBsr0TbMy_7d1Z_bZY',
    Chai: '1pH9gCoReNf2Lh2-7hzsXyEdaUjSBMnRlhPytuQhIRz8',
    Kannika: '1InDx2do0jcl1SvZLdi3bXMn9Pe_ZPmu8-M9-oNVqJTc',
    Kohsoom: '1dUInBFSkbAXVLQ1tVINy2eOJCP32uPI6Vz91OVwrNXE',
    Sakda: '17iV0NfOGmHFcOtUzhS2MsZZHJsy8aIV_9HdAbLxQXDI',
    Somchair: '1VWpCEHkIe-J_iu_MHbVW00JNJZcBsN7o8nR6ejbYlvU',
  },
  'Water Temperature': {
    All: '1iZXNx3uK0NeG9UNRCIgHe4COtxcyWFbtr_mBcwaGrgU',
    Achara: '12eRyT6eoawiQm-yRkx-bCEVYBSCky3iibcYbTDubl7o',
    Boonsri: '1oo8mmHR9LI2ArmCVbSWLctjw18l7rB_mTJP4WBxyUWM',
    Busarakhan: '1GD0-OW1y_LwFX09aXh9XLFKALm-eDtF4yqIQEu9WSNI',
    Chai: '1A3Ymec1S_a7VP7wcQp03HnUVERyhx6wPM2fL1Et0cj8',
    Decha: '1zH2QVyESRqvwG306fUpEbZ_uPA5oEg-yYskQf1YwYLE',
    Kannika: '1ejrJYBkvL3oqsQ2vYCGhjsPi7k5M5wIkPo2PT2t-RTA',
    Kohsoom: '10Mn02TLA2etBxB9_ISFXnI2lmoBc436IZyYXH6WPpxw',
    Sakda: '1uHP8t0x20140wuTVOscsrwXd1qMm5r3V41-c9UzkkD0',
    Somchair: '1bSWQnebucgPmk_wrlSboVP5j_C5tUjsJdUV05-mIpPc',
    Tansanee: '19kzDCXRGnKQ-WOS89eD9BbT8-hEsVA7QABVgQp5BNgg',
  },
  '': {},
}
const AnomalyModal = ({ modalIsOpen, setIsOpen }) => {
  const [state, setState] = useState({ location: '' })
  const globalState = useContext(store)
  const { dispatch } = globalState
  const { locations, selectedChemical } = globalState.state

  let subtitle

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({
      type: 'anomalies_detected',
      value: { records: [] },
    })
    const { location } = state
    const curr_location = location || 'All'
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${DOC_IDS[selectedChemical][curr_location]}/gviz/tq?tqx=out:csv&sheet=${curr_location}`,
      )
      const strData = await response.text()
      const records = await csvtojson({
        output: 'json',
      }).fromString(strData)

      dispatch({
        type: 'anomalies_detected',
        value: { records, location, selectedChemical },
      })

      dispatch({
        type: 'current_view',
        value: 'anomaly_detection',
      })
      setIsOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Anomaly Detection</h2>

        <div>
          Select a chemical and/or a location to view anomalies detected in the data
          set
        </div>
        <form onSubmit={handleSubmit}>
          <br />
          <Label>Location</Label>
          <br />
          <Select name="location" onChange={handleChange}>
            <option value="">Select Location</option>
            {Object.keys(DOC_IDS[selectedChemical]).map((location, idx) => (
              <option value={location} key={idx}>
                {location}
              </option>
            ))}
          </Select>
          <br />
          <br />
          <Button secondary>Detect Anomalies</Button>
        </form>
      </Modal>
    </div>
  )
}

export default AnomalyModal
