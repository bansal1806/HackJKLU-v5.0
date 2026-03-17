'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import bgThemes from '@/assets/themes/bg-themes.webp';

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

type DomainKey = 'aiml' | 'cybersecurity' | 'blockchain' | 'fintech' | 'bounty';

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
    count: number; // number of problem statements in this domain
}

const DOMAINS: Domain[] = [
    { key: 'aiml',          label: 'AI / ML',          icon: '🤖', color: '#8b5cf6', rgb: '139,92,246',  glyph: 'I',   count: 25 },
    { key: 'cybersecurity', label: 'Cyber Security',   icon: '🛡️', color: '#10b981', rgb: '16,185,129',  glyph: 'II',  count: 25 },
    { key: 'blockchain',    label: 'Blockchain',        icon: '⛓️', color: '#3b82f6', rgb: '59,130,246',  glyph: 'III', count: 25 },
    { key: 'fintech',       label: 'FinTech',           icon: '⚡', color: '#d4af37', rgb: '212,175,55',  glyph: 'IV',  count: 25 },
    { key: 'bounty',        label: 'Bounty',            icon: '🏆', color: '#ef4444', rgb: '239,68,68',   glyph: 'V',   count: 5  },
];

function makePSID(domain: DomainKey, n: number) {
    return `${domain}-${n}`;
}

function makePSTitle(domain: DomainKey, n: number, domainLabel: string) {
    return `${domainLabel}-${n}`;
}

const PS_DESCRIPTIONS: Record<DomainKey, string[]> = {
    aiml: [
        'Build a system that detects deepfake videos in real time, scores how confident it is about each frame, and automatically reports fake content to platforms.',
        'Create a platform that lets organisations fine-tune AI language models for Indian regional languages — without needing private training data.',
        'Build an AI tool that reads unstructured resumes, understands a candidate\'s career path, and matches them to the right job roles based on verified skill requirements.',
        'Design an AI navigation app for visually impaired users that uses a phone camera to describe obstacles, read street signs, and announce nearby public transport in real time.',
        'Build an AI content moderator for social media that works across Hindi, Hinglish, and regional languages — even when users mix languages in the same sentence.',
        'Create a privacy-first health AI framework where multiple hospitals train a shared diagnostic model together, without any hospital ever sharing its patient data.',
        'Build an AI code-review assistant that spots security flaws in code, explains the risks in simple terms, and suggests ready-to-use fixes.',
        'Create an AI system that takes a photo of a hand-drawn UI sketch and turns it into clean, working React component code.',
        'Build an AI tool that reads legal contracts, highlights hidden risks and liabilities, and gives a clear summary — all in under 60 seconds.',
        'Create a real-time Indian Sign Language translator that uses a webcam to detect hand gestures and displays the translated text, designed for use in classrooms.',
        'Build an AI tool that analyses satellite images after a disaster to quickly map the most affected areas and suggest where rescue teams should go first.',
        'Create a personalised AI tutor that adjusts how it explains topics — speed, depth, and examples — based on how quickly each student is learning.',
        'Design an AI finance advisor that runs on basic feature phones, reads SMS bank alerts, and gives budgeting tips through voice calls in local languages.',
        'Build an AI system that lets drones navigate and deliver packages in areas with no GPS signal, using camera-based location tracking and landmark detection.',
        'Create an AI system for messaging apps (like WhatsApp) that can detect misinformation, classify its type, and trace how it spread through message forwards.',
        'Build an AI accessibility tool that lets people with motor disabilities control any website using eye movements or switch-based input devices.',
        'Create a speech recognition model for India\'s lesser-known tribal languages, enabling voice search and access to emergency helplines.',
        'Build an AI system that predicts demand for perishable products (like food/FMCG) and helps distributors order the right amount to reduce waste.',
        'Create a multi-agent AI system for local energy grids that automatically balances solar power generation, battery storage, and electricity demand.',
        'Build an AI tool that analyses chest X-rays to detect early-stage Tuberculosis, designed to run on affordable Android tablets at rural health centres.',
        'Create an AI pricing engine for ride-sharing services that dynamically sets fares to maximise both driver earnings and passenger availability across peak and off-peak hours.',
        'Build an AI credit-scoring system for non-banking lenders that explains every lending decision in simple language, following RBI fair-practice guidelines.',
        'Create an AI tool that takes complex government scheme documents and automatically generates simple, personalised eligibility messages in regional languages via SMS.',
        'Build an AI traffic management system for smaller Indian cities that uses sensor data from intersections to predict congestion and optimise signal timings.',
        'Create an AI for customer service that detects when a caller is upset or stressed — from their voice tone and words — and automatically escalates the call to a human agent.',
    ],
    cybersecurity: [
        'Build a zero-trust network simulator for businesses that checks for security policy gaps and automatically generates step-by-step remediation guides.',
        'Create an AI-powered threat intelligence dashboard that pulls data from multiple sources, connects the dots between attack indicators, and maps them to known attack frameworks (MITRE ATT&CK).',
        'Build a browser extension that detects phishing websites in real time using on-device AI — works even in private/incognito mode without sending data to the cloud.',
        'Create a passwordless login system that continuously verifies users by how they type and move their mouse — no special hardware needed.',
        'Build an automated security scanner for containerised cloud apps that plugs into CI/CD pipelines and blocks risky code from being deployed.',
        'Create a dark-web monitoring service that alerts organisations within minutes when employee passwords or company data show up on hacker forums.',
        'Build an affordable, open-source security monitoring dashboard (SIEM) for small businesses that runs on hardware costing under ₹20,000.',
        'Create a system that checks IoT device firmware for tampering every time the device boots up, working across devices from different manufacturers.',
        'Build a tamper-proof digital audit trail for elections that keeps voter identity anonymous while letting anyone verify the final vote count.',
        'Create an AI-powered red-team platform that simulates realistic cyberattacks against a network, helping security teams train for real-world threats.',
        'Build a real-time system that detects API abuse on fintech / open-banking services — telling apart legitimate data aggregators from automated credential-stuffing attacks.',
        'Create a framework that verifies the entire software supply chain for critical infrastructure — tracking code from the original commit all the way to the deployed version.',
        'Build a smart patch-prioritisation tool that ranks security vulnerabilities by how exploitable they are, which systems they affect, and how much damage they could cause.',
        'Design a privacy-preserving single sign-on system for cross-organisation use that doesn\'t store all user identities in one central (and hackable) database.',
        'Build a security monitoring system for industrial control systems (ICS/SCADA) that detects advanced threats without needing specialised protocol knowledge from the user.',
        'Create a toolkit that lets competing organisations jointly analyse shared fraud data without any company revealing its private records to others.',
        'Build a honeypot-as-a-service platform that automatically changes its fake attack surface based on the latest attacker techniques seen worldwide.',
        'Create an AI-powered malware analysis sandbox that runs suspicious files and generates behaviour-based threat signatures in under 30 seconds.',
        'Build a phishing and social-engineering simulator that generates realistic spear-phishing emails and voice-scam calls for employee security training, with measurable results.',
        'Create a tool that scans enterprise codebases for encryption algorithms that won\'t be safe against quantum computers, and suggests quantum-resistant replacements.',
        'Build a runtime security shield for Python web services that blocks injection attacks and privilege escalation — without developers needing to change any code.',
        'Design a blockchain-based digital evidence chain-of-custody system for cybercrime cases that is admissible as court evidence under Indian IT Act Section 65B.',
        'Build a DNS-level security platform that detects and blocks malware trying to communicate with command-and-control servers before any data can be stolen.',
        'Create a mobile app analyser that detects when apps secretly access your camera, microphone, or location — even when running in the background.',
        'Build a cyber crisis simulation engine that runs interactive, branching scenario exercises for CISOs and board members to practise making decisions during security incidents.',
    ],
    blockchain: [
        'Build a decentralised identity system where citizens own their government-verified credentials and can choose exactly what information to share — without depending on any central authority.',
        'Create a smart-contract audit assistant that explains security flaws in simple language for non-technical founders, offers one-click fixes, and re-verifies the contract.',
        'Build a secure cross-chain bridge for moving assets between DeFi protocols, with mathematical proofs that prevent the re-entrancy and slippage attacks seen in past hacks.',
        'Create an NFT-powered supply chain tracker for medicines that permanently records temperature, handling, and test results at every step from factory to pharmacy.',
        'Build a DAO governance toolkit for large-scale public participation, supporting quadratic voting and liquid democracy (where you can delegate your vote).',
        'Design a Layer-2 system for instant, ultra-low-cost micropayments in the creator economy — supporting tips as small as fractions of a rupee.',
        'Create a decentralised dispute resolution system for freelance marketplaces that uses reputation-based jury selection and stores evidence on IPFS.',
        'Build a tokenised carbon credit marketplace with automated tracking and verification, where retired credits are recorded on-chain to prevent double counting.',
        'Create a zero-knowledge proof identity layer that lets users complete KYC once and reuse it across multiple financial services — without revealing their underlying personal data.',
        'Build a blockchain-based land registry system for transparent property records, reducing title fraud and registration delays for rural landowners.',
        'Create a peer-to-peer renewable energy trading platform on an EVM-compatible blockchain, letting housing societies trade solar power directly without utility company intermediation.',
        'Build a decentralised degree verification system that lets employers verify any candidate\'s academic credentials globally in under 10 seconds — without contacting the institution.',
        'Create a smart-contract crop insurance platform that automatically pays farmers when satellite data shows rainfall levels outside the insured range.',
        'Build a multi-signature treasury management system for NGOs that enforces donor-specified spending categories at the protocol level for cross-border fund transfers.',
        'Create a token-curated registry of verified professional certifications that freelancers can carry across platforms, backed by community curation and staked credibility.',
        'Build a coercion-resistant on-chain voting system using commit-reveal and encrypted tallying — suitable for shareholder meetings and cooperative governance.',
        'Create a decentralised oracle network that feeds verified real-world sports and financial data into prediction markets, with financial penalties for dishonest data reporters.',
        'Build a blockchain royalty distribution system for Indian classical music artists that instantly splits streaming revenue among the composer, performer, and label.',
        'Create a DeFi liquidity aggregator optimised for INR-stablecoin trading pairs that finds the best price across decentralised and centralised exchanges.',
        'Build a self-sovereign data marketplace where users can sell their anonymised health or location data while keeping full control and the ability to revoke access at any time.',
        'Create a supply-chain financing protocol that automatically releases working capital to small businesses (MSMEs) once blockchain confirms delivery — no bank intermediary needed.',
        'Build a blockchain-based document notarisation service that produces legally admissible timestamps for contracts and IP claims under Indian law.',
        'Create a decentralised reputation system for gig workers that combines verified ratings from multiple platforms and follows them across career changes.',
        'Build an automated smart-contract security pipeline that combines static analysis, fuzz testing, and formal verification into a single CI/CD check for developers.',
        'Create a blockchain-based medical records system that gives patients fine-grained control over which doctors can access which test results, and for how long.',
    ],
    fintech: [
        'Build an AI-powered financial inclusion app that helps unbanked rural populations access micro-loans, insurance, and savings through a voice-first interface in local languages.',
        'Create a real-time fraud detection engine for UPI payments that uses graph neural networks to spot suspicious payment patterns within milliseconds.',
        'Build an AI personal finance coach that reads your messy bank SMS alerts and turns them into a clear monthly budget with actionable tips — in your local language.',
        'Create a community lending platform where neighbourhood savings groups can pool money, give out small loans, and track repayments on a transparent digital ledger.',
        'Build a regulatory compliance tool that automatically maps new RBI guidelines to banking products and generates gap-analysis reports.',
        'Design a green savings account where your interest rate improves as you reduce your carbon footprint, verified through connected lifestyle data APIs.',
        'Create an AI insurance assistant for small business owners that reads their GST filings and bank statements to generate fair risk scores instantly.',
        'Build a cross-border money transfer optimiser that splits remittances across different corridors in real time to minimise fees and exchange rate losses.',
        'Create a financial literacy game for teenagers that teaches investing, budgeting, and compound interest through a realistic virtual economy.',
        'Build a Buy Now Pay Later (BNPL) risk platform that dynamically adjusts credit limits based on real-time cash flow from UPI transactions and GST data.',
        'Create a fractional real estate investment platform that lets anyone invest as little as ₹500 in verified properties and receive daily rental income.',
        'Build an AI system that auto-fills loan applications by scanning ID proofs, income certificates, and utility bills — with over 98% accuracy.',
        'Create a credit scoring engine for small neighbourhood shops (kirana stores) that builds creditworthiness from their point-of-sale transaction history.',
        'Build a retirement planning tool for gig workers that calculates pension gaps and recommends tailored investment plans (NPS/SIP) based on their income patterns.',
        'Create a hyperlocal insurance marketplace for Tier-3 city businesses with tailored products for climate risks, health risks, and business risks.',
        'Build a mutual fund platform for first-time investors in India that uses WhatsApp chatbots in local languages to guide SIP setup and goal-based planning.',
        'Create a cash flow prediction tool for small businesses (MSMEs) that spots likely payment delays from buyers and automatically requests invoice financing.',
        'Build an open banking platform that lets employees authorise salary advances from fintech apps using the Account Aggregator consent framework.',
        'Create a real-time treasury management tool for mid-size companies that uses ML to optimise how idle cash is invested across overnight instruments.',
        'Build a core-banking modernisation toolkit for cooperative banks that replaces legacy systems with modern APIs — without disrupting daily operations.',
        'Create a robo-advisor for high-net-worth individuals that builds tax-optimised, ESG-screened portfolios with real-time rebalancing and derivatives hedging.',
        'Build an income smoothing platform for gig workers that advances earned wages daily and auto-collects repayments on high-income days.',
        'Create a trade finance platform for export-focused small businesses that auto-generates Letters of Credit, insurance cover, and shipping documents from invoice data.',
        'Build an early-warning system for lenders that identifies borrowers at risk of default 90 days in advance and proactively offers restructuring options.',
        'Create a privacy-first personal financial data vault where individuals can store, combine, and selectively share their financial identity for instant loan approvals.',
    ],
    bounty: [
        'Build and deploy a live cybersecurity threat-monitoring dashboard that connects to at least 3 real threat-intelligence feeds and sends verified SMS alerts — bonus for zero false positives during a 2-hour live test.',
        'Build a working DeFi protocol on a public testnet with a frontend, audited smart contracts, and ₹10,000+ simulated liquidity — must demonstrate a novel AMM curve or lending mechanism.',
        'Create an AI agent that autonomously researches, compares, and initiates a micro-investment plan via API calls, with a full audit trail — judged on accuracy, speed, and explainability.',
        'Build and publish an open-source developer toolkit that cuts integration effort for a real fintech or blockchain API by at least 60% — judged on docs quality, test coverage, and adoption potential.',
        'Build a combined AI + blockchain solution that solves a real problem in India (land rights, supply-chain fraud, or financial exclusion) with live data, working smart contracts, and measurable improvement over existing solutions.',
    ],
};

// Build flat list — each domain generates exactly d.count problem statements
const PROBLEMS: ProblemStatement[] = DOMAINS.flatMap(d =>
    Array.from({ length: d.count }, (_, i) => ({
        id: makePSID(d.key, i + 1),
        domain: d.key,
        title: makePSTitle(d.key, i + 1, d.label),
        description: PS_DESCRIPTIONS[d.key][i],
    }))
);





function DivineAuraCanvas() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050403]">
            {/* CSS Light Pillar effect — zero JS overhead */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse 30% 80% at 45% 30%, rgba(82,39,255,0.12) 0%, transparent 70%),
                        radial-gradient(ellipse 25% 70% at 55% 50%, rgba(255,239,158,0.08) 0%, transparent 65%),
                        radial-gradient(ellipse 20% 90% at 50% 40%, rgba(120,60,255,0.06) 0%, transparent 60%)
                    `,
                    mixBlendMode: 'screen',
                    transform: 'rotate(25deg) scale(1.3)',
                }}
            />

            {/* Background Image Layer */}
            <div 
                className="absolute inset-0" 
                style={{ 
                    backgroundImage: `url('${bgThemes.src}')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center top',
                    opacity: 0.55, 
                    filter: 'brightness(0.6) saturate(0.8)',
                }} 
            />

            {/* Dark vignette overlay for readability */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(40,30,15,0)_0%,_rgba(10,8,5,0.8)_65%,_#050403_100%)]" />
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
                            Challenges Are Hidden
                        </h2>
                        <p className="text-neutral-400 text-base tracking-widest mb-10 max-w-sm mx-auto leading-relaxed" style={{ fontFamily: 'Cinzel, serif' }}>
                            Problem statements will be revealed soon. Click below or type ORACLE to see them now.
                        </p>
                        <motion.button
                            onClick={onReveal}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-4 text-sm uppercase tracking-[0.4em] border border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 transition-all"
                            style={{ fontFamily: 'Cinzel, serif' }}
                            animate={{ boxShadow: ['0 0 0 rgba(212,175,55,0)', '0 0 40px rgba(212,175,55,0.3)', '0 0 0 rgba(212,175,55,0)'] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            Reveal Challenges
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
    p, domain, index, isRevealed, onClick, count,
}: {
    p: ProblemStatement;
    domain: Domain;
    index: number;
    isRevealed: boolean;
    onClick: () => void;
    count: number;
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
                minHeight: 360,
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
                {/* Classical Greek Corner Ornaments */}
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

            {/* Inner double line inset border */}
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

            {/* Greek Meander pattern */}
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
                            <div className="text-[12px] font-bold uppercase tracking-[0.5em] mb-1 transition-colors duration-400" style={{ fontFamily: 'Cinzel, serif', color: hovered ? accentColor : 'rgba(212,175,55,0.7)' }}>
                                {domain.label}
                            </div>
                            <div className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(255,255,255,0.4)' }}>
                                Problem Statement
                            </div>
                        </div>
                    </div>

                    {/* Availability Status */}
                    <div className="flex flex-col items-end shrink-0 transition-all duration-400">
                        <span 
                            className="text-[11px] uppercase tracking-[0.4em] font-bold mb-2 transition-colors" 
                            style={{ fontFamily: 'Cinzel, serif', color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}
                        >
                            Status
                        </span>
                        
                        <div className="flex items-center gap-2.5">
                            {/* Visual Spots */}
                            <div className="flex gap-2">
                                {[1, 2].map((spot) => (
                                    <motion.div 
                                        key={spot}
                                        animate={count < spot ? { opacity: [0.6, 1, 0.6], borderColor: ['rgba(212,175,55,0.4)', 'rgba(212,175,55,0.9)', 'rgba(212,175,55,0.4)'] } : {}}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: spot * 0.5 }}
                                        className="w-2.5 h-2.5 transition-all duration-500"
                                        style={{ 
                                            transform: 'rotate(45deg)',
                                            background: count >= spot 
                                                ? (count >= 2 ? 'rgba(239,68,68,0.9)' : 'rgba(240,208,96,0.9)') // filled spot
                                                : 'rgba(0,0,0,0.6)', // empty spot
                                            border: `1px solid ${count >= spot 
                                                ? (count >= 2 ? '#ef4444' : '#f0d060') 
                                                : 'rgba(212,175,55,0.4)'}`,
                                            boxShadow: count >= spot ? `0 0 10px ${count >= 2 ? 'rgba(239,68,68,0.6)' : 'rgba(240,208,96,0.6)'}` : 'none'
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {/* Text */}
                            <motion.div
                                animate={
                                    count < 2 
                                        ? { textShadow: ['0 0 4px rgba(240,208,96,0.3)', '0 0 12px rgba(240,208,96,0.9)', '0 0 4px rgba(240,208,96,0.3)'] } 
                                        : { textShadow: '0 0 12px rgba(239,68,68,0.6)' }
                                }
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] leading-none ml-2 w-[70px] text-right"
                                style={{
                                    fontFamily: 'Cinzel, serif',
                                    color: count >= 2 
                                        ? '#ef4444' 
                                        : count === 1 
                                            ? '#f59e0b' 
                                            : '#f0d060',
                                }}
                            >
                                {count >= 2 ? 'Sealed' : count === 1 ? '1 Left' : 'Open'}
                            </motion.div>
                        </div>
                    </div>
                </div>



                {/* Content */}
                <div className="flex-1">
                    <h3
                        className="font-bold leading-snug mb-3 transition-colors duration-400"
                        style={{
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.4rem',
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
                        className="leading-[1.8] transition-colors duration-400"
                        style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontSize: '16px',
                            color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(237,224,196,0.6)',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
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
                        className="text-[13px] uppercase tracking-[0.3em] font-bold"
                        style={{ fontFamily: 'Cinzel, serif', color: hovered ? '#ffffff' : 'rgba(212,175,55,0.5)' }}
                    >
                        Problem {roman}
                    </span>
                    
                    <div 
                        className="flex items-center gap-3 px-5 py-2.5 border cursor-pointer transition-all duration-300 group/btn"
                        style={{
                            borderColor: hovered ? accentColor : 'rgba(212,175,55,0.25)',
                            background: hovered ? `rgba(${domain.rgb}, 0.15)` : 'transparent'
                        }}
                    >
                        <span 
                            className="text-[11px] uppercase tracking-[0.4em] font-bold transition-colors duration-300"
                            style={{ fontFamily: 'Cinzel, serif', color: hovered ? '#ffffff' : 'rgba(212,175,55,0.7)' }}
                        >
                            View Details
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

function DetailModal({
    p, domain, onClose, onSuccess,
}: {
    p: ProblemStatement;
    domain: Domain;
    onClose: () => void;
    onSuccess: (problemId: string, newCount: number, oldProblemId?: string | null, oldCount?: number | null) => void;
}) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'full'>('idle');
    // teamCheck: 'idle' | 'checking' | 'available' | 'registered'
    // 'registered' = team already exists in DB for ANY problem (same or different)
    const [teamCheck, setTeamCheck] = useState<'idle' | 'checking' | 'available' | 'registered'>('idle');
    const [registeredInfo, setRegisteredInfo] = useState<{ problemTitle: string; domain: string } | null>(null);
    const [formData, setFormData] = useState({
        teamNumber: '',
        teamName: '',
        leaderName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // Debounced team number check — fires 600ms after user stops typing.
    // React's cleanup cancels the timer on every keystroke: no stale closures.
    useEffect(() => {
        const tn = formData.teamNumber.trim();
        if (!tn) {
            setTeamCheck('idle');
            setRegisteredInfo(null);
            return;
        }
        setTeamCheck('checking');
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/register-labor?teamNumber=${encodeURIComponent(tn)}`);
                if (!res.ok) { setTeamCheck('idle'); return; }
                const data = await res.json();
                if (data.exists) {
                    // Already registered somewhere — always show the warning
                    setTeamCheck('registered');
                    setRegisteredInfo({
                        problemTitle: data.registration.problemTitle,
                        domain: data.registration.domain,
                    });
                } else {
                    setTeamCheck('available');
                    setRegisteredInfo(null);
                }
            } catch {
                setTeamCheck('idle');
            }
        }, 600);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.teamNumber]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const payload = {
            teamNumber: formData.teamNumber.trim(),
            teamName: formData.teamName,
            leaderName: formData.leaderName,
            email: formData.email,
            phone: formData.phone,
            domain: domain.label,
            problemId: p.id,
            problemTitle: p.title,
        };

        try {
            const res = await fetch('/api/register-labor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.status === 403) {
                setStatus('full');
                return;
            }

            if (!res.ok) {
                console.error('[Sacred Labors] Registration Error:', await res.json().catch(() => ({})));
                setStatus('error');
                return;
            }

            const data = await res.json();
            // Pass new count and optionally old problem info to parent for badge patching
            onSuccess(p.id, data.count ?? 0, data.oldProblemId ?? null, data.oldCount ?? null);
            setStatus('success');
        } catch (err) {
            console.error('[Sacred Labors] Network Error:', err);
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
                                    Go Back
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-[13px] sm:text-sm uppercase tracking-[0.3em] font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: domain.color }}>
                                        Problem Description
                                    </h4>
                                    <p className="text-neutral-300 leading-relaxed text-lg sm:text-xl mb-8 pr-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                        {p.description}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative p-1 pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, rgba(${domain.rgb},0.4))` }} />
                                        <h4 className="text-[12px] uppercase tracking-[0.4em] font-bold text-center" style={{ fontFamily: 'Cinzel, serif', color: domain.color, textShadow: `0 0 10px rgba(${domain.rgb},0.3)` }}>
                                            Register for This Challenge
                                        </h4>
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, rgba(${domain.rgb},0.4))` }} />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 mt-4">
                                        {/* ── TEAM NUMBER (primary, first) ── */}
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label
                                                className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] font-bold mb-1 absolute -top-6 left-0 transition-colors flex items-center gap-2"
                                                style={{
                                                    fontFamily: 'Cinzel, serif',
                                                    color: teamCheck === 'registered' ? 'rgba(251,191,36,0.9)' : teamCheck === 'available' ? '#8ba85a' : 'rgba(180,140,50,0.85)',
                                                }}
                                            >
                                                Team Number <span style={{ color: domain.color }}>♦</span>
                                                {teamCheck === 'checking' && <span className="text-neutral-400 normal-case tracking-normal font-normal">checking…</span>}
                                                {teamCheck === 'available' && <span className="text-green-400 normal-case tracking-normal font-normal">✓ Available</span>}
                                                {teamCheck === 'registered' && <span className="text-amber-400 normal-case tracking-normal font-normal">⚠ Already registered</span>}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.teamNumber}
                                                onChange={e => setFormData(prev => ({ ...prev, teamNumber: e.target.value }))}
                                                onBlur={() => {/* check runs via useEffect debounce */}}
                                                className="bg-black/40 border-b px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner"
                                                style={{
                                                    fontFamily: '"IM Fell English", serif',
                                                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
                                                    borderColor: teamCheck === 'registered' ? 'rgba(251,191,36,0.4)' : teamCheck === 'available' ? 'rgba(139,168,90,0.5)' : 'rgba(255,255,255,0.1)',
                                                }}
                                                placeholder="e.g. JKLU-2026-042"
                                            />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full"
                                                style={{ background: `linear-gradient(90deg, ${teamCheck === 'registered' ? '#f59e0b' : teamCheck === 'available' ? '#8ba85a' : domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                            {/* Warning shown right below the field when team is already registered */}
                                            {teamCheck === 'registered' && registeredInfo && (
                                                <p className="mt-2 text-[11px] leading-snug" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(251,191,36,0.9)' }}>
                                                    ⚠ You have already registered for <em>{registeredInfo.problemTitle}</em> ({registeredInfo.domain}).
                                                    If you register here, your earlier registration will be struck off and{' '}
                                                    <strong>this will be your final submission.</strong>
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Team Name <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="text" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="e.g. Argonauts" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Leader Name <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="text" value={formData.leaderName} onChange={e => setFormData({...formData, leaderName: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="e.g. Kartik" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Email <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="contact@example.com" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Phone <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="+91 9876543210" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
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
                                            <div className="text-[11px] uppercase tracking-[0.5em] font-bold text-neutral-400 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
                                                — Your Selection —
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
                                        <div className="text-red-400 text-xs mt-2 bg-red-500/10 p-2 border border-red-500/20 rounded-sm" style={{ fontFamily: 'Cinzel, serif' }}>
                                            A disruption occurred in the network flow. Please try submitting again.
                                        </div>
                                    )}
                                    {status === 'full' && (
                                        <div className="text-red-400 text-xs mt-2 bg-red-500/10 p-2 border border-red-500/20 rounded-sm" style={{ fontFamily: 'Cinzel, serif' }}>
                                            ⚒ This labor has been claimed by 2 teams and is now sealed.
                                        </div>
                                    )}

                                    <div className="flex gap-4 sm:gap-6 flex-wrap mt-6 pt-6 border-t border-white/5 relative">
                                        {/* Subtle top-inset glow on the footer */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)` }} />
                                        
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting' || status === 'full' || teamCheck === 'checking'}
                                            className="px-6 py-4 sm:py-5 text-sm sm:text-base uppercase tracking-[0.4em] font-bold disabled:opacity-40 disabled:cursor-not-allowed flex-1 relative overflow-hidden group/btn shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:shadow-2xl transition-all"
                                            style={{
                                                fontFamily: 'Cinzel, serif',
                                                borderRadius: 2,
                                                background: teamCheck === 'registered'
                                                    ? 'linear-gradient(135deg,#b45309,#92400e)'
                                                    : `linear-gradient(135deg,${domain.color},${domain.color}88)`,
                                                color: '#0a0806',
                                            }}
                                        >
                                            <span className="relative z-10 drop-shadow-md font-bold">
                                                {status === 'submitting' ? 'Submitting…'
                                                    : teamCheck === 'checking' ? 'Verifying…'
                                                    : teamCheck === 'registered' ? 'Switch & Register'
                                                    : 'Submit Registration'}
                                            </span>
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

export function HallOfOraclesClient({ initialCounts = {} }: { initialCounts?: Record<string, number> }) {
    const [isRevealed, setIsRevealed] = useState(true);
    const [activeTheme, setActiveTheme] = useState<DomainKey | 'all'>('all');
    const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);
    // Seed state directly from server-fetched data — no zero flash on refresh
    const [countsMap, setCountsMap] = useState<Record<string, number>>(initialCounts);

    const handleReveal = useCallback(() => setIsRevealed(true), []);

    // Poll every 15 seconds to keep counts fresh in real-time across all tabs
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const r = await fetch(`/api/labor-status`, { cache: 'no-store' });
                if (!r.ok) return;
                const data = await r.json();
                if (data && typeof data === 'object' && !data.error)
                    setCountsMap(data);
            } catch (err) {
                console.error('[Sacred Labors] Failed to load counts:', err);
            }
        };

        // Don't fetch immediately — server already gave us fresh data.
        // Only poll for subsequent real-time updates.
        const id = setInterval(fetchCounts, 15_000);
        return () => clearInterval(id);
    }, []);

    const handleRegistrationSuccess = useCallback(
        (problemId: string, newCount: number, oldProblemId?: string | null, oldCount?: number | null) => {
            setCountsMap(prev => {
                const next = { ...prev, [problemId]: newCount };
                if (oldProblemId != null && oldCount != null) next[oldProblemId] = oldCount;
                return next;
            });
        },
        []
    );

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

            {/* Detail modal - only open if problem not sealed */}
            {selectedPS && (
                <DetailModal
                    p={selectedPS}
                    domain={DOMAINS.find(d => d.key === selectedPS.domain)!}
                    onClose={() => setSelectedPS(null)}
                    onSuccess={handleRegistrationSuccess}
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
                        <span className="text-[11px] uppercase tracking-[0.5em] text-neutral-400 font-bold" style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
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
                        className="text-neutral-300 text-base sm:text-lg tracking-widest italic mb-10 relative z-10 font-medium"
                        style={{ fontFamily: 'Cinzel, serif', textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8)' }}
                    >
                        &ldquo;Choose your labor and etch your name into the stars.&rdquo;
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        className="inline-flex items-center justify-center gap-0 flex-wrap rounded-sm px-6 py-4"
                        style={{
                            background: 'rgba(8,6,4,0.72)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(212,175,55,0.2)',
                            boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.08)',
                        }}
                    >
                        {[
                            { label: 'Themes', value: String(DOMAINS.length) },
                            { label: 'Problems', value: String(PROBLEMS.length) },
                            { label: 'Teams Allowed', value: '∞' },
                        ].map((stat, i, arr) => (
                            <div key={stat.label} className="flex items-center">
                                <div className="text-center px-6 relative">
                                    <div
                                        className="text-4xl sm:text-5xl font-bold leading-none mb-1"
                                        style={{
                                            fontFamily: 'Cinzel, serif',
                                            color: '#f0d060',
                                            textShadow: '0 0 24px rgba(212,175,55,0.7), 0 2px 8px rgba(0,0,0,0.9)',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        className="text-[11px] sm:text-[12px] uppercase tracking-[0.35em] font-bold"
                                        style={{
                                            fontFamily: 'Cinzel, serif',
                                            color: 'rgba(255,255,255,0.55)',
                                            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                                {i < arr.length - 1 && (
                                    <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.35), transparent)' }} />
                                )}
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
                            background: 'rgba(10,8,6,0.92)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                        }}
                    >
                        {/* "All" pill */}
                        <motion.button
                            onClick={() => setActiveTheme('all')}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-200 rounded-sm font-semibold"
                            style={{
                                fontFamily: 'Cinzel, serif',
                                background: activeTheme === 'all' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.04)',
                                border: `1px solid ${activeTheme === 'all' ? 'rgba(212,175,55,0.8)' : 'rgba(255,255,255,0.18)'}`,
                                color: activeTheme === 'all' ? '#f0d060' : 'rgba(255,255,255,0.82)',
                                textShadow: activeTheme === 'all' ? '0 0 12px rgba(212,175,55,0.6)' : '0 1px 4px rgba(0,0,0,0.8)',
                                boxShadow: activeTheme === 'all' ? '0 0 16px rgba(212,175,55,0.2)' : 'none',
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
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-200 rounded-sm font-semibold"
                                    style={{
                                        fontFamily: 'Cinzel, serif',
                                        background: isActive ? `rgba(${domain.rgb},0.2)` : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${isActive ? `rgba(${domain.rgb},0.8)` : 'rgba(255,255,255,0.18)'}`,
                                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.82)',
                                        textShadow: isActive ? `0 0 12px rgba(${domain.rgb},0.8)` : '0 1px 4px rgba(0,0,0,0.8)',
                                        boxShadow: isActive ? `0 0 20px rgba(${domain.rgb},0.25), inset 0 0 10px rgba(${domain.rgb},0.08)` : 'none',
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
                                    onClick={() => { if ((countsMap[p.id] ?? 0) < 2) setSelectedPS(p); }}
                                    count={countsMap[p.id] ?? 0}
                                />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

            </main>
        </div>
    );
}
