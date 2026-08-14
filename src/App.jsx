import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import BackgroundBlobs from './components/ui/BackgroundBlobs';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import AdminPanel from './pages/AdminPanel';
import Loading from './components/ui/Loading';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Photography from './pages/Photography';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Loading />
        <BackgroundBlobs />
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/photography" element={<Photography />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;