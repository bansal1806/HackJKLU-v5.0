'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { type ISourceOptions } from '@tsparticles/engine';

interface RealmParticlesProps {
    variant: 'zeus' | 'poseidon' | 'hades';
}

export function RealmParticles({ variant }: RealmParticlesProps) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    const getOptions = (variant: 'zeus' | 'poseidon' | 'hades'): ISourceOptions => {
        const common: ISourceOptions = {
            fullScreen: { enable: false },
            detectRetina: true,
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: {
                        enable: true,
                        delay: 0.5
                    }
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            }
        };

        if (variant === 'zeus') {
            // Cosmic Dust - Twinkling stars
            return {
                ...common,
                particles: {
                    number: {
                        value: 120,
                        density: {
                            enable: true,
                            width: 1920,
                            height: 1080
                        }
                    },
                    color: {
                        value: ["#ffffff", "#ffd700", "#b0e0e6"]
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.8 },
                        animation: {
                            enable: true,
                            speed: 0.5,
                            sync: false
                        }
                    },
                    size: {
                        value: { min: 1, max: 3 },
                        animation: {
                            enable: true,
                            speed: 2,
                            sync: false
                        }
                    },
                    move: {
                        enable: true,
                        speed: 0.2,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: "out"
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    }
                }
            };
        } else if (variant === 'poseidon') {
            // Ocean Bubbles
            return {
                ...common,
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            width: 1920,
                            height: 1080
                        }
                    },
                    color: {
                        value: ["#e0f7fa", "#80deea", "#ffffff"]
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.6 },
                        animation: {
                            enable: false
                        }
                    },
                    size: {
                        value: { min: 1, max: 6 }
                    },
                    move: {
                        enable: true,
                        speed: { min: 0.5, max: 2 },
                        direction: "top",
                        random: true,
                        straight: false,
                        outModes: "out"
                    },
                    wobble: {
                        enable: true,
                        distance: 5,
                        speed: 10
                    }
                }
            };
        } else {
            // Hades Embers
            return {
                ...common,
                particles: {
                    number: {
                        value: 150,
                        density: {
                            enable: true,
                            width: 1920,
                            height: 1080
                        }
                    },
                    color: {
                        value: ["#ff4500", "#ff8c00", "#ff0000"]
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: { min: 0.1, max: 1 },
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false,
                            mode: "decrease",
                            startValue: "max",
                            destroy: "min"
                        }
                    },
                    size: {
                        value: { min: 2, max: 4 }
                    },
                    move: {
                        enable: true,
                        speed: { min: 0.5, max: 1.5 },
                        direction: "top",
                        random: true,
                        straight: false,
                        outModes: "out",
                    },
                    life: {
                        duration: {
                            sync: false,
                            value: 3
                        },
                        count: 0,
                        delay: {
                            random: {
                                enable: true,
                                minimumValue: 0.5
                            },
                            value: 1
                        }
                    }
                }
            };
        }
    };

    return (
        <Particles
            id={`realm-particles-${variant}`}
            options={getOptions(variant)}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}
