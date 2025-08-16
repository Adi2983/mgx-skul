import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  // Mock data based on user role
  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Total Siswa', value: '1,245', icon: Users, color: 'bg-blue-500' },
          { label: 'Total Guru', value: '87', icon: BookOpen, color: 'bg-green-500' },
          { label: 'Agenda Hari Ini', value: '5', icon: Calendar, color: 'bg-yellow-500' },
          { label: 'Berita Terbaru', value: '12', icon: FileText, color: 'bg-purple-500' }
        ];
      case 'guru':
        return [
          { label: 'Kelas Diampu', value: '3', icon: BookOpen, color: 'bg-blue-500' },
          { label: 'Total Siswa', value: '89', icon: Users, color: 'bg-green-500' },
          { label: 'Absensi Hari Ini', value: '2', icon: CheckCircle, color: 'bg-yellow-500' },
          { label: 'Tugas Pending', value: '7', icon: Clock, color: 'bg-red-500' }
        ];
      case 'siswa':
        return [
          { label: 'Absensi Bulan Ini', value: '18/20', icon: CheckCircle, color: 'bg-green-500' },
          { label: 'SPP Status', value: 'Lunas', icon: TrendingUp, color: 'bg-blue-500' },
          { label: 'Tugas Pending', value: '3', icon: Clock, color: 'bg-yellow-500' },
          { label: 'Nilai Rata-rata', value: '85', icon: BarChart3, color: 'bg-purple-500' }
        ];
      default:
        return [];
    }
  };

  const getQuickActionsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Kelola Berita', page: 'berita', icon: FileText, color: 'bg-green-600' },
          { label: 'PPDB Admin', page: 'ppdb', icon: Users, color: 'bg-blue-600' },
          { label: 'Kelola Agenda', page: 'agenda', icon: Calendar, color: 'bg-yellow-600' },
          { label: 'Upload Files', page: 'download', icon: BookOpen, color: 'bg-purple-600' }
        ];
      case 'guru':
        return [
          { label: 'Input Absensi', page: 'absensi', icon: CheckCircle, color: 'bg-green-600' },
          { label: 'Kelola Nilai', page: 'nilai', icon: BarChart3, color: 'bg-blue-600' },
          { label: 'Agenda Kelas', page: 'agenda', icon: Calendar, color: 'bg-yellow-600' },
          { label: 'Materi Pelajaran', page: 'materi', icon: BookOpen, color: 'bg-purple-600' }
        ];
      case 'siswa':
        return [
          { label: 'Cek Absensi', page: 'absensi', icon: CheckCircle, color: 'bg-green-600' },
          { label: 'Cek SPP', page: 'spp', icon: TrendingUp, color: 'bg-blue-600' },
          { label: 'Lihat Nilai', page: 'nilai', icon: BarChart3, color: 'bg-yellow-600' },
          { label: 'Download Materi', page: 'download', icon: BookOpen, color: 'bg-purple-600' }
        ];
      default:
        return [];
    }
  };

  const getRecentActivities = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { activity: 'Mengupdate berita "Prestasi Siswa OSN"', time: '2 jam lalu', type: 'success' },
          { activity: 'Menerima pendaftaran PPDB baru', time: '4 jam lalu', type: 'info' },
          { activity: 'Mengupload dokumen kurikulum', time: '1 hari lalu', type: 'success' },
          { activity: 'Backup data sistem', time: '2 hari lalu', type: 'warning' }
        ];
      case 'guru':
        return [
          { activity: 'Input absensi kelas VII A', time: '1 jam lalu', type: 'success' },
          { activity: 'Upload materi Matematika', time: '3 jam lalu', type: 'info' },
          { activity: 'Menilai tugas siswa', time: '5 jam lalu', type: 'success' },
          { activity: 'Menghadiri rapat guru', time: '1 hari lalu', type: 'info' }
        ];
      case 'siswa':
        return [
          { activity: 'Mengerjakan tugas Matematika', time: '30 menit lalu', type: 'success' },
          { activity: 'Download materi IPA', time: '2 jam lalu', type: 'info' },
          { activity: 'Absensi kelas pagi', time: '4 jam lalu', type: 'success' },
          { activity: 'Pembayaran SPP Januari', time: '3 hari lalu', type: 'success' }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();
  const quickActions = getQuickActionsForRole();
  const recentActivities = getRecentActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            Dashboard {user?.role === 'admin' ? 'Admin' : user?.role === 'guru' ? 'Guru' : 'Siswa'}
          </h1>
          <p className="text-gray-600">
            Selamat datang, {user?.name}! 
            {user?.role === 'admin' && ' Kelola sistem madrasah dengan mudah.'}
            {user?.role === 'guru' && ' Pantau dan kelola pembelajaran Anda.'}
            {user?.role === 'siswa' && ' Lihat perkembangan belajar Anda.'}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => onNavigate(action.page)}
                      className="flex flex-col items-center space-y-2 h-auto p-4 hover:bg-gray-100"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-center text-gray-700">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Charts Section for Admin */}
            {user?.role === 'admin' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-green-700">Statistik Sistem</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Grafik Absensi Siswa</p>
                      </div>
                    </div>
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Distribusi Kelas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Activities */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{activity.activity}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-green-700">Agenda Mendatang</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Ujian Tengah Semester</p>
                      <p className="text-sm text-gray-600">25 Januari 2024</p>
                    </div>
                    <Badge variant="outline">Penting</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Rapat Guru</p>
                      <p className="text-sm text-gray-600">28 Januari 2024</p>
                    </div>
                    <Badge variant="outline">Rutin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Lomba Tahfidz</p>
                      <p className="text-sm text-gray-600">1 Februari 2024</p>
                    </div>
                    <Badge variant="outline">Kompetisi</Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('agenda')}
                  className="w-full mt-4"
                >
                  Lihat Semua Agenda
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;