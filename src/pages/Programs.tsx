import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Video, Heart, Lightbulb, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: BookOpen, title: "Workshops",
    desc: "Interactive, hands-on sessions that tackle real-life challenges facing young people today — from spiritual foundations to practical life skills.",
    objectives: ["Build practical life skills", "Deepen spiritual understanding", "Foster peer connections"],
    audience: "Youth ages 15–30",
  },
  {
    icon: Users, title: "Seminars",
    desc: "Expert-led presentations and panel discussions on topics ranging from moral excellence to career development.",
    objectives: ["Expose youth to expert perspectives", "Encourage critical thinking", "Inspire academic pursuit"],
    audience: "Students, young professionals",
  },
  {
    icon: Video, title: "Webinars",
    desc: "Virtual learning experiences that connect youth across geographies for shared growth and inspiration.",
    objectives: ["Increase accessibility", "Enable global participation", "Deliver timely content"],
    audience: "Global youth community",
  },
  {
    icon: Heart, title: "Mentorship Programs",
    desc: "Structured one-on-one and group mentorship that pairs youth with experienced professionals and leaders.",
    objectives: ["Provide personalized guidance", "Build long-term relationships", "Accelerate personal growth"],
    audience: "Youth seeking personal development",
  },
  {
    icon: Lightbulb, title: "Leadership Development",
    desc: "Intensive leadership training programs that equip the next generation to lead with vision, integrity, and impact.",
    objectives: ["Develop leadership competencies", "Build confidence", "Create community impact"],
    audience: "Emerging young leaders",
  },
];

const Programs = () => {
  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Programs</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Comprehensive programs designed to develop the whole person — spirit, character, and mind.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl space-y-12">
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
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/events">
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View Upcoming Sessions <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
