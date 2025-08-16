import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Users,
  Star,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const Survei: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ikl');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  // Mock survey data
  const surveys = {
    ikl: {
      title: 'Indeks Kepuasan Layanan (IKL)',
      description: 'Survey untuk mengukur tingkat kepuasan layanan pendidikan',
      questions: [
        {
          id: 'ikl_1',
          question: 'Bagaimana penilaian Anda terhadap kualitas mengajar guru?',
          type: 'rating' as const
        },
        {
          id: 'ikl_2', 
          question: 'Seberapa puas Anda dengan fasilitas pembelajaran?',
          type: 'rating' as const
        },
        {
          id: 'ikl_3',
          question: 'Bagaimana penilaian Anda terhadap pelayanan administrasi?',
          type: 'rating' as const
        },
        {
          id: 'ikl_4',
          question: 'Apakah Anda merasa komunikasi dengan sekolah sudah baik?',
          type: 'rating' as const
        },
        {
          id: 'ikl_5',
          question: 'Saran dan masukan untuk peningkatan layanan:',
          type: 'text' as const
        }
      ]
    },
    ipk: {
      title: 'Indeks Persepsi Korupsi (IPK)',
      description: 'Survey untuk mengukur persepsi terhadap transparansi dan akuntabilitas',
      questions: [
        {
          id: 'ipk_1',
          question: 'Apakah proses penerimaan siswa baru sudah transparan?',
          type: 'rating' as const
        },
        {
          id: 'ipk_2',
          question: 'Bagaimana transparansi pengelolaan keuangan sekolah?',
          type: 'rating' as const
        },
        {
          id: 'ipk_3',
          question: 'Apakah tidak ada praktik pungli dalam pelayanan?',
          type: 'rating' as const
        },
        {
          id: 'ipk_4',
          question: 'Seberapa mudah mengakses informasi sekolah?',
          type: 'rating' as const
        },
        {
          id: 'ipk_5',
          question: 'Masukan untuk peningkatan transparansi:',
          type: 'text' as const
        }
      ]
    }
  };

  // Mock survey results
  const surveyResults = {
    ikl: {
      averageScore: 4.2,
      totalResponses: 156,
      distribution: [
        { rating: 5, count: 45, percentage: 28.8 },
        { rating: 4, count: 62, percentage: 39.7 },
        { rating: 3, count: 31, percentage: 19.9 },
        { rating: 2, count: 12, percentage: 7.7 },
        { rating: 1, count: 6, percentage: 3.8 }
      ]
    },
    ipk: {
      averageScore: 4.5,
      totalResponses: 134,
      distribution: [
        { rating: 5, count: 67, percentage: 50.0 },
        { rating: 4, count: 43, percentage: 32.1 },
        { rating: 3, count: 18, percentage: 13.4 },
        { rating: 2, count: 4, percentage: 3.0 },
        { rating: 1, count: 2, percentage: 1.5 }
      ]
    }
  };

  const currentSurvey = surveys[activeTab as keyof typeof surveys];
  const currentResults = surveyResults[activeTab as keyof typeof surveyResults];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < currentSurvey.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setSurveyCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / currentSurvey.questions.length) * 100;

  const renderRatingInput = (questionId: string) => (
    <RadioGroup
      value={answers[questionId] || ''}
      onValueChange={(value) => handleAnswerChange(questionId, value)}
      className="flex justify-center space-x-4"
    >
      {[1, 2, 3, 4, 5].map((rating) => (
        <div key={rating} className="flex flex-col items-center space-y-2">
          <RadioGroupItem value={rating.toString()} id={`${questionId}_${rating}`} />
          <Label htmlFor={`${questionId}_${rating}`} className="text-sm">
            {rating}
          </Label>
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      ))}
    </RadioGroup>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Survei Kepuasan</h1>
          <p className="text-gray-600">Berikan penilaian Anda untuk meningkatkan kualitas layanan</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ikl">IKL Survey</TabsTrigger>
            <TabsTrigger value="ipk">IPK Survey</TabsTrigger>
            <TabsTrigger value="results">Hasil Survey</TabsTrigger>
          </TabsList>

          {/* IKL Survey */}
          <TabsContent value="ikl">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">{surveys.ikl.title}</CardTitle>
                <p className="text-gray-600">{surveys.ikl.description}</p>
              </CardHeader>
              <CardContent>
                {!surveyCompleted ? (
                  <div className="space-y-6">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Pertanyaan {currentQuestion + 1} dari {currentSurvey.questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>

                    {/* Question */}
                    <div className="text-center space-y-6">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {currentSurvey.questions[currentQuestion].question}
                      </h3>

                      {currentSurvey.questions[currentQuestion].type === 'rating' ? (
                        <div>
                          {renderRatingInput(currentSurvey.questions[currentQuestion].id)}
                          <p className="text-sm text-gray-500 mt-4">
                            1 = Sangat Tidak Puas, 5 = Sangat Puas
                          </p>
                        </div>
                      ) : (
                        <Textarea
                          placeholder="Tuliskan saran dan masukan Anda..."
                          value={answers[currentSurvey.questions[currentQuestion].id] || ''}
                          onChange={(e) => handleAnswerChange(currentSurvey.questions[currentQuestion].id, e.target.value)}
                          rows={5}
                        />
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                      >
                        Sebelumnya
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!answers[currentSurvey.questions[currentQuestion].id]}
                      >
                        {currentQuestion === currentSurvey.questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Terima kasih atas partisipasi Anda!
                    </h3>
                    <p className="text-gray-600">
                      Jawaban Anda sangat berharga untuk meningkatkan kualitas layanan kami.
                    </p>
                    <Button
                      onClick={() => {
                        setSurveyCompleted(false);
                        setCurrentQuestion(0);
                        setAnswers({});
                      }}
                      variant="outline"
                    >
                      Isi Survey Lagi
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* IPK Survey */}
          <TabsContent value="ipk">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">{surveys.ipk.title}</CardTitle>
                <p className="text-gray-600">{surveys.ipk.description}</p>
              </CardHeader>
              <CardContent>
                {!surveyCompleted ? (
                  <div className="space-y-6">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Pertanyaan {currentQuestion + 1} dari {currentSurvey.questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>

                    {/* Question */}
                    <div className="text-center space-y-6">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {currentSurvey.questions[currentQuestion].question}
                      </h3>

                      {currentSurvey.questions[currentQuestion].type === 'rating' ? (
                        <div>
                          {renderRatingInput(currentSurvey.questions[currentQuestion].id)}
                          <p className="text-sm text-gray-500 mt-4">
                            1 = Sangat Tidak Setuju, 5 = Sangat Setuju
                          </p>
                        </div>
                      ) : (
                        <Textarea
                          placeholder="Tuliskan saran dan masukan Anda..."
                          value={answers[currentSurvey.questions[currentQuestion].id] || ''}
                          onChange={(e) => handleAnswerChange(currentSurvey.questions[currentQuestion].id, e.target.value)}
                          rows={5}
                        />
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                      >
                        Sebelumnya
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!answers[currentSurvey.questions[currentQuestion].id]}
                      >
                        {currentQuestion === currentSurvey.questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Terima kasih atas partisipasi Anda!
                    </h3>
                    <p className="text-gray-600">
                      Jawaban Anda sangat berharga untuk meningkatkan kualitas layanan kami.
                    </p>
                    <Button
                      onClick={() => {
                        setSurveyCompleted(false);
                        setCurrentQuestion(0);
                        setAnswers({});
                      }}
                      variant="outline"
                    >
                      Isi Survey Lagi
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <div className="space-y-6">
              {/* IKL Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Hasil Survey IKL</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {surveyResults.ikl.averageScore}
                      </div>
                      <div className="text-sm text-gray-600">Skor Rata-rata</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {surveyResults.ikl.totalResponses}
                      </div>
                      <div className="text-sm text-gray-600">Total Responden</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">
                        {Math.round((surveyResults.ikl.distribution[0].percentage + surveyResults.ikl.distribution[1].percentage) * 10) / 10}%
                      </div>
                      <div className="text-sm text-gray-600">Sangat Puas & Puas</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Distribusi Rating</h4>
                    <div className="space-y-3">
                      {surveyResults.ikl.distribution.map((item) => (
                        <div key={item.rating} className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 w-12">
                            <span>{item.rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1">
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-600 w-16 text-right">
                            {item.percentage}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* IPK Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Hasil Survey IPK</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {surveyResults.ipk.averageScore}
                      </div>
                      <div className="text-sm text-gray-600">Skor Rata-rata</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {surveyResults.ipk.totalResponses}
                      </div>
                      <div className="text-sm text-gray-600">Total Responden</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">
                        {Math.round((surveyResults.ipk.distribution[0].percentage + surveyResults.ipk.distribution[1].percentage) * 10) / 10}%
                      </div>
                      <div className="text-sm text-gray-600">Sangat Setuju & Setuju</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Distribusi Rating</h4>
                    <div className="space-y-3">
                      {surveyResults.ipk.distribution.map((item) => (
                        <div key={item.rating} className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 w-12">
                            <span>{item.rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1">
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-600 w-16 text-right">
                            {item.percentage}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Survei;