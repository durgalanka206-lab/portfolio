import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  GraduationCap,
  Building2,
  CheckCircle,
  Clock,
  LayoutDashboard,
} from "lucide-react";

export function SmsMock() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c1015] font-sans text-slate-300">
      {/* Enterprise Background Gradients */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-teal-500/10 blur-[100px]" />
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="flex h-full w-full flex-col">
        {/* Top App Bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-[#0f141a] px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-teal-500 to-emerald-600 shadow-sm">
              <GraduationCap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-slate-200 text-xs">
              EduManage Enterprise
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 border border-white/5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[9px] font-medium text-slate-400">System Online</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 gap-4 p-4">
          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Top Widgets */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Total Students", value: "1,200+", icon: Users, color: "text-teal-400" },
                { label: "Attendance", value: "92%", icon: Clock, color: "text-emerald-400" },
                { label: "Faculty", value: "87", icon: BookOpen, color: "text-blue-400" },
                { label: "Departments", value: "12", icon: Building2, color: "text-indigo-400" },
              ].map((widget, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={widget.label}
                  className="rounded-lg border border-white/5 bg-white/[0.01] p-3 shadow-sm hover:bg-white/[0.02] transition-colors"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[9px] font-medium text-slate-500 uppercase">
                      {widget.label}
                    </span>
                    <widget.icon className={`h-3 w-3 ${widget.color}`} />
                  </div>
                  <div className="text-lg font-semibold text-slate-200">{widget.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Middle Section: Table and Chart */}
            <div className="flex flex-1 gap-4">
              {/* Student Records Table */}
              <div className="flex-[2] flex flex-col rounded-lg border border-white/5 bg-white/[0.01] p-3 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <LayoutDashboard className="h-3 w-3 text-teal-400" />
                    <h4 className="text-xs font-medium text-slate-300">Recent Records</h4>
                  </div>
                  <button className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-slate-400 hover:text-slate-200">
                    View All
                  </button>
                </div>

                <div className="w-full text-left text-[10px]">
                  <div className="grid grid-cols-12 gap-2 border-b border-white/5 pb-2 font-medium text-slate-500">
                    <div className="col-span-5">Student Name</div>
                    <div className="col-span-3">Roll No</div>
                    <div className="col-span-2">GPA</div>
                    <div className="col-span-2">Status</div>
                  </div>

                  <div className="flex flex-col pt-2">
                    {[
                      {
                        name: "Aarav Kumar",
                        roll: "CS-2024-001",
                        gpa: "3.9",
                        status: "Active",
                        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      },
                      {
                        name: "Priya Sharma",
                        roll: "CS-2024-042",
                        gpa: "3.7",
                        status: "Active",
                        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      },
                      {
                        name: "Rahul Verma",
                        roll: "ME-2024-018",
                        gpa: "3.4",
                        status: "Warning",
                        color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                      },
                      {
                        name: "Sophia Patel",
                        roll: "EE-2024-093",
                        gpa: "3.8",
                        status: "Active",
                        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      },
                    ].map((student, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        key={student.name}
                        className="grid grid-cols-12 gap-2 border-b border-white/5 py-1.5 last:border-0 hover:bg-white/[0.02]"
                      >
                        <div className="col-span-5 font-medium text-slate-300">{student.name}</div>
                        <div className="col-span-3 text-slate-500 font-mono text-[9px]">
                          {student.roll}
                        </div>
                        <div className="col-span-2 text-slate-400">{student.gpa}</div>
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center rounded px-1.5 py-0.5 text-[8px] font-medium border ${student.color}`}
                          >
                            {student.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attendance Chart Widget */}
              <div className="flex-1 rounded-lg border border-white/5 bg-white/[0.01] p-3 shadow-sm flex flex-col">
                <h4 className="mb-4 text-xs font-medium text-slate-300">Attendance Trends</h4>
                <div className="mt-auto flex h-24 items-end justify-between gap-1">
                  {[65, 78, 85, 92, 88, 96, 94].map((height, i) => (
                    <div
                      key={i}
                      className="group relative w-full rounded-t-sm bg-teal-900/30 hover:bg-teal-800/40"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                        className="absolute bottom-0 w-full rounded-t-sm bg-gradient-to-t from-teal-600 to-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.2)]"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[8px] text-slate-500">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
