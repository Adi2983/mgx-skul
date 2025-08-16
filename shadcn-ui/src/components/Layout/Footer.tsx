import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold">M</span>
              </div>
              <h3 className="text-lg font-bold">Madrasah Al-Hikmah</h3>
            </div>
            <p className="text-green-200 text-sm mb-4">
              Lembaga pendidikan Islam yang berkomitmen untuk mencerdaskan generasi Muslim dengan ilmu pengetahuan dan akhlak mulia.
            </p>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-green-200 hover:text-yellow-400">Profil Madrasah</a></li>
              <li><a href="#" className="text-green-200 hover:text-yellow-400">Visi & Misi</a></li>
              <li><a href="#" className="text-green-200 hover:text-yellow-400">Berita Terkini</a></li>
              <li><a href="#" className="text-green-200 hover:text-yellow-400">PPDB Online</a></li>
              <li><a href="#" className="text-green-200 hover:text-yellow-400">Galeri Foto</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Program Unggulan</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-green-200">Tahfidz Qur'an</li>
              <li className="text-green-200">Bahasa Arab & Inggris</li>
              <li className="text-green-200">Sains & Teknologi</li>
              <li className="text-green-200">Ekstrakurikuler</li>
              <li className="text-green-200">Bimbingan Konseling</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-yellow-400" />
                <span className="text-green-200">
                  Jl. Pendidikan No. 123<br />
                  Jakarta Selatan 12345
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-green-200">(021) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-green-200">info@madrasah.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-1 text-yellow-400" />
                <span className="text-green-200">
                  Senin - Jumat: 07:00 - 16:00<br />
                  Sabtu: 07:00 - 12:00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-green-300">
            <p>&copy; 2024 Madrasah Al-Hikmah. Semua hak cipta dilindungi.</p>
            <p>Dibuat dengan ❤️ untuk pendidikan Islam yang berkualitas</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;