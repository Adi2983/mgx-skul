import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Download as DownloadIcon, 
  FileText, 
  File, 
  Plus, 
  Search, 
  Calendar,
  Upload,
  Trash2,
  Edit
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DownloadFile } from '@/types';

const Download: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock download files data
  const [files, setFiles] = useState<DownloadFile[]>([
    {
      id: '1',
      title: 'Formulir Pendaftaran PPDB 2024',
      description: 'Formulir pendaftaran siswa baru untuk tahun ajaran 2024/2025',
      filename: 'formulir-ppdb-2024.pdf',
      fileUrl: '/downloads/formulir-ppdb-2024.pdf',
      category: 'PPDB',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Kalender Akademik 2024/2025',
      description: 'Kalender akademik lengkap untuk tahun ajaran 2024/2025',
      filename: 'kalender-akademik-2024.pdf',
      fileUrl: '/downloads/kalender-akademik-2024.pdf',
      category: 'Akademik',
      uploadDate: '2024-01-12'
    },
    {
      id: '3',
      title: 'Panduan Orang Tua',
      description: 'Panduan lengkap untuk orang tua siswa baru',
      filename: 'panduan-orangtua.pdf',
      fileUrl: '/downloads/panduan-orangtua.pdf',
      category: 'Panduan',
      uploadDate: '2024-01-10'
    },
    {
      id: '4',
      title: 'Tata Tertib Siswa',
      description: 'Peraturan dan tata tertib untuk seluruh siswa madrasah',
      filename: 'tata-tertib-siswa.pdf',
      fileUrl: '/downloads/tata-tertib-siswa.pdf',
      category: 'Peraturan',
      uploadDate: '2024-01-08'
    },
    {
      id: '5',
      title: 'Silabus Kurikulum 2024',
      description: 'Silabus lengkap untuk semua mata pelajaran',
      filename: 'silabus-kurikulum-2024.pdf',
      fileUrl: '/downloads/silabus-kurikulum-2024.pdf',
      category: 'Akademik',
      uploadDate: '2024-01-05'
    },
    {
      id: '6',
      title: 'Formulir Beasiswa',
      description: 'Formulir permohonan beasiswa untuk siswa berprestasi',
      filename: 'formulir-beasiswa.docx',
      fileUrl: '/downloads/formulir-beasiswa.docx',
      category: 'Beasiswa',
      uploadDate: '2024-01-03'
    }
  ]);

  const categories = ['PPDB', 'Akademik', 'Panduan', 'Peraturan', 'Beasiswa', 'Formulir'];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (file: DownloadFile) => {
    // Mock download
    alert(`Mengunduh file: ${file.filename}`);
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-600" />;
      case 'docx':
      case 'doc':
        return <File className="w-8 h-8 text-blue-600" />;
      default:
        return <File className="w-8 h-8 text-gray-600" />;
    }
  };

  const formatFileSize = (filename: string) => {
    // Mock file sizes
    const sizes = ['1.2 MB', '856 KB', '2.1 MB', '743 KB', '1.8 MB', '654 KB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">Download Center</h1>
            <p className="text-gray-600">Unduh dokumen dan formulir penting</p>
          </div>
          
          {user && user.role === 'admin' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload File Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fileTitle">Judul File</Label>
                    <Input id="fileTitle" placeholder="Masukkan judul file" />
                  </div>
                  <div>
                    <Label htmlFor="fileDescription">Deskripsi</Label>
                    <Input id="fileDescription" placeholder="Deskripsi file" />
                  </div>
                  <div>
                    <Label htmlFor="fileCategory">Kategori</Label>
                    <select className="w-full p-2 border rounded-md">
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="fileUpload">File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Klik untuk upload atau drag & drop</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Upload
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
                  placeholder="Cari file..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.filename)}
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        {file.category}
                      </Badge>
                    </div>
                  </div>
                  {user && user.role === 'admin' && (
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {file.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {file.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(file.uploadDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <span>{formatFileSize(file.filename)}</span>
                </div>

                <Button
                  onClick={() => handleDownload(file)}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada file yang ditemukan</p>
            </CardContent>
          </Card>
        )}

        {/* Download Statistics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-green-700">Statistik Download</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">156</div>
                <div className="text-sm text-gray-600">Total File</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">2,847</div>
                <div className="text-sm text-gray-600">Total Download</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">89</div>
                <div className="text-sm text-gray-600">Download Hari Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">23</div>
                <div className="text-sm text-gray-600">File Terpopuler</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Download;