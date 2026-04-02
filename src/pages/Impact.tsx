import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Award, Handshake, Newspaper, Globe, FileText, Heart } from "lucide-react";
import { useSEO } from "@/lib/seo";

const ANNUAL_REPORT_URL = "/annual-report-2025.pdf"; // Replace with real file URL

const highlights = [
  { icon: Award, title: "Youth Empowerment Award 2025", desc: "Recognized by the National Youth Council for outstanding community impact." },
  { icon: Handshake, title: "Strategic Partnerships", desc: "Partnered with 15+ organizations including schools, churches, and community groups." },
  { icon: Newspaper, title: "Media Features", desc: "Featured in national media outlets for our leadership development programs." },
  { icon: Globe, title: "Community Outreach", desc: "Reached 40+ communities across multiple regions with targeted programs." },
];

const stories = [
  { name: "Kwame A.", story: "Through the mentorship program, I discovered my passion for teaching and now lead workshops in my community." },
  { name: "Esther N.", story: "MMN's leadership bootcamp gave me the confidence to start a youth initiative in my school reaching 200+ students." },
  { name: "Ibrahim S.", story: "The academic excellence program helped me secure a scholarship. I'm now pursuing my dream of becoming an engineer." },
];

const Impact = () => {
  useSEO({
    title: "Impact & Recognition",
    description: "See the real-world impact of MeaningMatters Network — lives changed, communities reached, and recognition earned.",
  });

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Impact & Recognition</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Our impact speaks through changed lives, empowered communities, and recognized excellence.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((h, i) => (
              <SectionReveal key={i}>
                <div className="bg-card rounded-xl p-6 shadow-card border flex gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <h.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">{h.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{h.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 gradient-subtle">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">Impact Stories</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {stories.map((s, i) => (
              <SectionReveal key={i}>
                <div className="bg-card rounded-xl p-6 shadow-card border">
                  <Heart className="h-6 w-6 text-primary mb-3" />
                  <p className="text-muted-foreground text-sm italic mb-3">"{s.story}"</p>
                  <p className="font-semibold text-sm">— {s.name}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <SectionReveal>
        <section className="py-16">
          <div className="container max-w-3xl text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-4">Annual Reports</h2>
            <p className="text-muted-foreground mb-6">
              Download our annual reports to see a comprehensive overview of our programs, finances, and impact.
            </p>
            <a
              href={ANNUAL_REPORT_URL}
              download
              className="gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
            >
              Download 2025 Report (PDF)
            </a>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Impact;
