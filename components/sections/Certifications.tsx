import fs from 'fs';
import path from 'path';
import SectionReveal from "@/components/animations/SectionReveal";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import CertificationsGallery from "./CertificationsGallery";

export default function Certifications() {
  const certsDir = path.join(process.cwd(), 'public', 'certificates');
  let certFiles: string[] = [];

  try {
    if (fs.existsSync(certsDir)) {
      certFiles = fs.readdirSync(certsDir)
        .filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));
    }
  } catch (err) {
    console.error("Error reading certificates directory:", err);
  }

  // Format filenames gracefully into readable titles
  const certificates = certFiles.map((file) => {
    const rawName = file.replace(/\.[^/.]+$/, ""); // strip extension
    const title = rawName
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return {
      filename: file,
      title: title,
      path: `/certificates/${encodeURIComponent(file)}`,
    };
  });

  // If the folder is empty or couldn't be read, hide the section entirely
  if (certificates.length === 0) return null;

  return (
    <section
      id="certifications"
      className="pt-8 pb-32 relative overflow-hidden bg-section-education"
      aria-label="Certifications"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionReveal className="text-center mb-10">
          <span className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block">
            05. Credentials
          </span>
          <AnimatedTitle
            text1="Licenses &"
            text2="Certifications"
            className="mb-4 justify-center"
          />
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Click any certificate to view the high-resolution version. This gallery automatically integrates new credentials as I earn them.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6" />
        </SectionReveal>

        {/* Featured Credential - AWS Certified AI Practitioner */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="glass p-6 md:p-8 rounded-3xl border border-accent/20 hover:border-accent/50 transition-colors shadow-2xl relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-all pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/aws-ai-badge.png" 
                  alt="AWS Certified AI Practitioner Badge" 
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(var(--accent),0.5)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-4">
                  Featured Certification
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-main mb-3">AWS Certified AI Practitioner</h3>
                <p className="text-muted leading-relaxed mb-6 max-w-2xl">
                  Validates understanding of AI, ML, and generative AI concepts, methods, and strategies on AWS. Demonstrates the ability to determine correct AI/ML technologies for specific use cases and use them responsibly.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="https://www.credly.com/badges/fea7d702-f891-48fd-8f07-35d609725ded/public_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-accent text-inverseText font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-accent/20"
                  >
                    <i className="fas fa-check-circle" /> Verify Credential
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The cool scattered gallery grid effect */}
        <CertificationsGallery certificates={certificates} />
      </div>
    </section>
  );
}
