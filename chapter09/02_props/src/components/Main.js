const Main = (props) => {
  const moviesListItems = [];
  for(let m of props.moviesData) {
    moviesListItems.push(<tr key={m.id}><td>{m.title}</td><td>{m.year}</td></tr>);
  }
  return(
    <div>
      <h2>Movies</h2>
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
}

export default Main;