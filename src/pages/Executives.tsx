import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Linkedin } from "lucide-react";
import { useSEO } from "@/lib/seo";

const board = [
  { name: "Joseph Zah-Nyatefe", title: "President / Chairperson", bio: "Visionary leader steering MMN's mission of helping individuals discover their purpose and live with impact.", expertise: "Leadership & Strategy" },
  { name: "Joan Sefakor Agyei-Kumah", title: "Vice President / Vice Chair", bio: "Dedicated to advancing MMN's programs and supporting the president in driving the organisation's vision forward.", expertise: "Program Oversight" },
  { name: "Bless Dzikunu", title: "Secretary", bio: "Ensures smooth organisational operations, record-keeping, and effective communication across all teams.", expertise: "Administration" },
  { name: "Emmanuel Amenyo", title: "Executive Director (Ex-officio)", bio: "Drives MMN's operational strategy and program delivery as the organisation's chief executive.", expertise: "Executive Leadership" },
  { name: "Sheena Agbeamehia", title: "Treasurer", bio: "Manages MMN's finances with transparency and accountability, ensuring resources are directed toward maximum impact.", expertise: "Financial Management" },
];

const executiveTeam = [
  { name: "Emmanuel Amenyo", title: "Executive Director", bio: "Leads MMN's day-to-day operations and strategic initiatives, ensuring the mission is delivered with excellence.", expertise: "Executive Leadership" },
  { name: "Zerez Teye Gormey", title: "Program Coordinator", bio: "Designs and coordinates MMN's workshops, seminars, and purpose-driven development initiatives.", expertise: "Program Development" },
  { name: "Lois Naamah", title: "Financial Officer", bio: "Oversees MMN's financial operations, budgeting, and reporting with diligence and integrity.", expertise: "Finance" },
  { name: "Daniel Albert", title: "Media & Communications Officer", bio: "Amplifies MMN's mission through strategic communications, media, and digital storytelling.", expertise: "Media & Communications" },
  { name: "Judith Gamasen", title: "Membership & Welfare Manager", bio: "Champions member welfare and drives community building, ensuring every MMN member feels valued and supported.", expertise: "Member Welfare & Community" },
  { name: "Sandra Ayinsogya", title: "Administrative Officer", bio: "Keeps MMN's operations running smoothly through efficient administration and organisational support.", expertise: "Administration" },
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

const Executives = () => {
  useSEO({
    title: "Our Leadership",
    description: "Meet the Board of Directors and Executive Team driving MeaningMatters Network's mission forward.",
  });

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Leadership</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Meet the dedicated leaders driving MMN's mission forward.
          </p>
        </div>
      </section>

      {/* Board of Directors */}
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

      {/* Executive Team */}
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
    </Layout>
  );
};

export default Executives;
