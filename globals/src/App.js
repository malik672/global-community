import Header from './components/Header';
import Body from './components/body';
import {useEffect} from "react"
import {useLocation} from "react-router-dom"
import Footer from './components/Footer'
import './App.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
