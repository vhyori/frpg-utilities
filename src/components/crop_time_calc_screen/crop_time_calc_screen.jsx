import { cropValues } from '../../data/crops.js';
import { useEffect, useState, useRef } from "react";
import './crop_time_calc_screen.css';

export default function CropTimeCalcScreen() {

  const [perks, setPerks] = useState({
    qf1: true,
    qf2: true,
    qf3: true,
    qf4: false,
    is1: true,
    is2: true,
  })

  const [cropsPerkValues, setCropsPerkValues] = useState([])
  let cropsInfoList = useRef()

  useEffect(() => {
    const calculated = calculateTimesFromPerks(perks, cropValues)
    setCropsPerkValues(calculated)
    cropsInfoList.current = calculated.map((item) => <CropInfo {...item} key={item.name}/>)
  }, [perks, setCropsPerkValues])

  const toggleInput = (e) => {
    const perkName = e.target.dataset.perkName
    const perkValue = e.target.value
    setPerks(prevState => {
      return {
        ...prevState,
        [perkName]: perkValue === "true" ? false : true
      }
    })
  }

  let perksList = []

  for (let key in perks) {
    perksList.push(
      <PerkInputToggle
        perkKey={key}
        value={perks[key]}
        onChangeHandler={toggleInput}
      />
    )
  }

  return (
    <div className="cropTimeScreen">
      <div className="navbar">Crops time calculator</div>
      <div className="perksControls">
        <p>Select your active perks:</p>
        <div className="perksList">
        {perksList}
        </div>
      </div>
      <div className="cropTable">
        {cropsInfoList.current}
      </div>
    </div>
  )
}


const PerkValues = {
  "qf1": 5,
  "qf2": 10,
  "qf3": 15,
  "qf4": 20,
  "is1": 10,
  "is2": 20,
}
function calculateTimesFromPerks(perks, cropValues) {
  let perkPercent = 0
  for (let key in perks) {
    if (perks[key]) {
      perkPercent+=PerkValues[key]
    }
  }

  let newValues = cropValues.map((item) => {
    return {
      ...item,
      perkTime: (item.time / 100) * (100 - perkPercent)
    }
  })
  return newValues
}

const PerkLabels = {
  "qf1": "Quicker Farming I",
  "qf2": "Quicker Farming II",
  "qf3": "Quicker Farming III",
  "qf4": "Quicker Farming IV",
  "is1": "Irrigation System I",
  "is2": "Irrigation System II",
}

function PerkInputToggle(props) {
  const {perkKey, value, onChangeHandler} = props;
  return (
    <div
      className="perkToggle"
      key={`${perkKey}-input-item`}
    >
      <label htmlFor={`${perkKey}Input`}>{`${PerkLabels[perkKey]} (${PerkValues[perkKey]}% faster)`}</label>
      <input
        type="checkbox"
        id={`${perkKey}Input`}
        checked={value}
        value={value}
        data-perk-name={perkKey}
        onChange={onChangeHandler}
      />
    </div>
  )
}

function CropInfo(props) {
  return (
    <div className="cropInfo">
      <div className="col colImage">
        <img className="cropImage" src={props.img} alt=""/>
      </div>
      <div className="col colInfo">
        <div className="cropName">
          {props.name}
        </div>
        <div className="cropDetails">
          <div className="colTime">
            <div className="infoLabel">
              Original time
            </div>
            <div>
              {humanReadableTime(props.time)}
            </div>
          </div>
          <div className="colPerk">
            <div className="infoLabel">
              Perk applied time
            </div>
            <div>
              {humanReadableTime(props.perkTime)}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

function humanReadableTime(time) {
  if (time < 60) {
    return `${time.toFixed(1)} minutes`
  } else if (time < (60 * 24)) {
    return `${(time / 60).toFixed(1)} hours`
  } else {
    const hours = time / 60
    return `${(hours / 24).toFixed(1)} days (${hours.toFixed(1)} hours)`
  }
}