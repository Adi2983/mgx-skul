import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';

interface Position {
  id: string;
  name: string;
  position: string;
  department?: string;
  phone?: string;
  email?: string;
  subordinates?: Position[];
  expanded?: boolean;
}

const Struktur: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1']));

  const structureData: Position = {
    id: '1',
    name: 'KH. Abdul Rahman, M.Pd.I',
    position: 'Ketua Yayasan',
    phone: '081234567890',
    email: 'ketua@madrasah.com',
    subordinates: [
      {
        id: '2',
        name: 'Dr. Ahmad Fauzi, M.Pd',
        position: 'Kepala Madrasah',
        phone: '081234567891',
        email: 'kepsek@madrasah.com',
        subordinates: [
          {
            id: '3',
            name: 'Ustadzah Siti Fatimah, S.Pd.I',
            position: 'Wakil Kepala Kurikulum',
            department: 'Kurikulum',
            phone: '081234567892',
            email: 'kurikulum@madrasah.com'
          },
          {
            id: '4',
            name: 'Ustadz Muhammad Ali, S.Pd',
            position: 'Wakil Kepala Kesiswaan',
            department: 'Kesiswaan',
            phone: '081234567893',
            email: 'kesiswaan@madrasah.com'
          },
          {
            id: '5',
            name: 'Bapak Hasan Basri, S.E',
            position: 'Kepala Tata Usaha',
            department: 'Administrasi',
            phone: '081234567894',
            email: 'tu@madrasah.com',
            subordinates: [
              {
                id: '6',
                name: 'Ibu Aminah, S.Kom',
                position: 'Staff IT',
                department: 'Teknologi Informasi'
              },
              {
                id: '7',
                name: 'Bapak Umar, S.Pd',
                position: 'Staff Keuangan',
                department: 'Keuangan'
              }
            ]
          }
        ]
      }
    ]
  };

  const teachers = [
    { name: 'Ustadz Abdullah, S.Pd.I', subject: 'Aqidah Akhlak', class: 'VII A, VIII A' },
    { name: 'Ustadzah Khadijah, S.Pd', subject: 'Bahasa Indonesia', class: 'VII B, VIII B' },
    { name: 'Bapak Yusuf, S.Si', subject: 'Matematika', class: 'VII C, VIII C' },
    { name: 'Ibu Maryam, S.Pd', subject: 'Bahasa Inggris', class: 'IX A, IX B' },
    { name: 'Ustadz Hamzah, S.Pd.I', subject: 'Fiqih', class: 'VII A, VII B' },
    { name: 'Bapak Sulaiman, S.Pd', subject: 'IPA Terpadu', class: 'VIII A, VIII B' },
    { name: 'Ibu Aisyah, S.Pd', subject: 'IPS Terpadu', class: 'IX A, IX B' },
    { name: 'Ustadz Bilal, S.Pd.I', subject: 'Tahfidz Qur\'an', class: 'VII, VIII, IX' }
  ];

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderStructureNode = (node: Position, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasSubordinates = node.subordinates && node.subordinates.length > 0;

    return (
      <div key={node.id} className={`ml-${level * 6}`}>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {hasSubordinates && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNode(node.id)}
                    className="p-1"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                )}
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{node.name}</h3>
                  <p className="text-sm text-green-600">{node.position}</p>
                  {node.department && (
                    <Badge variant="outline" className="text-xs mt-1">
                      {node.department}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {node.phone && (
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                )}
                {node.email && (
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {hasSubordinates && isExpanded && (
          <div className="ml-6 border-l-2 border-gray-200 pl-4">
            {node.subordinates?.map((subordinate) =>
              renderStructureNode(subordinate, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Struktur Organisasi</h1>
          <p className="text-gray-600">Struktur organisasi dan kepemimpinan Madrasah Al-Hikmah</p>
        </div>

        {/* Organizational Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-700">Struktur Kepemimpinan</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStructureNode(structureData)}
          </CardContent>
        </Card>

        {/* Teachers List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Daftar Guru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachers.map((teacher, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{teacher.name}</h3>
                      <p className="text-sm text-blue-600">{teacher.subject}</p>
                      <p className="text-xs text-gray-500">Kelas: {teacher.class}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Struktur;