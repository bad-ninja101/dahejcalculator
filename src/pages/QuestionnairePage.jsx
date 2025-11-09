import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const QuestionnairePage = ({ gender, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  // Define questions based on gender
  const getQuestions = () => {
    const commonQuestions = [
      {
        id: 'name',
        question: "What's your name?",
        type: 'text',
        placeholder: 'Enter your name',
        emoji: '👋'
      },
      {
        id: 'age',
        question: 'How old are you?',
        type: 'number',
        placeholder: 'Enter your age',
        emoji: '🎂',
        min: 18,
        max: 100
      },
      {
        id: 'height',
        question: 'What is your height? (in cm)',
        type: 'number',
        placeholder: 'Enter height in cm',
        emoji: '📏',
        min: 100,
        max: 250
      },
      {
        id: 'weight',
        question: 'What is your weight? (in kg)',
        type: 'number',
        placeholder: 'Enter weight in kg',
        emoji: '⚖️',
        min: 30,
        max: 200
      },
      {
        id: 'salary',
        question: 'What is your annual income? (in ₹)',
        type: 'number',
        placeholder: 'Enter annual salary',
        emoji: '💰',
        min: 0
      },
      {
        id: 'education',
        question: 'What is your highest education level?',
        type: 'select',
        emoji: '🎓',
        options: [
          'High School',
          'Undergraduate',
          'Graduate',
          'Post Graduate',
          'PhD',
          'Other'
        ]
      },
      {
        id: 'hobbies',
        question: 'What are your hobbies?',
        type: 'text',
        placeholder: 'Reading, Gaming, Cooking...',
        emoji: '🎨'
      },
      {
        id: 'pastRelations',
        question: 'Have you been in relationships before?',
        type: 'radio',
        emoji: '💕',
        options: ['Yes', 'No', 'Prefer not to say']
      }
    ];

    if (gender === 'male') {
      commonQuestions.push({
        id: 'profession',
        question: 'What do you do for a living?',
        type: 'text',
        placeholder: 'Your profession',
        emoji: '💼'
      });
    } 
      else if (gender === 'female') {
      commonQuestions.push({
        id: 'skills',
        question: 'Any special skills or talents?',
        type: 'text',
        placeholder: 'Jhaadu-pocha aur safai hatake..',
        emoji: '✨'
      }, 
    {
        id: 'unqtrait',
        question: 'What makes you unique?',
        type: 'text',
        placeholder: 'Sasural walo ko surprise dance?',
        emoji: '✨'
      });
    } else {
      commonQuestions.push({
        id: 'uniqueTrait',
        question: 'What makes you unique?',
        type: 'text',
        placeholder: 'Tell us something special about you',
        emoji: '🌟'
      });
    }

    return commonQuestions;
  };

  const questions = getQuestions();
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQ.id]: value });
    setError('');
  };

  const handleNext = () => {
    if (!answers[currentQ.id] || answers[currentQ.id] === '') {
      setError('Please answer this question before continuing');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit answers
      onComplete({ gender, ...answers });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError('');
    }
  };

  const renderInput = () => {
    switch (currentQ.type) {
      case 'text':
        return (
          <input
            type="text"
            value={answers[currentQ.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQ.placeholder}
            className="w-full max-w-md px-6 py-4 text-xl md:text-2xl text-center rounded-2xl border-4 border-purple-300 focus:border-purple-500 focus:outline-none bg-white shadow-lg transition-all duration-300"
            autoFocus
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={answers[currentQ.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQ.placeholder}
            min={currentQ.min}
            max={currentQ.max}
            className="w-full max-w-md px-6 py-4 text-xl md:text-2xl text-center rounded-2xl border-4 border-purple-300 focus:border-purple-500 focus:outline-none bg-white shadow-lg transition-all duration-300"
            autoFocus
          />
        );

      case 'select':
        return (
          <select
            value={answers[currentQ.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full max-w-md px-6 py-4 text-xl md:text-2xl text-center rounded-2xl border-4 border-purple-300 focus:border-purple-500 focus:outline-none bg-white shadow-lg transition-all duration-300 cursor-pointer"
            autoFocus
          >
            <option value="">Select an option</option>
            {currentQ.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="flex justify-center items-justify flex-col gap-3 w-full max-w-md mx-auto"
>
            {currentQ.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`px-6 py-4 text-lg md:text-xl rounded-2xl border-4 transition-all duration-300 font-semibold ${
                  answers[currentQ.id] === option
                    ? 'bg-purple-500 text-white border-purple-600 scale-105 shadow-xl'
                    : 'bg-white text-purple-600 border-purple-300 hover:border-purple-400 hover:scale-105'
                }`}
              >
                {answers[currentQ.id] === option && <Check className="inline mr-2" />}
                {option}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 flex flex-col items-center justify-between p-4 md:p-8">
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-8">
        <div className="bg-white/30 backdrop-blur-sm rounded-full h-4 overflow-hidden shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-3 text-purple-900 font-bold text-sm md:text-base">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          {/* Emoji */}
          <div className="text-8xl md:text-9xl mb-6 animate-bounce-slow">
            {currentQ.emoji}
          </div>

          {/* Question */}
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 drop-shadow-lg">
            {currentQ.question}
          </h2>

          {/* Input */}
          <div className="mb-6">
            {renderInput()}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 font-bold text-lg bg-white/90 rounded-xl px-4 py-2 inline-block mb-4">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 w-full max-w-md">
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
            currentQuestion === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white text-purple-600 hover:bg-purple-100 hover:scale-105 shadow-lg'
          }`}
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>

        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg transition-all duration-300"
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          {currentQuestion === questions.length - 1 ? (
            <Check className="w-6 h-6" />
          ) : (
            <ArrowRight className="w-6 h-6" />
          )}
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QuestionnairePage;