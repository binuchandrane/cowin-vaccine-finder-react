import React from "react";
import { useStyles } from "./Styles";

export const Centers = (props) => {
  const { data, notify } = props;
  const classes = useStyles();
  const getTime = (time) => {
    let newTime = time.substr(0, 2);
    return `${newTime > 12 ? newTime - 12 : newTime} ${newTime > 12 ? "PM" : "AM"}`;
  }
  const getVaccineCount = (value1) => {
    let count = 0;

    value1.sessions.map((value, key) => {
      //if(value.date == "03-07-2021" && value.min_age_limit == 18 && value.vaccine == "COVISHIELD" && value1.fee_type == "Free"){
        count += value.available_capacity;
        return true;
      //}
    });

    if (count > 0) {
      notify();
    }
    return count;
  };
  return (
    <div className={classes.centersWrapper}>
      {data.map((value, key) => {
        return (
          <>
         
          <div key={`row-${key}`} className={`${classes.centerRow} ${getVaccineCount(value) > 0 ? classes.greenBG : ''}` }>
            <div className={classes.centerName}><b>{value.name}</b> [{value.fee_type}]</div>
            <div className={classes.vaccineCount}><b>{getVaccineCount(value)}</b></div>
            <div>{value.address}</div>
            <div className={classes.centerName}><b>{value.pincode}</b></div>

            {
              value.sessions.map((value2, key) => {
                return (<>
                    <div className={classes.centerName}><b>{value2.date}</b></div>
                    <div className={classes.centerName}><b>{value2.min_age_limit}</b></div>
                    <div className={classes.centerName}><b>{value2.vaccine}</b></div>
                    </>
                )
              })
      
              
            }
            
            
            <div className={classes.centerName}>{getTime(value.from)} to {getTime(value.to)}</div>
            

          </div>
        
          </>
        );
      })}

    </div>
  );
};
