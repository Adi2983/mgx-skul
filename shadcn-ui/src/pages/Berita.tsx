import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, User, Tag, Plus, Edit, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { News } from '@/types';

const Berita: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  // Mock news data
  const [newsList, setNewsList] = useState<News[]>([
    {
      id: '1',
      title: 'Penerimaan Siswa Baru Tahun Ajaran 2024/2025 Telah Dibuka',
      content: 'Madrasah Al-Hikmah dengan bangga mengumumkan pembukaan pendaftaran siswa baru untuk tahun ajaran 2024/2025. Pendaftaran dapat dilakukan secara online melalui website resmi madrasah. Kuota terbatas untuk 120 siswa baru dengan berbagai program unggulan.',
      category: 'PPDB',
      author: 'Admin Madrasah',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Prestasi Gemilang Siswa Al-Hikmah di Olimpiade Sains',
      content: 'Siswa Madrasah Al-Hikmah berhasil meraih juara 1 dalam Olimpiade Sains Nasional bidang Matematika. Ahmad Fauzi dari kelas IX A berhasil mengalahkan ratusan peserta dari seluruh Indonesia. Prestasi ini merupakan yang ketiga kalinya Al-Hikmah meraih juara nasional.',
      category: 'Prestasi',
      author: 'Humas Madrasah',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'Program Tahfidz Qur\'an Raih Penghargaan Terbaik',
      content: 'Program Tahfidz Qur\'an Madrasah Al-Hikmah meraih penghargaan sebagai program terbaik tingkat provinsi. Saat ini tercatat 85% siswa telah menghafal minimal 5 juz Al-Qur\'an dengan kualitas bacaan yang sangat baik.',
      category: 'Kegiatan',
      author: 'Koordinator Tahfidz',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&h=300&fit=crop'
    },
    {
      id: '4',
      title: 'Peningkatan Fasilitas Laboratorium Komputer',
      content: 'Madrasah Al-Hikmah melakukan upgrade fasilitas laboratorium komputer dengan 30 unit PC terbaru dan jaringan internet berkecepatan tinggi. Fasilitas ini akan mendukung pembelajaran teknologi informasi yang lebih optimal.',
      category: 'Fasilitas',
      author: 'Kepala Madrasah',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop'
    }
  ]);

  const [newNews, setNewNews] = useState<Partial<News>>({
    title: '',
    content: '',
    category: '',
    author: user?.name || '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['PPDB', 'Prestasi', 'Kegiatan', 'Fasilitas', 'Akademik', 'Pengumuman'];

  const filteredNews = newsList.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveNews = () => {
    if (editingNews) {
      // Update existing news
      setNewsList(prev => prev.map(news => 
        news.id === editingNews.id 
          ? { ...news, ...newNews, id: editingNews.id }
          : news
      ));
    } else {
      // Add new news
      const news: News = {
        ...newNews as News,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0]
      };
      setNewsList(prev => [news, ...prev]);
    }
    
    setNewNews({
      title: '',
      content: '',
      category: '',
      author: user?.name || '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingNews(null);
    setIsDialogOpen(false);
  };

  const handleEditNews = (news: News) => {
    setEditingNews(news);
    setNewNews(news);
    setIsDialogOpen(true);
  };

  const handleDeleteNews = (id: string) => {
    setNewsList(prev => prev.filter(news => news.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">Berita & Pengumuman</h1>
            <p className="text-gray-600">Informasi terkini dari Madrasah Al-Hikmah</p>
          </div>
          
          {user && user.role === 'admin' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Berita
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Berita</Label>
                    <Input
                      id="title"
                      value={newNews.title}
                      onChange={(e) => setNewNews(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Masukkan judul berita"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={newNews.category}
                      onValueChange={(value) => setNewNews(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="content">Isi Berita</Label>
                    <Textarea
                      id="content"
                      value={newNews.content}
                      onChange={(e) => setNewNews(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Tulis isi berita..."
                      rows={6}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleSaveNews} className="bg-green-600 hover:bg-green-700">
                      {editingNews ? 'Update' : 'Simpan'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* News List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((news) => (
            <Card key={news.id} className="overflow-hidden">
              {news.image && (
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }} />
              )}
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{news.category}</Badge>
                  {user && user.role === 'admin' && (
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditNews(news)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNews(news.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{news.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{news.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Tidak ada berita yang ditemukan</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Berita;