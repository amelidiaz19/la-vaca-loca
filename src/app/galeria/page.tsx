"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const imageNames = [
	'620662-22.jpg',
	'620662-23.jpg',
	'620662-24.jpg',
	'620662-25.jpg',
	'620662-26.jpg',
	'620662-28.jpg',
	'620662-29.jpg',
	'620662-31.jpg',
	'620662-32.jpg',
	'620662-35.jpg',
	'620662-39.jpg',
	'620662-40.jpg',
	'620662-43.jpg',
	'620662-44.jpg',
	'620662-48.jpg',
];

const getImageSrc = (name: string) => {
	return `/experiencias/galeria/${name}`;
};

export default function GaleriaPage() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = parseInt(entry.target.getAttribute('data-index') || '0');
					
					if (entry.isIntersecting) {
						setVisibleImages((prev) => new Set([...prev, index]));
					}
				});
			},
			{ threshold: 0.3 }
		);

		const imageElements = document.querySelectorAll('.gallery-image');
		imageElements.forEach((img) => observer.observe(img));

		return () => observer.disconnect();
	}, []);

	return (
		<div className="min-h-screen bg-black text-white px-4 py-20">
			<div className="max-w-7xl mx-auto">
				<header className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold">Galería</h1>
					<p className="text-gray-300 mt-3 max-w-2xl mx-auto">
						Descubre los momentos y espacios que hacen de La Vaca Loca un lugar único.
					</p>
				</header>

				{/* Grid de imágenes - 4 columnas */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{imageNames.map((image, idx) => (
						<div
							key={idx}
							data-index={idx}
							className={`gallery-image relative aspect-3/4 rounded-xl overflow-hidden cursor-pointer group transition-all duration-700 ${visibleImages.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
							onClick={() => setSelectedImage(getImageSrc(image))}
						>
							<Image
								src={getImageSrc(image)}
								alt={`Galería La Vaca Loca ${idx + 1}`}
								fill
								unoptimized
								className="object-cover transition-transform duration-500 group-hover:scale-110"
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
						</div>
					))}
				</div>

				{/* CTA Section */}
				<section className="mt-16 text-center">
					<h2 className="text-2xl font-bold mb-3">¿Te gustó lo que viste?</h2>
					<p className="text-gray-300 mb-6">Vive la experiencia en La Vaca Loca</p>
					<a
						href="https://wa.me/51998168693?text=Hola,%20me%20gustaría%20hacer%20una%20reserva%20en%20La%20Vaca%20Loca"
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
						<span className="relative z-10">Reservar Ahora</span>
						<div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400/50 transition-all duration-500"></div>
						<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-700"></div>
					</a>
				</section>
			</div>

			{/* Modal de imagen ampliada */}
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
					onClick={() => setSelectedImage(null)}
				>
					<button
						onClick={() => setSelectedImage(null)}
						className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
						aria-label="Cerrar"
					>
						&times;
					</button>
					<div className="relative w-full h-full max-w-6xl max-h-[90vh] animate-slideUp">
						<Image
							src={selectedImage}
							alt="Imagen ampliada"
							fill
							unoptimized
							className="object-contain"
							sizes="100vw"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
