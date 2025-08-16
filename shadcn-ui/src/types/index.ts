export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'guru' | 'siswa';
  avatar?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'harian' | 'bulanan' | 'triwulan' | 'tahunan';
}

export interface Student {
  id: string;
  name: string;
  nisn: string;
  class: string;
  parentName: string;
  phone: string;
  address: string;
  status: 'pending' | 'verified' | 'rejected';
  documents: string[];
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'hadir' | 'sakit' | 'izin' | 'alpa';
  subject?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  month: string;
  year: string;
  amount: number;
  status: 'lunas' | 'belum_lunas';
  dueDate: string;
}

export interface Survey {
  id: string;
  title: string;
  type: 'ikl' | 'ipk';
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'rating' | 'text';
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  responses: Record<string, number | string>;
  submittedAt: string;
}

export interface DownloadFile {
  id: string;
  title: string;
  description: string;
  filename: string;
  fileUrl: string;
  category: string;
  uploadDate: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'youtube' | 'local';
  thumbnail?: string;
  date: string;
}