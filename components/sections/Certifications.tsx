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

        {/* The cool scattered gallery grid effect */}
        <CertificationsGallery certificates={certificates} />
      </div>
    </section>
  );
}
