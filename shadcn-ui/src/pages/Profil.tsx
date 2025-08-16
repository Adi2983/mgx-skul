import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, BookOpen, Award } from 'lucide-react';

const Profil: React.FC = () => {
  const achievements = [
    {
      year: '2023',
      title: 'Juara 1 Lomba Tahfidz Qur\'an Tingkat Provinsi',
      category: 'Prestasi Siswa'
    },
    {
      year: '2023',
      title: 'Sekolah Adiwiyata Tingkat Nasional',
      category: 'Prestasi Sekolah'
    },
    {
      year: '2022',
      title: 'Juara 2 Olimpiade Matematika Tingkat Kota',
      category: 'Prestasi Siswa'
    },
    {
      year: '2022',
      title: 'Akreditasi A dari BAN-S/M',
      category: 'Prestasi Sekolah'
    },
    {
      year: '2021',
      title: 'Juara 1 Lomba Kaligrafi Tingkat Provinsi',
      category: 'Prestasi Siswa'
    }
  ];

  const programs = [
    {
      icon: BookOpen,
      title: 'Program Tahfidz Qur\'an',
      description: 'Program hafalan Al-Qur\'an dengan target minimal 5 juz untuk siswa tingkat akhir'
    },
    {
      icon: Users,
      title: 'Pembelajaran Bahasa Arab & Inggris',
      description: 'Penguatan kemampuan bahasa asing sebagai bekal komunikasi global'
    },
    {
      icon: Award,
      title: 'Ekstrakurikuler Unggulan',
      description: 'Pramuka, Paskibra, Kaligrafi, Qasidah, dan berbagai klub sains'
    },
    {
      icon: Trophy,
      title: 'Pembinaan Prestasi',
      description: 'Pembinaan khusus untuk siswa berprestasi dalam berbagai bidang'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Profil Madrasah</h1>
          <p className="text-gray-600">Mengenal lebih dekat Madrasah Al-Hikmah</p>
        </div>

        {/* Sejarah */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-700">Sejarah Madrasah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Madrasah Al-Hikmah didirikan pada tahun 1985 oleh KH. Abdul Rahman dengan visi menciptakan 
                lembaga pendidikan Islam yang dapat memadukan antara ilmu agama dan ilmu umum. Berawal dari 
                sebuah mushalla kecil dengan 25 siswa, kini Al-Hikmah telah berkembang menjadi salah satu 
                madrasah terbaik di Indonesia.
              </p>
              <p className="text-gray-700 mb-4">
                Pada tahun 1995, madrasah mulai mengembangkan program tahfidz Al-Qur'an yang kini menjadi 
                program unggulan. Tahun 2005, Al-Hikmah meraih akreditasi A dan terus mempertahankan prestasi 
                hingga saat ini.
              </p>
              <p className="text-gray-700">
                Dengan semangat "Mencerdaskan Generasi Islami", Al-Hikmah terus berinovasi dalam 
                menghadirkan pendidikan berkualitas yang sesuai dengan perkembangan zaman tanpa 
                meninggalkan nilai-nilai Islam.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Visi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                "Menjadi lembaga pendidikan Islam terdepan yang menghasilkan generasi beriman, 
                berilmu, dan berakhlak mulia serta mampu berkompetisi di era global"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Menyelenggarakan pendidikan Islam yang berkualitas dan berkarakter
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Mengembangkan potensi siswa secara optimal dalam bidang akademik dan non-akademik
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Membentuk karakter Islami yang kuat dengan akhlak yang mulia
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Mempersiapkan siswa untuk melanjutkan pendidikan ke jenjang yang lebih tinggi
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Menciptakan lingkungan belajar yang kondusif dan Islami
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Program Unggulan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-700">Program Unggulan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prestasi */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Prestasi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border-l-4 border-green-500 bg-green-50">
                  <Badge variant="outline" className="bg-white">
                    {achievement.year}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-green-600">{achievement.category}</p>
                  </div>
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profil;