
import { motion } from 'framer-motion';

const photos = [
    "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
];

export function PastPhotos() {
    return (
        <section id="gallery" className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4">
            <h2 className="text-4xl md:text-6xl font-[Cinzel] text-white tracking-[0.2em] mb-20 text-center">Past Memories</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {photos.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative aspect-video overflow-hidden group rounded-sm"
                    >
                        <img src={src} alt={`Memory ${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
