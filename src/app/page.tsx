'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const imageNames = [
  'DSC03585-1.jpg',
  'DSC01257-1.jpg',
  'DSC03624-1.jpg',
  'DSC05123-1.jpg',
  'DSC05171-1.jpg',
  'DSC02685-1.jpg',
  'DSC03809-1.jpg',
  'DSC05180-1.jpg',
];

const getImageSrc = (name: string) => {
  return `/experiencias/${name}`;
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Forzar la animación de la primera imagen
    const startAnimation = setTimeout(() => {
      setHasStarted(true);
    }, 100);

    return () => clearTimeout(startAnimation);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageNames.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % imageNames.length);
    setIsAutoPlay(false);
  };

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden">
      {/* Carrusel Hero */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Imágenes */}
        <div className="relative w-full h-full">
          {imageNames.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={getImageSrc(image)}
                alt={`La Vaca Loca - Imagen ${index + 1}`}
                fill
                className="object-cover"
                style={{
                  transform: index === currentIndex && hasStarted ? 'scale(1)' : 'scale(1.25)',
                  transition: index === currentIndex && hasStarted ? 'transform 20s ease-out' : 'none'
                }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

  {/* Overlay oscuro */}
  <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/80 z-10" />

        {/* Contenido sobre las imágenes */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg animate-fadeInUp-1">
            La Vaca Loca
          </h1>
          <p className="text-2xl md:text-3xl text-gray-100 mb-2 drop-shadow-md animate-fadeInUp-2">
            Restaurant & Parrillas
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl px-4 drop-shadow-md animate-fadeInUp-3">
            15 años de trayectoria ofreciendo carnes premium y la mejor experiencia culinaria en el corazón de Miraflores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fadeInUp-4">
            <a 
              href="/experiencias/Carta-La-Vaca-Loca.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-transparent border border-white/30 text-white font-medium text-base tracking-wide uppercase transition-all duration-500 overflow-hidden hover:border-white/60"
              style={{
                background: 'linear-gradient(135deg, rgba(206, 19, 23, 0.1) 0%, rgba(206, 19, 23, 0.05) 100%)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(206, 19, 23, 0.9) 0%, rgba(206, 19, 23, 0.7) 100%)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(206, 19, 23, 0.1) 0%, rgba(206, 19, 23, 0.05) 100%)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span className="relative z-10">Ver Carta</span>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400/50 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-700"></div>
            </a>
            
            <a
              href="https://wa.me/51998168693?text=Hola,%20me%20gustaría%20hacer%20una%20reserva%20en%20La%20Vaca%20Loca"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-transparent text-white font-medium text-base tracking-wide uppercase transition-all duration-500 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)), linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)';
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="relative z-10">Reservar</span>
              <div className="absolute inset-0 border border-transparent group-hover:border-white/40 transition-all duration-500"></div>
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-linear-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-700"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-linear-to-l from-white/60 to-white/30 group-hover:w-full transition-all duration-700 delay-150"></div>
            </a>
          </div>
        </div>

        {/* Indicadores de puntos */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 flex-wrap justify-center max-w-sm">
          {imageNames.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8'
                  : 'bg-white/50 hover:bg-white/75 w-2'
              }`}
              style={index === currentIndex ? { backgroundColor: '#ce1317' } : {}}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
