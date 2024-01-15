import { useState } from 'react';

const Main = (props) => {
  let [message, setMessage] = useState("Nothing selected!");
  function getDetails(movie){
    setMessage(movie.title);
  }

  const moviesListItems = [];
  for(let m of props.moviesData) {
    moviesListItems.push(<tr key={m.id} onClick={() => getDetails(m)}><td>{m.title}</td><td>{m.year}</td></tr>);
  }
  return(
    <div>
      <h2>Movies</h2>
      <h3>{message}</h3>
      <table>
        <thead>
          <tr><th>Title</th><th>Year</th></tr>
        </thead>
        <tbody>
          {moviesListItems}
        </tbody>
      </table>
    </div>
  );
};

export default Main;