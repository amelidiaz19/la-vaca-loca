'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Mounted state for portal so we can animate exit before unmount
  const [isMounted, setIsMounted] = useState(false);
  // Visible controls the in/out animation (separate from mounted)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage mount + visible lifecycle so we can animate in and out
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (isMenuOpen) {
      setIsMounted(true);
      // after mount, toggle visible to start entrance animation
      t = setTimeout(() => setIsVisible(true), 20);
    } else {
      // start exit animation
      setIsVisible(false);
      // unmount after animation finishes
      t = setTimeout(() => setIsMounted(false), 320);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [isMenuOpen]);

  // Lock body scroll while sidebar is mounted (open or during exit animation)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const originalOverflow = document.body.style.overflow;
    if (isMounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, [isMounted]);

  return (
    <header className={`fixed w-full top-0 z-50 border-b border-transparent transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-33 h-33 relative">
              <Image
                src="/logo.png"
                alt="La Vaca Loca Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/experiencias/Carta-La-Vaca-Loca.pdf"
              target="_blank"
              className="text-white transition-colors duration-300 font-medium relative group drop-shadow-lg"
              onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Carta
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#ce1317' }}></span>
            </Link>
            <a
              href="https://wa.me/51912200693?text=Hola,%20me%20interesa%20contratar%20sus%20servicios%20para%20un%20evento%20corporativo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-300 font-medium relative group drop-shadow-lg"
              onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Corporativo & Eventos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#ce1317' }}></span>
            </a>
            <Link
              href="/experiencias"
              className="text-white transition-colors duration-300 font-medium relative group drop-shadow-lg"
              onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Experiencias
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#ce1317' }}></span>
            </Link>
            <Link
              href="/espacios"
              className="text-white transition-colors duration-300 font-medium relative group drop-shadow-lg"
              onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Espacios
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#ce1317' }}></span>
            </Link>
            <Link
              href="/galeria"
              className="text-white transition-colors duration-300 font-medium relative group drop-shadow-lg"
              onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Galeria
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#ce1317' }}></span>
            </Link>
            <Link
              href="/nosotros"
              className="text-white transition-colors duration-300 font-medium relative group drop-shadow-lg"
              onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#ce1317' }}></span>
            </Link>
            <a 
              href="https://wa.me/51998168693?text=Hola,%20me%20gustaría%20hacer%20una%20reserva%20en%20La%20Vaca%20Loca"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-2 bg-transparent border border-white/30 text-white font-medium text-sm tracking-wide uppercase transition-all duration-500 overflow-hidden hover:border-white/60"
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
              <span className="relative z-10">Reserva Ahora</span>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400/50 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-700"></div>
            </a>
          </div>

          {/* Botón Menú Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
            style={{ color: '#ce1317' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú Mobile Sidebar */}
        {/* Menú Mobile Sidebar (renderizado en portal para fijarlo al viewport) */}
        {isMounted && typeof document !== 'undefined' && createPortal(
          <div className="fixed inset-0 z-100">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar Panel */}
            <aside className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-black shadow-2xl overflow-y-auto transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800/30">
                <div className="w-25 h-25 relative">
                  <Image
                    src="/logo.png"
                    alt="La Vaca Loca Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
                  style={{ color: '#ce1317' }}
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex flex-col h-full">
                <nav className="flex-1 p-6 space-y-0">
                  <Link
                    href="/experiencias/Carta-La-Vaca-Loca.pdf"
                    target="_blank"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-4 font-semibold text-white text-sm hover:bg-white/5 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-red-600 hover:pl-6"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    CARTA
                  </Link>

                  <a
                    href="https://wa.me/51912200693?text=Hola,%20me%20interesa%20contratar%20sus%20servicios%20para%20un%20evento%20corporativo"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-4 font-semibold text-white text-sm hover:bg-white/5 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-red-600 hover:pl-6"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    CORPORATIVO & EVENTOS
                  </a>

                  <Link
                    href="/experiencias"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-4 font-semibold text-white text-sm hover:bg-white/5 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-red-600 hover:pl-6"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    EXPERIENCIAS
                  </Link>

                   <Link
                    href="/espacios"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-4 font-semibold text-white text-sm hover:bg-white/5 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-red-600 hover:pl-6"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    ESPACIOS
                  </Link>

                  <Link
                    href="/galeria"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-4 font-semibold text-white text-sm hover:bg-white/5 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-red-600 hover:pl-6"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    GALERIA
                  </Link>

                  {/* 
                  <Link
                    href="/nosotros"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-4 font-semibold text-white text-sm hover:bg-white/5 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-red-600 hover:pl-6"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ce1317'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    NOSOTROS
                  </Link>
                  */}
                  
                  {/* Reserva Ahora - ubicado justo después de NOSOTROS */}
                  <div className="mt-4 px-4">
                    <a 
                      href="https://wa.me/51998168693?text=Hola,%20me%20gustaría%20hacer%20una%20reserva%20en%20La%20Vaca%20Loca"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="group relative w-full px-6 py-3 bg-transparent border border-white/30 text-white font-medium text-sm tracking-wide uppercase transition-all duration-500 overflow-hidden hover:border-white/60 rounded-md block text-center"
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
                      <span className="relative z-10">Reserva Ahora</span>
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400/50 transition-all duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-700"></div>
                    </a>
                  </div>
                </nav>
              </div>
            </aside>
          </div>,
          document.body
        )}
      </nav>
    </header>
  );
}
