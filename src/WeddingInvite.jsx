import { useState, useEffect, useRef } from 'react';
import EnvelopeOpen from "./assets/EnvelopeOpen.mp4";
import WeddingMusic from "./assets/Kudmayi.mp3";
import GaneshaIcon from "./assets/GaneshaJi.png";
import SaveDateImg from "./assets/SaveDate.png";
import WeddingImg from "./assets/Wedding.png";
import weddingBorder from "./assets/weddingborder.png";
import foreverUs from "./assets/foreverUs.png";
import ourMemories from "./assets/ourmemories.png";
import venue from "./assets/Venue.png";
import fest from "./assets/festivities.png";
import rsvp from "./assets/rsvp.png";
import vizag from "./assets/vizag.mp4";
import iraaday from "./assets/iraaday.mp4";
import forever from "./assets/forever.mp4";
import wedding1 from "./assets/wedding1.jpg";
import wedding2 from "./assets/wedding2.jpg";
import wedding3 from "./assets/wedding3.jpg";
import klydegrand from "./assets/klydeGrand.jpg";
import sangeetfun from "./assets/SangeetFun.png";
import Turmeric from "./assets/TurmericTales.png";
import mehendi from "./assets/HennaMehendi.png";
import engagement from "./assets/EngagementCeremony.png";
import saatphere from "./assets/SaatPhere.png";

// --- HELPER COMPONENT: Scratch Card ---
const ScratchCard = ({ title, revealedValue }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Fill cover background
    ctx.fillStyle = '#991b1b'; // Deep rose cover
    ctx.fillRect(0, 0, width, height);
    
    // Add text prompt on card
    ctx.fillStyle = '#fda4af';
    ctx.font = '500 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('👆 Scratch me', width / 2, height / 2 + 4);

    let isDrawing = false;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2, false);
      ctx.fill();
      setIsScratched(true); // Triggers the animation to stop
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mousedown', () => (isDrawing = true));
    canvas.addEventListener('mouseup', () => (isDrawing = false));
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mousedown', () => (isDrawing = true));
      canvas.removeEventListener('mouseup', () => (isDrawing = false));
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-amber-800/70 mb-1">{title}</span>
      {/* Conditionally apply the tilt animation until scratched */}
      <div 
        className={`relative w-24 h-24 rounded-2xl shadow-md overflow-hidden bg-white border border-rose-100 flex items-center justify-center transition-all duration-300 ${
          !isScratched ? 'animate-tilt cursor-pointer' : 'scale-105 shadow-lg'
        }`}
      >        
          <span className="text-xl font-bold font-serif text-rose-950 tracking-wider">{revealedValue}</span>
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ${
              isScratched ? 'opacity-90' : 'opacity-100'
            }`}
          />
      </div>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---
export default function WeddingInvite() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Changed from activePhotoIndex to activeIndex for video stack
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoSectionVisible, setIsVideoSectionVisible] = useState(false);
  
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  
  // New refs for scroll detection and video elements
  const videoSectionRef = useRef(null);
  const stackVideoRefs = useRef([]);

  // --- Scroll Detection for Photo Collage ---
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const collageRefs = useRef([]);

  // All Festivites Events List
  const festivities = [
    {
      title: "Sangeet Fun",
      quote: "\"An evening of music, dance, and endless celebration.\"",
      dressCode: "Maroon • Gold • Cream",
      colors: ["#800000", "#D4AF37", "#FFFDD0"], // Maroon, Gold, Cream
      location: "Rise Organic Homes - ClubHouse",
      image: sangeetfun, 
    },
    {
      title: "Turmeric Tales",
      quote: "\"A vibrant burst of Haldi, Games, and Laughter.\"",
      dressCode: "Yellow • Orange • Mustard",
      colors: ["#FFD700", "#FFA500", "#FFDB58"], // Yellow, Orange, Mustard
      location: "SK Klyde Grand - Sapphire Hall",
      image: Turmeric,
    },
    {
      title: "Henna Mehendi",
      quote: "\"A lively swirl of Henna, Music and Dance.\"",
      dressCode: "Green • Emerald • Mint",
      colors: ["#228B22", "#50C878", "#98FF98"], // Green, Emerald, Mint
      location: "Rise Organic Homes - Poolside Lawns",
      image: mehendi,
    },
    {
      title: "Engagement Ceremony",
      quote: "\"A sparkling promise of love, laughter, forever.\"",
      dressCode: "Navy • Gold • Ivory",
      colors: ["#000080", "#D4AF37", "#FFFFF0"], // Navy, Gold, Ivory
      location: "SK Klyde Grand - Sapphire Hall",
      image: engagement,
    },
    {
      title: "Saat Phere",
      quote: "\"Bound by sacred vows for a lifetime together.\"",
      dressCode: "Traditional Indian",
      colors: ["#C41E3A", "#D4AF37"], // Red, Gold (Standard Traditional)
      location: "SK Klyde Grand - Main Lawns",
      image: saatphere,
    },
  ]

  // --- Scroll Detection for Festivities Section ---
  const [visibleFestivities, setVisibleFestivities] = useState([]);
  const festivityRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisibleFestivities((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    festivityRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []); 

  // RSVP Form State
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    phone: '',
    status: 'accept',
    guests: '1',
    events: {
      sangeet: true,
      afterParty: true,
      carnival: true,
      sheraBandi: true,
      reception: true,
      phere: true,
    },
    song: '',
    diet: 'Vegetarian',
    advice: '',
  });

  // Target Wedding Date: December 2, 2026
  const weddingDate = new Date('2026-12-02T21:30:00');
  const [timeLeft, setTimeLeft] = useState({ days: 89, hours: 19, mins: 46, secs: 0 });

  // Live Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Falling Petals Canvas Animation
  // Dynamic celebration burst particles ref
  const burstParticlesRef = useRef([]);

  // Falling Petals & Celebration Fireworks Animation Loop
  useEffect(() => {
    if (!isOpen) return; 
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Constant background drifting rose petals
    const petals = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1 - 0.5,
      angle: Math.random() * 360,
      spin: Math.random() * 2 - 1,
      color: ['#fce87b', '#f7dade', '#fda4af', '#f43f5e', '#e11d48'][Math.floor(Math.random() * 5)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Background Floating Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y / 30) + p.speedX;
        p.angle += p.spin;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });

      // 2. Render Active Firecracker & Petal Burst Particles
      burstParticlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.alpha -= p.decay;
        p.rotation += p.spin;

        if (p.alpha > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);

          if (p.type === 'petal') {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            // Firecracker spark glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      // Clean up faded particles
      burstParticlesRef.current = burstParticlesRef.current.filter((p) => p.alpha > 0);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  // Trigger Royal Wedding Firecrackers & Petals Explosion
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width || window.innerWidth;
    const height = canvas.height || window.innerHeight;

    const colors = ['#ffd700', '#f43f5e', '#e11d48', '#fbbf24', '#ffffff', '#a855f7', '#fda4af'];
    const newParticles = [];

    // 3 Burst Points across the screen width
    const origins = [
      { x: width * 0.25, y: height * 0.55 },
      { x: width * 0.5, y: height * 0.4 },
      { x: width * 0.75, y: height * 0.55 },
    ];

    origins.forEach((origin) => {
      // Launch 50 burst particles per origin point
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 3;
        const isPetal = Math.random() > 0.45;

        newParticles.push({
          x: origin.x,
          y: origin.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5, // Initial upward pop
          gravity: 0.1,
          drag: 0.96,
          size: isPetal ? Math.random() * 7 + 5 : Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.012 + 0.008,
          rotation: Math.random() * 360,
          spin: Math.random() * 8 - 4,
          type: isPetal ? 'petal' : 'spark',
        });
      }
    });

    burstParticlesRef.current.push(...newParticles);
  };

  // insert your video paths here)
  const videos = [
    { url: vizag, caption: 'Written in the stars' },
    { url: iraaday, caption: 'Laughter & Memories' },
    { url: forever, caption: 'Forever Us' },
  ];

  const handleNextItem = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  // --- Scroll Detection for Video Section ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Triggers when at least 50% of the section is visible
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- Media Coordination (Background Audio vs Stack Videos) ---
  useEffect(() => {
    if (!isOpen) return;

    if (isVideoSectionVisible) {
      // Pause background music
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Play active video, pause others
      stackVideoRefs.current.forEach((vid, index) => {
        if (vid) {
          if (index === activeIndex) {
            // Explicitly force unmuted state and ensure currentTime sync if needed
            vid.muted = false;
            
            // Small delay or direct play invocation ensuring DOM sync
            const playPromise = vid.play();
            if (playPromise !== undefined) {
              playPromise.catch(e => console.warn("Stack video auto-play prevented:", e));
            }
          } else {
            vid.pause();
            vid.currentTime = 0; // Reset hidden videos
            vid.muted = true;    // Mute background/inactive ones as a safeguard
          }
        }
      });
    } else {
      // Section scrolled out of view: Pause all stack videos
      stackVideoRefs.current.forEach((vid) => {
        if (vid) {
          vid.pause();
          vid.muted = true;
        }
      });

      // Resume background music (only if the initial envelope interaction occurred)
      if (audioRef.current && isVideoPlaying) {
        audioRef.current.play().catch(e => console.warn("Audio resume prevented:", e));
      }
    }
    }, [isVideoSectionVisible, activeIndex, isOpen, isVideoPlaying]);


  // --- Main Video Handle Handlers ---
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);

    // Start background music
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn("Audio playback was prevented by the browser.", error);
      });
    }

    // Start video animation
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.warn("Video playback was prevented by the browser.", error);
        handleVideoEnded(); // Fail gracefully: bypass video and open the invite immediately
      });
    }
  };

  const handleVideoEnded = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 1000); 
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisiblePhotos((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    collageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Placeholder images for the collage 
  const collagePhotos = [
    { 
      url: wedding1, 
      caption: 'The beginning', 
      position: 'self-start -ml-4', 
      rotation: '-rotate-6' 
    },
    { 
      url: wedding2, 
      caption: 'Lost in your eyes', 
      position: 'self-end -mr-4 -mt-16 z-10', 
      rotation: 'rotate-3' 
    },
    { 
      url: wedding3, 
      caption: 'To eternity', 
      position: 'self-center -mt-20 z-20', 
      rotation: '-rotate-2' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#4a0e17] font-sans antialiased text-stone-800 flex justify-center selection:bg-rose-200">
      
      {/* --- INJECT CUSTOM STYLES FOR FUNKY FONT & BUBBLE ANIMATION --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Chonburi&family=Playfair+Display:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');  
        
        @keyframes bubble-jump {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.05); }
        }
        .animate-bubble {
            animation: bubble-jump 1.6s infinite ease-in-out;
        }
        .font-wedding {
            font-family: 'Great Vibes', cursive;
        }
        
        /* New Styles for the Invitation Card */
        .font-names {
            font-family: 'Playfair Display', serif;
        }
        .font-italic-serif {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
        }
  
        /* Floating Animation for Ganesha */
        @keyframes float-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }
        .animate-float {
            animation: float-gentle 4s ease-in-out infinite;
        }

        /* To Give Shining Effect to any Text */
        .shimmer-text {
            /* Soft pink to match the invitation, with a harsh white center */
            background: linear-gradient(120deg, #8a4b4b 0%, #8a4b4b 40%, #d89f9f 50%, #8a4b4b 60%, #8a4b4b 100%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            /* Adjust the 5s to make the shine faster or slower */
            animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        /* Bounce the Scroll Down Arrow */
        .animate-decay-bounce {
            animation: decay-bounce 2.2s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
        }
        @keyframes decay-bounce {
            0%, 100% { transform: translateY(0); }
            /* Bounce 1: Hardest */
            15% { transform: translateY(-8px); }
            30% { transform: translateY(0); }
            /* Bounce 2: Softer */
            45% { transform: translateY(-5px); }
            60% { transform: translateY(0); }
            /* Bounce 3: Minimal */
            72% { transform: translateY(-3px); }
            84% { transform: translateY(0); }
        }

        /* Scratch Card Tilting Animation */
        .animate-tilt {
            animation: gentle-tilt 2.5s ease-in-out infinite;
            transform-origin: center center;
        }
        @keyframes gentle-tilt {
            0%, 100% { transform: rotate(-4deg) scale(1); }
            50% { transform: rotate(4deg) scale(1.03); }
        }
      `}</style>

      {/* Audio Element */}
      <audio ref={audioRef} src={WeddingMusic} loop preload="auto" />

      {/* Falling Flowers Background Canvas */}
      {isOpen && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30" />}

      {/* Floating Celebration Action Button */}
      {isOpen && (
        <button
          onClick={triggerConfetti}
          className="fixed bottom-5 right-5 z-40 bg-amber-500 text-white p-3.5 rounded-full shadow-2xl hover:bg-amber-600 transition duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center text-xl"
          title="Blast Flower Petals & Fireworks"
        >
          🎉
        </button>
      )}

      <div className="w-full max-w-md bg-[#fffdfa] min-h-screen shadow-2xl relative overflow-x-hidden flex flex-col">
        
        {/* ================= SECTION 1: VIDEO ENVELOPE OPEN ================= */}
        {!isOpen && (
          <div
            className={`fixed inset-0 max-w-md mx-auto z-50 bg-[#4a0e17] flex flex-col items-center justify-center transition-opacity duration-1000 ${
              isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <video
              ref={videoRef}
              src={EnvelopeOpen}
              className="absolute inset-0 w-full h-full object-cover z-0"
              playsInline
              muted={true}
              onEnded={handleVideoEnded}
            />

            {/* Tap To Reveal Overlay */}
            {!isVideoPlaying && (
              <div 
                onClick={handlePlayVideo}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/20 cursor-pointer"
              >
                <div className="mb-64 animate-bubble text-center px-4">
                  <p className="text-[#ffe4e6] font-wedding text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-wider">
                    ✨ Tap to Unveil ✨
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= MAIN WEDDING INVITATION CARD ================= */}
        <section className="pt-24 pb-20 px-8 text-center relative bg-gradient-to-b from-[#fff8f0] to-[#fffdfa]">
          
          {/* Floral Border Overlay (Expanded to edges) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <img 
              src={weddingBorder} 
              alt="Floral Border" 
              className="w-full h-full object-fill opacity-80 drop-shadow-sm"
            />
          </div>

          {/* Content Wrapper (z-10 ensures text stays above the border) */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-center mb-5">
              <img 
                src={GaneshaIcon} 
                alt="Shri Ganesh" 
                className="w-16 h-auto object-contain animate-float opacity-80"
              />
            </div>

            <div className="text-[#a46e6e] font-italic-serif text-lg leading-relaxed max-w-xs mx-auto mb-6 tracking-wide font-medium">
              ॥ श्री गणेशाय नमः ॥<br />
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ<br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </div>

            <p className="text-[#a46e6e] font-italic-serif text-xl leading-relaxed max-w-[280px] mx-auto mb-10">
              With the blessings of Shri Ganesha and our beloved families, we joyfully invite you to celebrate the union of
            </p>

            <h1 className="text-5xl md:text-6xl shimmer-text font-names font-bold text-[#8a4b4b] tracking-wide my-2">
              Vanshika
            </h1>
            
            <div className="flex items-center justify-center my-6">
              <div className="w-16 h-[1px] bg-[#d4af37]/60"></div>
              <div className="text-4xl font-italic-serif text-[#d4af37] mx-5">&</div>
              <div className="w-16 h-[1px] bg-[#d4af37]/60"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl shimmer-text font-names font-bold text-[#8a4b4b] tracking-wide mb-10 pb-2">
              Umang
            </h1>

            <p className="text-lg text-stone-500 font-italic-serif max-w-[250px] mx-auto leading-relaxed mb-1">
              Daughter of Mr. & Mrs. Garg <br/>
              Son of Mr. & Mrs. Goel
            </p>

            <div className="mt-10 flex flex-col items-center animate-pulse">
              <span className="text-[12px] tracking-widest text-[#a46e6e] uppercase font-sans font-semibold">
                Scroll to see magic
              </span>
              <span className="animate-decay-bounce text-[#a46e6e] text-m mt-1">↓</span>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: SAVE THE DATE SCRATCH CARDS ================= */}
        <section className="py-10 px-4 bg-[#fdf6f0] border-y border-rose-100 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#e7da24] mb-2">
            The Date
          </h2>

          <div className="flex justify-center items-center my-3">
            <img 
              src={SaveDateImg} 
              alt="Save the Date" 
              className="w-48 sm:w-56 max-w-[85%] h-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-all duration-300"
            />
          </div>

          <p className="text-base text-stone-500 font-italic-serif max-w-[250px] mx-auto leading-relaxed mb-6">
            Scratch any card to reveal our wedding date
          </p>

          <div className="flex justify-center gap-3">
            <ScratchCard title="Day" revealedValue="02" />
            <ScratchCard title="Month" revealedValue="DEC" />
            <ScratchCard title="Year" revealedValue="2026" />
          </div>
        </section>

        {/* ================= SECTION 4: REVERSE COUNTDOWN TIMER ================= */}
        <section className="py-8 px-6 text-center bg-white">
          <p className="text-lg text-stone-500 font-italic-serif max-w-[250px] mx-auto leading-relaxed mb-2">
            A lifetime of togetherness begins with one sacred step
          </p>

          <div className="flex justify-center items-center my-3">
            <img 
              src={WeddingImg} 
              alt="The Wedding" 
              className="w-48 sm:w-56 max-w-[85%] h-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto text-center">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINS', val: timeLeft.mins },
              { label: 'SECS', val: timeLeft.secs },
            ].map((item, idx) => (
              <div key={idx} className="bg-rose-50/70 p-2.5 rounded-xl border border-rose-100">
                <div className="text-xl font-bold font-mono text-rose-900">
                  {String(item.val).padStart(2, '0')}
                </div>
                <div className="text-[9px] tracking-widest uppercase text-stone-500 font-semibold mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 5: STACKED VIDEO ALBUM ================= */}
        <section ref={videoSectionRef} className="py-10 px-6 bg-[#fffdfa] text-center border-t border-stone-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#e7da24] mb-2">Our Story</h2>
          <div className="flex justify-center items-center my-3">
            <img 
              src={foreverUs} 
              alt="Forever Us" 
              className="w-48 sm:w-56 max-w-[85%] h-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-all duration-300"
            />
          </div>

          <div className="relative w-64 h-80 mx-auto cursor-pointer" onClick={handleNextItem}>
            {videos.map((video, index) => {
              const offset = (index - activeIndex + videos.length) % videos.length;
              return (
                <div
                  key={index}
                  className="absolute inset-0 bg-white p-3 shadow-xl rounded-xl border border-stone-200 transition-all duration-500 transform flex flex-col"
                  style={{
                    transform: `rotate(${offset * 4 - 4}deg) translateY(${offset * 8}px) scale(${1 - offset * 0.05})`,
                    zIndex: videos.length - offset,
                    opacity: offset === 0 ? 1 : 0.85,
                  }}
                >
                  <video 
                    ref={(el) => (stackVideoRefs.current[index] = el)}
                    src={video.url}
                    className="w-full h-56 object-cover rounded pointer-events-none" 
                    playsInline
                    loop
                  />
                  <p className="mt-3 font-serif italic text-xs text-stone-600">{video.caption}</p>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-400 mt-4">Tap video stack to flip</p>
        </section>

        {/* ================= SECTION 6: SCROLL REVEAL COLLAGE ================= */}
        <section className="py-16 px-8 bg-[#fffdfa] border-t border-stone-100 overflow-hidden flex flex-col">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#e7da24] mb-1">Glimpses</h2>
            <div className="flex justify-center items-center my-3">
            <img 
              src={ourMemories} 
              alt="Our Memories" 
              className="w-48 sm:w-56 max-w-[85%] h-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-all duration-300"
            />
          </div>
          </div>

          <div className="flex flex-col relative w-full max-w-[280px] mx-auto pb-8">
            {collagePhotos.map((photo, index) => {
              const isVisible = visiblePhotos.includes(String(index));
              
              return (
                <div
                  key={index}
                  ref={(el) => (collageRefs.current[index] = el)}
                  data-index={index}
                  className={`
                    bg-white p-3 pb-8 shadow-xl rounded-sm border border-stone-200 
                    w-56 transition-all duration-1000 ease-out transform
                    ${photo.position}
                    ${isVisible ? `opacity-100 translate-y-0 ${photo.rotation}` : 'opacity-0 translate-y-24 scale-95'}
                  `}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.caption}
                    className="w-full h-64 object-cover rounded pointer-events-none" 
                  />
                  <p className="text-center mt-4 font-serif italic text-xs text-stone-600">
                    {photo.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= SECTION 7: VENUE DETAILS ================= */}
        <section className="py-10 px-6 bg-[#fdf6f0] text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#e11d48] mb-2">Where</h2>
          <div className="flex justify-center items-center my-3">
            <img 
              src={venue} 
              alt="Our Memories" 
              className="w-48 sm:w-56 max-w-[85%] h-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-all duration-300"
            />
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-rose-100 max-w-xs mx-auto">
            <img
              src={klydegrand}
              alt="Venue Mandapam"
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h4 className="font-serif font-bold text-lg text-rose-950 mb-1">
              SK KLYDE GRAND
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Pacific Business Park, Maharajpur, Sahibabad Industrial Area Site 4, Sahibabad, Ghaziabad, Uttar Pradesh 201010
            </p>
            <a
              href="https://maps.app.goo.gl/ZBVAeXVCkANd2di76"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-rose-900 text-amber-100 text-xs tracking-wider uppercase font-semibold rounded-full shadow hover:bg-rose-950 transition"
            >
              📍 View On Maps
            </a>
          </div>
        </section>

        {/* ================= SECTION 8: EVENT TIMELINE / FESTIVITIES ================= */}
        <section className="py-10 px-6 bg-white text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#e11d48] mb-2">The Celebrations Unfold</h2>
          <div className="flex justify-center items-center my-3">
            <img 
              src={fest} 
              alt="Festivities" 
              className="w-48 sm:w-56 max-w-[85%] h-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-all duration-300"
            />
          </div>

          <div className="space-y-8">
            {festivities.map((item, index) => {
              const isVisible = visibleFestivities.includes(String(index));

              return (
                <div
                  key={index}
                  ref={(el) => (festivityRefs.current[index] = el)}
                  data-index={index}
                  className={`
                    bg-white p-4 rounded-2xl shadow-xl border border-stone-200 
                    transition-all duration-1000 ease-out transform
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}
                >
                  {/* Event Image (Fully Vertical, No Cropping) */}
                  {item.image && (
                    <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-stone-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-auto block pointer-events-none" 
                      />
                    </div>
                  )}

                  {/* Event Details Layout */}
                  <div className="text-center flex flex-col items-center px-2 pb-2">
                    {/* Description */}
                    <p className="font-serif italic text-lg text-stone-600 mb-6">
                      {item.quote}
                    </p>
                    
                    {/* Dress Code Header */}
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#e7da24] mb-3">
                      DRESS CODE
                    </h2>

                    {/* Color Circles */}
                    {item.colors && (
                      <div className="flex space-x-3 justify-center mb-3">
                        {item.colors.map((color, i) => (
                          <span 
                            key={i} 
                            className="w-5 h-5 rounded-full shadow-md border border-stone-200"
                            style={{ backgroundColor: color }}
                          ></span>
                        ))}
                      </div>
                    )}

                    {/* Dress Code Text */}
                    <p className="text-sm font-serif text-stone-700 uppercase tracking-widest mb-6">
                      {item.dressCode}
                    </p>

                    {/* Divider Line */}
                    <hr className="w-4/5 border-t border-dashed border-stone-300 mb-5" />

                    {/* Venue Location */}
                    <p className="text-sm text-stone-600">
                      {item.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= SECTION 9: RSVP FORM ================= */}
        <section className="py-10 px-6 bg-[#fdf6f0] border-t border-rose-100">
          <div className="text-center mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#e11d48] mb-2">Join the Celebration</h2>
            <div className="flex justify-center items-center my-3">
              <img 
                src={rsvp} 
                alt="RSVP" 
                className="w-48 sm:w-56 max-w-[85%] h-auto object-contain select-none pointer-events-none filter drop-shadow-sm transition-all duration-300"
              />
            </div>
            <p className="text-lg font-italic-serif text-stone-500 mt-1">
              Kindly let us know if you can make it — your presence will make this celebration whole.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-xs mx-auto bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Full name"
                value={rsvpForm.name}
                onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-800"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-xs bg-stone-100 border border-r-0 border-stone-200 rounded-l-lg text-stone-500">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  placeholder="Number"
                  value={rsvpForm.phone}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-r-lg border border-stone-200 focus:outline-none focus:border-rose-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Will you join us?</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRsvpForm({ ...rsvpForm, status: 'accept' })}
                  className={`py-2 text-xs font-semibold rounded-lg border transition ${
                    rsvpForm.status === 'accept'
                      ? 'bg-rose-900 text-white border-rose-900'
                      : 'bg-white text-stone-600 border-stone-200'
                  }`}
                >
                  🎉 Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpForm({ ...rsvpForm, status: 'decline' })}
                  className={`py-2 text-xs font-semibold rounded-lg border transition ${
                    rsvpForm.status === 'decline'
                      ? 'bg-stone-800 text-white border-stone-800'
                      : 'bg-white text-stone-600 border-stone-200'
                  }`}
                >
                  🥺 Regretfully Decline
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Party Size</label>
              <select
                value={rsvpForm.guests}
                onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-rose-800"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? '(Just me)' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Dietary Preferences</label>
              <select
                value={rsvpForm.diet}
                onChange={(e) => setRsvpForm({ ...rsvpForm, diet: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-rose-800"
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Both">Both (Veg & Non-Veg)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Marriage Advice for Us</label>
              <textarea
                rows={2}
                placeholder="Share something sweet, funny, or wise..."
                value={rsvpForm.advice}
                onChange={(e) => setRsvpForm({ ...rsvpForm, advice: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-800"
              />
            </div>

            <button
              type="button"
              onClick={triggerConfetti}
              className="w-full py-3 bg-rose-900 text-amber-100 text-xs font-bold uppercase tracking-widest rounded-lg shadow hover:bg-rose-950 transition transform active:scale-95"
            >
              Send RSVP
            </button>
          </form>
        </section>

        {/* ================= SECTION 9: FOOTER ================= */}
        <footer className="py-8 px-6 bg-[#4a0e17] text-center text-amber-100/80">
          <p className="text-xs font-serif italic mb-2">
            "Come, dance, laugh, and celebrate with us in true Bollywood style!"
          </p>
          <div className="text-[10px] uppercase tracking-widest text-amber-300/60 mb-1">Warm Regards</div>
          <p className="text-xs font-semibold text-amber-200">Mrs Kumud & Mr Ajay Garg and family</p>
          <h4 className="text-2xl font-serif font-bold text-amber-300 mt-2">Vanshika & Umang</h4>
        </footer>
      </div>
    </div>
  );
}