'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ExperienciasPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.experience-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const experiences = [
    { title: 'CENAS / ALMUERZOS EJECUTIVOS', description: 'Espacios perfectos para reuniones corporativas con la mejor gastronomía', image: '/experiencias/CENA.jpg' },
    { title: 'CLASES DE COCINA PARTICIPATIVA', description: 'Aprende técnicas culinarias de la mano de nuestros chefs expertos', image: '/experiencias/CLASE.jpg' },
    { title: 'CENAS MARIDAJES', description: 'Descubre la perfecta combinación entre platos y vinos selectos', image: '/experiencias/MARIDAJES.jpg' },
    { title: 'MEAT TASTING CLASS', description: 'Explora los mejores cortes y sus preparaciones ideales', image: '/experiencias/MEAT.jpg' },
    { title: 'MASTER CLASS COCTELERÍA', description: 'Domina el arte de la mixología con nuestros bartenders profesionales', image: '/experiencias/CLASS.jpg' },
    { title: 'BUFFET CORPORATIVO', description: 'Soluciones completas para tus eventos empresariales', image: '/experiencias/BUFFET.jpg' },
    { title: 'TASTING DE DESTILADOS', description: 'Cata guiada de los mejores destilados y spirits premium', image: '/experiencias/COCTEL.jpg' }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
        <header className="text-center mb-16">
			<h1 className="text-4xl md:text-5xl font-bold">Experiencias</h1>
			<p className="text-gray-300 mt-3 max-w-2xl mx-auto">
				Conoce todo lo que tenemos para ti y tus colaboradores
			</p>
		</header>

      <div className="pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                data-index={index}
                className={`experience-card group relative overflow-hidden rounded-xl h-[500px] transition-all duration-700 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center rounded-full bg-red-600/90 backdrop-blur-sm text-white font-bold text-lg">
                    {index + 1}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {experience.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {experience.description}
                  </p>

                  <a
                    href={`https://wa.me/51998168693?text=Hola,%20me%20interesa%20la%20experiencia:%20${encodeURIComponent(experience.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-400 font-semibold hover:text-red-300 transition-all duration-300 hover:gap-4"
                  >
                    <span>Más información</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/50 transition-all duration-500 rounded-xl pointer-events-none"></div>
              </div> 
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-16 text-center px-4 pb-20">
        <h2 className="text-2xl font-bold mb-3">¿Listo para vivir la experiencia?</h2>
        <p className="text-gray-300 mb-6">Contáctanos para más información sobre nuestras experiencias</p>
        <a
          href="https://wa.me/51998168693?text=Hola,%20me%20gustaría%20conocer%20más%20sobre%20las%20experiencias%20en%20La%20Vaca%20Loca"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block px-8 py-3 bg-transparent border border-white/30 text-white font-medium text-base tracking-wide uppercase transition-all duration-500 overflow-hidden hover:border-white/60"
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
          <span className="relative z-10">Consultar Ahora</span>
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400/50 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-700"></div>
        </a>
      </section>
    </div>
  );
}
