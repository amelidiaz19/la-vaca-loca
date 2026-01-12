'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-black to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ce1317' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Logo and Brand Section */}
            <div className="lg:col-span-5">
              <div className="flex items-center mb-6">
                <div>
                  <h3 className="text-3xl font-bold" style={{ color: '#ce1317' }}>
                    La Vaca Loca
                  </h3>
                  <p className="text-sm text-gray-400 font-light">
                    Restaurant & Parrillas
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Desde hace 15 años, ofrecemos la experiencia gastronómica más auténtica de Lima. 
                Carnes premium, tradición parrillera y sabores que despiertan los sentidos.
              </p>

              <div className="flex flex-col space-y-3">
                <a 
                  href="https://maps.app.goo.gl/XPxrRWSxvhcZxCjA8" 
                  target="_blank"
                  className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Av. Sta. Cruz 900, Miraflores 15073</span>
                </a>
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Martes a Domingo 12:00 - 23:00
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Navegación
              </h4>
              <nav className="space-y-4">
                {[
                  { name: 'Carta', href: '/experiencias/Carta-La-Vaca-Loca.pdf' },
                  { name: 'Nosotros', href: '/nosotros' },
                  { name: 'Galería', href: '/galeria' },
                  { name: 'Contacto', href: '/contacto' }
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    target={link.name === 'Carta' ? '_blank' : undefined}
                    rel={link.name === 'Carta' ? 'noopener noreferrer' : undefined}
                    className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 group"
                  >
                    <span className="inline-flex items-center">
                      <span className="w-0 group-hover:w-2 h-px transition-all duration-300 mr-0 group-hover:mr-2" style={{ backgroundColor: '#ce1317' }}></span>
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Espacios */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Espacios
              </h4>
              <nav className="space-y-4">
                {[
                  { name: 'Lounge', href: '/espacios#loungue' },
                  { name: 'Salón Principal', href: '/espacios#salon' },
                  { name: 'Salón Privado', href: '/espacios#salon-privado' },
                  { name: 'Terraza', href: '/espacios#terraza-alta' },
                  { name: 'Terraza Baja', href: '/espacios#terraza-baja' }
                ].map((espacio) => (
                  <Link 
                    key={espacio.name}
                    href={espacio.href} 
                    className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 group"
                  >
                    <span className="inline-flex items-center">
                      <span className="w-0 group-hover:w-2 h-px transition-all duration-300 mr-0 group-hover:mr-2" style={{ backgroundColor: '#ce1317' }}></span>
                      {espacio.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Reservas & Contacto
              </h4>
              
              <div className="space-y-6">
                {/* Phone Numbers */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'rgba(206, 19, 23, 0.1)' }}>
                      <svg className="w-4 h-4" style={{ color: '#ce1317' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium text-sm">Salón Principal</p>
                      <a 
                        href="tel:+51998168693" 
                        className="text-white hover:text-red-400 transition-colors duration-300 font-semibold"
                      >
                        998 168 693
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'rgba(206, 19, 23, 0.1)' }}>
                      <svg className="w-4 h-4" style={{ color: '#ce1317' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium text-sm">Corporativos & Eventos</p>
                      <a 
                        href="tel:+51912200693" 
                        className="text-white hover:text-red-400 transition-colors duration-300 font-semibold"
                      >
                        912 200 693
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'rgba(206, 19, 23, 0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#ce1317' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium text-sm">Email</p>
                    <a 
                      href="mailto:reservas@lavacaloca.pe" 
                      className="text-white hover:text-red-400 transition-colors duration-300 break-all"
                    >
                      reservas@lavacaloca.pe
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <p className="text-gray-300 font-medium text-sm mb-3">Síguenos</p>
                  <div className="flex space-x-3">
                    <a
                      href="https://www.instagram.com/lavacalocarestaurante" target="_blank"
                      className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500 transition-all duration-300 group"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/lavacalocarestaurante" target="_blank"
                      className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500 transition-all duration-300 group"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>© {new Date().getFullYear()} La Vaca Loca</span>
                <span className="hidden md:inline">•</span>
                <span>Todos los derechos reservados</span>
                <span className="hidden md:inline">•</span>
                <a
                  href="https://github.com/amelidiaz19"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Desarrollado por Ameli Diaz - GitHub"
                >
                  <span className="underline">Desarrollado por Ameli Diaz</span>
                </a>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <Link href="/privacidad" className="hover:text-white transition-colors duration-300">
                  Política de Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-white transition-colors duration-300">
                  Términos de Uso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}