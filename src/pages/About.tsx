import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Heart, Award, Users, Shield, Eye, Target, Star, CheckCircle } from "lucide-react";
import { useSEO } from "@/lib/seo";

const values = [
  { icon: Shield, title: "Integrity", desc: "Acting with honesty, transparency, and strong moral principles at all times." },
  { icon: Star, title: "Self-Discipline", desc: "Practicing self-control, consistency, and focus in pursuit of excellence." },
  { icon: CheckCircle, title: "Diligence", desc: "Applying persistent and careful effort in all tasks and responsibilities." },
  { icon: Award, title: "Responsibility", desc: "Being accountable for one's actions and obligations within MMN and beyond." },
  { icon: Heart, title: "Excellence", desc: "Striving to exceed expectations and deliver outstanding results." },
  { icon: Users, title: "Valuing People", desc: "Recognizing the inherent worth, dignity, and potential of every individual." },
];

const About = () => {
  useSEO({
    title: "About Us",
    description: "Learn about MeaningMatters Network — our story, mission, vision, and the values driving purpose-driven living.",
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
              MeaningMatters Network was founded with a singular conviction: that every person has the potential to live a life of profound purpose and impact. Born from a desire to see this generation — and the next — equipped spiritually, morally, and intellectually for purposeful living, MMN has grown from a small community initiative into a movement touching millions of lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our journey began when a group of dedicated mentors and educators recognized the growing need for holistic development — programs that go beyond the surface to nurture the whole person. Today, we continue that mission with unwavering commitment.
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

      {/* Core Values */}
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

      {/* Org Structure */}
      <SectionReveal>
        <section className="py-20 gradient-subtle">
          <div className="container max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold mb-6">Organizational Structure</h2>
            <p className="text-muted-foreground leading-relaxed">
              MMN operates with a lean, purpose-driven structure led by our Board of Directors and an Executive Team. Our volunteers and mentors form the backbone of our on-ground operations, ensuring every program reaches the individuals who need it most.
            </p>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default About;
