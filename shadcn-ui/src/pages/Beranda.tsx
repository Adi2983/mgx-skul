import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  Trophy, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  FileText,
  Image,
  Video
} from 'lucide-react';

interface BerandaProps {
  onNavigate: (page: string) => void;
}

const Beranda: React.FC<BerandaProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&h=600&fit=crop',
      title: 'Selamat Datang di Madrasah Al-Hikmah',
      subtitle: 'Mencerdaskan Generasi Islami dengan Pendidikan Berkualitas'
    },
    {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop',
      title: 'Pendidikan Islam Modern',
      subtitle: 'Memadukan Kurikulum Nasional dan Kurikulum Pesantren'
    },
    {
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=600&fit=crop',
      title: 'Fasilitas Lengkap dan Modern',
      subtitle: 'Mendukung Proses Pembelajaran yang Optimal'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Penerimaan Siswa Baru Tahun Ajaran 2024/2025',
      content: 'Pendaftaran PPDB Online telah dibuka. Segera daftarkan putra-putri Anda.',
      date: '2024-01-15',
      category: 'PPDB'
    },
    {
      id: 2,
      title: 'Libur Semester Genap',
      content: 'Libur semester genap dimulai tanggal 20 Juni - 15 Juli 2024.',
      date: '2024-01-10',
      category: 'Akademik'
    },
    {
      id: 3,
      title: 'Pelatihan Tahfidz Qur\'an',
      content: 'Pelatihan intensif tahfidz Qur\'an untuk siswa kelas 4-6.',
      date: '2024-01-08',
      category: 'Kegiatan'
    }
  ];

  const stats = [
    { icon: Users, label: 'Total Siswa', value: '1,245', color: 'bg-blue-500' },
    { icon: GraduationCap, label: 'Guru & Staff', value: '87', color: 'bg-green-500' },
    { icon: Trophy, label: 'Prestasi', value: '156', color: 'bg-yellow-500' },
    { icon: BookOpen, label: 'Program Studi', value: '12', color: 'bg-purple-500' }
  ];

  const quickMenus = [
    { icon: Calendar, label: 'Agenda', page: 'agenda', color: 'bg-blue-600' },
    { icon: FileText, label: 'Berita', page: 'berita', color: 'bg-green-600' },
    { icon: Image, label: 'Galeri', page: 'galeri', color: 'bg-purple-600' },
    { icon: Video, label: 'Video', page: 'video', color: 'bg-red-600' },
    { icon: Users, label: 'PPDB', page: 'ppdb', color: 'bg-orange-600' },
    { icon: BookOpen, label: 'Download', page: 'download', color: 'bg-indigo-600' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg md:text-xl text-green-200">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Menu */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-green-700">Menu Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {quickMenus.map((menu, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => onNavigate(menu.page)}
                  className="flex flex-col items-center space-y-2 h-auto p-4 hover:bg-gray-100"
                >
                  <div className={`w-10 h-10 ${menu.color} rounded-lg flex items-center justify-center`}>
                    <menu.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-gray-700">{menu.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Pengumuman Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border-l-4 border-green-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                        <Badge variant="outline">{announcement.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                      <p className="text-xs text-gray-500">{announcement.date}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('berita')}
                  className="w-full mt-4"
                >
                  Lihat Semua Berita
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vision Mission Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Visi & Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">VISI</h4>
                    <p className="text-xs text-gray-600">
                      Menjadi lembaga pendidikan Islam terdepan yang menghasilkan generasi beriman, berilmu, dan berakhlak mulia.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">MISI</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Menyelenggarakan pendidikan Islam berkualitas</li>
                      <li>• Mengembangkan potensi siswa secara optimal</li>
                      <li>• Membentuk karakter Islami yang kuat</li>
                    </ul>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onNavigate('profil')}
                  className="w-full mt-4"
                >
                  Selengkapnya
                </Button>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Kontak Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Telepon:</strong> (021) 1234-5678</p>
                  <p><strong>Email:</strong> info@madrasah.com</p>
                  <p><strong>Alamat:</strong> Jl. Pendidikan No. 123, Jakarta</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;