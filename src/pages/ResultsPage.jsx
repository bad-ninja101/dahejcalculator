import React, { useState, useEffect,useRef } from 'react';
import { Sparkles, RefreshCw, TrendingUp, TrendingDown, Home, Award, Car } from 'lucide-react';

const ResultsPage = ({ formData, onCalculateAgain }) => {
  const [showResult, setShowResult] = useState(false);
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [animatedLand, setAnimatedLand] = useState(0);
  const [animatedGold, setAnimatedGold] = useState(0);
  const [showAboutAnkit, setShowAboutAnkit] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (showAboutAnkit) {
      // create and play audio when modal opens
      // change the path if your file is elsewhere
      audioRef.current = new Audio('/images/adsm.mp3');
      audioRef.current.loop = false; // set true if you want looping
      // attempt to play; browsers may block autoplay unless triggered by a user gesture (your click qualifies)
      audioRef.current.play().catch((err) => {
        // optional: handle autoplay block or errors
        console.warn('Audio play failed:', err);
      });
    } else {
      // stop & reset when modal closes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    }

    // cleanup if component unmounts (ensure audio stops)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [showAboutAnkit]);

  // CALCULATION LOGIC
  const calculateDahej = () => {
    let baseAmount = 500000;
    
    const age = parseInt(formData.age);
    if (age >= 18 && age <= 25) baseAmount += 200000;
    else if (age >= 26 && age <= 30) baseAmount += 150000;
    else if (age >= 31 && age <= 35) baseAmount += 100000;
    else baseAmount += 50000;

    const salary = parseInt(formData.salary);
    if (salary >= 2000000) baseAmount += 500000; // 20L+
    else if (salary >= 1000000) baseAmount += 300000; // 10L+
    else if (salary >= 500000) baseAmount += 150000; 
    else baseAmount += 50000;

    // Height Factor
    const height = parseInt(formData.height);
    if (formData.gender === 'male') {
      if (height >= 180) baseAmount += 150000;
      else if (height >= 170) baseAmount += 100000;
      else if (height >= 160) baseAmount += 50000;
    } else {
      if (height >= 165) baseAmount += 100000;
      else if (height >= 155) baseAmount += 75000;
      else baseAmount += 50000;
    }

    // Education Factor
    const educationMultiplier = {
      'PhD': 2 ,
      'Post Graduate': 1.5,
      'Graduate': 1.3,
      'Undergraduate': 1.2,
      'High School': 1.0,
      'Other': 1.0
    };
    baseAmount *= (educationMultiplier[formData.education] || 1.0);

    // Past Relations Factor
    if (formData.pastRelations === 'No') baseAmount += 100000;
    else if (formData.pastRelations === 'Yes') baseAmount -= 50000;

    // Gender-specific adjustments
    if (formData.gender === 'male') {
      baseAmount *= 1.2; // 20% more for males (what they can expect)
    } else if (formData.gender === 'female') {
      baseAmount *= 0.8; // Different calculation for females
    } else {
      baseAmount *= 1.1; 
    }

    return Math.round(baseAmount);
  };

  const getPersonalityJibes = () => {
    const jibes = [];
    const height = parseInt(formData.height || '0');
    const weight = parseInt(formData.weight || '0');
    const gender = formData.gender;
    const salary = formData.salary;

    // Height jibes
    if (gender === 'male') {
      if (height < 174) {
        jibes.push('🤏 Certified chhotu — table pe khade hoke shaadi ki photo lena');
      } else if (height >= 185) {
        jibes.push('🦒 Lambuddin tall-asur — darwaze se takra jayega bkl');
      }
    } else if (gender === 'female') {
      if (height < 160) {
        jibes.push('🤏 Certified bauni — chair chahiye upar ki cheezon ke liye? mere se duur rehna kuchli jayegi');
      } else if (height >= 160 && height <= 170) {
        jibes.push('👀 Perfect height — Ankit se milwa dete hain');
      } else if (height > 180) {
        jibes.push('🦒 Lambu — mere se duur reh, sar pe chadh jayegi');
      }
    }

    if (gender === 'female') {
      if (weight < 55) {
        jibes.push('💨 Sukhii — hawa mein ud jayegi, khana khilao koi');
      } else if (weight >= 55 && weight <= 75) {
        jibes.push('😳💗 Perfectly thick 😳💗, Mommy?!?!?!😻');
      } else if (weight > 75) {
        jibes.push('🐘 Moti — thoda kam khaya kar, weighing scale kitne tode abtak?');
      }
    } else if (gender === 'male') {
      if (weight < 68) {
        jibes.push('💨 Patlu sir aap?!? — gym ja beta, protein shake pi🥱');
      } else if (weight >= 68 && weight <= 85) {
        jibes.push('💪 Decent physique bc noice — well maintained hai bhaijaan💪');
      } else if (weight > 85) {
        jibes.push('🏋️ Mota — gym membership lele bhai, pet andar kar gendu');
      }
    }
    if (gender==='female'){
      if(salary<100000){
        jibes.push('mtlb Thik hai pati khilayega, par tu bhi kuchh kama le🤨');
      } else if(salary>100000|| salary <=500000){
        jibes.push('aur Ohooo, kamai shamai !?!?🤑🤑🫰')
      } else if(salary>500000|| salary< 1000000){
        jibes.push('aur salary dekh ke puch rha hu ki Ghar jamai form open?😳😳')
      } else if(salary>1000000){
        jibes.push('Aur salary?? Itne paise to hote hi nhi hain...')
      }

    } else if(gender==="male"){
      if(salary<100000){
        jibes.push('par Kuchh kama le bc, itne me to bs maggi khayega aur khilayega😔');
      } else if(salary>100000||salary<=600000){
        jibes.push('Nice earning dude, aur thodi badh jaati to saaliyon ko jutte ke paise de paata🙂‍↕️')
      } else if(salary>600000||salary<=1200000){
        jibes.push('Ab ye hui na kamai, mota krdena biwi ko apni😳')
      } else if(salary>1200000){
        jibes.push('Ambani ki aulaad bc!!!😥😒🫠')
      }
    }
    return jibes;
  };

  const getDahejPackage = (baseAmount, gender) => {
    let tier = '';
    let money = 0;
    let land = 0; // in bighas
    let gold = 0; // in grams
    let car = '';
    let emoji = '';
    let title = '';
    let description = '';

    // For MALES - Direct relationship (higher value = more dahej they can EXPECT)
    if (gender === 'male') {
      if (baseAmount >= 1800000) {
        tier = 'Supreme';
        money = 5000000;
        land = 10;
        gold = 500;
        car = 'BMW M5 comp';
        emoji = '👑';
        title = 'Supreme Tier - Aree damad ji baitho🙏!';
        description = `Bhai tu toh jackpot hai! ${formData.name}, teri toh seedha BMW m5 level shaadi hogi. Ladki wale khud dulhe dhundhne aayenge tere jaisa.`;
      } else if (baseAmount >= 1400000) {
        tier = 'Top';
        money = 3500000;
        land = 7;
        gold = 350;
        car = 'Fortuner';
        emoji = '💎';
        title = 'Top Tier - wow kya ladka hai, isse to bada maza ayega💪';
        description = `Mohabbat-e-sharbat worthy, Badhiya package hai ${formData.name}! Fortuner level dahej toh pakka milega. Accha khandaan dhundh le bas.`;
      } else if (baseAmount >= 1100000) {
        tier = 'Higher Middle';
        money = 2200000;
        land = 5;
        gold = 200;
        car = 'Innova';
        emoji = '⭐';
        title = 'Higher Middle - Aisa hi to chahiye tha pati dev!';
        description = `Theek-thaak hai ${formData.name}. Innova level dahej expect kar sakta hai. Middle class ka hero!`;
      } else if (baseAmount >= 800000) {
        tier = 'Lower Middle';
        money = 1500000;
        land = 3;
        gold = 150;
        car = 'Swift/Baleno';
        emoji = '✨';
        title = 'Lower Middle - mehh, chal jaaoge, daud nhi paaoge!';
        description = `Chalta hai beta ${formData.name}. Swift level milega, zyada expectations mat rakh.`;
      } else if (baseAmount >= 500000) {
        tier = 'Lower';
        money = 1000000;
        land = 1;
        gold = 100;
        car = 'Alto/WagonR';
        emoji = '🎯';
        title = 'Lower Tier - Struggle hai bhai 😔!';
        description = `Bhai ${formData.name}, thoda aur mehnat kar. Alto bhi mil jaye toh khush ho ja.`;
      } else {
        tier = 'Marriageless';
        money = 0;
        land = 0;
        gold = 0;
        car = 'Cycle 🚲';
        emoji = '😢';
        title = 'Marriageless - Beta Shaadi Nahi Hogi!';
        description = `Sorry ${formData.name}, abhi toh teri shaadi door ki baat hai. Pehle apni life set kar, fir soch.`;
      }
    } 
    // For FEMALES 
    else if (gender === 'female') {
      if (baseAmount >= 1800000) {
        tier = 'Supreme';
        money = 0;
        land = 0;
        gold = 0;
        car = 'Ladke wale denge!';
        emoji = '👑';
        title = 'Supreme Tier - Queen Material! - Aree rani sahiba aap?!?😳💗💗';
        description = `${formData.name}, tu toh lottery hai! Tujhe dahej dene ki zarurat nahi, ulta ladke wale tujhe respect aur gift denge. Highly educated, well-settled — perfect package!`;
      } else if (baseAmount >= 1400000) {
        tier = 'Top';
        money = 1000000;
        land = 1;
        gold = 100;
        car = 'Alto/WagonR';
        emoji = '💎';
        title = 'Top Tier - Tum husn pari tum jaan-e-jahan!🥵🥰';
        description = `Badiya hai ${formData.name}! Tujhe bas thoda sa dahej dena padega, woh bhi formality ke liye. Tera profile strong hai.`;
      } else if (baseAmount >= 1100000) {
        tier = 'Higher Middle';
        money = 1500000;
        land = 3;
        gold = 300;
        car = 'Swift/Baleno';
        emoji = '⭐';
        title = 'Higher Middle - Kya baat, fine shyt🤌😻';
        description = `Theek hai ${formData.name}. Swift level dahej lagega, but manageable hai. Accha ladka mil jayega.`;
      } else if (baseAmount >= 800000) {
        tier = 'Lower Middle';
        money = 2200000;
        land = 5;
        gold = 500;
        car = 'Innova';
        emoji = '✨';
        title = 'Lower Middle - Make up yaad se kr liyo🙂‍↕️';
        description = `Chalta hai ${formData.name}. Innova level dahej dena padega. Middle class struggle real hai!`;
      } else if (baseAmount >= 500000) {
        tier = 'Lower';
        money = 3500000;
        land = 7;
        gold = 350;
        car = 'Fortuner';
        emoji = '🎯';
        title = 'Lower Tier - Heavy Dahej Alert! aap dharti vich sirf shaadi vaaste aaye si?😳🤨';
        description = `${formData.name}, thoda aur improve kar apne aap ko. fortuner level dahej lag raha hai, which is expensive!`;
      } else {
        tier = 'Marriageless';
        money = 5000000;
        land = 10;
        gold = 400;
        car = 'Mercedes';
        emoji = '😢';
        title = 'Marriageless - Mercedes Level Dahej!';
        description = `${formData.name}, reality check — tujhe Fortuner level dahej dena padega ya fir apni life improve kar. Education aur career pe focus kar pehle!`;
      }
    }
    // For Others
    else {
      if (baseAmount >= 1500000) {
        tier = 'Supreme';
        money = 1000000;
        land = 5;
        gold = 500;
        car = 'Fortuner/Innova';
        emoji = '👑';
        title = 'Supreme Tier!';
        description = `${formData.name}, you're exceptional! Strong profile overall.`;
      } else if (baseAmount >= 1000000) {
        tier = 'Top';
        money = 800000;
        land = 3;
        gold = 300;
        car = 'Creta/Seltos';
        emoji = '💎';
        title = 'Top Tier!';
        description = `Great prospects ${formData.name}!`;
      } else {
        tier = 'Middle';
        money = 600000;
        land = 2;
        gold = 200;
        car = 'Swift/Baleno';
        emoji = '⭐';
        title = 'Good Tier!';
        description = `Solid profile ${formData.name}!`;
      }
    }

    return { tier, money, land, gold, car, emoji, title, description };
  };

  const baseAmount = calculateDahej();
  const dahejPackage = getDahejPackage(baseAmount, formData.gender);
  const jibes = getPersonalityJibes();

  useEffect(() => {
    setShowResult(true);
    
    let moneyStart = 0;
    const moneyDuration = 2000;
    const moneyIncrement = dahejPackage.money / (moneyDuration / 16);

    const moneyTimer = setInterval(() => {
      moneyStart += moneyIncrement;
      if (moneyStart >= dahejPackage.money) {
        setAnimatedAmount(dahejPackage.money);
        clearInterval(moneyTimer);
      } else {
        setAnimatedAmount(Math.floor(moneyStart));
      }
    }, 16);

    let landStart = 0;
    const landIncrement = dahejPackage.land / (moneyDuration / 16);
    const landTimer = setInterval(() => {
      landStart += landIncrement;
      if (landStart >= dahejPackage.land) {
        setAnimatedLand(dahejPackage.land);
        clearInterval(landTimer);
      } else {
        setAnimatedLand(Math.floor(landStart));
      }
    }, 16);

    let goldStart = 0;
    const goldIncrement = dahejPackage.gold / (moneyDuration / 16);
    const goldTimer = setInterval(() => {
      goldStart += goldIncrement;
      if (goldStart >= dahejPackage.gold) {
        setAnimatedGold(dahejPackage.gold);
        clearInterval(goldTimer);
      } else {
        setAnimatedGold(Math.floor(goldStart));
      }
    }, 16);

    return () => {
      clearInterval(moneyTimer);
      clearInterval(landTimer);
      clearInterval(goldTimer);
    };
  }, [dahejPackage.money, dahejPackage.land, dahejPackage.gold]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-500 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <button
        onClick={() => setShowAboutAnkit((s) => !s)}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white/50 hover:border-yellow-300"
      >
        <span className="text-1xl md:text-2xl font-black">click☝️</span>
      </button>

      {showAboutAnkit && (
        <div className="fixed top-24 right-6 z-50 bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-purple-500 max-w-sm animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black text-purple-900">About Ankit </h3>
            <button
              onClick={() => setShowAboutAnkit(false)}
              className="text-purple-900 hover:text-red-500 text-2xl font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-purple-900 text-base leading-relaxed">
            Hey! I'm Ankit 
            <br /><br />
            A self certified, self glazing Narcissist.
            <br /> You know why? coz I fkin believe it.
            <br /><br />
            This calculator is for you to calculate the dahej you would be giving to your groom,
            and if you're a male then what exactly you could expect from the bride.😉
            a site made for fun. 
            <br /><br />
            <span className="text-sm text-purple-700">
              <em>Remember: This is <strong>not</strong> for laughs. Dahej system is <strong>not</strong> a social evil!</em>
              <br /><br />
              <em>PS: Ignore the bolds😔 coz I'm aadat se majboor</em>
            </span>
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ${showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Emoji Icon */}
        <div className="text-8xl md:text-9xl mb-4 animate-bounce-slow">
          {dahejPackage.emoji}
        </div>

        {/* Result Title */}
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-2xl">
          {dahejPackage.title}
        </h1>

        {/* Tier Badge */}
        <div className="inline-block bg-white/30 backdrop-blur-lg rounded-full px-6 py-2 mb-6 border-2 border-white/50">
          <p className="text-white font-black text-xl md:text-2xl">
            {dahejPackage.tier} Tier
          </p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-8 shadow-2xl max-w-3xl mx-auto">
          <p className="text-purple-900 text-lg md:text-xl leading-relaxed font-semibold">
            {dahejPackage.description}
          </p>
        </div>

        {/* Personality Jibes */}
        {jibes.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-3xl p-6 mb-8 shadow-2xl max-w-3xl mx-auto border-4 border-white">
            <h3 className="text-2xl font-black text-purple-900 mb-4">Ankit ki tippaniya</h3>
            <div className="space-y-2">
              {jibes.map((jibe, index) => (
                <p key={index} className="text-purple-900 text-base md:text-lg font-bold">
                  {jibe}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Dahej Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {/* Money Card */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-6 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-black text-white">Cash Money</h3>
            </div>
            <p className="text-5xl md:text-6xl font-black text-white mb-2">
              ₹{animatedAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-white/80 text-lg font-semibold">
              ({(animatedAmount / 100000).toFixed(1)} Lakhs)
            </p>
          </div>

          {/* Land Card */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Home className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-black text-white">Zameen</h3>
            </div>
            <p className="text-5xl md:text-6xl font-black text-white mb-2">
              {animatedLand}
            </p>
            <p className="text-white/80 text-lg font-semibold">
              Bighas
            </p>
          </div>

          {/* Gold Card */}
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-3xl p-6 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Award className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-black text-white">Sona(24g)</h3>
            </div>
            <p className="text-5xl md:text-6xl font-black text-white mb-2">
              {animatedGold}g
            </p>
            <p className="text-white/80 text-lg font-semibold">
              ({(animatedGold / 1000).toFixed(2)} kg)
            </p>
          </div>

          {/* Car Card */}
          <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl p-6 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Car className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-black text-white">Gaadi</h3>
            </div>
            <p className="text-4xl md:text-5xl font-black text-white mb-2">
              {dahejPackage.car}
            </p>
            <p className="text-white/80 text-lg font-semibold">
              {formData.gender === 'male' ? 'Mil jayegi!' : formData.gender === 'female' && dahejPackage.tier === 'Supreme' ? 'No need!' : 'Dena padega'}
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30">
            <p className="text-white/80 text-sm font-medium">Age</p>
            <p className="text-white text-2xl font-black">{formData.age}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30">
            <p className="text-white/80 text-sm font-medium">Education</p>
            <p className="text-white text-lg md:text-xl font-black">{formData.education}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30">
            <p className="text-white/80 text-sm font-medium">Height</p>
            <p className="text-white text-2xl font-black">{formData.height}cm</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30">
            <p className="text-white/80 text-sm font-medium">Income</p>
            <p className="text-white text-lg md:text-xl font-black">₹{(parseInt(formData.salary || '0') / 100000).toFixed(1)}L</p>
          </div>
        </div>

        {/* Calculate Again Button */}
        <button
          onClick={onCalculateAgain}
          className="group inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 hover:bg-yellow-300 hover:text-purple-700"
        >
          <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Calculate Again?</span>
        </button>

        {/* Disclaimer */}
        <p className="mt-8 text-white/70 text-xs md:text-sm max-w-xl mx-auto">
          Kya re bhikmangya, doston ko dikha aur unka bhi calculate kar! 😂
        </p>
      </div>

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

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;