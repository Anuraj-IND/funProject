import { Routes, Route } from 'react-router-dom';
import PetalsBackground from './components/PetalsBackground';
import AdminButton from './components/AdminButton';
import MusicToggle from './components/MusicToggle';
import HomePage from './pages/HomePage';
import RoseDay from './pages/RoseDay';
import ProposeDay from './pages/ProposeDay';
import ChocolateDay from './pages/ChocolateDay';
import TeddyDay from './pages/TeddyDay';
import PromiseDay from './pages/PromiseDay';
import HugDay from './pages/HugDay';
import KissDay from './pages/KissDay';
import ValentineDay from './pages/ValentineDay';

export default function App() {
  return (
    <div className="app">
      <PetalsBackground />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rose" element={<RoseDay />} />
          <Route path="/propose" element={<ProposeDay />} />
          <Route path="/chocolate" element={<ChocolateDay />} />
          <Route path="/teddy" element={<TeddyDay />} />
          <Route path="/promise" element={<PromiseDay />} />
          <Route path="/hug" element={<HugDay />} />
          <Route path="/kiss" element={<KissDay />} />
          <Route path="/valentine" element={<ValentineDay />} />
        </Routes>
      </main>
      <MusicToggle />
      <AdminButton />
    </div>
  );
}
