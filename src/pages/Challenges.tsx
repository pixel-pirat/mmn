import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, Flame, Lock, CheckCircle, Sparkles, ArrowRight, Star } from "lucide-react";
import { useSEO } from "@/lib/seo";

const GIVING_DAYS = [
  { day: 1, amount: 1 },
  { day: 2, amount: 2 },
  { day: 3, amount: 3 },
  { day: 4, amount: 4 },
  { day: 5, amount: 5 },
  { day: 6, amount: 6 },
  { day: 7, amount: 7 },
];

const TOTAL = GIVING_DAYS.reduce((s, d) => s + d.amount, 0);

const upcomingChallenges = [
  {
    icon: Sparkles,
    title: "7-Day Gratitude Journal",
    desc: "Write one thing you're grateful for every day for a week and share it with the community.",
  },
  {
    icon: Gift,
    title: "Acts of Kindness Sprint",
    desc: "Perform one intentional act of kindness each day for 5 days.",
  },
  {
    icon: Flame,
    title: "Purpose Reflection Challenge",
    desc: "Answer one deep purpose-discovery question daily for 7 days.",
  },
];

const Challenges = () => {
  useSEO({
    title: "Challenges",
    description: "Join MeaningMatters Network's fun community challenges — grow, give, and connect with purpose.",
  });

  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setCheckedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const completedAmount = GIVING_DAYS.filter((d) => checkedDays.includes(d.day)).reduce(
    (s, d) => s + d.amount,
    0
  );

  const progressPct = Math.round((completedAmount / TOTAL) * 100);

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/15 rounded-full px-4 py-1.5 mb-5">
            <Trophy className="h-3.5 w-3.5 text-primary-foreground" />
            <span className="text-primary-foreground/90 font-medium text-xs tracking-wide uppercase">
              Community Challenges
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Grow Together, One Challenge at a Time
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Fun, purposeful activities designed to stretch you, connect you with the MMN community, and make a real difference.
          </p>
        </div>
      </section>


      {/* 7-Day Giving Challenge */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <SectionReveal>
            <div className="bg-card rounded-2xl shadow-elevated border overflow-hidden">
              {/* Card Header */}
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
                  <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-2">
                    7-Day Giving Challenge
                  </h2>
                  <p className="text-primary-foreground/80 max-w-md mx-auto text-sm leading-relaxed">
                    Give GH₵1 on Day 1, GH₵2 on Day 2 — adding one cedi each day until Day 7.
                    A small daily act of generosity that adds up to something meaningful.
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-8 pt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground font-medium">Your progress</span>
                  <span className="font-semibold text-foreground">
                    GH₵{completedAmount} / GH₵{TOTAL}
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 text-right">{progressPct}% complete</p>
              </div>

              {/* Day Grid */}
              <div className="p-8">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  Tick each day as you complete it:
                </p>
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {GIVING_DAYS.map(({ day, amount }) => {
                    const done = checkedDays.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`flex flex-col items-center justify-center rounded-xl p-3 border-2 transition-all duration-200 group ${
                          done
                            ? "gradient-primary border-transparent text-primary-foreground shadow-glow"
                            : "border-border hover:border-primary bg-muted/40 hover:bg-accent"
                        }`}
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

                {/* How it works */}
                <div className="bg-muted/50 rounded-xl p-5 mb-6">
                  <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" /> How it works
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Give GH₵1 on Day 1, GH₵2 on Day 2, and so on up to GH₵7 on Day 7.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Total giving over 7 days: <span className="font-semibold text-foreground ml-1">GH₵{TOTAL}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Tick each day above to track your progress.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Share your journey with the community — inspire others to join!
                    </li>
                  </ul>
                </div>

                {checkedDays.length === 7 ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 shadow-glow">
                      <Trophy className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-1">Challenge Complete! 🎉</h3>
                    <p className="text-muted-foreground text-sm">
                      You gave GH₵{TOTAL} over 7 days. That's the spirit of purposeful generosity.
                    </p>
                  </div>
                ) : (
                  <Link to="/get-involved">
                    <Button className="gradient-primary text-primary-foreground border-0 w-full font-semibold">
                      Join the Challenge — Get Involved <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>


      {/* Coming Soon Challenges */}
      <section className="py-16 gradient-subtle">
        <div className="container max-w-3xl">
          <SectionReveal>
            <div className="text-center mb-10">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">More Coming Soon</p>
              <h2 className="font-heading text-3xl font-bold">Upcoming Challenges</h2>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
                We're always cooking up new ways to grow together. Stay tuned.
              </p>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-3 gap-5">
            {upcomingChallenges.map((c, i) => (
              <SectionReveal key={i}>
                <div className="bg-card rounded-xl p-6 shadow-card border relative overflow-hidden group">
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
      </section>

      {/* CTA */}
      <SectionReveal>
        <section className="py-16">
          <div className="container max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold mb-3">Want to suggest a challenge?</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Have an idea for a fun community activity? We'd love to hear it.
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                Share Your Idea <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Challenges;
