import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const Agenda: React.FC = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'list'>('month');

  // Mock events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Upacara Bendera',
      description: 'Upacara bendera rutin setiap hari Senin',
      date: '2024-01-22',
      type: 'harian'
    },
    {
      id: '2',
      title: 'Ujian Tengah Semester',
      description: 'Pelaksanaan UTS untuk semua kelas',
      date: '2024-01-25',
      type: 'bulanan'
    },
    {
      id: '3',
      title: 'Pelatihan Guru',
      description: 'Workshop peningkatan kompetensi guru',
      date: '2024-01-28',
      type: 'bulanan'
    },
    {
      id: '4',
      title: 'Lomba Tahfidz Antar Kelas',
      description: 'Kompetisi hafalan Al-Qur\'an tingkat madrasah',
      date: '2024-02-01',
      type: 'triwulan'
    },
    {
      id: '5',
      title: 'Hari Raya Idul Fitri',
      description: 'Libur Hari Raya Idul Fitri',
      date: '2024-04-10',
      type: 'tahunan'
    },
    {
      id: '6',
      title: 'Wisuda Tahfidz',
      description: 'Wisuda siswa yang telah menyelesaikan hafalan',
      date: '2024-06-15',
      type: 'tahunan'
    }
  ];

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'harian': return 'bg-green-500';
      case 'bulanan': return 'bg-blue-500';
      case 'triwulan': return 'bg-yellow-500';
      case 'tahunan': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeBadgeColor = (type: Event['type']) => {
    switch (type) {
      case 'harian': return 'bg-green-100 text-green-800';
      case 'bulanan': return 'bg-blue-100 text-blue-800';
      case 'triwulan': return 'bg-yellow-100 text-yellow-800';
      case 'tahunan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">Agenda Kegiatan</h1>
            <p className="text-gray-600">Jadwal kegiatan dan agenda madrasah</p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={viewType === 'month' ? 'default' : 'outline'}
              onClick={() => setViewType('month')}
            >
              Kalender
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'outline'}
              onClick={() => setViewType('list')}
            >
              Daftar
            </Button>
            {user && user.role === 'admin' && (
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Agenda
              </Button>
            )}
          </div>
        </div>

        {viewType === 'month' ? (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-green-700">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Hari Ini
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day Headers */}
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center font-semibold text-gray-600 bg-gray-100">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {getDaysInMonth(currentDate).map((day, index) => {
                  const dayEvents = getEventsForDate(day.date);
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border ${
                        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                      } ${isToday ? 'ring-2 ring-green-500' : ''}`}
                    >
                      <div className={`text-sm font-medium ${
                        day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                      } ${isToday ? 'text-green-600' : ''}`}>
                        {day.date.getDate()}
                      </div>
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)} text-white`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} lainnya
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Keterangan Jenis Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Harian</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Bulanan</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Triwulan</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Tahunan</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            {events.map(event => (
              <Card key={event.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                        <Badge className={getEventTypeBadgeColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agenda;