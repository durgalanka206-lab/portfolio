import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import { FormSuccessCelebration } from "./FormSuccessCelebration";
import { SectionHeader } from "./SectionHeader";
import { ResumeTrigger } from "./ResumePreview";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

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
  if (dummyNames.some(dummy => lower.includes(dummy))) {
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
    "test", "fake", "qwerty", "asdf", "abc123", "temp", "dummy", "sample",
    "12345", "admin", "noreply", "no-reply"
  ];
  if (fakePatterns.some((pattern) => localPart.includes(pattern))) {
    return "Please provide a real email address.";
  }

  // Reject emails with random keyboard-spam patterns
  // 1. More than 4 consecutive consonants (blocks "sjdvvwjgiw")
  if (/[bcdfghjklmnpqrstvwxz]{5,}/.test(localPart)) {
    return "Email appears to contain random characters.";
  }
  
  // 2. Common keyboard walks
  const walks = [
    "qwer", "wert", "erty", "rtyu", "tyui", "yuio", "uiop",
    "asdf", "sdfg", "dfgh", "fghj", "ghjk", "hjkl",
    "zxcv", "xcvb", "cvbn", "vbnm"
  ];
  if (walks.some((walk) => localPart.includes(walk))) {
    return "Email contains invalid sequences.";
  }

  // 3. Repeating characters (e.g., "aaa")
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
    "trashmail.com"
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
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // OTP Cooldown timer
  useEffect(() => {
    if (otpCooldown > 0) {
      const timer = setTimeout(() => setOtpCooldown(otpCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCooldown]);

  // Load Cloudflare Turnstile script
  useEffect(() => {
    const scriptId = "cloudflare-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Initialize Turnstile widget
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (typeof window !== "undefined") {
      interval = setInterval(() => {
        if (window.turnstile && turnstileRef.current) {
          clearInterval(interval);
          const widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: "1x00000000000000000000BB", // Cloudflare testing sitekey for invisible widgets (always passes)
            theme: "dark",
            size: "normal",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken(null);
              if (window.turnstile) window.turnstile.execute(widgetId);
            },
            "error-callback": () => {
              setTurnstileToken(null);
            },
          });
          // Execute background verification immediately
          window.turnstile.execute(widgetId);
        }
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);



  // Compute validation errors dynamically
  const nameError = touched.name ? validateName(values.name) : "";
  const emailError = touched.email ? validateEmail(values.email) : "";
  const messageError = touched.message ? validateMessage(values.message) : "";

  // Check if form is fully valid
  const rawNameError = validateName(values.name);
  const rawEmailError = validateEmail(values.email);
  const rawMessageError = validateMessage(values.message);
  const isFormValid = !rawNameError && !rawEmailError && !rawMessageError && values.name && values.email && values.message && isEmailVerified;

  const handleSendOtp = async () => {
    if (!values.email || rawEmailError) {
      toast.error("Please enter a valid email address first.");
      return;
    }
    setIsSendingOtp(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/contact/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email.trim() })
      });
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Please check backend connection.");
      }
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");
      
      setIsOtpSent(true);
      setOtpCooldown(60);
      toast.success("OTP sent to your email.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/contact/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email.trim(), otp: otpValue })
      });
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Please check backend connection.");
      }
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to verify OTP");
      
      setIsEmailVerified(true);
      setIsOtpSent(false);
      toast.success("Email verified successfully.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isFormValid) {
      toast.error("Please fill out the fields correctly.");
      return;
    }
    if (!isEmailVerified) {
      toast.error("Please verify your email address.");
      return;
    }
    if (!turnstileToken) {
      toast.error("Please complete the Turnstile spam verification.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim()
        })
      });
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Please check backend connection.");
      }
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to send message.");
      }
      
      setSucceeded(true);
      toast.success("Message sent successfully! I will get back to you soon.");
      formRef.current?.reset();
      setValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setIsEmailVerified(false);
      setOtpValue("");
      setOtpCooldown(0);
      setTurnstileToken(null);
      if (window.turnstile) {
        window.turnstile.reset();
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.message || "Failed to send message. Please try again later.";
      setSubmitError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
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
                {succeeded ? (
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
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
                        >
                          Name
                        </label>
                        <input
                          id="name"
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
                        {nameError && (
                          <p className="text-xs text-red-400 mt-1">{nameError}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            required
                            disabled={isEmailVerified}
                            placeholder="your.email@example.com"
                            value={values.email}
                            onChange={(e) => {
                              setValues({ ...values, email: e.target.value });
                              setTouched({ ...touched, email: true });
                              if (isEmailVerified || isOtpSent) {
                                setIsEmailVerified(false);
                                setIsOtpSent(false);
                                setOtpValue("");
                                setOtpCooldown(0);
                              }
                            }}
                            onBlur={() => setTouched({ ...touched, email: true })}
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-24 text-base outline-none transition-all placeholder:text-muted-foreground/30 focus:border-primary/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-primary/50 disabled:opacity-60 sm:px-5 sm:py-3.5 sm:text-sm"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            {isEmailVerified ? (
                              <span className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400">
                                Verified ✓
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isSendingOtp || !!emailError || !values.email || otpCooldown > 0}
                                className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/30 disabled:pointer-events-none disabled:opacity-50"
                              >
                                {isSendingOtp ? "Sending..." : otpCooldown > 0 ? `Resend (${otpCooldown}s)` : "Verify"}
                              </button>
                            )}
                          </div>
                        </div>
                        {emailError && (
                          <p className="mt-1 text-xs text-red-400">{emailError}</p>
                        )}
                        <AnimatePresence>
                          {isOtpSent && !isEmailVerified && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden space-y-2"
                            >
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  maxLength={6}
                                  placeholder="Enter 6-digit OTP"
                                  value={otpValue}
                                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base outline-none transition-all focus:border-primary/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-primary/50 sm:text-sm"
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyOtp}
                                  disabled={isVerifyingOtp || otpValue.length !== 6}
                                  className="shrink-0 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-50"
                                >
                                  {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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

                      {/* Turnstile verification input & widget (Hidden) */}
                      <div className="hidden">
                        <div ref={turnstileRef} />
                      </div>

                      {submitError && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                          {submitError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting || !isFormValid || !turnstileToken}
                        className="relative flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-primary py-4 text-sm font-semibold text-white shadow-[0_15px_50px_-15px_rgba(37,99,235,0.45)] transition-all touch-manipulation active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 sm:hover:bg-primary/90"
                      >
                        {submitting && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                        {submitting ? (
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
