import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, Calendar, Eye, Youtube } from 'lucide-react';
import { Video as VideoType } from '@/types';

const Video: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  // Mock video data
  const videos: VideoType[] = [
    {
      id: '1',
      title: 'Profil Madrasah Al-Hikmah 2024',
      description: 'Video profil lengkap Madrasah Al-Hikmah yang menampilkan fasilitas, program unggulan, dan prestasi siswa.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Wisuda Tahfidz Qur\'an 2023',
      description: 'Momen bersejarah wisuda siswa yang telah menyelesaikan hafalan Al-Qur\'an dengan pencapaian luar biasa.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&h=400&fit=crop',
      date: '2024-01-10'
    },
    {
      id: '3',
      title: 'Kegiatan Belajar Mengajar Digital',
      description: 'Inovasi pembelajaran digital di Madrasah Al-Hikmah dengan teknologi terkini.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      date: '2024-01-08'
    },
    {
      id: '4',
      title: 'Prestasi Siswa di Olimpiade Sains',
      description: 'Dokumentasi perjalanan siswa Al-Hikmah meraih juara dalam Olimpiade Sains Nasional.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&h=400&fit=crop',
      date: '2024-01-05'
    },
    {
      id: '5',
      title: 'Fasilitas Laboratorium Sains',
      description: 'Tour virtual fasilitas laboratorium sains yang lengkap dan modern di madrasah.',
      url: '/videos/lab-tour.mp4',
      type: 'local',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
      date: '2024-01-03'
    },
    {
      id: '6',
      title: 'Kegiatan Ekstrakurikuler',
      description: 'Berbagai kegiatan ekstrakurikuler menarik yang mengembangkan bakat dan minat siswa.',
      url: '/videos/ekskul.mp4',
      type: 'local',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      date: '2024-01-01'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openVideoModal = (video: VideoType) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Video Gallery</h1>
          <p className="text-gray-600">Koleksi video kegiatan dan profil Madrasah Al-Hikmah</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div 
                  className="aspect-video bg-cover bg-center cursor-pointer relative overflow-hidden"
                  style={{ backgroundImage: `url(${video.thumbnail})` }}
                  onClick={() => openVideoModal(video)}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Video Type Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      {video.type === 'youtube' ? (
                        <><Youtube className="w-3 h-3 mr-1" /> YouTube</>
                      ) : (
                        'Local'
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{video.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(video.date)}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openVideoModal(video)}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Tonton
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
            {selectedVideo && (
              <div>
                {/* Video Player */}
                <div className="aspect-video">
                  {selectedVideo.type === 'youtube' ? (
                    <iframe
                      src={selectedVideo.url}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={selectedVideo.url}
                      controls
                      className="w-full h-full"
                      poster={selectedVideo.thumbnail}
                    >
                      Browser Anda tidak mendukung pemutar video.
                    </video>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedVideo.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(selectedVideo.date)}</span>
                      </div>
                      <Badge variant="outline">
                        {selectedVideo.type === 'youtube' ? 'YouTube' : 'Video Lokal'}
                      </Badge>
                    </div>
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

export default Video;