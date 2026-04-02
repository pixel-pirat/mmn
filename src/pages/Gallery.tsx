import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Image, Video, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSEO } from "@/lib/seo";

const PRESS_KIT_URL = "/press-kit.pdf"; // Replace with real file URL

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

const videoItems = [
  { title: "Annual Conference Highlights 2025", youtubeId: "" },
  { title: "Mentorship Stories", youtubeId: "" },
  { title: "Leadership Bootcamp Recap", youtubeId: "" },
  { title: "Youth Voices Documentary", youtubeId: "" },
];

const galleryCategories = ["All", ...new Set(galleryItems.map(i => i.category))];

// Gradient colors for placeholder tiles (until real images are added)
const gradients = [
  "from-emerald-600 to-teal-700",
  "from-blue-600 to-indigo-700",
  "from-purple-600 to-pink-700",
  "from-amber-500 to-orange-600",
  "from-teal-500 to-cyan-600",
  "from-rose-500 to-red-600",
  "from-violet-600 to-purple-700",
  "from-green-500 to-emerald-600",
];

const Gallery = () => {
  useSEO({
    title: "Media & Gallery",
    description: "Explore photos, videos, and highlights from MeaningMatters Network programs and events.",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter(i => activeCategory === "All" || i.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIndex(i => (i !== null ? (i + 1) % filtered.length : null));

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
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="font-heading text-3xl font-bold">Photo Gallery</h2>
            <div className="flex flex-wrap gap-2">
              {galleryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <SectionReveal key={i}>
                <button
                  onClick={() => openLightbox(i)}
                  className={`group relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]} w-full cursor-pointer`}
                  aria-label={`View ${item.title}`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-3">
                    <div className="text-left text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-semibold leading-tight">{item.title}</p>
                      <span className="text-[10px] opacity-80">{item.category}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-0 transition-opacity">
                    <Image className="h-10 w-10 text-white" />
                  </div>
                </button>
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
            {videoItems.map((item, i) => (
              <SectionReveal key={i}>
                <div className="bg-card rounded-xl overflow-hidden shadow-card border">
                  {item.youtubeId ? (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.youtubeId}`}
                        title={item.title}
                        className="w-full h-full"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video gradient-primary flex items-center justify-center">
                      <div className="text-center text-primary-foreground/60">
                        <Video className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-xs">Video coming soon</p>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-sm">{item.title}</h3>
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
            <a
              href={PRESS_KIT_URL}
              download
              className="inline-block gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Download Press Kit
            </a>
          </div>
        </section>
      </SectionReveal>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white p-2" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white/70 hover:text-white p-2" aria-label="Previous">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div
            className={`w-full max-w-lg aspect-square rounded-2xl bg-gradient-to-br ${gradients[lightboxIndex % gradients.length]} flex items-center justify-center`}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center text-white p-8">
              <Image className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="font-heading font-semibold text-lg">{filtered[lightboxIndex].title}</p>
              <span className="text-sm opacity-70">{filtered[lightboxIndex].category}</span>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white/70 hover:text-white p-2" aria-label="Next">
            <ChevronRight className="h-8 w-8" />
          </button>
          <p className="absolute bottom-4 text-white/40 text-sm">{lightboxIndex + 1} / {filtered.length}</p>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
