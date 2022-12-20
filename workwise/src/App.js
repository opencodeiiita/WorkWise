import homepage from "./pages/homepage";
import './App.css';
import Time from './components/Time'

function App() {
  return (
		<div className="App">
			<div className="msg  text-bold text-red-800">
				<Time/>
			</div>
			<div>
			<homepage/>
			</div>
		</div>

	); 
}

export default App;
