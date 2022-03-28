
import './app.css';
import Buldings from './components/Buldings';
import Canvas from './components/Canvas';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div className="App">
      <header>
      <h1>REAL ESTATE <span>TYCOON</span></h1>
      <hr />
      <p><small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis et ipsam ad suscipit iure dolore necessitatibus impedit, voluptatibus vitae ratione asperiores corporis reiciendis mollitia, rerum quos maxime molestias voluptatum tenetur. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dicta doloremque tempore consectetur cumque, at alias, labore iure nihil soluta debitis unde dolorum sequi error, adipisci molestiae ullam minus aut.</small></p>
      </header>
      <div className="game">
        <Portfolio/>
        <Canvas/>
        <Buldings/>
      </div>
    </div>
  );
}

export default App;
