import { motion } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';

const modules = import.meta.glob('../../assets/gallery/*.{jpg,JPG,jpeg,png,webp}', { eager: true });
const galleryImages = Object.values(modules).map((mod: any) => mod.default);

const captions = [
    "LEGENDARY MOMENTS", "HEROES CODING", "THE ORACLE SPEAKS", "BUILDING OLYMPUS",
    "CODE OF THE GODS", "TITAN'S WORK", "MYTHIC CREATIONS", "VICTORY FEAST",
    "THE ODYSSEY BEGINS", "SPARTAN DISCIPLINE", "ATHENIAN WISDOM", "DELPHI'S VISION"
];

export function PastPhotos() {
    const containerRef = useRef(null);
    const [columns, setColumns] = useState(5);

    // Responsive column calculation
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setColumns(2); // Mobile: 2 columns
            else if (window.innerWidth < 1024) setColumns(3); // Tablet: 3 columns
            else setColumns(5); // Desktop: 5 columns
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Memoize photo positions to prevent random jumping on re-renders, but updating on column change
    const photos = useMemo(() => {
        const rowHeight = columns < 3 ? 280 : 380; // Pixel height per row

        return galleryImages.map((src, i) => {
            const col = i % columns;
            const row = Math.floor(i / columns);

            // Calculate strictly aligned grid positions with minimal random jitter
            // This ensures "more aligned" and "easily visible" photos
            return {
                src,
                caption: captions[i % captions.length],
                // Subtle rotation for organic feel without chaos
                rotation: (i % 2 === 0 ? 1 : -1) * (2 + Math.random() * 3),
                // Pixel-based top position for stability
                top: row * rowHeight + 20 + (Math.random() * 15),
                // Percentage-based left position centered in column slot
                left: `${(col * (100 / columns)) + (columns < 3 ? 2 : 1)}%`,
                // Dynamic width to fill column cleanly
                width: columns < 3 ? '46%' : columns === 3 ? '30%' : '18%',
                zIndex: i + 1
            };
        });
    }, [columns]);

    // Calculate container height ensuring all items fit
    const rowHeight = columns < 3 ? 280 : 380;
    const totalHeight = Math.ceil(galleryImages.length / columns) * rowHeight + 200;

    return (
        <section className="min-h-screen bg-[#0c0a09] relative overflow-hidden flex flex-col items-center py-20 px-4 mythic-texture">
            {/* Title */}
            <div className="z-20 text-center mb-10 md:mb-20 relative pointer-events-none">
                <h2 className="text-4xl md:text-7xl font-[Uncial Antiqua] text-[#d4af37] tracking-wider drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)]">
                    Past Memories
                </h2>
                <div className="h-1 w-48 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4"></div>
                <p className="font-[Cinzel] text-[#a89f91] mt-4 tracking-[0.2em] uppercase text-xs md:text-sm">
                    {galleryImages.length} Artifacts Discovered
                </p>
            </div>

            {/* Scattered Gallery Container - Dynamic Height */}
            <div
                ref={containerRef}
                className="relative w-full max-w-[1400px]"
                style={{ height: `${totalHeight}px` }}
            >
                {photos.map((photo, i) => (
                    <motion.div
                        key={i}
                        drag
                        dragConstraints={containerRef}
                        whileHover={{ scale: 1.1, rotate: 0, zIndex: 1000 }}
                        whileDrag={{ scale: 1.1, zIndex: 1000 }}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: (i % columns) * 0.1 }}
                        className="absolute cursor-grab active:cursor-grabbing group touch-none"
                        style={{
                            top: photo.top,
                            left: photo.left,
                            width: photo.width,
                            rotate: photo.rotation,
                            zIndex: photo.zIndex
                        }}
                    >
                        {/* Photo Frame */}
                        <div className="bg-[#f0e6d2] p-2 pb-6 md:p-3 md:pb-10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform transition-colors duration-300 border border-[#d4af37]/40 w-full">
                            <div className="relative overflow-hidden aspect-[4/3] border border-black/10">
                                {/* Vintage Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#3e2715]/20 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
                                <div className="absolute inset-0 bg-sepia/10 z-10 pointer-events-none"></div>

                                <img
                                    src={photo.src}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover filter contrast-[1.05] sepia-[0.2] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500"
                                    draggable="false"
                                />
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center">
                                <p className="font-[Cinzel] text-[#3e2715] text-[9px] md:text-[11px] font-bold tracking-[0.15em] opacity-70 group-hover:opacity-100 uppercase truncate px-2">
                                    {photo.caption}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
