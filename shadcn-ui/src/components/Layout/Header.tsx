import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { key: 'beranda', label: 'Beranda' },
    { key: 'profil', label: 'Profil' },
    { key: 'struktur', label: 'Struktur' },
    { key: 'berita', label: 'Berita' },
    { key: 'agenda', label: 'Agenda' },
    { key: 'galeri', label: 'Galeri' },
    { key: 'video', label: 'Video' },
    { key: 'ppdb', label: 'PPDB Online' },
    { key: 'download', label: 'Download' },
    { key: 'survei', label: 'Survei' },
  ];

  const handleMenuClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-green-900/50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>(021) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span>info@madrasah.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Madrasah Al-Hikmah</h1>
              <p className="text-green-200 text-sm">Mencerdaskan Generasi Islami</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {user.role === 'admin' ? 'Admin' : user.role === 'guru' ? 'Guru' : 'Siswa'}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    onNavigate('beranda');
                  }}
                  className="text-white hover:bg-green-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('login')}
                className="text-white hover:bg-green-600"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-2 mt-8">
                  {menuItems.map((item) => (
                    <Button
                      key={item.key}
                      variant={currentPage === item.key ? "default" : "ghost"}
                      onClick={() => handleMenuClick(item.key)}
                      className="justify-start"
                    >
                      {item.label}
                    </Button>
                  ))}
                  {user && (
                    <>
                      <Button
                        variant={currentPage === 'dashboard' ? "default" : "ghost"}
                        onClick={() => handleMenuClick('dashboard')}
                        className="justify-start"
                      >
                        Dashboard
                      </Button>
                      {user.role === 'siswa' && (
                        <Button
                          variant={currentPage === 'spp' ? "default" : "ghost"}
                          onClick={() => handleMenuClick('spp')}
                          className="justify-start"
                        >
                          Cek SPP
                        </Button>
                      )}
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="bg-green-800/50 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.key}
                variant={currentPage === item.key ? "secondary" : "ghost"}
                onClick={() => onNavigate(item.key)}
                className="text-white hover:bg-green-600 rounded-none"
              >
                {item.label}
              </Button>
            ))}
            {user && (
              <>
                <Button
                  variant={currentPage === 'dashboard' ? "secondary" : "ghost"}
                  onClick={() => onNavigate('dashboard')}
                  className="text-white hover:bg-green-600 rounded-none"
                >
                  Dashboard
                </Button>
                {user.role === 'siswa' && (
                  <Button
                    variant={currentPage === 'spp' ? "secondary" : "ghost"}
                    onClick={() => onNavigate('spp')}
                    className="text-white hover:bg-green-600 rounded-none"
                  >
                    Cek SPP
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;