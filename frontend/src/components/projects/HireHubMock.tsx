import { motion } from "framer-motion";
import {
  Search,
  Users,
  FileText,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Briefcase,
} from "lucide-react";

export function HireHubMock() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0f1c] font-sans text-slate-300">
      {/* Background Glow */}
      <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/20 blur-[80px]" />
      <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-indigo-600/10 blur-[80px]" />

      <div className="flex h-full w-full flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-slate-200 text-xs">HireHub AI</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <Search className="absolute left-2 h-3 w-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="h-6 w-40 rounded-full border border-white/10 bg-white/5 pl-7 text-[10px] outline-none placeholder:text-slate-500 focus:border-blue-500/50"
                readOnly
              />
            </div>
            <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 ring-2 ring-white/10" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex flex-1 gap-4 p-4">
          {/* Main Column */}
          <div className="flex flex-1 flex-col gap-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-3">
              {[
                {
                  label: "Active Jobs",
                  value: "24",
                  icon: Briefcase,
                  color: "text-blue-400",
                  bg: "bg-blue-400/10",
                },
                {
                  label: "Candidates",
                  value: "1,248",
                  icon: Users,
                  color: "text-indigo-400",
                  bg: "bg-indigo-400/10",
                },
                {
                  label: "Interviews",
                  value: "142",
                  icon: CheckCircle2,
                  color: "text-emerald-400",
                  bg: "bg-emerald-400/10",
                },
                {
                  label: "Success Rate",
                  value: "94%",
                  icon: TrendingUp,
                  color: "text-purple-400",
                  bg: "bg-purple-400/10",
                },
              ].map((kpi, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={kpi.label}
                  className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className={`rounded-md p-1.5 ${kpi.bg}`}>
                      <kpi.icon className={`h-3 w-3 ${kpi.color}`} />
                    </div>
                    <span className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                      {kpi.label}
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-bold text-slate-100">{kpi.value}</div>
                </motion.div>
              ))}
            </div>

            {/* AI Insights & Resume Parsing */}
            <div className="flex flex-1 gap-4">
              {/* AI Candidates */}
              <div className="flex flex-1 flex-col rounded-xl border border-white/5 bg-white/[0.02] p-4 shadow-lg backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <h4 className="text-xs font-semibold text-slate-200">AI Top Matches</h4>
                  </div>
                  <span className="text-[10px] text-slate-500">Sr. Frontend Role</span>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    {
                      name: "Sarah Chen",
                      role: "React Expert",
                      score: 96,
                      color: "bg-emerald-500",
                    },
                    {
                      name: "Alex Johnson",
                      role: "UI Engineer",
                      score: 91,
                      color: "bg-emerald-400",
                    },
                    { name: "Priya Sharma", role: "Frontend Dev", score: 89, color: "bg-blue-400" },
                  ].map((candidate, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      key={candidate.name}
                      className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.01] p-2 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 ring-1 ring-white/10">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[11px] font-medium text-slate-200">
                            {candidate.name}
                          </div>
                          <div className="text-[9px] text-slate-500">{candidate.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${candidate.score}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className={`h-full ${candidate.color} shadow-[0_0_10px_rgba(52,211,153,0.4)]`}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-300">
                          {candidate.score}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Funnel */}
          <div className="w-48 rounded-xl border border-blue-500/10 bg-gradient-to-b from-blue-500/5 to-transparent p-4 shadow-lg backdrop-blur-sm relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <div className="h-16 w-16 rounded-full bg-blue-500 blur-2xl" />
            </div>

            <h4 className="mb-4 text-xs font-semibold text-slate-200">Hiring Funnel</h4>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Applications", count: 1248, width: "100%", color: "bg-slate-700" },
                { label: "Screened", count: 623, width: "75%", color: "bg-blue-900" },
                { label: "Interviewed", count: 142, width: "45%", color: "bg-blue-700" },
                {
                  label: "Hired",
                  count: 24,
                  width: "20%",
                  color: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]",
                },
              ].map((stage, i) => (
                <div key={stage.label} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-slate-400">{stage.label}</span>
                    <span className="font-medium text-slate-200">{stage.count}</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: stage.width }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                    className={`h-6 rounded-md ${stage.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-white/5 bg-black/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-3 w-3 text-purple-400" />
                <span className="text-[10px] font-medium text-slate-300">OCR Parsing</span>
              </div>
              <div className="text-lg font-bold text-white">99.8%</div>
              <div className="text-[8px] text-slate-500">Accuracy across 5k resumes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
