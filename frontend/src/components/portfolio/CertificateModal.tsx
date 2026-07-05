import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ShieldCheck, Calendar, Award, BookOpen } from "lucide-react";

export type CertificateData = {
  title: string;
  issuer: string;
  issueDate: string;
  skills: string[];
  credentialType: string;
  link: string;
};

type CertificateModalProps = {
  cert: CertificateData | null;
  onClose: () => void;
};

export function CertificateModal({ cert, onClose }: CertificateModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (cert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [cert]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050810]/80 backdrop-blur-md"
          >
            {/* Cinematic Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
          </motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex flex-col w-full max-w-5xl max-h-[90vh] mx-4 rounded-3xl border border-white/10 bg-[#0a0f1c]/90 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Top Navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h2 className="text-lg font-semibold text-slate-100">{cert.title}</h2>
                <span className="hidden sm:inline-block text-white/20">|</span>
                <span className="text-sm font-medium text-slate-400">{cert.issuer}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={cert.link}
                  download
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 transition-colors"
                  title="Download Certificate"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 transition-colors"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content Area (Scrollable if needed) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col items-center">
              {/* Floating Certificate Image */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 p-2 shadow-[0_0_50px_-15px_rgba(59,130,246,0.3)] w-full max-w-3xl"
              >
                <img
                  src={cert.link}
                  alt={`${cert.title} Certificate`}
                  className="w-full h-auto rounded-lg object-contain bg-white"
                />
              </motion.div>

              {/* Metadata Section */}
              <div className="w-full max-w-3xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="mt-0.5 text-blue-400">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                      Issuer
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-200">{cert.issuer}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="mt-0.5 text-emerald-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                      Issue Date
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-200">{cert.issueDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="mt-0.5 text-purple-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                      Credential Type
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-200">{cert.credentialType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="mt-0.5 text-indigo-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                      Skills Covered
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] font-medium text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
