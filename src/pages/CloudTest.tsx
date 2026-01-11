export function CloudTest() {
  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0f1419 100%)',
      }}
    >
      {/* Sky container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* ============ SINGLE REALISTIC STORM CLOUD ============ */}

        {/* Main Cloud - Center positioned, realistic cumulus structure */}
        <div
          className="absolute"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
          }}
        >
          {/* Cloud Base - Main body with natural irregular shape */}
          <div
            className="absolute"
            style={{
              top: '40%',
              left: '20%',
              width: '300px',
              height: '120px',
              background:
                'radial-gradient(ellipse 130% 100% at 45% 60%, #a0a8c0 0%, #808898 15%, #606870 35%, #404850 60%, #202830 85%)',
              borderRadius: '50% 60% 40% 70%',
              transform: 'rotate(-2deg)',
              filter: 'blur(0.8px)',
              boxShadow: `
                            -80px -40px 0 -15px rgba(140, 150, 170, 0.9),
                            -40px -70px 0 5px rgba(160, 170, 190, 0.85),
                            40px -60px 0 20px rgba(180, 190, 210, 0.8),
                            100px -35px 0 -5px rgba(120, 130, 150, 0.75),
                            150px -55px 0 15px rgba(150, 160, 180, 0.7),
                            200px -25px 0 -20px rgba(100, 110, 130, 0.65),
                            -100px 25px 0 -35px rgba(80, 90, 110, 0.6),
                            220px 15px 0 -25px rgba(90, 100, 120, 0.55)
                        `,
            }}
          />

          {/* Cloud Top Billows - Puffy upper formations */}
          <div
            className="absolute"
            style={{
              top: '15%',
              left: '25%',
              width: '200px',
              height: '100px',
              background:
                'radial-gradient(ellipse 120% 110% at 50% 70%, rgba(200, 210, 230, 0.9) 0%, rgba(160, 170, 190, 0.7) 30%, rgba(120, 130, 150, 0.4) 60%, transparent 80%)',
              borderRadius: '60% 50% 70% 40%',
              transform: 'rotate(3deg)',
              boxShadow: `
                            60px -20px 0 10px rgba(180, 190, 210, 0.8),
                            -30px -15px 0 5px rgba(220, 230, 250, 0.75),
                            120px -35px 0 -5px rgba(140, 150, 170, 0.7)
                        `,
            }}
          />

          {/* Additional Puffy Details - Left side */}
          <div
            className="absolute"
            style={{
              top: '25%',
              left: '10%',
              width: '140px',
              height: '80px',
              background:
                'radial-gradient(ellipse 110% 100% at 60% 50%, rgba(170, 180, 200, 0.8) 0%, rgba(130, 140, 160, 0.6) 40%, rgba(90, 100, 120, 0.3) 70%, transparent 90%)',
              borderRadius: '70% 40% 60% 50%',
              transform: 'rotate(-5deg)',
              boxShadow: `
                            -40px -25px 0 8px rgba(190, 200, 220, 0.7),
                            20px -30px 0 -3px rgba(150, 160, 180, 0.65)
                        `,
            }}
          />

          {/* Right Side Billows */}
          <div
            className="absolute"
            style={{
              top: '30%',
              right: '15%',
              width: '160px',
              height: '90px',
              background:
                'radial-gradient(ellipse 100% 120% at 40% 60%, rgba(160, 170, 190, 0.85) 0%, rgba(120, 130, 150, 0.65) 35%, rgba(80, 90, 110, 0.4) 65%, transparent 85%)',
              borderRadius: '45% 65% 55% 35%',
              transform: 'rotate(4deg)',
              boxShadow: `
                            40px -20px 0 12px rgba(140, 150, 170, 0.75),
                            -20px -25px 0 5px rgba(180, 190, 210, 0.7)
                        `,
            }}
          />

          {/* Cloud Highlights - Sun-lit edges */}
          <div
            className="absolute"
            style={{
              top: '10%',
              left: '30%',
              width: '250px',
              height: '60px',
              background:
                'linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(220, 230, 245, 0.4) 50%, transparent 100%)',
              borderRadius: '50% 70% 30% 60%',
              filter: 'blur(1px)',
            }}
          />

          {/* Cloud Shadows - Dark bottom areas */}
          <div
            className="absolute"
            style={{
              bottom: '10%',
              left: '25%',
              width: '280px',
              height: '40px',
              background:
                'linear-gradient(0deg, rgba(30, 35, 45, 0.8) 0%, rgba(50, 55, 65, 0.4) 50%, transparent 100%)',
              borderRadius: '40% 60% 50% 70%',
              filter: 'blur(2px)',
            }}
          />
        </div>

        {/* ============ LIGHTNING GLOW EFFECTS ============ */}

        {/* Single dramatic lightning glow behind the cloud */}
        <div
          className="absolute"
          style={{
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            height: '250px',
            background:
              'radial-gradient(ellipse 80% 90% at 50% 60%, rgba(255, 220, 140, 0.8) 0%, rgba(255, 180, 80, 0.5) 30%, rgba(255, 140, 40, 0.2) 55%, transparent 75%)',
            filter: 'blur(30px)',
            animation: 'singleLightning 8s infinite',
            opacity: 0,
            zIndex: -1,
          }}
        />
      </div>

      {/* Label */}
      <div className="absolute bottom-10 left-10 text-white font-mono z-50">
        <p className="text-xl font-bold">Single Realistic Storm Cloud</p>
        <p className="text-sm text-gray-400 mt-1">
          Natural cumulus structure with billowing details
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Based on reference images - organic cloud formation
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
                @keyframes singleLightning {
                    0%, 70% { opacity: 0; }
                    71%, 73% { opacity: 0.8; }
                    74%, 76% { opacity: 0.1; }
                    77%, 79% { opacity: 0.9; }
                    80%, 82% { opacity: 0.3; }
                    83%, 85% { opacity: 0.7; }
                    86%, 100% { opacity: 0; }
                }
            `}</style>
    </div>
  );
}
