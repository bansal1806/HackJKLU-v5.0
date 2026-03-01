'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────

const HACKATHON_DATE = new Date('2026-03-14T09:00:00+05:30');

function useCountdown() {
    const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
    useEffect(() => {
        const tick = () => {
            const diff = HACKATHON_DATE.getTime() - Date.now();
            if (diff <= 0) return;
            setT({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff % 86400000) / 3600000),
                m: Math.floor((diff % 3600000) / 60000),
                s: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return t;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

type DomainKey = 'agritech' | 'environment' | 'womensafety' | 'fintech' | 'edtech' | 'healthtech' | 'smartcities';

interface ProblemStatement {
    id: string;
    domain: DomainKey;
    title: string;
    description: string;
}

interface Domain {
    key: DomainKey;
    label: string;
    icon: string;
    color: string;
    rgb: string;
    glyph: string;
}

const DOMAINS: Domain[] = [
    { key: 'agritech',     label: 'AgriTech',      icon: '🌾', color: '#8ba85a', rgb: '139,168,90',  glyph: 'I' },
    { key: 'environment',  label: 'Environment',   icon: '🌿', color: '#4a9e8a', rgb: '74,158,138',  glyph: 'II' },
    { key: 'womensafety',  label: 'Women Safety',  icon: '🛡️', color: '#c47a95', rgb: '196,122,149', glyph: 'III' },
    { key: 'fintech',      label: 'FinTech',        icon: '⚡', color: '#d4af37', rgb: '212,175,55',  glyph: 'IV' },
    { key: 'edtech',       label: 'EdTech',         icon: '🦉', color: '#9575cd', rgb: '149,117,205', glyph: 'V' },
    { key: 'healthtech',   label: 'HealthTech',     icon: '⚕️', color: '#c47a5a', rgb: '196,122,90',  glyph: 'VI' },
    { key: 'smartcities',  label: 'Smart Cities',   icon: '🏙️', color: '#5b9bd5', rgb: '91,155,213',  glyph: 'VII' },
];

function makePSID(domain: DomainKey, n: number) {
    return `${domain}-${n}`;
}

function makePSTitle(domain: DomainKey, n: number, domainLabel: string) {
    return `${domainLabel}-${n}`;
}

// Generic placeholder descriptions per domain
const PS_DESCRIPTIONS: Record<DomainKey, string[]> = {
    agritech: [
        'Develop a predictive crop disease detection system using drone imagery and hyperspectral analysis, providing farmers with actionable remedies in their local language within 24 hours of detection.',
        'Build a voice-first vernacular advisory platform that delivers personalised soil-health insights to smallholder farmers using IoT soil sensors and satellite data.',
        'Create an AI-powered crop-yield forecasting tool that helps agricultural co-operatives plan storage, logistics, and market pricing up to a season in advance.',
        'Design a precision irrigation management system that optimises water usage across multi-crop fields in real time using weather forecasts and soil-moisture telemetry.',
        'Develop a blockchain-based supply-chain tracker that connects farmers directly to urban consumers, ensuring fair pricing and full provenance transparency.',
        'Build a drone-swarm coordination platform for autonomous pollination support in regions experiencing rapid bee-population decline.',
        'Create a multilingual pest-identification app powered by a community-contributed image dataset and on-device machine-learning inference.',
        'Design an agri-fintech solution that enables instant micro-insurance payouts triggered automatically by satellite-detected drought or flood events.',
        'Develop a virtual agri-extension service delivering 24/7 voice-based guidance to farmers in low-connectivity rural areas using lightweight language models.',
        'Build a collective-bargaining platform that enables farmer groups to negotiate bulk input prices and sell at optimal market rates through AI-driven auction mechanics.',
        'Create a smart cold-chain monitoring system that uses IoT sensors and ML to reduce post-harvest losses across the vegetable-supply value chain.',
        'Design an automated crop-rotation planner that recommends multi-year planting sequences to maintain soil fertility and maximise yield diversity.',
        'Develop a carbon-credit accounting tool that helps small farmers quantify and monetise sustainable farming practices through verified sequestration claims.',
        'Build a hybrid seed-quality testing system that combines near-infrared spectroscopy with a crowd-sourced germination-result database.',
        'Create a real-time open-data marketplace allowing agri-researchers, government agencies, and farmers to share and monetise field-level data sets.',
    ],
    environment: [
        'Design a real-time ocean and freshwater pollution tracking system using IoT sensor networks and satellite imagery, providing actionable alerts to local communities and governments.',
        'Build an urban air-quality monitoring mesh powered by low-cost sensors attached to public transit buses, producing hyper-local pollution maps updated every minute.',
        'Create a community-driven plastic-waste classification system using phone-camera AR to guide informal waste-pickers toward highest-value recyclable items.',
        'Develop an AI model that predicts wildfire spread in real time from satellite thermal data, enabling evacuation routing 48 hours before a blaze reaches a settlement.',
        'Build a digital-twin platform for river-basin management that simulates flood, drought, and pollution scenarios to support policy planning.',
        'Design a rooftop solar-potential assessment tool that uses LiDAR and street-view imagery to generate bankable feasibility reports for homeowners.',
        'Create a biodiversity monitoring dashboard that fuses camera-trap images, acoustic sensors, and citizen-science sightings to track endangered species corridors.',
        'Develop a corporate Scope 3 emissions calculator that auto-ingests supplier invoices and logistics data to produce verifiable carbon footprints.',
        'Build a zero-waste festival kit — a logistics and procurement platform that helps event organisers eliminate single-use plastics with reusable alternatives.',
        'Design a coral-reef health monitoring system using underwater drones and computer vision to flag bleaching events and model recovery timelines.',
        'Create a community composting network app that connects households, collection agents, and compost-consuming farms in a closed-loop platform.',
        'Develop an environmental-litigation support tool that aggregates sensor data, legal precedent, and impact assessments to empower citizen advocacy.',
        'Build a net-zero building energy management system that learns occupancy patterns and automates HVAC, lighting, and renewable-generation dispatch.',
        'Design a mangrove-restoration tracker that combines drone surveys and tidal-model outputs to prioritise planting sites for maximum carbon and biodiversity impact.',
        'Create a gamified personal carbon-budget app that rewards users with community benefits for measurable lifestyle shifts, verified by third-party APIs.',
    ],
    womensafety: [
        'Build a discreet emergency-alert wearable firmware and companion app that sends live location, audio snippet, and distress signal to trusted contacts with a single gesture.',
        'Design a platform that crowdsources and maps unsafe zones in real time, enabling city planners and police to deploy resources to high-risk areas predictively.',
        'Create an AI-powered incident-report assistant that helps survivors document sexual harassment cases with guided prompts, evidence packaging, and legal-resource links.',
        'Develop a safe-route navigation engine that factors community-sourced safety ratings, CCTV coverage, and real-time incident data into walking-route recommendations.',
        'Build an anonymous community support forum with NLP-based crisis detection that escalates users at risk to trained counsellors in under 60 seconds.',
        'Design a workplace harassment analytics dashboard that identifies systemic patterns in anonymised HR data and triggers automated policy-review workflows.',
        'Create a public-transit safety rating app where commuters report incidents instantly, with aggregated heatmaps shared with transit operators and local authorities.',
        'Develop an on-demand verified-companion service that pairs solo women with vetted volunteers for last-mile commutes during late hours.',
        'Build a multilingual legal-aid chatbot that informs survivors of their rights, nearest support centres, and step-by-step complaint procedures in 10+ Indian languages.',
        'Design a Deepfake-detection toolkit specifically trained on non-consensual intimate imagery to support takedown requests across social-media platforms.',
        'Create a community-watch network with encrypted decentralised communication that lets neighbourhood volunteers coordinate rapid-response to distress signals.',
        'Develop a self-defence training gamification app that pairs AR-based situational simulations with access to local certified training centres.',
        'Build an AI travel companion that continuously evaluates contextual risk during solo travel and proactively suggests safety measures without being intrusive.',
        'Design a trauma-informed reporting interface for police stations that reduces re-traumatisation through structured interaction flows and real-time emotional-cue monitoring.',
        'Create a menstrual-health safety platform that integrates period-tracking with workplace accommodation requests and anonymous peer-support communities.',
    ],
    fintech: [
        'Build an AI-powered financial inclusion platform that helps unbanked populations in rural India access micro-credit, insurance, and savings products through a voice-first interface.',
        'Design a real-time fraud-detection engine for UPI transactions using graph neural networks to identify anomalous payment clusters within milliseconds.',
        'Create an NLP-powered personal-finance coach that converts messy bank SMS alerts into a structured monthly budget with actionable advice in local languages.',
        'Develop a community-lending protocol where trusted neighbourhood savings groups can pool funds, disburse micro-loans, and track repayment on a transparent ledger.',
        'Build a regulatory-compliance automation platform that maps new RBI guidelines to bank product policies and auto-generates gap-analysis reports.',
        'Design a carbon-linked savings account where return rates improve as the account holder reduces their measured carbon footprint, verified by API-connected services.',
        'Create an insurance underwriting assistant for micro-entrepreneurs that ingests GST filings, bank flows, and social signals to generate fair risk scores instantly.',
        'Develop a cross-border remittance optimizer that splits transfers across multiple corridors in real time to minimise fees and FX slippage for diaspora senders.',
        'Build a financial-literacy simulation game for teens that teaches investing, budgeting, and compound interest through a realistic virtual economy.',
        'Design a BNPL risk-stratification platform that dynamically adjusts credit limits based on real-time cash-flow velocity from UPI transaction streams.',
        'Create a fractional real-estate investment token platform that lets individuals invest as little as ₹500 in verified properties with daily rental-yield distributions.',
        'Develop an AI document intelligence system that auto-fills loan applications from scanned ID proofs, income certificates, and utility bills with >98% accuracy.',
        'Build a merchant-credit-score engine that derives creditworthiness from point-of-sale transaction histories for kirana stores with no formal credit records.',
        'Design a pension-gap analyser that projects retirement-income shortfalls for gig workers and recommends hybrid NPS/equity SIP portfolios.',
        'Create a hyperlocal insurance marketplace that aggregates parametric products for climate, health, and business risks tailored to tier-3 city SMEs.',
    ],
    edtech: [
        'Build an adaptive learning engine that dynamically adjusts curriculum difficulty and teaching style based on real-time cognitive load analysis to make personalised education accessible at scale.',
        'Design an AI exam-integrity platform that detects collusion and impersonation during remote assessments through behavioural biometrics rather than invasive proctoring.',
        'Create a skill-graph navigator that maps learners\' current competencies to employer-verified skill requirements and generates the shortest upskilling path.',
        'Develop a vernacular STEM content pipeline that auto-translates and contextualises concept explanations into 22 Indian languages using open-source LLMs.',
        'Build a gamified coding-education platform for rural schools that runs entirely offline on a Raspberry Pi cluster and syncs progress when connectivity is available.',
        'Design a parent-teacher collaboration tool that uses predictive analytics to flag at-risk students early and co-create intervention plans with guardians.',
        'Create a virtual laboratory platform that lets engineering students run realistic chemistry and physics experiments in a cross-platform 3D browser environment.',
        'Develop an open-source textbook enrichment system that augments legacy PDFs with interactive quizzes, flashcards, and concept maps generated by AI.',
        'Build a teacher professional-development recommendation engine that suggests micro-training modules based on classroom observation transcripts and student-outcome data.',
        'Design a sign-language learning companion that uses webcam-based hand-pose estimation to give real-time feedback on ISL practice.',
        'Create a scholarship-matching engine that ingests student profiles and academic records to surface relevant government and private funding opportunities automatically.',
        'Develop a learning-loss recovery platform that diagnoses foundational-skill gaps from a 10-minute diagnostic test and delivers targeted remedial content.',
        'Build a peer-tutoring marketplace that uses ML to match college students with school learners based on subject mastery, teaching style, and schedule compatibility.',
        'Design a career-simulation environment where high-school students shadow industry professionals through immersive, AI-narrated day-in-the-life experiences.',
        'Create a digital portfolio system that auto-curates evidence of students\' project work and soft-skill demonstrations for employer and university admissions review.',
    ],
    healthtech: [
        'Create a federated learning platform for rural healthcare diagnostics where individual hospitals train local AI models that share knowledge without ever sharing patient data.',
        'Build a wearable-data integration hub that harmonises streams from consumer fitness trackers and clinical-grade biosensors into a single longitudinal health record.',
        'Design a mental health early-warning system that detects depressive episodes from passive phone-usage patterns and routes users to appropriate care pathways.',
        'Develop a telemedicine triage copilot that guides frontline ASHA workers through evidence-based diagnostic trees for the 20 most common rural health complaints.',
        'Create a medication-adherence platform that uses conversational AI reminders, pill-recognition via smartphone camera, and caregiver dashboards.',
        'Build an emergency-room overcrowding predictor that forecasts patient-arrival surges 6 hours in advance using weather, event, and historical visit data.',
        'Design a rare-disease symptom aggregator that matches patients with undiagnosed conditions to relevant clinical trials and specialist networks globally.',
        'Develop an AI-assisted pathology slide reviewer that flags potential malignancies in digitised biopsy images for urgent pathologist attention.',
        'Create a maternal-health monitoring platform combining ASHA-collected field data, home IoT vitals, and predictive risk models for high-risk pregnancy management.',
        'Build a rehabilitation exercise coach that uses pose estimation to guide stroke patients through their physiotherapy protocol at home and reports progress to therapists.',
        'Design a drug-interaction checker integrated with India\'s Jan Aushadhi generic formulary, optimised for prescription review in resource-constrained settings.',
        'Develop a health-insurance claims-fraud detection engine that identifies inflated procedure billing and phantom lab-test claims using graph analysis.',
        'Create a chronic-disease self-management app for Type 2 diabetes that personalises dietary and activity advice from continuous glucose-monitor data streams.',
        'Build a hospital-bed allocation optimizer that uses reinforcement learning to dynamically assign ICU, general, and isolation beds to minimise clinical deterioration.',
        'Design an ambient-health monitoring system for elderly individuals living alone that detects falls, unusual inactivity, and physiological anomalies without cameras.',
    ],
    smartcities: [
        'Build an AI-driven multimodal urban transit optimization platform that dynamically re-routes buses, bikes, and on-demand vehicles based on real-time demand, weather, and events.',
        'Design a pothole-detection and predictive road-maintenance system that fuses GPS vibration data from commuters\' smartphones with municipality work-order systems.',
        'Create a smart-parking occupancy network that uses computer vision at key lots to publish real-time availability via a city-wide open API.',
        'Develop a citizen-grievance intelligence platform that classifies, routes, and auto-escalates municipal complaints using NLP and historical resolution-time data.',
        'Build a dynamic street-lighting management system that adjusts luminosity based on pedestrian density, criminal-incident history, and weather via edge computing.',
        'Design an urban heat-island mapping tool that integrates satellite thermal data, green-cover indices, and population density to prioritise tree-planting interventions.',
        'Create a real-time construction-site noise and dust pollution monitor that automatically notifies municipal inspectors when thresholds are breached.',
        'Develop a cross-departmental city-budget simulator that lets policymakers model the citizen-welfare impact of infrastructure-spending trade-offs.',
        'Build a hyperlocal emergency-services dispatch optimiser that routes fire, ambulance, and police units using live traffic feeds and predictive incident clustering.',
        'Design a digital-twin-powered stormwater management platform that simulates flooding scenarios and activates drain-gate controls automatically during heavy rain.',
        'Create a community micro-grid management system that lets residential societies trade surplus solar energy peer-to-peer under a city-sanctioned energy-token framework.',
        'Develop a predictive-maintenance scheduler for public infrastructure assets — bridges, lifts, and pumping stations — based on sensor-failure signature libraries.',
        'Build an urban-mobility carbon-accounting dashboard that lets city governments track modal-shift progress against net-zero transport targets in near real time.',
        'Design an inclusive urban-accessibility audit tool that crowdsources barrier reports from wheelchair users and auto-prioritises capital repair expenditure.',
        'Create a smart waste-collection routing system that optimises garbage-truck schedules from IoT fill-level sensors mounted on public bins across the city.',
    ],
};

// Build flat list
const PROBLEMS: ProblemStatement[] = DOMAINS.flatMap(d =>
    Array.from({ length: 15 }, (_, i) => ({
        id: makePSID(d.key, i + 1),
        domain: d.key,
        title: makePSTitle(d.key, i + 1, d.label),
        description: PS_DESCRIPTIONS[d.key][i],
    }))
);

// ─── DIVINE AURA CANVAS (PARALLAX BACKGROUND) ─────────────────────────────────

function DivineAuraCanvas() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050403]">
            {/* Standard Background Image Layer - No Parallax offsets to stop cutoff */}
            <div 
                className="absolute inset-0" 
                style={{ 
                    backgroundImage: "url('/labors_bg.png')", 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center top',
                    opacity: 0.85, 
                }} 
            />

            {/* Dark sacred vignette/glow - adjusted slightly to keep content readable but show more bg */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(40,30,15,0)_0%,_rgba(10,8,5,0.75)_70%,_#050403_100%)]" />
        </div>
    );
}

// ─── MIST OVERLAY ────────────────────────────────────────────────────────────

function MistOverlay({ isRevealed, onReveal }: { isRevealed: boolean; onReveal: () => void }) {
    useEffect(() => {
        const SECRET = 'ORACLE';
        let buf = '';
        const onKey = (e: KeyboardEvent) => {
            buf = (buf + e.key.toUpperCase()).slice(-SECRET.length);
            if (buf === SECRET) onReveal();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onReveal]);

    return (
        <AnimatePresence>
            {!isRevealed && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.88)' }}
                >
                    {[0, 1, 2].map(i => (
                        <motion.div key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{ width: 400 + i * 200, height: 400 + i * 200, border: `1px solid rgba(212,175,55,${0.06 - i * 0.015})`, left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                            animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                        />
                    ))}

                    <motion.div className="text-center z-10 px-6" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                        <motion.div className="text-7xl mb-8" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}>⚱️</motion.div>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white/90 tracking-[0.15em] mb-4 uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                            Labors Are Veiled
                        </h2>
                        <p className="text-neutral-500 text-sm tracking-widest mb-10 max-w-sm mx-auto leading-relaxed" style={{ fontFamily: 'Cinzel, serif' }}>
                            The sacred challenges remain concealed until the Oracle commands their revelation.
                        </p>
                        <motion.button
                            onClick={onReveal}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-4 text-xs uppercase tracking-[0.5em] border border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 transition-all"
                            style={{ fontFamily: 'Cinzel, serif' }}
                            animate={{ boxShadow: ['0 0 0 rgba(212,175,55,0)', '0 0 40px rgba(212,175,55,0.3)', '0 0 0 rgba(212,175,55,0)'] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            Lift the Mist
                        </motion.button>
                        <p className="text-neutral-700 text-[10px] mt-5 tracking-[0.4em] uppercase" style={{ fontFamily: 'Cinzel, serif' }}>or type ORACLE</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ─── FLIP COUNTDOWN UNIT ─────────────────────────────────────────────────────

function Flip({ value, label }: { value: number; label: string }) {
    const v = String(value).padStart(2, '0');
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="relative overflow-hidden" style={{ width: 56, height: 62 }}>
                <AnimatePresence mode="popLayout">
                    <motion.div key={v}
                        initial={{ y: -62 }} animate={{ y: 0 }} exit={{ y: 62 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center font-bold text-3xl text-white"
                        style={{ fontFamily: 'Cinzel, serif', background: 'linear-gradient(180deg,#1a1612,#0a0806)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4 }}
                    >
                        {v}
                    </motion.div>
                </AnimatePresence>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-600" style={{ fontFamily: 'Cinzel, serif' }}>{label}</span>
        </div>
    );
}

// ─── ROMAN NUMERALS (I–XV) ──────────────────────────────────────────────────
const ROMAN_NUM = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV'];

// ─── PROBLEM CARD ────────────────────────────────────────────────────────────

function ProblemCard({
    p, domain, index, isRevealed, onClick,
}: {
    p: ProblemStatement;
    domain: Domain;
    index: number;
    isRevealed: boolean;
    onClick: () => void;
}) {
    const num = parseInt(p.id.split('-').pop() ?? '1', 10);
    const roman = ROMAN_NUM[(num - 1)] ?? String(num);
    const [hovered, setHovered] = useState(false);

    const accentColor = domain.color;

    return (
        <motion.article
            initial={{ opacity: 0, y: 36 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.55, delay: (index % 15) * 0.03, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative cursor-pointer flex flex-col overflow-hidden"
            style={{
                background: hovered ? 'rgba(12, 10, 8, 0.8)' : 'rgba(8, 6, 5, 0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                minHeight: 340,
                boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(${domain.rgb},0.2)` : '0 8px 24px rgba(0,0,0,0.5)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)'
            }}
        >
            {/* Outer Gold Frame with Cut Corners */}
            <div 
                className="absolute inset-0 pointer-events-none z-20 transition-colors duration-500"
                style={{
                     border: `1.5px solid ${hovered ? `rgba(${domain.rgb}, 0.5)` : 'rgba(212,175,55,0.2)'}`,
                     clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)'
                }}
            >
                {/* 
                     Classical Greek Corner Ornaments (Square Spiral/Meander corner motif)
                     We use SVG background images for a sharp, geometric look.
                */}
                <div 
                    className="absolute top-0 left-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
                <div 
                    className="absolute top-0 right-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        transform: 'scaleX(-1)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
                <div 
                    className="absolute bottom-0 left-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        transform: 'scaleY(-1)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
                <div 
                    className="absolute bottom-0 right-0 w-8 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100" 
                    style={{
                        transform: 'scale(-1, -1)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H32V2H2V32H0V0ZM6 6H26V8H8V26H6V6ZM12 12H20V14H14V20H12V12Z' fill='%23${domain.rgb.replace(/,/g, '') /* simplified proxy for color */}' style='fill: ${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.4)')}'/%3E%3C/svg%3E")`
                    }} 
                />
            </div>

            {/* Inner "Parchment/Tablet" simple double line inset border */}
            <div 
                 className="absolute inset-[6px] pointer-events-none z-10 transition-colors duration-500 rounded-sm"
                 style={{
                     border: `1px solid ${hovered ? `rgba(${domain.rgb}, 0.2)` : 'rgba(212,175,55,0.06)'}`,
                 }}
            />

            {/* Subtle Fluted Pillar details on left and right edges */}
            <div 
                className="absolute left-2 top-8 bottom-8 w-1 border-x border-white/5 opacity-50 z-0 pointer-events-none transition-colors duration-500"
                style={{ borderColor: hovered ? `rgba(${domain.rgb}, 0.15)` : 'rgba(255,255,255,0.03)' }}
            />
            <div 
                className="absolute right-2 top-8 bottom-8 w-1 border-x border-white/5 opacity-50 z-0 pointer-events-none transition-colors duration-500"
                style={{ borderColor: hovered ? `rgba(${domain.rgb}, 0.15)` : 'rgba(255,255,255,0.03)' }}
            />

            {/* Greek Meander / Key pattern bounding top inner area */}
            <div 
                className="absolute top-4 left-8 right-8 h-2 opacity-[0.25] bg-repeat-x pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-[0.5]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='8' viewBox='0 0 20 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8V0H20V2H4V6H16V4H8V2H18V8H0Z' fill='${encodeURIComponent(hovered ? accentColor : 'rgba(212,175,55,0.8)')}'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Faint subtle radial glow on hover */}
            <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
                style={{
                    background: `radial-gradient(circle at 50% 10%, rgba(${domain.rgb}, 0.15) 0%, transparent 70%)`,
                    opacity: hovered ? 1 : 0
                }}
            />

            {/* Giant Watermark Roman Numeral */}
            <div
                className="absolute right-4 bottom-8 select-none pointer-events-none font-bold leading-none transition-transform duration-700 z-0"
                style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '11rem',
                    color: hovered ? `rgba(${domain.rgb}, 0.08)` : `rgba(212,175,55, 0.04)`,
                    transform: hovered ? 'scale(1.05)' : 'scale(1)'
                }}
            >
                {roman}
            </div>

            <div className="flex flex-col flex-1 px-9 py-8 pt-10 relative z-20">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div 
                            className="flex items-center justify-center w-12 h-12 rounded-sm border transition-colors duration-400"
                            style={{ 
                                borderColor: hovered ? `rgba(${domain.rgb}, 0.6)` : 'rgba(212,175,55,0.25)',
                                background: hovered ? `rgba(${domain.rgb}, 0.15)` : 'rgba(0,0,0,0.4)',
                                fontSize: '1.4rem'
                            }}
                        >
                            {domain.icon}
                        </div>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.5em] mb-1 transition-colors duration-400" style={{ fontFamily: 'Cinzel, serif', color: hovered ? accentColor : 'rgba(212,175,55,0.7)' }}>
                                {domain.label}
                            </div>
                            <div className="text-[9px] uppercase tracking-[0.3em] font-medium" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(255,255,255,0.4)' }}>
                                Codex Entry
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3
                        className="font-bold leading-snug mb-3 transition-colors duration-400"
                        style={{
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.25rem',
                            color: hovered ? '#ffffff' : '#ede0c4',
                            letterSpacing: '0.04em',
                        }}
                    >
                        {p.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                       <span className="w-12 h-[1px]" style={{ background: hovered ? accentColor : 'rgba(212,175,55,0.3)' }} />
                       <span className="text-[10px]" style={{ color: hovered ? accentColor : 'rgba(212,175,55,0.3)' }}>⬩</span>
                       <span className="w-12 h-[1px]" style={{ background: hovered ? accentColor : 'rgba(212,175,55,0.3)' }} />
                    </div>

                    <p
                        className="italic leading-[1.8] transition-colors duration-400"
                        style={{
                            fontFamily: '"IM Fell English", "Libre Baskerville", serif',
                            fontSize: '14.5px',
                            color: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(237,224,196,0.55)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical' as const,
                            overflow: 'hidden',
                        }}
                    >
                        {p.description}
                    </p>
                </div>

                {/* Footer Area */}
                <div className="mt-5 flex items-center justify-between pt-5 transition-colors duration-400">
                    <span 
                        className="text-[11px] uppercase tracking-[0.3em] font-bold"
                        style={{ fontFamily: 'Cinzel, serif', color: hovered ? '#ffffff' : 'rgba(212,175,55,0.5)' }}
                    >
                        Labor {roman}
                    </span>
                    
                    <div 
                        className="flex items-center gap-3 px-5 py-2.5 border cursor-pointer transition-all duration-300 group/btn"
                        style={{
                            borderColor: hovered ? accentColor : 'rgba(212,175,55,0.25)',
                            background: hovered ? `rgba(${domain.rgb}, 0.15)` : 'transparent'
                        }}
                    >
                        <span 
                            className="text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-300"
                            style={{ fontFamily: 'Cinzel, serif', color: hovered ? '#ffffff' : 'rgba(212,175,55,0.7)' }}
                        >
                            Decipher
                        </span>
                        <motion.span
                            className="transition-colors duration-300"
                            style={{ color: hovered ? '#ffffff' : 'rgba(212,175,55,0.7)', fontSize: '12px', lineHeight: 1 }}
                            animate={{ x: hovered ? [0, 5, 0] : 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ›
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

// ─── DETAIL MODAL ────────────────────────────────────────────────────────────

function DetailModal({ p, domain, onClose }: { p: ProblemStatement; domain: Domain; onClose: () => void }) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        teamName: '',
        leaderName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        const payload = {
            ...formData,
            domain: domain.label,
            problemStatement: p.title,
            code: p.id
        };

        try {
            // TODO: Replace with actual Google Apps Script Web App URL from the user
            const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';
            
            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
                // Simulate network request for preview purposes
                await new Promise(resolve => setTimeout(resolve, 1500));
                setStatus('success');
                return;
            }

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            // With no-cors, we can't read the response properly, so we assume success if no throw
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={e => { if (e.target === e.currentTarget) onClose(); }}
                style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto no-scrollbar"
                    style={{
                        background: '#0a0806',
                        border: `1px solid rgba(${domain.rgb},0.35)`,
                        borderRadius: 4,
                        boxShadow: `0 0 80px rgba(${domain.rgb},0.2)`,
                    }}
                >
                    {/* Top accent */}
                    <div style={{ height: 3, background: `linear-gradient(90deg,${domain.color},${domain.color}40,transparent)` }} />

                    <div className="p-6 sm:p-10">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-6 mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{domain.icon}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ fontFamily: 'Cinzel, serif', color: domain.color }}>
                                        {domain.label}
                                    </span>
                                </div>
                                <h2
                                    className="text-3xl sm:text-4xl font-bold leading-tight mt-1"
                                    style={{ fontFamily: 'Cinzel, serif', color: 'rgba(255,255,255,0.95)' }}
                                >
                                    {p.title}
                                </h2>
                                <p className="text-[10px] sm:text-xs text-neutral-500 mt-2" style={{ fontFamily: 'Cinzel, serif' }}>#{p.id}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-neutral-600 hover:text-white transition-colors text-xl leading-none shrink-0 mt-1"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="h-px mb-6" style={{ background: `linear-gradient(90deg,rgba(${domain.rgb},0.4),transparent)` }} />

                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 text-center border rounded-sm"
                                style={{ 
                                    borderColor: 'rgba(139,168,90,0.4)', 
                                    background: 'rgba(139,168,90,0.1)' 
                                }}
                            >
                                <div className="text-4xl mb-4">✨</div>
                                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif', color: '#8ba85a' }}>
                                    Registration Successful
                                </h3>
                                <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                                    Your team <strong>{formData.teamName}</strong> has been registered for the <strong>{domain.label}</strong> labor:<br/>
                                    <span className="text-white italic mt-1 block">"{p.title}"</span>
                                </p>
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold mt-4"
                                    style={{ fontFamily: 'Cinzel, serif', background: 'rgba(139,168,90,0.2)', border: '1px solid rgba(139,168,90,0.5)', color: '#8ba85a' }}
                                >
                                    Return to Hall
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: domain.color }}>
                                        The Oracle's Decree
                                    </h4>
                                    <p className="text-neutral-300 leading-relaxed text-base sm:text-lg mb-8 pr-4">
                                        {p.description}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative p-1 pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, rgba(${domain.rgb},0.4))` }} />
                                        <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-center" style={{ fontFamily: 'Cinzel, serif', color: domain.color, textShadow: `0 0 10px rgba(${domain.rgb},0.3)` }}>
                                            Accept this Labor
                                        </h4>
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, rgba(${domain.rgb},0.4))` }} />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 mt-4">
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Team Name <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="text" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="e.g. Argonauts" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            {/* Greek Corner Ornament */}
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Leader Name <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="text" value={formData.leaderName} onChange={e => setFormData({...formData, leaderName: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="e.g. Kartik" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            {/* Greek Corner Ornament */}
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Email <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="contact@example.com" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            {/* Greek Corner Ornament */}
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Phone <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="+91 9876543210" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            {/* Greek Corner Ornament */}
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                    </div>

                                    <div className="mt-6 relative p-6 border rounded-sm overflow-hidden group/seal shadow-2xl" style={{ borderColor: `rgba(${domain.rgb},0.2)`, background: 'rgba(0,0,0,0.4)', boxShadow: `inset 0 0 50px rgba(${domain.rgb},0.08)` }}>
                                        <div className="absolute inset-0 z-0 bg-[url('/labors_bg.png')] bg-cover bg-center mix-blend-overlay opacity-25 grayscale brightness-200" />
                                        <div className="absolute inset-0 z-0" style={{ background: `radial-gradient(circle at 100% 100%, rgba(${domain.rgb},0.25), transparent 85%)` }}/>
                                        
                                        {/* Classical decorative elements */}
                                        <div className="absolute top-1.5 left-1.5 bottom-1.5 right-1.5 border pointer-events-none z-10 opacity-40" style={{ borderColor: domain.color }} />
                                        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l opacity-60 pointer-events-none z-10" style={{ borderColor: domain.color }} />
                                        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r opacity-60 pointer-events-none z-10" style={{ borderColor: domain.color }} />
                                        
                                        <div className="relative z-20 flex flex-col items-center text-center">
                                            <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-400 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
                                                — Selected Labor —
                                            </div>
                                            <div className="text-3xl sm:text-4xl font-bold tracking-widest mb-2" style={{ fontFamily: 'Cinzel, serif', color: domain.color, textShadow: '0 4px 15px rgba(0,0,0,0.9)' }}>
                                                {domain.label}
                                            </div>
                                            <div className="text-base sm:text-lg italic text-neutral-300 mt-2 max-w-[85%] leading-relaxed" style={{ fontFamily: '"IM Fell English", serif' }}>
                                                {p.title}
                                            </div>
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="text-red-400 text-xs mt-2 bg-red-500/10 p-2 border border-red-500/20 rounded-sm">
                                            A disruption occurred in the network flow. Please try submitting again.
                                        </div>
                                    )}

                                    <div className="flex gap-4 sm:gap-6 flex-wrap mt-6 pt-6 border-t border-white/5 relative">
                                        {/* Subtle top-inset glow on the footer */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)` }} />
                                        
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="px-6 py-4 sm:py-5 text-sm sm:text-base uppercase tracking-[0.4em] font-bold text-neutral-900 disabled:opacity-50 flex-1 relative overflow-hidden group/btn shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:shadow-2xl transition-all"
                                            style={{ fontFamily: 'Cinzel, serif', background: `linear-gradient(135deg,${domain.color},${domain.color}88)`, borderRadius: 2 }}
                                        >
                                            <span className="relative z-10 drop-shadow-md text-black mix-blend-color-burn">{status === 'submitting' ? 'Scribing...' : 'Seal the Pact'}</span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={status === 'submitting'}
                                            className="px-10 py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-[0.4em] transition-colors border disabled:opacity-50 bg-black/40 hover:bg-black/80 backdrop-blur-md"
                                            style={{ fontFamily: 'Cinzel, serif', borderColor: `rgba(${domain.rgb},0.4)`, color: domain.color, borderRadius: 2 }}
                                        >
                                            Return
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export function HallOfOraclesClient() {
    const [isRevealed, setIsRevealed] = useState(true);
    const [activeTheme, setActiveTheme] = useState<DomainKey | 'all'>('all');
    const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);

    const handleReveal = useCallback(() => setIsRevealed(true), []);

    const filtered = activeTheme === 'all'
        ? PROBLEMS
        : PROBLEMS.filter(p => p.domain === activeTheme);

    const activeDomain = DOMAINS.find(d => d.key === activeTheme);

    return (
        <div
            className="min-h-screen w-full text-neutral-100 overflow-x-hidden selection:bg-yellow-500/20"
            style={{ background: '#050403' }}
        >
            {/* Divine Aura Background */}
            <DivineAuraCanvas />

            {/* Noise texture */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                }}
            />

            {/* Ambient domain glow */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-0"
                animate={{ opacity: activeDomain ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ background: activeDomain ? `radial-gradient(ellipse at 20% 30%, rgba(${activeDomain.rgb},0.07) 0%, transparent 55%)` : 'none' }}
            />

            {/* Top accent line */}
            <div
                className="fixed top-0 left-0 right-0 h-px z-40"
                style={{ background: `linear-gradient(90deg,transparent,${activeDomain?.color ?? '#d4af37'}80,transparent)` }}
            />

            {/* Detail modal */}
            {selectedPS && (
                <DetailModal
                    p={selectedPS}
                    domain={DOMAINS.find(d => d.key === selectedPS.domain)!}
                    onClose={() => setSelectedPS(null)}
                />
            )}

            {/* Vertical spine label */}
            <div
                className="fixed left-0 top-1/2 z-20 hidden lg:flex items-center gap-2"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(50%)' }}
            >
                <span className="text-[8px] uppercase tracking-[0.4em] text-neutral-800" style={{ fontFamily: 'Cinzel, serif' }}>The Oracle Codex</span>
                <div className="w-px h-12 bg-neutral-800" />
                <span className="text-[8px] uppercase tracking-[0.4em] text-neutral-800" style={{ fontFamily: 'Cinzel, serif' }}>HackJKLU v5.0</span>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-36">

                {/* ═══ HERO ══════════════════════════════════════════════════ */}
                <header className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                        className="flex items-center justify-center gap-4 mb-8 relative z-10"
                    >
                        <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(212,175,55,0.4)' }} />
                        <span className="text-[9px] uppercase tracking-[0.5em] text-neutral-400 font-bold" style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                            HackJKLU v5.0 · Sacred Labors
                        </span>
                        <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(212,175,55,0.4)' }} />
                    </motion.div>

                    {/* Giant title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
                        className="mb-4"
                    >
                        <h1
                            className="font-bold leading-[0.88] tracking-tight"
                            style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(3rem,9vw,7rem)', color: 'rgba(255,255,255,0.93)' }}
                        >
                            The Sacred
                        </h1>
                        <h1
                            className="font-bold leading-[0.88] tracking-tight relative"
                            style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: 'clamp(3rem,9vw,7rem)',
                                WebkitTextStroke: '2px rgba(212,175,55,0.85)',
                                color: 'transparent',
                                textShadow: '0px 4px 30px rgba(0,0,0,0.8)',
                            }}
                        >
                            Challenges
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        className="text-neutral-300 text-sm sm:text-base tracking-widest italic mb-10 relative z-10 font-medium"
                        style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8)' }}
                    >
                        &ldquo;Choose your labor and etch your name into the stars.&rdquo;
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-8 flex-wrap"
                    >
                        {[
                            { label: 'Themes', value: '7' },
                            { label: 'Problems', value: '105' },
                            { label: 'Teams Allowed', value: '∞' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center relative z-10">
                                <div className="text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif', color: '#d4af37', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{stat.value}</div>
                                <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-bold" style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </header>

                {/* ═══ THEME FILTER TABS ══════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    className="sticky top-16 z-30 mb-10 w-full"
                >
                    {/* Backdrop blur pill container */}
                    <div
                        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2 py-3 rounded-sm"
                        style={{
                            background: 'rgba(5,4,3,0.85)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.05)',
                        }}
                    >
                        {/* "All" pill */}
                        <motion.button
                            onClick={() => setActiveTheme('all')}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-3 sm:px-5 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-200 rounded-sm"
                            style={{
                                fontFamily: 'Cinzel, serif',
                                background: activeTheme === 'all' ? 'rgba(212,175,55,0.15)' : 'transparent',
                                border: `1px solid ${activeTheme === 'all' ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.06)'}`,
                                color: activeTheme === 'all' ? '#d4af37' : 'rgba(255,255,255,0.4)',
                            }}
                        >
                            All&nbsp;
                            <span className="opacity-60 text-[8px]">({PROBLEMS.length})</span>
                        </motion.button>

                        {DOMAINS.map(domain => {
                            const count = PROBLEMS.filter(p => p.domain === domain.key).length;
                            const isActive = activeTheme === domain.key;
                            return (
                                <motion.button
                                    key={domain.key}
                                    onClick={() => setActiveTheme(domain.key)}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-200 rounded-sm"
                                    style={{
                                        fontFamily: 'Cinzel, serif',
                                        background: isActive ? `rgba(${domain.rgb},0.12)` : 'transparent',
                                        border: `1px solid ${isActive ? `rgba(${domain.rgb},0.5)` : 'rgba(255,255,255,0.06)'}`,
                                        color: isActive ? domain.color : 'rgba(255,255,255,0.4)',
                                        boxShadow: isActive ? `0 0 20px rgba(${domain.rgb},0.12)` : 'none',
                                    }}
                                >
                                    <span>{domain.icon}</span>
                                    <span>{domain.label}</span>
                                    <span className="opacity-50 text-[8px]">({count})</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Active domain headline */}
                    <AnimatePresence mode="wait">
                        {activeTheme !== 'all' && activeDomain && (
                            <motion.div
                                key={activeTheme}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.25 }}
                                className="mt-4 flex items-center gap-3"
                            >
                                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,rgba(${activeDomain.rgb},0.4),transparent)` }} />
                                <span className="text-[10px] uppercase tracking-[0.5em]" style={{ fontFamily: 'Cinzel, serif', color: activeDomain.color }}>
                                    {activeDomain.label} Challenges — {filtered.length} Labors
                                </span>
                                <div className="h-px w-8" style={{ background: `rgba(${activeDomain.rgb},0.4)` }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ═══ PROBLEM CARD GRID ══════════════════════════════════════ */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTheme}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {filtered.map((p, i) => {
                            const dom = DOMAINS.find(d => d.key === p.domain)!;
                            return (
                                <ProblemCard
                                    key={p.id}
                                    p={p}
                                    domain={dom}
                                    index={i}
                                    isRevealed={isRevealed}
                                    onClick={() => setSelectedPS(p)}
                                />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* ═══ CTA ════════════════════════════════════════════════════ */}
                <motion.footer
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 pt-12 border-t border-white/[0.04]"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white/80 tracking-wide mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                                Ready to Claim Your Labor?
                            </h2>
                            <p className="text-neutral-600 text-xs tracking-wider leading-loose max-w-md" style={{ fontFamily: 'Cinzel, serif' }}>
                                Register your team on Devfolio. Select your challenge. Forge your legend.
                            </p>
                        </div>
                        <div className="flex gap-4 shrink-0">
                            <motion.a
                                href="https://hackjklu.devfolio.co" target="_blank" rel="noopener noreferrer"
                                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-3 text-xs uppercase tracking-[0.4em] text-neutral-900 font-bold"
                                style={{ fontFamily: 'Cinzel, serif', background: 'linear-gradient(135deg,#d4af37,#f5e6c8)' }}
                            >
                                Register
                            </motion.a>
                        </div>
                    </div>
                </motion.footer>
            </main>
        </div>
    );
}
