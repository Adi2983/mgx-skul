import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Calendar, Tag } from 'lucide-react';
import { GalleryItem } from '@/types';

const Galeri: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Mock gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Upacara Kemerdekaan RI ke-79',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop',
      category: 'Kegiatan',
      date: '2024-08-17'
    },
    {
      id: '2',
      title: 'Lomba Tahfidz Qur\'an Tingkat Provinsi',
      imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&h=600&fit=crop',
      category: 'Prestasi',
      date: '2024-07-15'
    },
    {
      id: '3',
      title: 'Kegiatan Belajar Mengajar di Kelas',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      category: 'Akademik',
      date: '2024-06-20'
    },
    {
      id: '4',
      title: 'Laboratorium Komputer Baru',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      category: 'Fasilitas',
      date: '2024-06-10'
    },
    {
      id: '5',
      title: 'Wisuda Tahfidz Al-Qur\'an',
      imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop',
      category: 'Prestasi',
      date: '2024-05-25'
    },
    {
      id: '6',
      title: 'Perpustakaan Madrasah',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      category: 'Fasilitas',
      date: '2024-05-15'
    },
    {
      id: '7',
      title: 'Pelatihan Guru dan Staff',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      category: 'Kegiatan',
      date: '2024-04-30'
    },
    {
      id: '8',
      title: 'Olimpiade Matematika Nasional',
      imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop',
      category: 'Prestasi',
      date: '2024-04-20'
    },
    {
      id: '9',
      title: 'Masjid Madrasah Al-Hikmah',
      imageUrl: 'https://images.unsplash.com/photo-1564769662394-4f07c3044c00?w=800&h=600&fit=crop',
      category: 'Fasilitas',
      date: '2024-04-10'
    }
  ];

  const categories = ['Kegiatan', 'Prestasi', 'Akademik', 'Fasilitas'];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setCurrentSlideIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const navigateSlide = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : filteredItems.length - 1;
      setCurrentSlideIndex(newIndex);
      setSelectedImage(filteredItems[newIndex]);
    } else {
      const newIndex = currentSlideIndex < filteredItems.length - 1 ? currentSlideIndex + 1 : 0;
      setCurrentSlideIndex(newIndex);
      setSelectedImage(filteredItems[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Galeri Foto</h1>
          <p className="text-gray-600">Dokumentasi kegiatan dan fasilitas Madrasah Al-Hikmah</p>
        </div>

        {/* Category Filter */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="rounded-full"
              >
                Semua
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div 
                className="relative aspect-square overflow-hidden"
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Tidak ada foto dalam kategori ini</p>
            </CardContent>
          </Card>
        )}

        {/* Lightbox Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
            {selectedImage && (
              <div className="relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/20 text-white hover:bg-black/40"
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Navigation Buttons */}
                {filteredItems.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateSlide('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 text-white hover:bg-black/40"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateSlide('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 text-white hover:bg-black/40"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </>
                )}

                {/* Image */}
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(selectedImage.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <Badge variant="secondary">
                        {selectedImage.category}
                      </Badge>
                    </div>
                    {filteredItems.length > 1 && (
                      <span className="text-sm">
                        {currentSlideIndex + 1} / {filteredItems.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Galeri;