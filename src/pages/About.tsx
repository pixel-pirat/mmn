import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Heart, BookOpen, Award, Users, Shield, Eye, Target } from "lucide-react";
import { useSEO } from "@/lib/seo";

const values = [
  { icon: Heart, title: "Spiritual Growth", desc: "Nurturing inner depth and connection to purpose." },
  { icon: Award, title: "Moral Excellence", desc: "Building character rooted in integrity and ethics." },
  { icon: BookOpen, title: "Academic Development", desc: "Promoting lifelong learning and intellectual growth." },
  { icon: Users, title: "Leadership", desc: "Equipping youth to lead with vision and compassion." },
  { icon: Shield, title: "Integrity", desc: "Living authentically and standing for truth." },
];

const About = () => {
  useSEO({
    title: "About Us",
    description: "Learn about MeaningMatters Network — our story, mission, vision, and the values driving youth empowerment across Africa.",
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About Us
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Discover our story, mission, and the values that drive everything we do.
          </p>
        </div>
      </section>

      {/* Story */}
      <SectionReveal>
        <section className="py-20">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MeaningMatters Network was founded with a singular conviction: that every young person has the potential to live a life of profound purpose and impact. Born from a desire to see the next generation equipped spiritually, morally, and academically, MMN has grown from a small community initiative into a movement touching thousands of lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our journey began when a group of dedicated mentors and educators recognized the growing need for holistic youth development — programs that go beyond academics to nurture the whole person. Today, we continue that mission with unwavering commitment.
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Vision & Mission */}
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
                  A generation of young leaders who live purposefully, lead with integrity, and transform their communities through spiritual depth, moral excellence, and academic achievement.
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
                  To empower young individuals through workshops, seminars, webinars, mentorship programs, and leadership development initiatives that foster spiritual growth, moral integrity, and academic excellence.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <SectionReveal>
        <section className="py-20">
          <div className="container">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {values.map((v, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl shadow-card border">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
                    <v.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-heading font-semibold text-sm mb-2">{v.title}</h4>
                  <p className="text-muted-foreground text-xs">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Org Structure */}
      <SectionReveal>
        <section className="py-20 gradient-subtle">
          <div className="container max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold mb-6">Organizational Structure</h2>
            <p className="text-muted-foreground leading-relaxed">
              MMN operates with a lean, purpose-driven structure led by our Board of Directors, an Executive Team, and supported by an Advisory Council of industry professionals. Our volunteers and mentors form the backbone of our on-ground operations, ensuring every program reaches the youth who need it most.
            </p>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default About;
