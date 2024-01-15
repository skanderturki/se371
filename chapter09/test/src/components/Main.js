
const ItemsTable = (props) => {
  const itemsRows = [];
  props.items.forEach(item =>{
    itemsRows.push(<tr key={item.id}><td>{item.id}</td><td>{item.title}</td><td>{item.year}</td></tr>);
  }); 
  return(
    <table>
      <thead>
        <tr><th>Id</th><th>Title</th><th>Year</th></tr>
      </thead>
      <tbody>
        {itemsRows}
      </tbody>
    </table>
  );
};


const Main = (props) => {
  return(
    <main>
      <h1>{props.title}</h1>
      <ItemsTable items={props.movies}/>
    </main>
  );
}

export default Main;