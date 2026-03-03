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
        'Build a real-time deepfake video detection system that flags manipulated media with frame-level confidence scores and auto-submits takedown requests to platforms.',
        'Develop an LLM fine-tuning platform for Indian regional languages, enabling organisations to localise enterprise AI assistants without proprietary training data.',
        'Create an AI-powered job-skill matching engine that maps candidate trajectories from unstructured resumes to verified employer-defined competency frameworks.',
        'Design a computer-vision navigation assistant for visually impaired users that narrates real-world obstacles, street signs, and public transport options in real time.',
        'Build an adaptive content-moderation AI for multilingual social media that handles code-switching between Hindi, Hinglish, and regional scripts.',
        'Create a federated ML framework for privacy-preserving health diagnostics where hospitals collaboratively train models without ever sharing patient records.',
        'Develop an AI code-review tool that detects security vulnerabilities, explains risks in plain language, and suggests production-ready remediation patches.',
        'Build a multi-modal AI system that converts hand-drawn UX wireframes photographed on a smartphone into production-ready React component code.',
        'Design an AI-powered legal-document summarisation and risk-extraction engine that surfaces hidden liabilities in contracts for SME founders in under 60 seconds.',
        'Create a real-time Indian Sign Language interpreter using webcam-based pose estimation and transformer models for inclusive classroom integration.',
        'Develop an AI-assisted satellite imagery analyser for rapid disaster-damage assessment that generates prioritised rescue resource maps within hours of an event.',
        'Build a personalised AI tutoring agent that adapts explanation depth, pacing, and example choice to individual student learning velocity using concept-mastery graphs.',
        'Design an on-device AI personal finance advisor for feature-phone users that processes SMS bank alerts and delivers budgeting advice via voice in local languages.',
        'Create an autonomous drone-navigation AI for last-mile delivery in GPS-denied zones using visual odometry and landmark recognition.',
        'Develop an NLP-based misinformation-detection pipeline for WhatsApp-scale messaging that classifies content and traces its origin across forward chains.',
        'Build an AI-powered accessibility layer that makes any web application usable by people with motor disabilities through eye-gaze control and switch-access interfaces.',
        'Create a self-supervised speech model for low-resource tribal languages of India that enables basic voice search and emergency services access.',
        'Design an AI demand-forecasting system for perishable FMCG goods that optimises procurement and reduces spoilage losses across multi-tier distribution networks.',
        'Develop a multi-agent AI framework for real-time energy trading in urban microgrids, balancing solar generation, battery storage, and grid demand autonomously.',
        'Build an AI medical-imaging analyser for early-stage TB detection in chest X-rays, targeting deployment on low-cost Android tablets at primary health centres.',
        'Create a reinforcement-learning platform for dynamic pricing in ride-sharing that maximises driver earnings and passenger fill-rates across surge and off-peak periods.',
        'Design an explainable AI system for credit-underwriting decisions at NBFCs that generates plain-language justifications compliant with RBI fair-practice guidelines.',
        'Develop a generative AI tool that auto-personalises government-scheme eligibility communications from complex policy documents into simple regional-language SMS.',
        'Build an AI-powered traffic-flow optimisation engine for tier-2 Indian cities using intersection sensor data and predictive signal-timing models.',
        'Create a multi-modal emotional AI for customer-service automation that detects caller distress from voice tone and text semantics to escalate empathetically.',
    ],
    cybersecurity: [
        'Build a zero-trust network architecture simulator for enterprise hybrid environments that scores policy gaps and generates remediation playbooks automatically.',
        'Design an AI-powered threat-intelligence aggregator that correlates multi-source indicators of compromise into actionable incident timelines with MITRE ATT&CK mapping.',
        'Create a browser extension that detects phishing pages in real time using on-device ML, protecting users even on private-browsing sessions without cloud lookup.',
        'Develop a secure passwordless authentication system using continuous behavioural biometrics — keystroke dynamics and mouse patterns — without dedicated hardware.',
        'Build an automated vulnerability scanner for containerised cloud-native applications that integrates into CI/CD pipelines and blocks high-severity builds automatically.',
        'Design a dark-web monitoring service that alerts organisations within minutes when employee credentials or internal data appear on paste sites and hacker forums.',
        'Create an open-source SIEM dashboard for SMEs that delivers enterprise-grade threat detection on commodity hardware costing under ₹20,000 per deployment.',
        'Develop a firmware-integrity verification system for IoT devices that detects tampered binaries at boot time across heterogeneous manufacturer ecosystems.',
        'Build a cryptographic audit-trail system for election ballot transparency that guarantees voter anonymity while enabling any observer to verify the final tally.',
        'Design a red-team simulation platform using AI adversarial agents that generates novel attack paths against target networks for SOC training exercises.',
        'Create a real-time API abuse-detection system for fintech open-banking endpoints that distinguishes legitimate aggregators from credential-stuffing bots.',
        'Develop a supply-chain software-attestation framework for critical national infrastructure that verifies build provenance from source commit to deployed binary.',
        'Build an automated patch-prioritisation engine that ranks enterprise CVEs by exploitability, asset criticality, and lateral-movement blast radius for resource-constrained teams.',
        'Design a privacy-preserving identity-federation protocol for cross-organisational single sign-on that eliminates central honeypot identity stores.',
        'Create an anomaly-detection system for industrial control systems that identifies APT reconnaissance and lateral movement without requiring ICS protocol expertise.',
        'Develop a secure multi-party computation toolkit that lets competing organisations collaboratively analyse shared fraud datasets without exposing proprietary records.',
        'Build a honeypot-as-a-service platform that automatically adapts its attack surface in response to evolving attacker TTPs captured from global threat feeds.',
        'Design an AI-powered malware sandbox that generates behavioural signatures from dynamic execution analysis in under 30 seconds for zero-day classification.',
        'Create a social-engineering attack simulator that generates spear-phishing emails and voice-scam scenarios for employee resilience training, with measurable outcomes.',
        'Develop a post-quantum cryptography migration assistant that identifies non-PQC algorithms in enterprise codebases and generates compliant replacement implementations.',
        'Build a runtime application self-protection layer for Python microservices that blocks injection attacks and privilege escalations without code changes by the developer.',
        'Design a blockchain-anchored digital evidence custody chain for cybercrime prosecution that is admissible as court evidence under Indian IT Act Section 65B.',
        'Create a DNS-layer security platform that identifies and blocks C2 communications for malware in outbound traffic before data exfiltration can occur.',
        'Develop a mobile app security analyser that detects misuse of sensitive device APIs — camera, microphone, location — even when apps are backgrounded.',
        'Build a cyber-incident tabletop simulation engine that runs branching scenario exercises for CISOs and board members to practise crisis-decision protocols.',
    ],
    blockchain: [
        'Build a decentralised identity protocol that lets citizens own and selectively disclose government-verified credentials without relying on a central identity provider.',
        'Design a smart-contract audit copilot that explains vulnerabilities in plain language to non-technical founders, with one-click fix suggestions and re-verification.',
        'Create a cross-chain bridge with formal-verification guarantees for DeFi asset transfers, eliminating the class of re-entrancy and slippage exploits seen in past hacks.',
        'Develop an NFT-based supply-chain provenance system for pharmaceuticals that records cold-chain temperature, custody, and batch-testing results immutably.',
        'Build a DAO governance toolkit optimised for large-scale public-sector stakeholder participation, supporting quadratic voting and delegated liquid democracy.',
        'Design a Layer-2 rollup framework for high-throughput micropayments in creator economies, supporting off-chain tipping at sub-rupee denominations.',
        'Create a decentralised dispute-resolution protocol for freelance marketplace escrow that uses reputation-weighted jury selection and evidence pinned to IPFS.',
        'Develop a tokenised carbon-credit marketplace with automated measurement, reporting, and verification, and on-chain retirement preventing double counting.',
        'Build a zero-knowledge-proof identity layer that lets users reuse a single KYC verification across multiple financial services without revealing underlying data.',
        'Design a blockchain-based land-registry system for transparent property-title management, reducing fraud and registration delays for rural landholders.',
        'Create a peer-to-peer renewable-energy trading settlement platform on an EVM-compatible chain, enabling society-level bilateral contracts without utility intermediation.',
        'Develop a decentralised academic-credential verification system that enables employers to validate degrees globally in under 10 seconds without contacting institutions.',
        'Build a smart-contract-powered parametric crop-insurance platform that auto-pays farmers when satellite-measured rainfall deviates from policy thresholds.',
        'Design a multi-signature NGO treasury management protocol for cross-border fund disbursement with donor-mandated spending categories enforced at protocol level.',
        'Create a token-curated registry for vetted professional certifications that freelancers carry across platforms, with stake-backed credibility and community curation.',
        'Develop a coercion-resistant on-chain voting system using commit-reveal and homomorphic tallying, suitable for shareholder meetings and cooperative governance.',
        'Build a decentralised oracle network aggregating verified real-world sports and financial data for prediction markets, with economic penalties for dishonest reporters.',
        'Design a blockchain royalty-distribution system for Indian classical music artists that auto-splits streaming revenue among composer, performer, and label instantly.',
        'Create a DeFi liquidity aggregator optimised for INR-stablecoin trading pairs, routing through DEXs and CEX liquidity bridges for best-execution price.',
        'Develop a self-sovereign data marketplace where users monetise anonymised personal-health or mobility datasets, retaining full revocation rights at granular field level.',
        'Build a supply-chain financing protocol that auto-releases working capital to MSMEs on blockchain-confirmed delivery without requiring bank-intermediated invoice discounting.',
        'Design a blockchain document-notarisation service that produces court-admissible timestamps for contracts and intellectual-property claims under Indian law.',
        'Create a decentralised reputation system for gig-economy workers that aggregates verified ratings across platforms and follows workers through career transitions.',
        'Develop an automated smart-contract security pipeline integrating static analysis, fuzz testing, and formal verification into a single developer-facing CI check.',
        'Build a blockchain-based medical-records consent-management layer that gives patients granular control over which providers access which diagnostic data and for how long.',
    ],
    fintech: [
        'Build an AI-powered financial inclusion platform that helps unbanked rural populations access micro-credit, insurance, and savings through a voice-first vernacular interface.',
        'Design a real-time fraud-detection engine for UPI transactions using graph neural networks to identify anomalous payment clusters within milliseconds of initiation.',
        'Create an NLP-powered personal-finance coach that converts messy bank SMS alerts into a structured monthly budget with actionable advice in local languages.',
        'Develop a community-lending protocol where trusted neighbourhood savings groups pool funds, disburse micro-loans, and track repayment on a transparent ledger.',
        'Build a regulatory-compliance automation platform that maps new RBI guidelines to banking product policies and auto-generates gap-analysis audit reports.',
        'Design a carbon-linked savings account where return rates improve as the account holder reduces their measured carbon footprint, verified by API-connected lifestyle data.',
        'Create an insurance-underwriting assistant for micro-entrepreneurs that ingests GST filings, bank flows, and social signals to generate fair risk scores instantly.',
        'Develop a cross-border remittance optimiser that splits transfers across multiple currency corridors in real time to minimise fees and FX slippage for diaspora senders.',
        'Build a financial-literacy simulation game for teenagers that teaches investing, budgeting, and compound interest through a realistic gamified virtual economy.',
        'Design a BNPL risk-stratification platform that dynamically adjusts credit limits based on real-time cash-flow velocity from UPI transaction streams and GST data.',
        'Create a fractional real-estate investment token platform that lets individuals invest as little as ₹500 in verified properties with daily rental-yield distributions.',
        'Develop an AI document-intelligence system that auto-fills loan applications from scanned ID proofs, income certificates, and utility bills with over 98% accuracy.',
        'Build a merchant credit-score engine that derives creditworthiness from point-of-sale transaction histories for kirana stores with no formal credit records.',
        'Design a pension-gap analyser that projects retirement-income shortfalls for gig workers and recommends hybrid NPS/equity SIP portfolios tailored to their income volatility.',
        'Create a hyperlocal insurance marketplace that aggregates parametric products for climate, health, and business risks, tailored to tier-3 city SME risk profiles.',
        'Develop a mutual-fund distribution platform for Bharat that uses vernacular chatbots and WhatsApp to guide first-time investors through SIP setup and goal-based planning.',
        'Build a predictive cash-flow management tool for MSMEs that anticipates payment delays from buyers and auto-triggers invoice factoring requests to partner NBFCs.',
        'Design an open banking aggregation platform that lets customers authorise salary advances from embedded fintech apps using Account Aggregator consent artefacts.',
        'Create a real-time treasury management system for mid-size corporates that optimises idle-cash allocation across overnight instruments using ML-driven yield prediction.',
        'Develop a co-operative-bank core-banking modernisation toolkit that replaces legacy systems with API-first microservices without disrupting daily banking operations.',
        'Build an algorithmic wealth-management robo-advisor for HNIs that constructs tax-loss-harvested, ESG-screened portfolios rebalanced in real time with FnO hedges.',
        'Design a gig-worker income-smoothing platform that advances earned wages daily and automatically withdraws repayments on high-income days to avoid repayment stress.',
        'Create a trade-finance digitisation platform for export MSMEs that auto-generates Letters of Credit, ECGC cover, and shipping-document packages from invoice data.',
        'Develop a lending collections intelligence system that identifies at-risk borrowers 90 days before default using early behavioural signals and proactively offers restructuring.',
        'Build a privacy-first personal financial data vault that lets individuals store, aggregate, and selectively share their financial identity for instant credit decisioning.',
    ],
    bounty: [
        'Design and deploy a live production-grade cybersecurity threat-monitoring dashboard that integrates with at least three real-world threat-intelligence feeds and sends verified SMS alerts to a registered incident-response team — bonus awarded if zero false positives are recorded during a 2-hour live evaluation.',
        'Build a fully functional decentralised finance protocol on a public testnet with a working frontend, audited smart contracts, and at least ₹10,000 equivalent of simulated liquidity demonstrating a novel AMM curve or lending mechanism not previously deployed on the chosen chain.',
        'Create a working AI agent that autonomously completes a multi-step financial task — researching, comparing, and initiating a best-execution micro-investment plan — entirely via API calls with a verifiable audit trail, evaluated on accuracy, latency, and explainability of each decision.',
        'Develop and publish an open-source developer toolkit that meaningfully reduces integration effort for a real fintech or blockchain API by at least 60% as benchmarked by lines of code and time-to-hello-world — judged on documentation quality, test coverage, and community adoption potential.',
        'Build a cross-domain AI + blockchain solution that addresses a verifiable real-world problem in India — land rights, supply-chain fraud, or financial exclusion — with live data ingestion, a working smart-contract back end, and a demonstrable improvement metric against a documented baseline.',
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

                    {/* Team count badge */}
                    <div
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm shrink-0 transition-all duration-400"
                        style={{
                            background: count >= 2
                                ? 'rgba(239,68,68,0.12)'
                                : count > 0
                                    ? (hovered ? `rgba(${domain.rgb},0.2)` : `rgba(${domain.rgb},0.10)`)
                                    : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${count >= 2
                                ? 'rgba(239,68,68,0.5)'
                                : count > 0
                                    ? (hovered ? `rgba(${domain.rgb},0.7)` : `rgba(${domain.rgb},0.35)`)
                                    : 'rgba(255,255,255,0.1)'}`,
                        }}
                    >
                        <span style={{ fontSize: '10px' }}>{count >= 2 ? '⚒' : '⚔'}</span>
                        <span
                            className="text-[9px] font-bold uppercase tracking-[0.25em] leading-none"
                            style={{
                                fontFamily: 'Cinzel, serif',
                                color: count >= 2
                                    ? '#ef4444'
                                    : count > 0
                                        ? (hovered ? '#ffffff' : accentColor)
                                        : 'rgba(255,255,255,0.35)',
                            }}
                        >
                            {count === 0
                                ? 'First to claim'
                                : count === 1
                                    ? '1 Team · 1 spot left'
                                    : 'SEALED'}
                        </span>
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
                                        {/* ── TEAM NUMBER (primary, first) ── */}
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label
                                                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-1 absolute -top-6 left-0 transition-colors flex items-center gap-2"
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
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Team Name <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="text" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="e.g. Argonauts" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Leader Name <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="text" value={formData.leaderName} onChange={e => setFormData({...formData, leaderName: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="e.g. Kartik" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                                                Email <span style={{ color: domain.color }}>♦</span>
                                            </label>
                                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-black/40 border-b border-white/10 px-3 py-1.5 text-xl sm:text-2xl text-white placeholder-neutral-700/50 focus:outline-none focus:bg-black/60 transition-all w-full shadow-inner" style={{ fontFamily: '"IM Fell English", serif', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }} placeholder="contact@example.com" />
                                            <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within/input:w-full" style={{ background: `linear-gradient(90deg, ${domain.color}, transparent)` }} />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r opacity-20 pointer-events-none transition-opacity group-focus-within/input:opacity-100" style={{ borderColor: domain.color }} />
                                        </div>
                                        <div className="flex flex-col relative group/input mt-1 sm:col-span-2">
                                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1 absolute -top-6 left-0 transition-colors group-focus-within/input:text-white" style={{ fontFamily: 'Cinzel, serif' }}>
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
                                                {status === 'submitting' ? 'Scribing…'
                                                    : teamCheck === 'checking' ? 'Verifying…'
                                                    : teamCheck === 'registered' ? 'Switch & Seal the Pact'
                                                    : 'Seal the Pact'}
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
                                        className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-bold"
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
                            className="px-3 sm:px-5 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-200 rounded-sm font-semibold"
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
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-200 rounded-sm font-semibold"
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
