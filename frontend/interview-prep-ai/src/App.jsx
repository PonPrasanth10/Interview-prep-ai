import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import Home from './pages/LangdingPage';
import UserProvider from './context/UserContext';
import Dashboard from './pages/home/Dashboard';
import InterviewPrep from './pages/interviewprep/InterviewPrep';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;