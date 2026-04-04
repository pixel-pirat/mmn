import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Video, Lightbulb, Heart, ArrowRight, Quote, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionReveal from "@/components/SectionReveal";
import heroBg from "@/assets/hero-bg.jpg";
import { useSEO } from "@/lib/seo";

const programs = [
  { icon: BookOpen, title: "Workshops", desc: "Interactive sessions on purpose discovery and personal development." },
  { icon: Users, title: "Seminars", desc: "Expert-led discussions on purpose discovery, personal growth, and moral excellence." },
  { icon: Video, title: "Webinars", desc: "Virtual learning experiences connecting individuals across communities." },
  { icon: Heart, title: "Mentorship", desc: "One-on-one guidance from experienced leaders and professionals." },
  { icon: Lightbulb, title: "Leadership Development", desc: "Programs that build purpose-driven leaders ready to create lasting impact." },
];

const testimonials = [
  { quote: "MMN changed my perspective on what it means to live with purpose. The mentorship program gave me clarity and direction.", name: "Amara J.", role: "Program Participant" },
  { quote: "The leadership workshops equipped me with skills I use every day. I'm grateful for the community MMN has built.", name: "David K.", role: "Community Leader" },
  { quote: "Partnering with MMN has been one of the most impactful decisions for our organization. Their dedication is unmatched.", name: "Sarah M.", role: "Community Partner" },
];

const WHATSAPP_COMMUNITY = "https://chat.whatsapp.com/REPLACE_WITH_GROUP_LINK";

const Index = () => {
  useSEO({
    title: "Home",
    description: "MeaningMatters Network is committed to helping individuals discover their identity, unlock their potential, and live purposeful, impactful lives.",
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="People at a MeaningMatters Network event" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              <span className="text-primary-foreground/90 font-medium text-xs tracking-wide uppercase">
                MeaningMatters Network
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primary-foreground leading-[1.1] mb-5 tracking-tight">
              Helping Individuals Discover Their Identity and Live with{" "}
              <span className="relative">
                Purpose
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 2 80 2 100 5C120 8 160 10 198 4" stroke="hsl(42, 85%, 55%)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-primary-foreground/70 text-lg md:text-xl italic mb-2 font-medium font-heading">
              "Everything Starts and Ends With Purpose."
            </p>
            <p className="text-primary-foreground/75 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
              MeaningMatters Network (MMN) is committed to helping individuals discover their identity, unlock their potential, and live purposeful, impactful lives.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-involved">
                <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-bold shadow-elevated rounded-xl px-7">
                  Join the Movement <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/programs">
                <Button size="lg" className="border-2 border-primary-foreground/60 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 rounded-xl font-semibold backdrop-blur-sm">
                  Upcoming Events
                </Button>
              </Link>
              <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="border-2 border-primary-foreground/60 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 rounded-xl font-semibold backdrop-blur-sm">
                  Join WhatsApp Community
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <SectionReveal>
        <section className="py-24 gradient-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Who We Are</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5 text-foreground tracking-tight">
                A Network Built on Purpose
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                MeaningMatters Network (MMN) is a non-governmental organization committed to raising purpose-driven individuals by empowering them spiritually, morally, intellectually, and socially to discover, develop, and fulfill their purpose. Through our workshops, seminars, mentorship programs, and leadership initiatives, we help individuals discover and live out their purpose.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-semibold px-6">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Programs */}
      <SectionReveal>
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-14">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What We Do</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">Our Programs</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Comprehensive programs designed to empower individuals in every dimension of their lives.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {programs.map((p, i) => (
                <div key={i} className="bg-card rounded-2xl p-7 shadow-card hover:shadow-elevated transition-all duration-300 border group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow">
                    <p.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/programs">
                <Button className="gradient-primary text-primary-foreground border-0 rounded-xl font-semibold px-6 shadow-glow hover:opacity-90">
                  Explore All Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Impact Counters */}
      <section className="py-24 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary-foreground/15 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <SectionReveal>
            <p className="text-primary-foreground/60 font-semibold text-sm tracking-widest uppercase mb-3 text-center">By The Numbers</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14 text-primary-foreground tracking-tight">
              Our Impact
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 5000, label: "Individuals Empowered" },
              { end: 120, label: "Programs Held" },
              { end: 250, label: "Mentors Engaged" },
              { end: 40, label: "Communities Reached" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter end={item.end} label="" />
                <p className="text-primary-foreground/70 mt-2 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <SectionReveal>
        <section className="py-24 gradient-subtle">
          <div className="container">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3 text-center">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight">
              What People Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-card rounded-2xl p-7 shadow-card border hover:shadow-elevated transition-all duration-300">
                  <Quote className="h-8 w-8 text-primary/15 mb-4" />
                  <p className="text-muted-foreground text-sm mb-5 italic leading-relaxed">"{t.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-heading font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA */}
      <SectionReveal>
        <section className="py-24">
          <div className="container">
            <div className="gradient-cta rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-foreground/30 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
              </div>
              <div className="relative z-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4 tracking-tight">
                  Be Part of a Purpose-Driven Movement
                </h2>
                <p className="text-primary-foreground/75 mb-10 max-w-lg mx-auto leading-relaxed">
                  Join thousands of individuals discovering their purpose through our programs and community.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/get-involved">
                    <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-bold rounded-xl px-7 shadow-elevated">
                      Become a Member
                    </Button>
                  </Link>
                  <Link to="/get-involved">
                    <Button size="lg" variant="outline" className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                      Partner With Us
                    </Button>
                  </Link>
                  <Link to="/get-involved">
                    <Button size="lg" variant="outline" className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Index;
