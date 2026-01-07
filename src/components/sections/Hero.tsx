
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Timer countdown logic
    useEffect(() => {
        // Set target date (you can modify this to your desired countdown target)
        const targetDate = new Date('2026-03-13T00:00:00');

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let animationId: number;

        try {
            // Three.js setup
            const canvas = canvasRef.current;
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;

            camera.position.z = 1;

            // Set a default background color first
            scene.background = new THREE.Color(0x000011);

            // Load skybox
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                '/skybox.jpg',
                (texture: THREE.Texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    scene.background = texture;
                    scene.environment = texture;
                },
                undefined,
                (error) => {
                    console.warn('Failed to load skybox texture:', error);
                    // Keep the fallback background color
                }
            );

            // Simple falling gold particle system
            const particleCount = 400;
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                // Spread particles across the scene
                positions[i] = (Math.random() - 0.5) * 6;     // X position
                positions[i + 1] = (Math.random() - 0.5) * 6; // Y position  
                positions[i + 2] = (Math.random() - 0.5) * 3; // Z position

                // Gentle falling velocities
                velocities[i] = (Math.random() - 0.5) * 0.01;      // Slight horizontal drift
                velocities[i + 1] = -0.008 - Math.random() * 0.005; // Gentle downward
                velocities[i + 2] = (Math.random() - 0.5) * 0.005;  // Slight depth movement
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

            // Create circular texture for particles
            function createCircleTexture() {
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const context = canvas.getContext('2d')!;

                // Create radial gradient for smooth circular particles
                const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
                gradient.addColorStop(0, 'rgba(255, 215, 0, 1)');    // Gold center
                gradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.8)'); // Fade
                gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');     // Transparent edge

                context.fillStyle = gradient;
                context.fillRect(0, 0, 64, 64);

                return new THREE.CanvasTexture(canvas);
            }

            const particleTexture = createCircleTexture();

            const particleMaterial = new THREE.PointsMaterial({
                color: 0xFFD700, // Gold color
                size: 4,
                map: particleTexture,
                transparent: true,
                opacity: 0.8,
                sizeAttenuation: false,
                alphaTest: 0.1,
                blending: THREE.AdditiveBlending
            });

            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            function animate() {
                animationId = requestAnimationFrame(animate);

                try {
                    // Simple falling particle animation
                    const positionAttribute = particleGeometry.getAttribute('position');
                    const velocityAttribute = particleGeometry.getAttribute('velocity');
                    const positions = positionAttribute.array as Float32Array;
                    const velocities = velocityAttribute.array as Float32Array;

                    for (let i = 0; i < particleCount * 3; i += 3) {
                        // Update positions
                        positions[i] += velocities[i];         // X
                        positions[i + 1] += velocities[i + 1]; // Y
                        positions[i + 2] += velocities[i + 2]; // Z

                        // Reset particles that fall below the view
                        if (positions[i + 1] < -3) {
                            positions[i + 1] = 3;
                            positions[i] = (Math.random() - 0.5) * 6;
                            positions[i + 2] = (Math.random() - 0.5) * 3;
                        }

                        // Keep particles within bounds
                        if (positions[i] > 3) positions[i] = -3;
                        if (positions[i] < -3) positions[i] = 3;
                        if (positions[i + 2] > 1.5) positions[i + 2] = -1.5;
                        if (positions[i + 2] < -1.5) positions[i + 2] = 1.5;
                    }

                    positionAttribute.needsUpdate = true;
                    renderer.render(scene, camera);
                } catch (error) {
                    console.error('Animation error:', error);
                }
            }

            animate();

            // Handle resize
            const handleResize = () => {
                try {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                } catch (error) {
                    console.error('Resize error:', error);
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                try {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                    }
                    window.removeEventListener('resize', handleResize);
                    renderer.dispose();
                    particleGeometry.dispose();
                    particleMaterial.dispose();
                    particleTexture.dispose();
                } catch (error) {
                    console.error('Cleanup error:', error);
                }
            };
        } catch (error) {
            console.error('Three.js initialization error:', error);
            // Fallback: hide the canvas if Three.js fails
            if (canvasRef.current) {
                canvasRef.current.style.display = 'none';
            }
        }
    }, []);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

            {/* Three.js Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                style={{ display: 'block', width: '100%', height: '100%' }}
            />

            {/* Lightning Bolt Overlay with Rotating Rings */}
            <div className="absolute inset-0 z-10">
                {/* Title and Subtitle */}
                <div
                    className="absolute"
                    style={{
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textAlign: 'center',
                        zIndex: 15,
                    }}
                >
                    {/* Main Title */}
                    <h1
                        className="font-cinzel"
                        style={{
                            fontSize: 'clamp(40px, 5vw, 64px)',
                            fontWeight: 'bold',
                            color: '#d4af37',
                            textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)',
                            letterSpacing: '4px',
                            marginBottom: '4px',
                        }}
                    >
                        HACKJKLU 5.0
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="font-cinzel"
                        style={{
                            fontSize: 'clamp(14px, 2vw, 18px)',
                            fontStyle: 'italic',
                            color: 'rgba(212, 175, 55, 0.9)',
                            textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                            letterSpacing: '2px',
                        }}
                    >
                        13 March - 15 March 2026
                    </p>
                </div>

                {/* Rings hover container - sized to match outer ring */}
                <div
                    className="absolute rings-container"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'min(600px, 80vw)',
                        height: 'min(600px, 80vw)', // Keep it square
                        maxHeight: '60vh', // Don't overflow height
                        maxWidth: '60vh', // Keep it square based on height too
                        pointerEvents: 'auto',
                        zIndex: 5,
                    }}
                >
                    {/* Outer Runic Ring - Outermost, rotates anticlockwise */}
                    <div
                        className="absolute"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',   // Full container width
                            height: '100%',  // Full container height
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="/outer_runic_ring.png"
                            alt="Outer Runic Ring"
                            className="ring-glow-outer"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                opacity: 0.8,
                            }}
                        />
                    </div>

                    {/* Middle Ring - Middle, rotates clockwise */}
                    <div
                        className="absolute"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '72%',    // Slightly increased for better flow
                            height: '72%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="/middle_ring.png"
                            alt="Middle Ring"
                            className="ring-glow-middle"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                opacity: 0.85,
                            }}
                        />
                    </div>

                    {/* Inner Ring - Innermost, rotates anticlockwise */}
                    <div
                        className="absolute"
                        style={{
                            top: '49%',      // Nudged up slightly for visual centering
                            left: '50.2%',   // Nudged right slightly
                            transform: 'translate(-50%, -50%)',
                            width: '40%',
                            height: '40%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="/inner_ring.png"
                            alt="Inner Ring"
                            className="ring-glow-inner"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                opacity: 0.9,
                            }}
                        />
                    </div>
                </div>

                {/* Lightning Bolt - On top of all rings */}
                <img
                    src="/lightning-bolt.png"
                    alt="Lightning Bolt"
                    className="absolute"
                    style={{
                        bottom: '0%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '70%',
                        height: '85%',
                        objectFit: 'contain',
                        objectPosition: 'bottom center',
                        opacity: 1,
                        zIndex: 10,
                    }}
                />

                {/* Ancient Greek Timer */}
                <div
                    className="absolute font-medieval"
                    style={{
                        top: '82%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 15,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px 32px',
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(184, 134, 11, 0.15))',
                            border: '2px solid rgba(212, 175, 55, 0.4)',
                            borderRadius: '4px',
                            boxShadow: 'inset 0 2px 0 rgba(212, 175, 55, 0.3), 0 0 25px rgba(212, 175, 55, 0.2)',
                        }}
                    >
                        {/* Days */}
                        <div style={{ textAlign: 'center' }}>
                            <div
                                className="font-uncial"
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#d4af37',
                                    textShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
                                }}
                            >
                                {String(timeLeft.days).padStart(2, '0')}
                            </div>
                            <div
                                className="font-cinzel"
                                style={{
                                    fontSize: '11px',
                                    color: 'rgba(212, 175, 55, 0.8)',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    marginTop: '4px',
                                }}
                            >
                                DAYS
                            </div>
                        </div>

                        <div className="font-uncial" style={{ color: '#d4af37', fontSize: '24px', fontWeight: 'bold' }}>:</div>

                        {/* Hours */}
                        <div style={{ textAlign: 'center' }}>
                            <div
                                className="font-uncial"
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#d4af37',
                                    textShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
                                }}
                            >
                                {String(timeLeft.hours).padStart(2, '0')}
                            </div>
                            <div
                                className="font-cinzel"
                                style={{
                                    fontSize: '11px',
                                    color: 'rgba(212, 175, 55, 0.8)',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    marginTop: '4px',
                                }}
                            >
                                HOURS
                            </div>
                        </div>

                        <div className="font-uncial" style={{ color: '#d4af37', fontSize: '24px', fontWeight: 'bold' }}>:</div>

                        {/* Minutes */}
                        <div style={{ textAlign: 'center' }}>
                            <div
                                className="font-uncial"
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#d4af37',
                                    textShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
                                }}
                            >
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </div>
                            <div
                                className="font-cinzel"
                                style={{
                                    fontSize: '11px',
                                    color: 'rgba(212, 175, 55, 0.8)',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    marginTop: '4px',
                                }}
                            >
                                MINUTES
                            </div>
                        </div>

                        <div className="font-uncial" style={{ color: '#d4af37', fontSize: '24px', fontWeight: 'bold' }}>:</div>

                        {/* Seconds */}
                        <div style={{ textAlign: 'center' }}>
                            <div
                                className="font-uncial"
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#d4af37',
                                    textShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
                                }}
                            >
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </div>
                            <div
                                className="font-cinzel"
                                style={{
                                    fontSize: '11px',
                                    color: 'rgba(212, 175, 55, 0.8)',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    marginTop: '4px',
                                }}
                            >
                                SECONDS
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote text - inscription style */}
                <p
                    className="absolute font-cinzel"
                    style={{
                        bottom: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '13px',
                        fontStyle: 'italic',
                        color: '#d4af37',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        textShadow: '0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
                        zIndex: 15,
                    }}
                >
                    — Where Innovation Meets Code —
                </p>
            </div>

        </section>
    );
}
