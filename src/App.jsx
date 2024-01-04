import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Admin from './pages/admin/Admin';
import NotFound from './pages/not-found/NotFound';
import UnAuthorized from './pages/unauthorized/UnAuthorized';
import Profile from './pages/profile/Profile';
import AuthGuard from './guards/AuthGuard';
import { Role } from './models/Role';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard roles={[Role.ADMIN]}>
                <Admin />
              </AuthGuard>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="/401" element={<UnAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
