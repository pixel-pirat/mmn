import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Heart, Award, Users, Shield, Eye, Target, Star, CheckCircle, Linkedin } from "lucide-react";
import { useSEO } from "@/lib/seo";

const tabs = ["Our Story", "Leadership"];

const values = [
  { icon: Shield,      title: "Integrity",        desc: "Acting with honesty, transparency, and strong moral principles at all times." },
  { icon: Star,        title: "Self-Discipline",   desc: "Practicing self-control, consistency, and focus in pursuit of excellence." },
  { icon: CheckCircle, title: "Diligence",         desc: "Applying persistent and careful effort in all tasks and responsibilities." },
  { icon: Award,       title: "Responsibility",    desc: "Being accountable for one's actions and obligations within MMN and beyond." },
  { icon: Heart,       title: "Excellence",        desc: "Striving to exceed expectations and deliver outstanding results." },
  { icon: Users,       title: "Valuing People",    desc: "Recognizing the inherent worth, dignity, and potential of every individual." },
];

const board = [
  { name: "Joseph Zah-Nyatefe",       title: "President / Chairperson",       bio: "Visionary leader steering MMN's mission of helping individuals discover their purpose and live with impact.",                                    expertise: "Leadership & Strategy" },
  { name: "Joan Sefakor Agyei-Kumah", title: "Vice President / Vice Chair",    bio: "Dedicated to advancing MMN's programs and supporting the president in driving the organisation's vision forward.",                             expertise: "Program Oversight" },
  { name: "Bless Dzikunu",            title: "Secretary",                      bio: "Ensures smooth organisational operations, record-keeping, and effective communication across all teams.",                                       expertise: "Administration" },
  { name: "Emmanuel Amenyo",          title: "Executive Director (Ex-officio)", bio: "Drives MMN's operational strategy and program delivery as the organisation's chief executive.",                                               expertise: "Executive Leadership" },
  { name: "Sheena Agbeamehia",        title: "Treasurer",                      bio: "Manages MMN's finances with transparency and accountability, ensuring resources are directed toward maximum impact.",                           expertise: "Financial Management" },
];

const executiveTeam = [
  { name: "Emmanuel Amenyo",   title: "Executive Director",           bio: "Leads MMN's day-to-day operations and strategic initiatives, ensuring the mission is delivered with excellence.",                  expertise: "Executive Leadership" },
  { name: "Zerez Teye Gormey", title: "Program Coordinator",          bio: "Designs and coordinates MMN's workshops, seminars, and purpose-driven development initiatives.",                                  expertise: "Program Development" },
  { name: "Lois Naamah",       title: "Financial Officer",            bio: "Oversees MMN's financial operations, budgeting, and reporting with diligence and integrity.",                                     expertise: "Finance" },
  { name: "Daniel Albert",     title: "Media & Communications Officer", bio: "Amplifies MMN's mission through strategic communications, media, and digital storytelling.",                                   expertise: "Media & Communications" },
  { name: "Judith Gamasen",    title: "Membership & Welfare Manager", bio: "Champions member welfare and drives community building, ensuring every MMN member feels valued and supported.",                   expertise: "Member Welfare & Community" },
  { name: "Sandra Ayinsogya",  title: "Administrative Officer",       bio: "Keeps MMN's operations running smoothly through efficient administration and organisational support.",                            expertise: "Administration" },
];

function MemberCard({ name, title, bio, expertise }: { name: string; title: string; bio: string; expertise: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 3);
  return (
    <div className="bg-card rounded-xl p-6 shadow-card border text-center">
      <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
        <span className="text-primary-foreground font-heading text-lg font-bold">{initials}</span>
      </div>
      <h3 className="font-heading font-semibold text-lg">{name}</h3>
      <p className="text-primary text-sm font-medium mb-2">{title}</p>
      <p className="text-muted-foreground text-sm mb-3">{bio}</p>
      <span className="inline-block text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full">{expertise}</span>
      <div className="mt-3">
        <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
          <Linkedin className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const About = () => {
  useSEO({
    title: "About Us",
    description: "Learn about MeaningMatters Network — our story, mission, vision, values, and the leaders driving our mission.",
  });

  const [activeTab, setActiveTab] = useState("Our Story");

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About Us</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Discover our story, mission, values, and the dedicated team driving MMN's mission forward.
          </p>
        </div>
      </section>

      {/* Tab bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b">
        <div className="container flex gap-1 py-3 justify-center">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Our Story */}
      {activeTab === "Our Story" && (
        <>
          <SectionReveal>
            <section className="py-20">
              <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  MeaningMatters Network was founded with a singular conviction: that every person has the potential to live a life of profound purpose and impact. Born from a desire to see this generation — and the next — equipped spiritually, morally, and intellectually for purposeful living, MMN has grown from a small community initiative into a movement touching millions of lives.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our journey began when a group of dedicated mentors and educators recognized the growing need for holistic development — programs that go beyond the surface to nurture the whole person. Today, we continue that mission with unwavering commitment.
                </p>
              </div>
            </section>
          </SectionReveal>

          <section className="py-20 gradient-subtle">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <SectionReveal>
                  <div className="bg-card rounded-xl p-8 shadow-card border">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                      <Eye className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-3">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To cultivate a world where individuals live with purpose, meaning, and impact.
                    </p>
                  </div>
                </SectionReveal>
                <SectionReveal>
                  <div className="bg-card rounded-xl p-8 shadow-card border">
                    <div className="w-12 h-12 rounded-lg gradient-cta flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-3">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To help individuals discover their purpose, develop their gifts, and unleash their full potential for meaningful and impactful living.
                    </p>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </section>

          <SectionReveal>
            <section className="py-20">
              <div className="container">
                <h2 className="font-heading text-3xl font-bold text-center mb-12">Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {values.map((v, i) => (
                    <div key={i} className="p-6 bg-card rounded-xl shadow-card border flex gap-4">
                      <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center shrink-0">
                        <v.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1">{v.title}</h4>
                        <p className="text-muted-foreground text-sm">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>
        </>
      )}

      {/* Leadership */}
      {activeTab === "Leadership" && (
        <>
          <SectionReveal>
            <section className="py-16">
              <div className="container">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-10 text-center">Board of Directors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {board.map((e, i) => <MemberCard key={i} {...e} />)}
                </div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal>
            <section className="py-16 gradient-subtle">
              <div className="container">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-10 text-center">Executive Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {executiveTeam.map((e, i) => <MemberCard key={i} {...e} />)}
                </div>
              </div>
            </section>
          </SectionReveal>
        </>
      )}
    </Layout>
  );
};

export default About;
