
import './App.css';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  const moviesData = [
    { id:17, title: "Home Alone", year:1990 },
    { id:651, title: "Gremlins 2", year:1990 },
    { id:1144, title: "Rocky V", year:1990 }
  ];
  
  return (
    <div className="App">
      <Main moviesData={moviesData} isLogged={true}/>
      <Footer />
    </div>
  );
}

export default App;
