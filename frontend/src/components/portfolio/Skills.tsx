import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const groups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Java", "Python", "JavaScript", "C"],
  },
  {
    title: "Frontend",
    items: ["HTML5", "CSS3", "React 18", "Responsive Design"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    items: ["SQL", "MySQL", "MongoDB", "Mongoose ODM"],
  },
  {
    title: "Developer Tools",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
  {
    title: "AI & Productivity Tools",
    items: ["ChatGPT", "Claude", "Cursor", "Grok", "Lovable", "Antigravity"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Skills"
          title="Tools of the trade"
          description="A focused stack across languages, frontend, backend, databases and AI — practiced through real projects."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="gradient-border group relative overflow-hidden rounded-2xl glass p-5 transition-shadow sm:rounded-3xl sm:p-6 sm:hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.35)]"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
                <span className="text-[10px] font-mono text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
