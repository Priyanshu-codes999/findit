import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { ReportItem } from './pages/ReportItem';
import { ItemDetail } from './pages/ItemDetail';
import { MapView } from './pages/MapView';
import { Messages } from './pages/Messages';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/report/:type" element={<ReportItem />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
