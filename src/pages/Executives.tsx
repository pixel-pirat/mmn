import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Linkedin, Facebook, Mail } from "lucide-react";
import { useSEO } from "@/lib/seo";

interface Member {
  name: string;
  title: string;
  bio: string;
  expertise: string;
  email?: string;
  linkedin?: string;
  facebook?: string;
}

const board: Member[] = [
  {
    name: "Joseph Zah-Nyatefe",
    title: "President",
    bio: "Visionary leader steering MMN's mission of helping individuals discover their purpose and live with lasting impact.",
    expertise: "Leadership & Strategy",
    email: "zahnyatefe@gmail.com",
  },
  {
    name: "Joan Agyei-Kumah",
    title: "Vice President",
    bio: "Dedicated to advancing MMN's programs and supporting the president in driving the organisation's vision forward.",
    expertise: "Program Oversight",
    email: "joanagyeikumah@gmail.com",
  },
  {
    name: "Bless Dzikunu",
    title: "Secretary",
    bio: "Ensures smooth organisational operations, record-keeping, and effective communication across all teams.",
    expertise: "Administration",
    email: "blessdzikunu123@gmail.com",
  },
  {
    name: "Emmanuel K. Amenyo",
    title: "Executive Director",
    bio: "Drives MMN's operational strategy and program delivery as the organisation's chief executive.",
    expertise: "Executive Leadership",
    email: "amenyoemmanuel04@gmail.com",
    facebook: "https://www.facebook.com/smart.kinggh.31?mibextid=rS40aB7S9Ucbxw6v",
  },
  {
    name: "Sheena Agbeamehia",
    title: "Treasurer",
    bio: "Manages MMN's finances with transparency and accountability, ensuring resources are directed toward maximum impact.",
    expertise: "Financial Management",
    email: "sheenagbeamehia@gmail.com",
  },
];

const executiveTeam: Member[] = [
  {
    name: "Sandra Ayinsogya",
    title: "Administrative Officer",
    bio: "Keeps MMN's operations running smoothly through efficient administration and organisational support.",
    expertise: "Administration",
    email: "sandra0538346164@gmail.com",
  },
  {
    name: "Lois Naamah",
    title: "Financial Secretary",
    bio: "Oversees MMN's financial records, budgeting, and reporting with diligence and integrity.",
    expertise: "Finance",
    email: "naamahlois@gmail.com",
    linkedin: "https://www.linkedin.com/in/naamah-lois-lartey-692077363",
  },
  {
    name: "Judith Gamasen",
    title: "Membership & Welfare Director",
    bio: "Champions member welfare and drives community building, ensuring every MMN member feels valued and supported.",
    expertise: "Member Welfare & Community",
    email: "judithgamasen323@gmail.com",
    linkedin: "https://www.linkedin.com/in/judith-gamasen-482709332",
  },
  {
    name: "Zerez Teye Gormey",
    title: "Programs Coordinator",
    bio: "Designs and coordinates MMN's workshops, seminars, and purpose-driven development initiatives.",
    expertise: "Program Development",
    email: "zerezteyegormey@gmail.com",
  },
];

function MemberCard({ name, title, bio, expertise, email, linkedin, facebook }: Member) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const hasSocials = email || linkedin || facebook;

  return (
    <div className="bg-card rounded-xl p-6 shadow-card border text-center flex flex-col">
      <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center shrink-0">
        <span className="text-primary-foreground font-heading text-xl font-bold">{initials}</span>
      </div>
      <h3 className="font-heading font-semibold text-lg">{name}</h3>
      <p className="text-primary text-sm font-medium mb-2">{title}</p>
      <p className="text-muted-foreground text-sm mb-3 flex-1">{bio}</p>
      <span className="inline-block text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full mb-3">{expertise}</span>
      {hasSocials && (
        <div className="flex items-center justify-center gap-3 pt-2 border-t">
          {email && (
            <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Email ${name}`}>
              <Mail className="h-4 w-4" />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`${name} on LinkedIn`}>
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`${name} on Facebook`}>
              <Facebook className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-center">Board of Directors</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">The governing body providing strategic oversight and direction for MMN.</p>
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-center">Executive Team</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">The operational team delivering MMN's programs and day-to-day mission.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {executiveTeam.map((e, i) => <MemberCard key={i} {...e} />)}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Photos CTA */}
      <SectionReveal>
        <section className="py-12">
          <div className="container text-center">
            <p className="text-muted-foreground text-sm">
              Profile photos coming soon. Want to connect? Reach out via the links on each card.
            </p>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Executives;
