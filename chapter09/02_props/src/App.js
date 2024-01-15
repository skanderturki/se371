
import './App.css';
import Main from './components/Main';

function App() {
  const moviesData = [
    { id:17, title: 'Home Again', year:2020 },
    { id:651, title: 'World War 3', year:2024 },
    { id:1144, title: 'Ramzi V', year:2023 }
  ];
  
  return (
    <div className="App">
      <Main moviesData={moviesData}/>
    </div>
  );
}

export default App;
