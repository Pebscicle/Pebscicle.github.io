//Import Images
import smiley from './img/Smiley.jpeg'
//Import style sheets
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={smiley} className="App-logo" alt="logo" />
        <p>
          Paul K. Davis - Portfolio Website
        </p>
      </header>
    </div>
  );
}

export default App;
