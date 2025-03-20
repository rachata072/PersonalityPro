import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions, submitAnswers } from '../services/api';
import Question from '../components/Question';

interface EnneagramQuestion {
  id: number;
  text: string;
  type: number;
}

const EnneagramQuiz = () => {
  const [questions, setQuestions] = useState<EnneagramQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await getQuestions('enneagram');
        console.log('Fetched questions:', fetchedQuestions.length);
        setQuestions(fetchedQuestions as EnneagramQuestion[]);
        setError(null);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (answer: number) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: answer
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        setLoading(true);
        console.log('Submitting final answers:', newAnswers);
        
        const result = await submitAnswers('enneagram', newAnswers);
        console.log('Got result:', result);
        
        navigate('/result', { 
          state: { 
            result,
            testType: 'enneagram'
          }
        });
      } catch (error) {
        console.error('Error submitting answers:', error);
        setError('Failed to submit answers. Please try again.');
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // If at first question, confirm before going back to home
      if (window.confirm('Are you sure you want to leave the quiz? Your progress will be lost.')) {
        navigate('/');
      }
    }
  };

  const handleQuit = () => {
    if (window.confirm('Are you sure you want to quit? Your progress will be lost.')) {
      navigate('/');
    }
  };

  if (loading && questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">No questions available. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-opacity"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-pink-600 flex items-center transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={handleQuit}
          className="text-gray-600 hover:text-pink-600 transition-colors"
        >
          Quit Quiz
        </button>
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-pink-500 to-orange-500 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <Question
        id={currentQuestion.id}
        text={currentQuestion.text}
        currentAnswer={answers[currentQuestion.id] || undefined}
        onAnswer={handleAnswer}
      />

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleBack}
          className={`px-6 py-3 rounded-full transition-all ${
            currentQuestionIndex > 0
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
          }`}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button>
        {currentQuestionIndex === questions.length - 1 && (
          <button
            onClick={() => handleAnswer(answers[currentQuestion.id] || 3)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-opacity"
            disabled={!answers[currentQuestion.id]}
          >
            Submit Quiz
          </button>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      )}
    </div>
  );
};

export default EnneagramQuiz; 