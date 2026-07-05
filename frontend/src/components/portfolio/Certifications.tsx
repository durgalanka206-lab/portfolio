import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { CertificateModal, type CertificateData } from "./CertificateModal";

import ibmGenerativeAi from "../../assets/certificates/ibm_generative_ai.png";
import hackerrankSqlBasic from "../../assets/certificates/hackerrank_sql_basic.png";
import deloitteDataAnalytics from "../../assets/certificates/deloitte_data_analytics.png";
import ibmIntroCloud from "../../assets/certificates/ibm_intro_cloud.png";
import ciscoCybersecurity from "../../assets/certificates/cisco_cybersecurity.png";
import microsoftPowerBi from "../../assets/certificates/microsoft_power_bi.png";

const certs: CertificateData[] = [
  {
    title: "Generative AI for Software Development",
    issuer: "IBM",
    issueDate: "2024",
    skills: ["Generative AI", "Prompt Engineering", "LLMs"],
    credentialType: "Professional Certificate",
    link: ibmGenerativeAi,
  },
  {
    title: "SQL Basic",
    issuer: "HackerRank",
    issueDate: "2023",
    skills: ["SQL", "Relational Databases", "Queries"],
    credentialType: "Assessment",
    link: hackerrankSqlBasic,
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    issueDate: "2023",
    skills: ["Data Analysis", "Tableau", "Business Acumen"],
    credentialType: "Job Simulation",
    link: deloitteDataAnalytics,
  },
  {
    title: "Introduction to Cloud",
    issuer: "IBM",
    issueDate: "2023",
    skills: ["Cloud Computing", "IBM Cloud", "Infrastructure"],
    credentialType: "Professional Certificate",
    link: ibmIntroCloud,
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issueDate: "2023",
    skills: ["Cybersecurity", "Network Security", "Threats"],
    credentialType: "Professional Certificate",
    link: ciscoCybersecurity,
  },
  {
    title: "Power BI for Beginners",
    issuer: "Microsoft",
    issueDate: "2023",
    skills: ["Power BI", "Data Visualization", "Dashboards"],
    credentialType: "Professional Certificate",
    link: microsoftPowerBi,
  },
];

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);

  return (
    <section id="certifications" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Certifications"
          title="Continuous learning"
          description="Coursework and simulations spanning security, cloud, data and modern AI development workflows."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <motion.button
              key={c.title}
              onClick={() => setSelectedCert(c)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="text-left gradient-border group relative block w-full overflow-hidden rounded-2xl glass p-5 transition-all duration-300 sm:rounded-3xl sm:p-6 cursor-pointer hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:border-primary/30"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent-2/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex flex-col h-full justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-primary text-base text-white transition-transform duration-300 group-hover:scale-110">
                    ★
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Certificate · 0{i + 1}
                    </p>
                    <p className="mt-1.5 font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                      {c.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-2">
                  <span className="text-[10px] font-medium text-muted-foreground/60 transition-all duration-300 group-hover:text-primary flex items-center gap-1">
                    View Certificate
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
}
