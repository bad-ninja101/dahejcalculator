import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const WelcomePage = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-white-400 to-green-500 flex items-center justify-center p-4 overflow-hidden relative">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
        <img src="/images/giphys.gif" alt="fun GIF" className="w-50 h-37  object-cover rounded-4xl " />

        </div>

        <h1 className="text-4xl md:text-76xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
          Welcome to
        </h1>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-8 drop-shadow-2xl animate-gradient">
          💰 Dahej Calculator 💰
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-12 drop-shadow-lg max-w-2xl mx-auto">
          Lets see aapko dahej me kitne paise milenge ya dene padenge? 
          <br />
          <br />
          Shuru krte hain😾
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="group relative inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 md:px-12 md:py-6 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 hover:bg-yellow-300 hover:text-purple-700"
        >
          <span>Let's Go!</span>
          <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition-transform duration-300" />
          
          {/* Button Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        </button>

        {/* Fun Disclaimer */}
        <p className="mt-8 text-white/80 text-sm md:text-base max-w-xl mx-auto">
          Made by your one and Only Ankit 
          <br />
          
        </p>
      </div>

      {/* CSS for animations */}

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
