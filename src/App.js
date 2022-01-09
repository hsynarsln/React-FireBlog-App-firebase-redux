import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRouter from './Router/AppRouter';

function App() {
  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
