import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App(props) {
  return (
    <div className="App">
        <Header banner="Chapter 5 - Learn React!"/>
        <Main />
        <Footer />
    </div>
  );
}

export default App;
