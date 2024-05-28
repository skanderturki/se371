import { useState } from "react";

function Login(props) {

  let [username, SetUsername] = useState("");

  const handleUsernameChange = (e) => {
    SetUsername(e.target.value);
  }

  return(
    <div>
      <form>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
      </form>
      <p>Test: {username}</p>
    </div>
  );
}

export default Login;