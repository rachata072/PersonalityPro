import React, { useMemo } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

interface PersonalityResult {
  type: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careerPaths: string[];
  relationships: string;
  scores?: {
    E: number; I: number;
    S: number; N: number;
    T: number; F: number;
    J: number; P: number;
  };
  percentages?: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
}

interface LocationState {
  testType: 'mbti' | 'enneagram';
  result: PersonalityResult;
}

// Memoized dimension bar component
const DimensionBar: React.FC<{ value: number; leftLabel: string; rightLabel: string }> = React.memo(({
  value,
  leftLabel,
  rightLabel
}) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className={value > 50 ? 'font-bold' : ''}>{leftLabel}</span>
      <span className={value < 50 ? 'font-bold' : ''}>{rightLabel}</span>
    </div>
    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>{Math.round(value)}%</span>
      <span>{Math.round(100 - value)}%</span>
    </div>
  </div>
));

DimensionBar.displayName = 'DimensionBar';

const Result: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  // If there's no state, redirect to home
  if (!state) {
    console.error('No state found, redirecting to home');
    return <Navigate to="/" replace />;
  }

  const { testType, result } = state;

  // Validate required data
  if (!testType || !result) {
    console.error('Missing required data:', { testType, result });
    return <Navigate to="/" replace />;
  }

  // Validate result object
  if (!result.description || !result.strengths || !result.weaknesses || !result.careerPaths || !result.relationships) {
    console.error('Invalid result object:', result);
    return (
      <div className="min-h-screen w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-red-600">
            Error Loading Results
          </h1>
          <p className="text-center text-gray-700 mb-6">
            There was an error loading your personality test results. Please try taking the test again.
          </p>
          <div className="flex justify-center">
            <Link
              to={`/${testType}`}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
            >
              Take Test Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Memoize share data
  const shareData = useMemo(() => ({
    url: window.location.href,
    title: `I just discovered my ${testType.toUpperCase()} type: ${result.type}!`
  }), [testType, result.type]);

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
          Your {testType.toUpperCase()} Type: {result.type}
        </h1>

        {testType === 'mbti' && result.percentages && (
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-600">Type Breakdown</h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
              <DimensionBar value={result.percentages.EI} leftLabel="Extraversion (E)" rightLabel="Introversion (I)" />
              <DimensionBar value={result.percentages.SN} leftLabel="Sensing (S)" rightLabel="Intuition (N)" />
              <DimensionBar value={result.percentages.TF} leftLabel="Thinking (T)" rightLabel="Feeling (F)" />
              <DimensionBar value={result.percentages.JP} leftLabel="Judging (J)" rightLabel="Perceiving (P)" />
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-600">Description</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{result.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8">
          <div className="bg-purple-50 p-4 sm:p-6 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Strengths</h2>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                  <span className="break-words">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pink-50 p-4 sm:p-6 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-pink-600">Weaknesses</h2>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-red-500 mr-2 flex-shrink-0">•</span>
                  <span className="break-words">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Career Paths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.careerPaths.map((career, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <span className="text-gray-700 break-words">{career}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Relationships</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{result.relationships}</p>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-purple-600">Share Your Results</h3>
          <div className="flex justify-center space-x-4">
            <FacebookShareButton url={shareData.url} hashtag="#PersonalityTest">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareData.url} title={shareData.title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareData.url} title={shareData.title}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to={`/${testType}`}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-full hover:opacity-90 transition-opacity"
        >
          Take Another Test
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 bg-white text-purple-600 text-center rounded-full border-2 border-purple-200 hover:border-purple-400 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Result; 