import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Video, Award, Lightbulb, Heart, ArrowRight, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionReveal from "@/components/SectionReveal";
import heroBg from "@/assets/hero-bg.jpg";

const programs = [
  { icon: BookOpen, title: "Workshops", desc: "Interactive sessions on spiritual growth and personal development." },
  { icon: Users, title: "Seminars", desc: "Expert-led discussions on moral excellence and academic achievement." },
  { icon: Video, title: "Webinars", desc: "Virtual learning experiences connecting youth across communities." },
  { icon: Heart, title: "Mentorship", desc: "One-on-one guidance from experienced leaders and professionals." },
  { icon: Lightbulb, title: "Leadership Development", desc: "Programs that build the next generation of purpose-driven leaders." },
];

const testimonials = [
  { quote: "MMN changed my perspective on what it means to live with purpose. The mentorship program gave me clarity and direction.", name: "Amara J.", role: "Program Participant" },
  { quote: "The leadership workshops equipped me with skills I use every day. I'm grateful for the community MMN has built.", name: "David K.", role: "Youth Leader" },
  { quote: "Partnering with MMN has been one of the most impactful decisions for our organization. Their dedication is unmatched.", name: "Sarah M.", role: "Community Partner" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-primary-foreground/80 font-medium mb-3 tracking-widest text-xs uppercase">
              MeaningMatters Network
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Empowering Young Minds to Live with Purpose
            </h1>
            <p className="text-primary-foreground/70 text-lg italic mb-2 font-medium">
              "Everything Starts and Ends With Purpose."
            </p>
            <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-xl">
              MeaningMatters Network is committed to nurturing spiritual depth, moral integrity, and academic excellence in the next generation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-involved">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-semibold">
                  Join the Movement <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Upcoming Events
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <SectionReveal>
        <section className="py-20 gradient-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Who We Are
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                MeaningMatters Network (MMN) is a non-governmental organization dedicated to empowering young individuals spiritually, morally, and academically. Through our workshops, seminars, mentorship programs, and leadership initiatives, we help youth discover and live out their purpose.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Programs */}
      <SectionReveal>
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Our Programs</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Comprehensive programs designed to empower youth in every dimension of their lives.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {programs.map((p, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 border"
                >
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <p.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/programs">
                <Button className="gradient-primary text-primary-foreground border-0">
                  Explore All Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Impact Counters */}
      <section className="py-20 gradient-primary">
        <div className="container">
          <SectionReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
              Our Impact
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 5000, label: "Youths Empowered" },
              { end: 120, label: "Workshops Held" },
              { end: 250, label: "Mentors Engaged" },
              { end: 40, label: "Communities Reached" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter end={item.end} label="" />
                <p className="text-primary-foreground/80 mt-2 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <SectionReveal>
        <section className="py-20 gradient-subtle">
          <div className="container">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              What People Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-card border">
                  <Quote className="h-8 w-8 text-primary/20 mb-3" />
                  <p className="text-muted-foreground text-sm mb-4 italic leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
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
        <section className="py-20">
          <div className="container">
            <div className="gradient-cta rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Be Part of a Purpose-Driven Generation
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Join thousands of young people discovering their purpose through our programs and community.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/get-involved">
                  <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-semibold">
                    Volunteer
                  </Button>
                </Link>
                <Link to="/get-involved">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Partner With Us
                  </Button>
                </Link>
                <Link to="/get-involved">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Donate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Index;
