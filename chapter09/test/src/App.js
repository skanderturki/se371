import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const movieData = [
  { id:17, title: "Home Again", year:2020 },
  { id:651, title: "World War 3", year:2024 },
  { id:1144, title: "Ramzi V", year:2023 }
];


const App = () => {
  return (
    <div className="App">
      <Header title={"Testing React !"}/>
      <Main title={"Movies"} movies={movieData}/>
      <Footer />
    </div>
  );
}

export default App;
