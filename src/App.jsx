import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HomePage,
  NotFoundPage
} from './pages';
import { store } from './redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
