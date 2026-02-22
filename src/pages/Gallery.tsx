import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Image, Video, Download } from "lucide-react";

const galleryItems = [
  { title: "Youth Leadership Summit 2025", category: "Events" },
  { title: "Community Workshop in Lagos", category: "Workshops" },
  { title: "Mentorship Program Launch", category: "Mentorship" },
  { title: "Academic Awards Ceremony", category: "Awards" },
  { title: "Volunteer Training Day", category: "Volunteers" },
  { title: "Annual Conference Keynote", category: "Events" },
  { title: "Campus Outreach Program", category: "Outreach" },
  { title: "Team Building Retreat", category: "Team" },
];

const Gallery = () => {
  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Media & Gallery</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Explore photos, videos, and highlights from our programs and events.
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, i) => (
              <SectionReveal key={i}>
                <div className="group relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer">
                  <div className="absolute inset-0 gradient-primary opacity-60 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                    <div className="text-center text-primary-foreground">
                      <Image className="h-8 w-8 mx-auto mb-2 opacity-60" />
                      <p className="text-sm font-medium">{item.title}</p>
                      <span className="text-xs opacity-70">{item.category}</span>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 gradient-subtle">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold mb-8">Video Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {["Annual Conference Highlights 2025", "Mentorship Stories", "Leadership Bootcamp Recap", "Youth Voices Documentary"].map((title, i) => (
              <SectionReveal key={i}>
                <div className="bg-card rounded-xl overflow-hidden shadow-card border">
                  <div className="aspect-video gradient-primary flex items-center justify-center">
                    <Video className="h-12 w-12 text-primary-foreground/60" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-sm">{title}</h3>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <SectionReveal>
        <section className="py-16">
          <div className="container max-w-3xl text-center">
            <Download className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-3">Press Kit</h2>
            <p className="text-muted-foreground mb-6">
              Download our official press kit including logos, brand guidelines, and media resources.
            </p>
            <button className="gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Download Press Kit
            </button>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Gallery;
