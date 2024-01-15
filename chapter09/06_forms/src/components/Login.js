import { useState } from "react";

export default (props) => {

  let [username, SetUsername] = useState("");

  handleUsernameChange = (e) => {
    this.setUsername({username: e.target,value});
  }

  return(
    <div>
      <form>
        <label>Username</label>
        <input type="text" name="username" value={this.state.username}
                onChange={this.handleUsernameChange}></input>
      </form>
      <p>Test: {username}</p>
    </div>
  );
}