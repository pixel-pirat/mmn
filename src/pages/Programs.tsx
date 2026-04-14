import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Users, Video, Heart, Lightbulb, ArrowRight,
  Calendar, MapPin, Clock, X, Loader2, ExternalLink,
  Trophy, Gift, Flame, Lock, CheckCircle, Sparkles, Star,
} from "lucide-react";
import { toast } from "sonner";
import { registerForEvent } from "@/lib/api";
import { useSEO } from "@/lib/seo";

// ── Tab config ───────────────────────────────────────────────
const TABS = [
  { key: "programs", label: "Programs" },
  { key: "events",   label: "Events" },
  { key: "challenges", label: "Challenges" },
] as const;
type Tab = typeof TABS[number]["key"];

// ── Programs data ────────────────────────────────────────────
const programs = [
  {
    icon: BookOpen,
    title: "Workshops",
    desc: "Interactive sessions on purpose discovery and personal development.",
    objectives: ["Facilitate purpose discovery", "Build practical life skills", "Foster meaningful peer connections"],
    audience: "Open to all individuals",
  },
  {
    icon: Users,
    title: "Seminars",
    desc: "Expert-led presentations and panel discussions focused on purpose discovery, personal growth, and moral excellence.",
    objectives: ["Expose individuals to expert perspectives", "Encourage critical thinking", "Inspire personal growth and purposeful action"],
    audience: "Students, young professionals, and all individuals",
  },
  {
    icon: Video,
    title: "Webinars",
    desc: "Virtual learning experiences connecting individuals across communities for shared growth and inspiration.",
    objectives: ["Increase accessibility", "Enable global participation", "Deliver timely, relevant content"],
    audience: "Global community",
  },
  {
    icon: Heart,
    title: "Mentorship Programs",
    desc: "Structured one-on-one and group mentorship that pairs individuals with experienced leaders and professionals.",
    objectives: ["Provide personalized guidance", "Build long-term purposeful relationships", "Accelerate personal growth"],
    audience: "Individuals seeking personal development",
  },
  {
    icon: Lightbulb,
    title: "Leadership Development",
    desc: "Intensive leadership training programs that equip individuals to lead with vision, integrity, and lasting impact.",
    objectives: ["Develop leadership competencies", "Build confidence and character", "Create community impact"],
    audience: "Emerging leaders",
  },
];

// ── Events data ──────────────────────────────────────────────
interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  gcalStart: string;
  gcalEnd: string;
}

const upcomingEvents: Event[] = [
  { title: "Purpose Discovery Seminar", date: "TBA", time: "TBA", location: "Accra, Ghana", type: "Seminar", description: "An expert-led seminar focused on helping individuals discover their purpose and take meaningful steps toward purposeful living.", gcalStart: "20260601T090000", gcalEnd: "20260601T130000" },
  { title: "Mentorship Kick-Off", date: "TBA", time: "TBA", location: "MMN HQ, Accra", type: "Mentorship", description: "The official launch of the MMN mentorship cohort. Meet your mentor and begin your purposeful journey.", gcalStart: "20260615T150000", gcalEnd: "20260615T170000" },
  { title: "Purpose-Driven Leadership Workshop", date: "TBA", time: "TBA", location: "Accra, Ghana", type: "Workshop", description: "An interactive workshop equipping individuals with the tools to lead with vision, integrity, and impact.", gcalStart: "20260701T100000", gcalEnd: "20260701T140000" },
  { title: "MMN Annual Conference", date: "TBA", time: "TBA", location: "Accra, Ghana", type: "Conference", description: "MMN's flagship annual gathering — inspiring talks, workshops, networking, and community celebration.", gcalStart: "20261001T090000", gcalEnd: "20261001T170000" },
  { title: "Leadership Bootcamp", date: "TBA", time: "TBA", location: "Accra, Ghana", type: "Leadership Bootcamp", description: "An intensive multi-day bootcamp developing the next generation of purpose-driven leaders.", gcalStart: "20261101T090000", gcalEnd: "20261103T170000" },
  { title: "Community Outreach Event", date: "TBA", time: "TBA", location: "Accra, Ghana", type: "Outreach", description: "MMN takes its mission to the community — engaging individuals where they are and sharing the message of purpose.", gcalStart: "20261115T100000", gcalEnd: "20261115T140000" },
  { title: "Purpose & Potential Webinar", date: "TBA", time: "TBA", location: "Online (Zoom)", type: "Webinar", description: "A virtual session connecting individuals across communities to explore purpose, potential, and meaningful living.", gcalStart: "20261201T180000", gcalEnd: "20261201T193000" },
];

const pastEvents = [
  { title: "MMN Inaugural Seminar", highlight: "Purpose discovery sessions with community leaders" },
  { title: "Leadership Development Workshop", highlight: "Equipping individuals with purpose-driven leadership skills" },
  { title: "Community Outreach Program", highlight: "Reaching individuals across multiple communities in Accra" },
];

function buildGCalLink(event: Event) {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.gcalStart}/${event.gcalEnd}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
}

function RegisterModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Please fill in your name and email.");
    setLoading(true);
    try {
      const res = await registerForEvent({ event_name: event.title, event_date: event.date, name: form.name, email: form.email, phone: form.phone });
      toast.success(res.message);
      onClose();
    } catch {
      toast.error("Registration failed. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-2xl p-8 shadow-elevated border w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-heading text-xl font-bold">Register for Event</h3>
            <p className="text-muted-foreground text-sm mt-1">{event.title}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-6 bg-muted rounded-lg p-3">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{event.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{event.time}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reg-name" className="text-sm font-medium mb-1 block">Full Name <span className="text-destructive">*</span></label>
            <input id="reg-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="reg-email" className="text-sm font-medium mb-1 block">Email <span className="text-destructive">*</span></label>
            <input id="reg-email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" type="email" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="reg-phone" className="text-sm font-medium mb-1 block">Phone (optional)</label>
            <input id="reg-phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+233 XX XXX XXXX" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering…</> : "Confirm Registration"}
          </Button>
        </form>
        <div className="mt-4 pt-4 border-t">
          <a href={buildGCalLink(event)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink className="h-3.5 w-3.5" /> Add to Google Calendar
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Challenges data ──────────────────────────────────────────
const GIVING_DAYS = [1, 2, 3, 4, 5, 6, 7].map(day => ({ day, amount: day }));
const GIVING_TOTAL = GIVING_DAYS.reduce((s, d) => s + d.amount, 0);

const upcomingChallenges = [
  { icon: Sparkles, title: "7-Day Gratitude Journal", desc: "Write one thing you're grateful for every day for a week and share it with the community." },
  { icon: Gift, title: "Acts of Kindness Sprint", desc: "Perform one intentional act of kindness each day for 5 days." },
  { icon: Flame, title: "Purpose Reflection Challenge", desc: "Answer one deep purpose-discovery question daily for 7 days." },
];

// ── Tab panels ───────────────────────────────────────────────
function ProgramsTab() {
  return (
    <div className="space-y-8">
      {programs.map((p, i) => (
        <SectionReveal key={i}>
          <div className="bg-card rounded-xl p-8 shadow-card border">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <p.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold">{p.title}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{p.audience}</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{p.desc}</p>
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Key Objectives:</h4>
              <ul className="space-y-1">
                {p.objectives.map((o, j) => (
                  <li key={j} className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}

function EventsTab() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  return (
    <>
      <div className="space-y-4 mb-12">
        <h2 className="font-heading text-2xl font-bold mb-6">Upcoming Events</h2>
        {upcomingEvents.map((e, i) => (
          <SectionReveal key={i}>
            <div className="bg-card rounded-xl p-6 shadow-card border flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{e.type}</span>
                <h3 className="font-heading font-semibold text-lg mt-2">{e.title}</h3>
                <p className="text-muted-foreground text-sm mt-1 mb-2">{e.description}</p>
                <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{e.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{e.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{e.location}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button onClick={() => setSelectedEvent(e)} className="gradient-primary text-primary-foreground border-0">
                  Register <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
                <a href={buildGCalLink(e)} target="_blank" rel="noopener noreferrer" className="text-xs text-center text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
                  <ExternalLink className="h-3 w-3" /> Add to Calendar
                </a>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      <div className="pt-8 border-t">
        <h2 className="font-heading text-2xl font-bold mb-6">Past Events</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {pastEvents.map((e, i) => (
            <SectionReveal key={i}>
              <div className="bg-card rounded-xl p-6 shadow-card border">
                <h3 className="font-heading font-semibold mb-2">{e.title}</h3>
                <p className="text-muted-foreground text-sm">{e.highlight}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {selectedEvent && <RegisterModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>
  );
}

function ChallengesTab() {
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const toggleDay = (day: number) =>
    setCheckedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);

  const completedAmount = GIVING_DAYS.filter(d => checkedDays.includes(d.day)).reduce((s, d) => s + d.amount, 0);
  const progressPct = Math.round((completedAmount / GIVING_TOTAL) * 100);

  return (
    <div className="space-y-12">
      {/* 7-Day Giving Challenge */}
      <SectionReveal>
        <div className="bg-card rounded-2xl shadow-elevated border overflow-hidden">
          <div className="gradient-cta p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary-foreground/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary-foreground/20 blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="inline-block bg-primary-foreground/20 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                🔥 Active Challenge
              </span>
              <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-2">7-Day Giving Challenge</h2>
              <p className="text-primary-foreground/80 max-w-md mx-auto text-sm leading-relaxed">
                Give GH₵1 on Day 1, GH₵2 on Day 2 — adding one cedi each day until Day 7. A small daily act of generosity that adds up to something meaningful.
              </p>
            </div>
          </div>

          <div className="px-8 pt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground font-medium">Your progress</span>
              <span className="font-semibold">GH₵{completedAmount} / GH₵{GIVING_TOTAL}</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 text-right">{progressPct}% complete</p>
          </div>

          <div className="p-8">
            <p className="text-sm font-medium text-muted-foreground mb-4">Tick each day as you complete it:</p>
            <div className="grid grid-cols-7 gap-2 mb-8">
              {GIVING_DAYS.map(({ day, amount }) => {
                const done = checkedDays.includes(day);
                return (
                  <button key={day} onClick={() => toggleDay(day)}
                    className={`flex flex-col items-center justify-center rounded-xl p-3 border-2 transition-all duration-200 ${done ? "gradient-primary border-transparent text-primary-foreground shadow-glow" : "border-border hover:border-primary bg-muted/40 hover:bg-accent"}`}
                    aria-label={`Day ${day} — GH₵${amount}`}
                  >
                    <span className="text-[10px] font-medium mb-1 opacity-70">Day</span>
                    <span className="font-heading font-bold text-lg leading-none">{day}</span>
                    <span className="text-[10px] mt-1 font-semibold">₵{amount}</span>
                    {done && <CheckCircle className="h-3.5 w-3.5 mt-1" />}
                  </button>
                );
              })}
            </div>

            <div className="bg-muted/50 rounded-xl p-5 mb-6">
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" /> How it works
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />Give GH₵1 on Day 1, GH₵2 on Day 2, and so on up to GH₵7 on Day 7.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />Total giving over 7 days: <span className="font-semibold text-foreground ml-1">GH₵{GIVING_TOTAL}</span></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />Tick each day above to track your progress.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />Share your journey with the community — inspire others to join!</li>
              </ul>
            </div>

            {checkedDays.length === 7 ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 shadow-glow">
                  <Trophy className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-1">Challenge Complete! 🎉</h3>
                <p className="text-muted-foreground text-sm">You gave GH₵{GIVING_TOTAL} over 7 days. That's the spirit of purposeful generosity.</p>
              </div>
            ) : (
              <Button className="gradient-primary text-primary-foreground border-0 w-full font-semibold" onClick={() => window.location.href = "/get-involved"}>
                Join the Challenge — Get Involved <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </SectionReveal>

      {/* Upcoming challenges */}
      <div>
        <div className="text-center mb-8">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">More Coming Soon</p>
          <h2 className="font-heading text-2xl font-bold">Upcoming Challenges</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {upcomingChallenges.map((c, i) => (
            <SectionReveal key={i}>
              <div className="bg-card rounded-xl p-6 shadow-card border relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 rounded-xl">
                  <Lock className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-xs font-semibold text-muted-foreground">Coming Soon</span>
                </div>
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <c.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────
const Programs = () => {
  useSEO({
    title: "Programs, Events & Challenges",
    description: "Explore MMN's programs, upcoming events, and community challenges — all in one place.",
  });

  const [activeTab, setActiveTab] = useState<Tab>("programs");

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Programs, Events & Challenges
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Everything MMN offers — from structured programs to live events and community challenges.
          </p>
        </div>
      </section>

      {/* Sticky tab bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b">
        <div className="container flex gap-1 py-3 justify-center">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t.key ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <section className="py-12">
        <div className="container max-w-4xl">
          {activeTab === "programs"   && <ProgramsTab />}
          {activeTab === "events"     && <EventsTab />}
          {activeTab === "challenges" && <ChallengesTab />}
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
