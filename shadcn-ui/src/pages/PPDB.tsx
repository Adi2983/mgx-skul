import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Upload, 
  Download, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Student } from '@/types';

const PPDB: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    name: '',
    nisn: '',
    birthPlace: '',
    birthDate: '',
    gender: '',
    religion: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    previousSchool: '',
    documents: [] as string[]
  });

  // Mock student applications data
  const [applications, setApplications] = useState<Student[]>([
    {
      id: '1',
      name: 'Ahmad Fauzi',
      nisn: '1234567890',
      class: 'VII A',
      parentName: 'Bapak Sulaiman',
      phone: '081234567890',
      address: 'Jl. Pendidikan No. 45, Jakarta',
      status: 'verified',
      documents: ['ktp.pdf', 'kk.pdf', 'ijazah.pdf', '/images/photo.jpg']
    },
    {
      id: '2',
      name: 'Siti Aisyah',
      nisn: '1234567891',
      class: 'VII B',
      parentName: 'Ibu Khadijah',
      phone: '081234567891',
      address: 'Jl. Merdeka No. 12, Jakarta',
      status: 'pending',
      documents: ['ktp.pdf', 'kk.pdf', 'ijazah.pdf']
    },
    {
      id: '3',
      name: 'Muhammad Yusuf',
      nisn: '1234567892',
      class: 'VII C',
      parentName: 'Bapak Abdullah',
      phone: '081234567892',
      address: 'Jl. Masjid No. 78, Jakarta',
      status: 'rejected',
      documents: ['ktp.pdf', 'kk.pdf']
    }
  ]);

  const requirements = [
    'Fotokopi Kartu Keluarga (KK)',
    'Fotokopi Akta Kelahiran',
    'Fotokopi Ijazah SD/MI atau Surat Keterangan Lulus',
    'Pas Foto 3x4 (3 lembar)',
    'Fotokopi KTP Orang Tua',
    'Surat Keterangan Tidak Mampu (jika ada)'
  ];

  const schedule = [
    { phase: 'Pendaftaran', date: '1 Januari - 28 Februari 2024', status: 'active' },
    { phase: 'Seleksi Berkas', date: '1 - 15 Maret 2024', status: 'upcoming' },
    { phase: 'Tes Masuk', date: '20 - 25 Maret 2024', status: 'upcoming' },
    { phase: 'Pengumuman', date: '1 April 2024', status: 'upcoming' },
    { phase: 'Daftar Ulang', date: '5 - 15 April 2024', status: 'upcoming' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (fileType: string) => {
    // Mock file upload
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, `${fileType}.pdf`]
    }));
  };

  const handleSubmitApplication = () => {
    // Mock submission
    const newApplication: Student = {
      id: Date.now().toString(),
      name: formData.name,
      nisn: formData.nisn,
      class: 'VII',
      parentName: formData.parentName,
      phone: formData.parentPhone,
      address: formData.address,
      status: 'pending',
      documents: formData.documents
    };
    
    setApplications(prev => [newApplication, ...prev]);
    alert('Pendaftaran berhasil dikirim!');
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">PPDB Online</h1>
          <p className="text-gray-600">Penerimaan Peserta Didik Baru Tahun Ajaran 2024/2025</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Informasi</TabsTrigger>
            <TabsTrigger value="register">Pendaftaran</TabsTrigger>
            <TabsTrigger value="status">Cek Status</TabsTrigger>
            {user && user.role === 'admin' && (
              <TabsTrigger value="admin">Admin</TabsTrigger>
            )}
          </TabsList>

          {/* Information Tab */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Persyaratan Pendaftaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Jadwal PPDB</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{item.phase}</h4>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                        <Badge variant={item.status === 'active' ? 'default' : 'outline'}>
                          {item.status === 'active' ? 'Aktif' : 'Mendatang'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Telepon</p>
                      <p className="text-sm text-gray-600">(021) 1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">ppdb@madrasah.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Alamat</p>
                      <p className="text-sm text-gray-600">Jl. Pendidikan No. 123, Jakarta</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Jam Layanan</p>
                      <p className="text-sm text-gray-600">08:00 - 16:00 WIB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registration Tab */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Formulir Pendaftaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Data */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Data Siswa</h3>
                    
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>

                    <div>
                      <Label htmlFor="nisn">NISN</Label>
                      <Input
                        id="nisn"
                        value={formData.nisn}
                        onChange={(e) => handleInputChange('nisn', e.target.value)}
                        placeholder="Nomor Induk Siswa Nasional"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="birthPlace">Tempat Lahir</Label>
                        <Input
                          id="birthPlace"
                          value={formData.birthPlace}
                          onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                          placeholder="Tempat lahir"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Tanggal Lahir</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gender">Jenis Kelamin</Label>
                        <Select onValueChange={(value) => handleInputChange('gender', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="L">Laki-laki</SelectItem>
                            <SelectItem value="P">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="religion">Agama</Label>
                        <Select onValueChange={(value) => handleInputChange('religion', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih agama" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Islam">Islam</SelectItem>
                            <SelectItem value="Kristen">Kristen</SelectItem>
                            <SelectItem value="Katolik">Katolik</SelectItem>
                            <SelectItem value="Hindu">Hindu</SelectItem>
                            <SelectItem value="Buddha">Buddha</SelectItem>
                            <SelectItem value="Konghucu">Konghucu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Alamat</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Alamat lengkap"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Parent Data & Documents */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Data Orang Tua</h3>
                    
                    <div>
                      <Label htmlFor="parentName">Nama Orang Tua</Label>
                      <Input
                        id="parentName"
                        value={formData.parentName}
                        onChange={(e) => handleInputChange('parentName', e.target.value)}
                        placeholder="Nama lengkap orang tua"
                      />
                    </div>

                    <div>
                      <Label htmlFor="parentPhone">No. Telepon</Label>
                      <Input
                        id="parentPhone"
                        value={formData.parentPhone}
                        onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                        placeholder="Nomor telepon aktif"
                      />
                    </div>

                    <div>
                      <Label htmlFor="parentEmail">Email</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={formData.parentEmail}
                        onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                        placeholder="Email aktif"
                      />
                    </div>

                    <div>
                      <Label htmlFor="previousSchool">Sekolah Asal</Label>
                      <Input
                        id="previousSchool"
                        value={formData.previousSchool}
                        onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                        placeholder="Nama sekolah asal"
                      />
                    </div>

                    {/* Document Upload */}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Upload Dokumen</h4>
                      <div className="space-y-3">
                        {['KTP Orang Tua', 'Kartu Keluarga', 'Ijazah SD', 'Pas Foto'].map((doc) => (
                          <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="text-sm text-gray-700">{doc}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleFileUpload(doc.toLowerCase().replace(' ', '_'))}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleSubmitApplication}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Kirim Pendaftaran
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Check Tab */}
          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Cek Status Pendaftaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-md mx-auto space-y-4 mb-8">
                  <Input placeholder="Masukkan NISN" />
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Cek Status
                  </Button>
                </div>

                <Alert>
                  <AlertDescription>
                    Masukkan NISN yang telah didaftarkan untuk melihat status pendaftaran Anda.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Tab */}
          {user && user.role === 'admin' && (
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Kelola Pendaftaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((student) => (
                      <div key={student.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">{student.name}</h3>
                            <p className="text-sm text-gray-600">NISN: {student.nisn}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(student.status)}>
                              {getStatusIcon(student.status)}
                              <span className="ml-1">
                                {student.status === 'verified' ? 'Diterima' : 
                                 student.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                              </span>
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Orang Tua:</strong> {student.parentName}</p>
                            <p><strong>Telepon:</strong> {student.phone}</p>
                          </div>
                          <div>
                            <p><strong>Alamat:</strong> {student.address}</p>
                            <p><strong>Dokumen:</strong> {student.documents.length} file</p>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Lihat Detail
                          </Button>
                          <Button size="sm" variant="outline" className="text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Terima
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            Tolak
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default PPDB;