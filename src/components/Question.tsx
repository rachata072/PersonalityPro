import React from 'react';

interface QuestionProps {
  id: number;
  text: string;
  currentAnswer?: number;
  onAnswer: (answer: number) => void;
}

const Question = ({ id, text, currentAnswer, onAnswer }: QuestionProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-gray-800 leading-relaxed">
        {text}
      </h2>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => onAnswer(value)}
            className={`w-full p-4 sm:p-5 text-left rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
              currentAnswer === value
                ? 'bg-gradient-to-r from-pink-50 to-orange-50 border-2 border-pink-300 text-pink-700 shadow-md'
                : 'bg-gray-50 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 text-gray-700 hover:text-pink-700 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 transition-colors ${
                currentAnswer === value
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {value}
              </div>
              <span className="text-lg">
                {value === 1 && 'Strongly Disagree'}
                {value === 2 && 'Disagree'}
                {value === 3 && 'Neutral'}
                {value === 4 && 'Agree'}
                {value === 5 && 'Strongly Agree'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question; 