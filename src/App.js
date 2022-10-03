import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={"this is alert message"}/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<UserLogin />} />
              <Route exact path='/signup' element={<UserSignup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
