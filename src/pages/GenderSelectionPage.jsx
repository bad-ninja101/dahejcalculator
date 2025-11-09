import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

const GenderSelectionPage = ({ onNavigate }) => {
  const [hoveredGender, setHoveredGender] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showOtherScreen, setShowOtherScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGenderSelect = (gender) => {
    if (gender === 'other') {
      setShowOtherScreen(true);
      return;
    }

    if (onNavigate) {
      onNavigate(gender);
    } else {
      console.log('Selected gender:', gender);
      alert(`Selected: ${gender}\n\nReplace onNavigate prop with your navigation function`);
    }
  };

  if (showOtherScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center">
          <div className="text-9xl md:text-[10rem] leading-none mb-8">🙏😔🙏</div>
          <p className="text-white text-2xl md:text-3xl mb-8 font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Aap mumbai nhi aa skte💔</p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowOtherScreen(false)}
              className="px-6 py-3 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg transition-all duration-300"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const genderOptions = [
    {
      id: 'male',
      label: 'Male',
      image: '/images/males.jpg',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'female',
      label: 'Female',
      image: '/images/females.jpg',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      id: 'other',
      label: 'Others',
      image: '/images/third.jpg',
      gradient: 'from-purple-500/20 to-indigo-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center mb-8 md:mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold text-purple-900 font-bold mb-2 tracking-tight">
          Choose Your Gender
        </h1>
        <p className="text-slate-400 font-bold text-sm md:text-base">Select an option to continue</p>
      </div>

      {/* Desktop Layout: Side by Side + Bottom */}
      <div className="hidden md:flex md:flex-col items-center justify-center w-full max-w-7xl gap-6">
        <div className="flex gap-6 w-full">
          {genderOptions.slice(0, 2).map((option) => (
            <div
              key={option.id}
              className="flex-1 relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
              onMouseEnter={() => setHoveredGender(option.id)}
              onMouseLeave={() => setHoveredGender(null)}
              onClick={() => handleGenderSelect(option.id)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${option.image})`,
                  transform: hoveredGender === option.id ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${option.gradient} transition-opacity duration-500 ${hoveredGender === option.id ? 'opacity-30' : 'opacity-50'}`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <User className="w-16 h-16 text-white mb-4 transition-transform duration-500" style={{ transform: hoveredGender === option.id ? 'scale(1.2)' : 'scale(1)' }} />
                <h2 className="text-4xl font-bold text-white tracking-wide">{option.label}</h2>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 border-4 border-white rounded-2xl transition-opacity duration-500 ${hoveredGender === option.id ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>

        {/* Bottom: Third Gender */}
        <div
          className="relative w-full max-w-md h-64 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
          onMouseEnter={() => setHoveredGender('other')}
          onMouseLeave={() => setHoveredGender(null)}
          onClick={() => handleGenderSelect('other')}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: `url(${genderOptions[2].image})`,
              transform: hoveredGender === 'other' ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${genderOptions[2].gradient} transition-opacity duration-500 ${hoveredGender === 'other' ? 'opacity-30' : 'opacity-50'}`} />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <User className="w-12 h-12 text-white mb-3 transition-transform duration-500" style={{ transform: hoveredGender === 'other' ? 'scale(1.2)' : 'scale(1)' }} />
            <h2 className="text-3xl font-bold text-white tracking-wide">{genderOptions[2].label}</h2>
          </div>

          {/* Hover Effect Border */}
          <div className={`absolute inset-0 border-4 border-white rounded-2xl transition-opacity duration-500 ${hoveredGender === 'other' ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col items-center justify-center w-full max-w-md gap-4">
        {/* Male and Female Side by Side */}
        <div className="flex gap-4 w-full">
          {genderOptions.slice(0, 2).map((option) => (
            <div
              key={option.id}
              className="flex-1 relative h-80 rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform shadow-lg"
              onClick={() => handleGenderSelect(option.id)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${option.image})`
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${option.gradient} opacity-40`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <User className="w-12 h-12 text-white mb-3" />
                <h2 className="text-2xl font-bold text-white tracking-wide">{option.label}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Third Gender Below */}
        <div
          className="relative w-full h-56 rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform shadow-lg"
          onClick={() => handleGenderSelect('other')}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${genderOptions[2].image})`
            }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${genderOptions[2].gradient} opacity-40`} />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <User className="w-12 h-12 text-white mb-3" />
            <h2 className="text-2xl font-bold text-white tracking-wide">{genderOptions[2].label}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelectionPage;
