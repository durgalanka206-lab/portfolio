import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useForm } from "@formspree/react";

import { FormSuccessCelebration } from "./FormSuccessCelebration";
import { SectionHeader } from "./SectionHeader";
import { ResumeTrigger } from "./ResumePreview";

const items = [
  { label: "Location", value: "Kakinada, Andhra Pradesh", href: undefined },
  { label: "Phone", value: "+91-8688756569", href: "tel:+918688756569" },
  { label: "Email", value: "durgalanka2006@gmail.com", href: "mailto:durgalanka2006@gmail.com" },
  {
    label: "GitHub",
    value: "github.com/durgalanka206-lab",
    href: "https://github.com/durgalanka206-lab",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/durga-lanka",
    href: "https://linkedin.com/in/durga-lanka",
  },
];

// Helper validation functions
const validateName = (val: string): string => {
  const trimmed = val.trim();
  if (!trimmed) {
    return "Name is required.";
  }
  if (trimmed.length < 3) {
    return "Name must be at least 3 characters.";
  }
  if (trimmed.length > 50) {
    return "Name must be at most 50 characters.";
  }
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(trimmed)) {
    return "Only letters and spaces are allowed.";
  }
  const lower = trimmed.toLowerCase();
  const dummyNames = ["abc", "xyz", "test", "fake", "asdf", "apple banana cherry"];
  if (dummyNames.some((dummy) => lower.includes(dummy))) {
    return "Please enter a valid name.";
  }
  return "";
};

const validateEmail = (val: string): string => {
  const trimmed = val.trim();
  if (!trimmed) {
    return "Email is required.";
  }

  // Strict format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email format.";
  }

  const lower = trimmed.toLowerCase();
  const [localPart, domain] = lower.split("@");

  // Block obvious fake patterns
  const fakePatterns = [
    "test",
    "fake",
    "qwerty",
    "asdf",
    "abc123",
    "temp",
    "dummy",
    "sample",
    "12345",
    "admin",
    "noreply",
    "no-reply",
  ];
  if (fakePatterns.some((pattern) => localPart.includes(pattern))) {
    return "Please provide a real email address.";
  }

  // Reject emails with random keyboard-spam patterns
  if (/[bcdfghjklmnpqrstvwxz]{5,}/.test(localPart)) {
    return "Email appears to contain random characters.";
  }

  // Common keyboard walks
  const walks = [
    "qwer",
    "wert",
    "erty",
    "rtyu",
    "tyui",
    "yuio",
    "uiop",
    "asdf",
    "sdfg",
    "dfgh",
    "fghj",
    "ghjk",
    "hjkl",
    "zxcv",
    "xcvb",
    "cvbn",
    "vbnm",
  ];
  if (walks.some((walk) => localPart.includes(walk))) {
    return "Email contains invalid sequences.";
  }

  // Repeating characters (e.g., "aaa")
  if (/(.)\1{3,}/.test(localPart)) {
    return "Email contains invalid repeating characters.";
  }

  // Block disposable email providers
  const disposableDomains = [
    "mailinator.com",
    "yopmail.com",
    "tempmail.com",
    "10minutemail.com",
    "sharklasers.com",
    "guerrillamail.com",
    "dispostable.com",
    "getairmail.com",
    "burnermail.io",
    "throwawaymail.com",
    "temp-mail.org",
    "trashmail.com",
  ];

  if (disposableDomains.includes(domain)) {
    return "Temporary/disposable email domains are not allowed.";
  }

  return "";
};

const validateMessage = (val: string): string => {
  if (!val.trim()) {
    return "Message is required.";
  }
  if (val.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }
  return "";
};

export function Contact() {
  const [state, handleFormspreeSubmit] = useForm("mlgvkwlg");

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  // Compute validation errors dynamically
  const nameError = touched.name ? validateName(values.name) : "";
  const emailError = touched.email ? validateEmail(values.email) : "";
  const messageError = touched.message ? validateMessage(values.message) : "";

  // Check if form is fully valid
  const rawNameError = validateName(values.name);
  const rawEmailError = validateEmail(values.email);
  const rawMessageError = validateMessage(values.message);
  const isFormValid =
    !rawNameError &&
    !rawEmailError &&
    !rawMessageError &&
    values.name &&
    values.email &&
    values.message;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isFormValid) {
      toast.error("Please fill out the fields correctly.");
      return;
    }

    const res = await handleFormspreeSubmit(e);
    if (res.response && res.response.ok) {
      toast.success("Message sent successfully!");
      setValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } else {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="relative py-10 sm:py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          description="Open to internships, full-time roles and meaningful collaborations. The fastest way to reach me is below."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="gradient-border relative mt-8 overflow-hidden rounded-2xl glass p-4 sm:mt-12 sm:rounded-[32px] sm:p-6 lg:p-8"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent-2/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  <span className="text-gradient">Available for opportunities</span>
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  I'm currently finishing my BCA and actively looking for software developer roles
                  where I can ship full-stack and AI-integrated products. Feel free to connect
                  directly or send a message using the form.
                </p>
              </div>

              <div className="flex">
                <ResumeTrigger className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition-all touch-manipulation active:border-primary/40 active:bg-primary/10 sm:w-auto sm:justify-start sm:hover:border-primary/40 sm:hover:bg-primary/10">
                  View Resume
                </ResumeTrigger>
              </div>

              <ul className="grid gap-3">
                {items.map((c) => {
                  const Inner = (
                    <div className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-all active:border-primary/40 active:bg-white/[0.06] sm:px-5 sm:py-4 sm:group-hover:border-primary/40 sm:group-hover:bg-white/[0.06]">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                          {c.label}
                        </p>
                        <p className="mt-1 break-all text-sm font-medium sm:break-words">
                          {c.value}
                        </p>
                      </div>
                      <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground">
                        →
                      </span>
                    </div>
                  );
                  return (
                    <li key={c.label} className="group">
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                        >
                          {Inner}
                        </a>
                      ) : (
                        Inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="gradient-border relative overflow-hidden rounded-2xl bg-white/[0.01] p-4 sm:p-6">
              <AnimatePresence mode="wait">
                {state.succeeded ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FormSuccessCelebration />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h4 className="mb-4 text-xl font-semibold">Send a Message</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          minLength={3}
                          maxLength={50}
                          pattern="^[A-Za-z\s]+$"
                          placeholder="Your Name"
                          value={values.name}
                          onChange={(e) => {
                            setValues({ ...values, name: e.target.value });
                            setTouched({ ...touched, name: true });
                          }}
                          onBlur={() => setTouched({ ...touched, name: true })}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base outline-none transition-all placeholder:text-muted-foreground/30 focus:border-primary/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-primary/50 sm:px-5 sm:py-3.5 sm:text-sm"
                        />
                        {nameError && <p className="text-xs text-red-400 mt-1">{nameError}</p>}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          value={values.email}
                          onChange={(e) => {
                            setValues({ ...values, email: e.target.value });
                            setTouched({ ...touched, email: true });
                          }}
                          onBlur={() => setTouched({ ...touched, email: true })}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base outline-none transition-all placeholder:text-muted-foreground/30 focus:border-primary/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-primary/50 sm:px-5 sm:py-3.5 sm:text-sm"
                        />
                        {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          placeholder="Tell me about your project..."
                          rows={3}
                          value={values.message}
                          onChange={(e) => {
                            setValues({ ...values, message: e.target.value });
                            setTouched({ ...touched, message: true });
                          }}
                          onBlur={() => setTouched({ ...touched, message: true })}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base outline-none transition-all placeholder:text-muted-foreground/30 focus:border-primary/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-primary/50 resize-none sm:px-5 sm:py-3.5 sm:text-sm"
                        />
                        {messageError && (
                          <p className="text-xs text-red-400 mt-1">{messageError}</p>
                        )}
                      </div>

                      {state.errors && state.errors.length > 0 && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                          {state.errors.map((err) => err.message).join(", ")}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={state.submitting || !isFormValid}
                        className="relative flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-primary py-4 text-sm font-semibold text-white shadow-[0_15px_50px_-15px_rgba(37,99,235,0.45)] transition-all touch-manipulation active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 sm:hover:bg-primary/90"
                      >
                        {state.submitting && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                        {state.submitting ? (
                          <>
                            <motion.span
                              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="relative">Transmitting...</span>
                          </>
                        ) : (
                          <span className="relative">Send Message →</span>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Lanka Durga. Crafted with care.</p>
          <p className="font-mono">Designed & built end-to-end.</p>
        </footer>
      </div>
    </section>
  );
}
