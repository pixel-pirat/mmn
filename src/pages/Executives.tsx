import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Linkedin } from "lucide-react";
import { useSEO } from "@/lib/seo";

const executives = [
  { name: "Joseph Zah-Nyatefe", title: "President", bio: "Visionary leader steering MMN's mission of empowering youth through purpose, integrity, and excellence.", expertise: "Leadership & Strategy", section: "executive" },
  { name: "Joan Sefakor Agyei-Kumah", title: "Vice President", bio: "Dedicated to advancing MMN's programs and supporting the president in driving the organisation's vision forward.", expertise: "Program Oversight", section: "executive" },
  { name: "Bless Dzikunu", title: "Secretary", bio: "Ensures smooth organisational operations, record-keeping, and effective communication across all teams.", expertise: "Administration", section: "executive" },
  { name: "Zerez Teye Gormey", title: "Program Coordinator", bio: "Designs and coordinates MMN's workshops, seminars, and youth development initiatives.", expertise: "Program Development", section: "executive" },
  { name: "Emmanuel K. Amenyo", title: "Vice Program Coordinator", bio: "Supports the planning and execution of MMN's programs, ensuring quality delivery and participant engagement.", expertise: "Program Coordination", section: "executive" },
  { name: "Sheena Agbeamehia", title: "Treasurer", bio: "Manages MMN's finances with transparency and accountability, ensuring resources are directed toward maximum impact.", expertise: "Financial Management", section: "executive" },
  { name: "Lois Naamah", title: "Financial Secretary", bio: "Maintains accurate financial records and supports the treasurer in overseeing MMN's financial health.", expertise: "Financial Administration", section: "executive" },
  { name: "Judith Gamasen", title: "Membership & Welfare Director", bio: "Champions member welfare and drives community building, ensuring every MMN member feels valued and supported.", expertise: "Member Welfare & Community", section: "executive" },
];

const sections = [
  { key: "executive", title: "Executive Team" },
];

const Executives = () => {
  useSEO({
    title: "Our Leadership",
    description: "Meet the dedicated board, executive team, and advisory council driving MeaningMatters Network's mission forward.",
  });

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Leadership
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Meet the dedicated leaders driving MMN's mission forward.
          </p>
        </div>
      </section>

      {sections.map((s) => (
        <SectionReveal key={s.key}>
          <section className={`py-16 ${s.key === "executive" ? "gradient-subtle" : ""}`}>
            <div className="container">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-10 text-center">{s.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {executives.filter((e) => e.section === s.key).map((e, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 shadow-card border text-center">
                    <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <span className="text-primary-foreground font-heading text-xl font-bold">
                        {e.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{e.name}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{e.title}</p>
                    <p className="text-muted-foreground text-sm mb-2">{e.bio}</p>
                    <span className="inline-block text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full">
                      {e.expertise}
                    </span>
                    <div className="mt-3">
                      <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      ))}
    </Layout>
  );
};

export default Executives;
