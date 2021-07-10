import React, { useState, useEffect } from "react";
import { useStyles } from "./Styles";
import "./select.css";
import { STATES_LIST } from "./States";
import Button from "@material-ui/core/Button";
import { Centers } from "./Centers";

import { StorageAPI } from "./StorageAPI";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SIREN from "./assets/siren.mp3";
const axios = require("axios");
const API = "https://cdn-api.co-vin.in/api/v2/";
const TIME_INTERVAL = 5000;

const getToday = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  date = date < 10 ? `0${date}` : date;
  month = month < 10 ? `0${month}` : month;
  return `${date}-${month}-${year}`;

};

export const Body = () => {
  const classes = useStyles();

  const [sirenFlag, setSirenFlag] = useState(StorageAPI.get("sirenFlag") ? !!StorageAPI.get("sirenFlag") : true);
  const [centersLoad, setCentersLoad] = useState(false);
  const [centersLoadPin, setCentersLoadPin] = useState(false);

  const [districtAutoFetch, setDistrictAutoFetch] = useState(false);
  const [pinAutoFetch, setPinAutoFetch] = useState(false);


  const [fetchTimer, setfetchTimer] = useState(false);


  const [state, setState] = useState(StorageAPI.get("state"));

  const [date, setDate] = useState(getToday());


  const [districts, setDistricts] = useState(
    StorageAPI.get("districts")
      ? JSON.parse(StorageAPI.get("districts"))
      : false
  );

  const [district, setDistrict] = useState(StorageAPI.get("district"));
  const [pin, setPin] = useState(
    StorageAPI.get("pin") ? StorageAPI.get("pin") : ""
  );
  //DummyData.centers
  const [centers, setCenters] = useState();



  const stateChangeHandler = (e) => {

    StorageAPI.set("state", e.target.value);
    setDistricts(false);
    axios
      .get(`${API}admin/location/districts/${e.target.value}`)
      .then(function (response) {

        // handle success
        if (response.data) {
          setDistricts(response.data.districts);
          StorageAPI.set("districts", JSON.stringify(response.data.districts));
        }
      })
      .catch(function (error) {
        // handle error
        setDistricts(false);

      });
  };
  const triggerPinFetch = () => {
    setCentersLoadPin(true);
    axios
      .get(
        `${API}appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`
      )
      .then(function (response) {
        setCentersLoadPin(false);
        // handle success
        if (response.data) {
          setCenters(response.data.centers);
        }
      })
      .catch(function (error) {
        setCentersLoadPin(false);
        setDistricts(false);

      });
  };

  const triggerDistrictFetch = () => {
    setCentersLoad(true);
    axios
      .get(
        `${API}appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`
      )
      .then(function (response) {
        setCentersLoad(false);
        // handle success
        if (response.data) {
          setCenters(response.data.centers);
        }
      })
      .catch(function (error) {
        setCentersLoad(false);
        setDistricts(false);

      });
  };
  const handleDistrictAutoFetch = () => {

    if (!districtAutoFetch) {
      setPinAutoFetch(false);

    }

    setDistrictAutoFetch(!districtAutoFetch);
    stopSound();

  }

  const handlePinAutoFetch = () => {

    if (!pinAutoFetch) {
      setDistrictAutoFetch(false);


    }


    setPinAutoFetch(!pinAutoFetch);
    stopSound();

  }

  const stopSound = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    if (audioEl) {
      audioEl.pause();
    }
  }


  const notify = () => {

    if ((districtAutoFetch || pinAutoFetch) && !centersLoad && !centersLoadPin && sirenFlag) {
      const audioEl = document.getElementsByClassName("audio-element")[0];
      if (audioEl) {
        audioEl.play();
      }
    }
  }


  useEffect(() => {
    StorageAPI.set("sirenFlag", sirenFlag);

  }, [sirenFlag]);


  useEffect(() => {

    setfetchTimer(false);
    clearInterval(fetchTimer);
    if (districtAutoFetch || pinAutoFetch) {
      setfetchTimer(setInterval(() => {
        districtAutoFetch && triggerDistrictFetch();
        pinAutoFetch && triggerPinFetch();
      }, TIME_INTERVAL))
    }
  }, [pinAutoFetch, districtAutoFetch])

  return (
    <div className={classes.wrapper}>
      <audio className="audio-element">
        <source src={SIREN}></source>
      </audio>
      <div className={classes.muteButton} >
        <Switch checked={sirenFlag} onChange={() => { setSirenFlag(!sirenFlag) }} name="checkedA" />
        <Button color="primary" onClick={stopSound}>
          STOP SOUND
        </Button>
      </div>

      

      <div className={classes.fieldRow}>District</div>

      <div className={classes.fieldRow}>
        <div className="selectdiv">
          <label>
            <select defaultValue={state} onChange={stateChangeHandler}>
              <option value={false}>Select State</option>
              {STATES_LIST.map((value, key) => {
                return (
                  <option value={value.id} key={key}>
                    {value.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
      {districts && (
        <div className={classes.fieldRow}>
          <div className="selectdiv">
            <label>
              <select
                defaultValue={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  StorageAPI.set("district", e.target.value);
                }}
              >
                {districts.map((value, key) => {
                  return (
                    <option value={value.district_id} key={key}>
                      {value.district_name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
      )}

      <Button className={centersLoad ? "loading" : ""} variant="outlined" color="primary" onClick={triggerDistrictFetch}>
        FETCH
      </Button>
      <FormControlLabel
        control={<Switch checked={districtAutoFetch} onChange={handleDistrictAutoFetch} name="checkedA" />}
        label="Autofetch"
        labelPlacement="start"
      />
      <div className={classes.fieldRow}>Pincode</div>

      <div className={classes.fieldRow}>
        <input
          className={classes.inputField}
          value={pin}
          type="text"
          onChange={(e) => {
            setPin(e.target.value);
            StorageAPI.set("pin", e.target.value);
          }}
        />
      </div>

      <Button className={centersLoadPin ? "loading" : ""} variant="outlined" color="primary" onClick={triggerPinFetch}>
        FETCH
      </Button>
      <FormControlLabel
        control={<Switch checked={pinAutoFetch} onChange={handlePinAutoFetch} name="checkedA" />}
        label="Autofetch"
        labelPlacement="start"
      />
      {centers && centers.length > 0 ? (
        <Centers data={centers} notify={notify} />
      ) : (
        <div className={classes.fieldRow}>No Centers found</div>
      )}
    </div>
  );
};
