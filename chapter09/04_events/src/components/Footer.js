import { useState } from 'react';

export default (props) => {
  let [time, setTime] = useState(Date.now())
  function updateTime(){
    setTime(Date.now());
  }
  return(
    <div>
      <h3>@copyright</h3>
      <button onClick={updateTime}>Refresh</button>
      <p>{time}</p>
    </div>
  );
}