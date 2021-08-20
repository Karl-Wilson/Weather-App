import './App.css';
import Home from './pages/home';
import { Provider } from 'react-redux';
import Store from './store/store';


function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Home/>
      </Provider>
    </div>
  );
}

export default App;
