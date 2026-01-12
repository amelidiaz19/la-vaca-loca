"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Space = {
	id: string;
	title: string;
	description: string;
	images: string[];
	capacity?: { pax: number; seated: number; standing: number } | null;
};

const PUBLIC_EXPERIENCIAS_PREFIX = '/experiencias';

const normalizeSpaceImage = (img: string) => {
	if (!img) return img;
	if (img.startsWith('http')) return img;
	if (img.startsWith(`${PUBLIC_EXPERIENCIAS_PREFIX}/`)) return img;
	if (img.startsWith('/')) return `${PUBLIC_EXPERIENCIAS_PREFIX}${img}`;
	return `${PUBLIC_EXPERIENCIAS_PREFIX}/${img}`;
};

const spaces: Space[] = [
	{
		id: "loungue",
		title: "Loungue",
		description: `Espacio moderno y sofisticado, ideal para una experiencia más relajada o social. Con una atmósfera algo más informal que el salón, apto para cócteles, pequeños grupos y momentos de networking o after-hours. Ideal para: master class de coctelería, grupos que buscan un ambiente más lounge antes o después de la parrilla, reuniones informales de empresa.`,
		images: [`/loungue/20250730_192303.jpg`],
	capacity: { pax: 60, seated: 25, standing: 35 },
	},
	{
		id: "salon",
		title: "Salón Principal",
		description: `Un ambiente cálido y acogedor, pensado para comidas o cenas formales, grupos medianos o eventos corporativos. El salón ofrece la amplitud suficiente para una experiencia cómoda, sin perder la intimidad ni la elegancia. Ideal para: almuerzos ejecutivos, cenas de negocio, grupos de trabajo que quieran una experiencia de parrilla de alto nivel con privacidad moderada.`,
		images: [`/salon/20250725_181148.jpg`, `/salon/20250725_181204.jpg`],
	capacity: { pax: 175, seated: 75, standing: 100 },
	},
	{
		id: "salon-privado",
		title: "Salón Privado",
		description: `Ambiente íntimo y reservado, perfecto para reuniones exclusivas, cenas de alta dirigencia, o experiencias personalizadas en torno a la carne y la parrilla. Permite mayor privacidad y trato más personalizado. Ideal para: sesiones privadas de "meat testing", grupos selectos de degustación, clientes VIP, o reuniones de trabajo que quieren combinar lo profesional con un ambiente gourmet.`,
		images: [`/salon-privado/20250725_181041.jpg`],
	capacity: { pax: 10, seated: 10, standing: 0 },
	},
	{
		id: "terraza-alta",
		title: "Terraza",
		description: `Un espacio abierto, rodeado de vegetación y bañado por luz natural. Combina elegancia y frescura con mantelería blanca y detalles florales que crean un ambiente relajado y sofisticado. Ideal para: almuerzos o cenas al aire libre, celebraciones familiares y eventos corporativos informales.`,
		images: [`/terraza-alta/20250725_164218.jpg`, `/terraza-alta/DSC04153-1.jpg`, `/terraza-alta/DSC08176-1.jpg`, `/terraza-alta/DSC08407-1.jpg`, `/terraza-alta/DSC08440-1.jpg`, `/terraza-alta/DSC08665-1.jpg`],
		capacity: null,
	},
	{
		id: "terraza-baja",
		title: "Terraza Baja",
		description: `Espacio exterior acogedor, ideal para reuniones relajadas.`,
		images: [`/terraza-baja/DSC00977-1.jpg`, `/terraza-baja/DSC00984-1.jpg`, `/terraza-baja/DSC00987.jpg`, `/terraza-baja/DSC00992-1.jpg`, `/terraza-baja/DSC00993-1.jpg`, `/terraza-baja/DSC01000-1.jpg`, `/terraza-baja/DSC01003-1.jpg`],
		capacity: null,
	},
];

export default function EspaciosPage() {
	const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
	const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>({});

	useEffect(() => {
		// Handle hash navigation with offset
		const handleHashNavigation = () => {
			const hash = window.location.hash;
			if (hash) {
				setTimeout(() => {
					const element = document.querySelector(hash);
					if (element) {
						const offset = 100; // Offset from top
						const elementPosition = element.getBoundingClientRect().top;
						const offsetPosition = elementPosition + window.pageYOffset - offset;
						
						window.scrollTo({
							top: offsetPosition,
							behavior: 'smooth'
						});
					}
				}, 100);
			}
		};

		// Run on mount
		handleHashNavigation();

		// Listen for hash changes
		window.addEventListener('hashchange', handleHashNavigation);
		
		return () => window.removeEventListener('hashchange', handleHashNavigation);
	}, []);

	useEffect(() => {
		// Observe cards for visibility
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = parseInt(entry.target.getAttribute('data-index') || '0');
					
					if (entry.isIntersecting) {
						// Card is visible
						setVisibleCards((prev) => new Set([...prev, index]));
					}
				});
			},
			{ threshold: 0.3 }
		);

		const cards = document.querySelectorAll('.space-card');
		cards.forEach((card) => observer.observe(card));

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		// Auto-rotate all images from the start
		const interval = setInterval(() => {
			setCurrentImageIndexes((prev) => {
				const next = { ...prev };
				spaces.forEach((space) => {
					// Rotate all spaces with multiple images
					if (space.images.length > 1) {
						const currentIndex = prev[space.id] || 0;
						next[space.id] = (currentIndex + 1) % space.images.length;
					}
				});
				return next;
			});
		}, 2300);

		return () => clearInterval(interval);
	}, []);

	const nextImage = (spaceId: string, imagesLength: number) => {
		setCurrentImageIndexes((prev) => ({
			...prev,
			[spaceId]: ((prev[spaceId] || 0) + 1) % imagesLength,
		}));
	};

	const prevImage = (spaceId: string, imagesLength: number) => {
		setCurrentImageIndexes((prev) => ({
			...prev,
			[spaceId]: ((prev[spaceId] || 0) - 1 + imagesLength) % imagesLength,
		}));
	};

	return (
		<div className="min-h-screen bg-black text-white px-4 py-20">
			<div className="max-w-7xl mx-auto">
				<header className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold">Nuestros Espacios</h1>
					<p className="text-gray-300 mt-3 max-w-2xl mx-auto">
						Conoce los ambientes de La Vaca Loca. Reserva la zona que mejor se adapte a tu evento o cena.
					</p>
				</header>

				<div className="space-y-12">
					{spaces.map((space, idx) => (
						<section 
							key={space.id}
							id={space.id}
							data-index={idx}
							data-space-id={space.id}
							className={`space-card flex flex-col md:flex-row items-stretch gap-6 md:gap-10 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} transition-all duration-700 ${visibleCards.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
							style={{ 
								scrollMarginTop: '120px'
							}}
						>
							{/* Image side with crossfade transition */}
							<div className="relative flex-1 rounded-xl overflow-hidden group">
								<div className="h-[372px] sm:h-[408px] lg:h-[508px] w-full relative">
									{/* Render all images with opacity transitions */}
										{space.images.map((img, imgIdx) => (
											<Image 
												key={`${space.id}-${imgIdx}`}
												src={normalizeSpaceImage(img)} 
												alt={`${space.title} - ${imgIdx + 1}`} 
												fill 
												className={`object-cover w-full h-full transform transition-all duration-1000 group-hover:scale-105 ${
													(currentImageIndexes[space.id] || 0) === imgIdx 
														? 'opacity-100 z-10' 
														: 'opacity-0 z-0'
												}`}
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										))}
									<div className="absolute inset-0 bg-black/30 z-20" />
									
									{/* Navigation arrows - only show if multiple images */}
									{space.images.length > 1 && (
										<>
											<button
												onClick={(e) => {
													e.stopPropagation();
													prevImage(space.id, space.images.length);
												}}
												className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity z-30"
												aria-label="Imagen anterior"
											>
												<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
												</svg>
											</button>

											<button
												onClick={(e) => {
													e.stopPropagation();
													nextImage(space.id, space.images.length);
												}}
												className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity z-30"
												aria-label="Imagen siguiente"
											>
												<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
												</svg>
											</button>

											{/* Image indicator dots */}
											<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
												{space.images.map((_, imgIdx) => (
													<button
														key={imgIdx}
														onClick={(e) => {
															e.stopPropagation();
															setCurrentImageIndexes((prev) => ({
																...prev,
																[space.id]: imgIdx,
															}));
														}}
														className={`w-2 h-2 rounded-full transition-all ${
															(currentImageIndexes[space.id] || 0) === imgIdx
																? 'bg-white w-8'
																: 'bg-white/50 hover:bg-white/75'
														}`}
														aria-label={`Ver imagen ${imgIdx + 1}`}
													/>
												))}
											</div>
										</>
									)}
								</div>
							</div>

							{/* Content side */}
							<div className="flex-1 flex flex-col justify-center p-6 md:p-8 bg-transparent rounded-xl">
								<span className="text-sm uppercase tracking-wider text-red-300 mb-2">Espacio</span>
								<h3 className="text-3xl md:text-4xl font-bold mb-4">{space.title}</h3>
								<div className="prose prose-sm prose-invert max-w-none text-gray-300 mb-4" style={{ lineHeight: 1.6 }}>
									{space.description.split('\n').map((p, i) => (
										<p key={i}>{p}</p>
									))}
								</div>

								{space.capacity ? (
									<div className="mt-2 text-gray-200">
										<strong>Aforo:</strong> {space.capacity.pax} px | {space.capacity.seated} sentados — {space.capacity.standing} parados
									</div>
								) : null}
							</div>
						</section>
					))}
				</div>

				<section id="reservar" className="mt-16 text-center">
					<h2 className="text-2xl font-bold mb-3">¿Listo para reservar?</h2>
					<p className="text-gray-300 mb-6">Contáctanos para reservar el espacio que prefieras.</p>
					<a
						href="tel:+51912345678"
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
		</div>
	);
}
