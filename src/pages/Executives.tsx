import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Linkedin, Facebook, Mail, Loader2, Users } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { getTeam, type TeamMember } from "@/lib/api";

function MemberCard({ member }: { member: TeamMember }) {
  const { name, title, bio, expertise, email, linkedin, facebook, photo } = member;
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const hasSocials = email || linkedin || facebook;

  return (
    <div className="bg-card rounded-xl p-6 shadow-card border text-center flex flex-col">
      <div className="w-20 h-20 rounded-full mx-auto mb-4 shrink-0 overflow-hidden">
        {photo
          ? <img src={photo} alt={name} className="w-full h-full object-cover" />
          : (
            <div className="w-full h-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-xl font-bold">{initials}</span>
            </div>
          )
        }
      </div>
      <h3 className="font-heading font-semibold text-lg">{name}</h3>
      <p className="text-primary text-sm font-medium mb-2">{title}</p>
      {bio && <p className="text-muted-foreground text-sm mb-3 flex-1">{bio}</p>}
      {expertise && (
        <span className="inline-block text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full mb-3">{expertise}</span>
      )}
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

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam()
      .then(setMembers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const board = members.filter(m => m.category === "board");
  const executive = members.filter(m => m.category === "executive");

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

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-3">
          <Users className="h-12 w-12 opacity-30" />
          <p className="text-sm">Team information coming soon.</p>
        </div>
      ) : (
        <>
          {board.length > 0 && (
            <SectionReveal>
              <section className="py-16">
                <div className="container">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-center">Board of Directors</h2>
                  <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">The governing body providing strategic oversight and direction for MMN.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {board.map(m => <MemberCard key={m.id} member={m} />)}
                  </div>
                </div>
              </section>
            </SectionReveal>
          )}

          {executive.length > 0 && (
            <SectionReveal>
              <section className="py-16 gradient-subtle">
                <div className="container">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-center">Executive Team</h2>
                  <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">The operational team delivering MMN's programs and day-to-day mission.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {executive.map(m => <MemberCard key={m.id} member={m} />)}
                  </div>
                </div>
              </section>
            </SectionReveal>
          )}
        </>
      )}
    </Layout>
  );
};

export default Executives;
