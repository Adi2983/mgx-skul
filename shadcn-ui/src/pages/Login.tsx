import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { User, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      onNavigate('dashboard');
    } else {
      setError('Email atau password salah. Gunakan password: password123');
    }
    
    setIsLoading(false);
  };

  const demoAccounts = [
    { email: 'admin@madrasah.com', role: 'Admin', desc: 'Akses penuh sistem' },
    { email: 'ahmad@madrasah.com', role: 'Guru', desc: 'Kelola absensi & nilai' },
    { email: 'fatimah@student.com', role: 'Siswa', desc: 'Cek absensi & SPP' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <CardTitle className="text-2xl text-green-700">Login Madrasah Al-Hikmah</CardTitle>
            <p className="text-gray-600">Masuk ke sistem informasi madrasah</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? 'Masuk...' : 'Masuk'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <Button variant="link" className="p-0 h-auto text-green-600">
                  Hubungi Administrator
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Akun Demo</CardTitle>
            <p className="text-gray-600">Gunakan akun berikut untuk mencoba sistem</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoAccounts.map((account, index) => (
                <div 
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('password123');
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{account.email}</p>
                      <p className="text-sm text-green-600 font-medium">{account.role}</p>
                      <p className="text-xs text-gray-500">{account.desc}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Gunakan
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Password untuk semua akun:</strong> password123
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('beranda')}
                className="w-full"
              >
                Kembali ke Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;