import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import Beranda from './pages/Beranda';
import Login from './pages/Login';
import Profil from './pages/Profil';
import Struktur from './pages/Struktur';
import Berita from './pages/Berita';
import Agenda from './pages/Agenda';
import Galeri from './pages/Galeri';
import Video from './pages/Video';
import PPDB from './pages/PPDB';
import Download from './pages/Download';
import Dashboard from './pages/Dashboard';
import SPP from './pages/SPP';
import Survei from './pages/Survei';

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('beranda');

  const renderPage = () => {
    switch (currentPage) {
      case 'beranda':
        return <Beranda onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'profil':
        return <Profil />;
      case 'struktur':
        return <Struktur />;
      case 'berita':
        return <Berita />;
      case 'agenda':
        return <Agenda />;
      case 'galeri':
        return <Galeri />;
      case 'video':
        return <Video />;
      case 'ppdb':
        return <PPDB />;
      case 'download':
        return <Download />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'spp':
        return <SPP />;
      case 'survei':
        return <Survei />;
      default:
        return <Beranda onNavigate={setCurrentPage} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header onNavigate={setCurrentPage} currentPage={currentPage} />
            <main className="flex-1">
              {renderPage()}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;