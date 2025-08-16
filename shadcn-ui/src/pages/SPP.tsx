import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  Search,
  Download,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Payment } from '@/types';

const SPP: React.FC = () => {
  const { user } = useAuth();
  const [searchNisn, setSearchNisn] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Mock payment data
  const payments: Payment[] = [
    {
      id: '1',
      studentId: '3',
      studentName: 'Fatimah Zahra',
      month: 'Januari',
      year: '2024',
      amount: 350000,
      status: 'lunas',
      dueDate: '2024-01-10'
    },
    {
      id: '2',
      studentId: '3',
      studentName: 'Fatimah Zahra',
      month: 'Februari',
      year: '2024',
      amount: 350000,
      status: 'lunas',
      dueDate: '2024-02-10'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Fatimah Zahra',
      month: 'Maret',
      year: '2024',
      amount: 350000,
      status: 'belum_lunas',
      dueDate: '2024-03-10'
    },
    {
      id: '4',
      studentId: '1',
      studentName: 'Ahmad Fauzi',
      month: 'Januari',
      year: '2024',
      amount: 350000,
      status: 'lunas',
      dueDate: '2024-01-10'
    },
    {
      id: '5',
      studentId: '1',
      studentName: 'Ahmad Fauzi',
      month: 'Februari',
      year: '2024',
      amount: 350000,
      status: 'belum_lunas',
      dueDate: '2024-02-10'
    }
  ];

  const currentStudentPayments = user?.role === 'siswa' 
    ? payments.filter(p => p.studentId === user.id)
    : selectedStudent 
      ? payments.filter(p => p.studentId === selectedStudent)
      : [];

  const getStatusColor = (status: Payment['status']) => {
    return status === 'lunas' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (status: Payment['status']) => {
    return status === 'lunas' 
      ? <CheckCircle className="w-4 h-4" />
      : <XCircle className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const totalPaid = currentStudentPayments
    .filter(p => p.status === 'lunas')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalUnpaid = currentStudentPayments
    .filter(p => p.status === 'belum_lunas')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleSearch = () => {
    // Mock search - in real app would query database
    if (searchNisn === '1234567890') {
      setSelectedStudent('1');
    } else if (searchNisn === '1234567892') {
      setSelectedStudent('3');
    } else {
      alert('NISN tidak ditemukan');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Status Pembayaran SPP</h1>
          <p className="text-gray-600">Pantau status pembayaran SPP siswa</p>
        </div>

        {/* Search for Admin/Guru */}
        {user && user.role !== 'siswa' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-green-700">Cari Data Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Masukkan NISN siswa..."
                    value={searchNisn}
                    onChange={(e) => setSearchNisn(e.target.value)}
                  />
                </div>
                <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>Demo NISN:</strong> 1234567890 (Ahmad Fauzi) atau 1234567892 (Fatimah Zahra)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Payment Summary */}
        {currentStudentPayments.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tagihan</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(totalPaid + totalUnpaid)}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-500">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sudah Dibayar</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(totalPaid)}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-green-500">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Belum Dibayar</p>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(totalUnpaid)}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-red-500">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <p className="text-lg font-bold text-gray-900">
                        {totalUnpaid > 0 ? 'Ada Tunggakan' : 'Lunas'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${totalUnpaid > 0 ? 'bg-yellow-500' : 'bg-green-500'}`}>
                      {totalUnpaid > 0 ? (
                        <Clock className="w-6 h-6 text-white" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">
                  Riwayat Pembayaran - {currentStudentPayments[0]?.studentName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentStudentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          payment.status === 'lunas' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {getStatusIcon(payment.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            SPP {payment.month} {payment.year}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Jatuh tempo: {new Date(payment.dueDate).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            {formatCurrency(payment.amount)}
                          </p>
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1">
                              {payment.status === 'lunas' ? 'Lunas' : 'Belum Lunas'}
                            </span>
                          </Badge>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Detail
                          </Button>
                          {payment.status === 'lunas' && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Kwitansi
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Instructions */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-green-700">Informasi Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Metode Pembayaran</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Transfer Bank BRI: 1234-5678-9012-3456</li>
                      <li>• Transfer Bank Mandiri: 987-654-321-012</li>
                      <li>• Bayar langsung di kantor madrasah</li>
                      <li>• E-wallet: GoPay, OVO, DANA</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Ketentuan Pembayaran</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• SPP dibayar setiap tanggal 1-10 setiap bulan</li>
                      <li>• Denda keterlambatan Rp 25.000/bulan</li>
                      <li>• Konfirmasi pembayaran ke WhatsApp: 081234567890</li>
                      <li>• Kwitansi dapat diunduh setelah pembayaran dikonfirmasi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* No Data State */}
        {currentStudentPayments.length === 0 && user && (
          <Card>
            <CardContent className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {user.role === 'siswa' 
                  ? 'Data pembayaran tidak ditemukan'
                  : 'Silakan cari data siswa menggunakan NISN'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SPP;