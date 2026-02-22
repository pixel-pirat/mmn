import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Linkedin } from "lucide-react";

const executives = [
  { name: "Dr. Emmanuel Osei", title: "Founder & Chairman", bio: "A visionary leader with 20+ years in youth development and community empowerment.", expertise: "Strategic Leadership", section: "board" },
  { name: "Grace Amadi", title: "Board Member", bio: "Educator and policy advocate for youth spiritual and moral development.", expertise: "Education Policy", section: "board" },
  { name: "Prof. James Mensah", title: "Board Member", bio: "Professor of Ethics with a passion for shaping value-driven youth programs.", expertise: "Ethics & Philosophy", section: "board" },
  { name: "Sarah Nkrumah", title: "Executive Director", bio: "Experienced nonprofit leader driving operational excellence and community impact.", expertise: "Nonprofit Management", section: "executive" },
  { name: "Michael Adjei", title: "Programs Director", bio: "Designs and oversees all workshops, seminars, and mentorship programs.", expertise: "Program Development", section: "executive" },
  { name: "Amina Bello", title: "Communications Director", bio: "Storyteller and strategist amplifying MMN's mission to wider audiences.", expertise: "Marketing & Media", section: "executive" },
  { name: "David Okonkwo", title: "Youth Engagement Lead", bio: "Passionate about connecting youth with meaningful growth opportunities.", expertise: "Community Outreach", section: "executive" },
  { name: "Dr. Fatima Hassan", title: "Advisory Council", bio: "International development expert advising on program scalability.", expertise: "International Development", section: "advisory" },
  { name: "Rev. Peter Asante", title: "Advisory Council", bio: "Spiritual leader guiding the faith-based dimensions of MMN's programs.", expertise: "Spiritual Mentorship", section: "advisory" },
];

const sections = [
  { key: "board", title: "Board of Directors" },
  { key: "executive", title: "Executive Team" },
  { key: "advisory", title: "Advisory Council" },
];

const Executives = () => {
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
