import { Story } from '../components/sections/Story';
import { PageNavigation } from '../components/navigation/PageNavigation';

export function About() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/About_bg.webp"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Soft black overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Story />
        <PageNavigation />
      </div>
    </div>
  );
}

