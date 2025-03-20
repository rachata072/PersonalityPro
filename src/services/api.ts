import { mockQuestions, enneagramQuestions, mockResults, enneagramResults } from '../data/mockData';

interface Question {
  id: number;
  text: string;
  dimension?: string;
  type?: number;
}

interface PersonalityResult {
  type: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careerPaths: string[];
  relationships: string;
}

interface MockResults {
  [key: string]: PersonalityResult;
}

interface Answers {
  [key: number]: number;
}

// Cache for storing calculated results
const mbtiResultsCache = new Map<string, PersonalityResult>();
const enneagramResultsCache = new Map<string, PersonalityResult>();

// Helper function to create a cache key from answers
const createCacheKey = (answers: Answers): string => {
  return Object.entries(answers)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([_, value]) => value)
    .join(',');
};

export const getQuestions = async (testType: 'mbti' | 'enneagram'): Promise<Question[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (testType === 'mbti') {
    return mockQuestions;
  } else if (testType === 'enneagram') {
    return enneagramQuestions;
  }

  throw new Error('Invalid test type');
};

const calculateMBTIScores = (answers: Answers): string => {
  const scores: { [key: string]: number } = {
    'E-I': 0,
    'S-N': 0,
    'T-F': 0,
    'J-P': 0
  };

  // Process each answer
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = mockQuestions.find(q => q.id === Number(questionId));
    if (!question || !question.dimension) return;

    const weight = answer - 3; // Convert 1-5 scale to -2 to +2
    scores[question.dimension] += weight;
  });

  // Calculate personality type
  const type = [
    scores['E-I'] >= 0 ? 'I' : 'E',
    scores['S-N'] >= 0 ? 'N' : 'S',
    scores['T-F'] >= 0 ? 'F' : 'T',
    scores['J-P'] >= 0 ? 'P' : 'J'
  ].join('');

  return type;
};

const calculateEnneagramScores = (answers: Answers): string => {
  const scores: { [key: number]: number } = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
    6: 0, 7: 0, 8: 0, 9: 0
  };

  // Process each answer
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = enneagramQuestions.find(q => q.id === Number(questionId));
    if (!question || !question.type) return;

    scores[question.type] += answer;
  });

  // Find primary and wing types
  let primaryType = 1;
  let maxScore = scores[1];

  for (let type = 2; type <= 9; type++) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      primaryType = type;
    }
  }

  // Find wing (adjacent type with higher score)
  const leftWing = primaryType === 1 ? 9 : primaryType - 1;
  const rightWing = primaryType === 9 ? 1 : primaryType + 1;
  const wing = scores[leftWing] > scores[rightWing] ? leftWing : rightWing;

  return `${primaryType}w${wing}`;
};

export const submitAnswers = async (
  testType: 'mbti' | 'enneagram',
  answers: Answers
): Promise<PersonalityResult> => {
  // Validate input
  if (!answers || Object.keys(answers).length === 0) {
    throw new Error('No answers provided');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Calculate personality type based on test type
  if (testType === 'mbti') {
    const cacheKey = createCacheKey(answers);
    if (mbtiResultsCache.has(cacheKey)) {
      return mbtiResultsCache.get(cacheKey)!;
    }

    const personalityType = calculateMBTIScores(answers);
    console.log('Calculated MBTI scores:', personalityType);
    console.log('Available MBTI types:', Object.keys(mockResults));

    const typedMockResults = mockResults as MockResults;
    if (!typedMockResults[personalityType]) {
      throw new Error(`Invalid MBTI type: ${personalityType}`);
    }

    const result = {
      ...typedMockResults[personalityType],
      testType: 'mbti'
    };

    mbtiResultsCache.set(cacheKey, result);
    return result;
  } else if (testType === 'enneagram') {
    const cacheKey = createCacheKey(answers);
    if (enneagramResultsCache.has(cacheKey)) {
      return enneagramResultsCache.get(cacheKey)!;
    }

    const enneagramType = calculateEnneagramScores(answers);
    console.log('Calculated Enneagram scores:', enneagramType);
    console.log('Available Enneagram types:', Object.keys(enneagramResults));

    const typedEnneagramResults = enneagramResults as MockResults;
    if (!typedEnneagramResults[enneagramType]) {
      throw new Error(`Invalid Enneagram type: ${enneagramType}`);
    }

    const result = {
      ...typedEnneagramResults[enneagramType],
      testType: 'enneagram'
    };

    enneagramResultsCache.set(cacheKey, result);
    return result;
  }

  throw new Error('Invalid test type');
}; 