import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight, X, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { registerForEvent } from "@/lib/api";
import { useSEO } from "@/lib/seo";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  gcalStart: string; // YYYYMMDDTHHMMSS
  gcalEnd: string;
}

const upcomingEvents: Event[] = [
  {
    title: "Purpose Discovery Seminar",
    date: "TBA",
    time: "TBA",
    location: "Accra, Ghana",
    type: "Seminar",
    description: "An expert-led seminar focused on helping individuals discover their purpose and take meaningful steps toward purposeful living.",
    gcalStart: "20260601T090000",
    gcalEnd: "20260601T130000",
  },
  {
    title: "Mentorship Kick-Off",
    date: "TBA",
    time: "TBA",
    location: "MMN HQ, Accra",
    type: "Mentorship",
    description: "The official launch of the MMN mentorship cohort. Meet your mentor and begin your purposeful journey.",
    gcalStart: "20260615T150000",
    gcalEnd: "20260615T170000",
  },
  {
    title: "Purpose-Driven Leadership Workshop",
    date: "TBA",
    time: "TBA",
    location: "Accra, Ghana",
    type: "Workshop",
    description: "An interactive workshop equipping individuals with the tools to lead with vision, integrity, and impact.",
    gcalStart: "20260701T100000",
    gcalEnd: "20260701T140000",
  },
  {
    title: "MMN Annual Conference",
    date: "TBA",
    time: "TBA",
    location: "Accra, Ghana",
    type: "Conference",
    description: "MMN's flagship annual gathering — inspiring talks, workshops, networking, and community celebration.",
    gcalStart: "20261001T090000",
    gcalEnd: "20261001T170000",
  },
  {
    title: "Leadership Bootcamp",
    date: "TBA",
    time: "TBA",
    location: "Accra, Ghana",
    type: "Leadership Bootcamp",
    description: "An intensive multi-day bootcamp developing the next generation of purpose-driven leaders.",
    gcalStart: "20261101T090000",
    gcalEnd: "20261103T170000",
  },
  {
    title: "Community Outreach Event",
    date: "TBA",
    time: "TBA",
    location: "Accra, Ghana",
    type: "Outreach",
    description: "MMN takes its mission to the community — engaging individuals where they are and sharing the message of purpose.",
    gcalStart: "20261115T100000",
    gcalEnd: "20261115T140000",
  },
  {
    title: "Purpose & Potential Webinar",
    date: "TBA",
    time: "TBA",
    location: "Online (Zoom)",
    type: "Webinar",
    description: "A virtual session connecting individuals across communities to explore purpose, potential, and meaningful living.",
    gcalStart: "20261201T180000",
    gcalEnd: "20261201T193000",
  },
];

const pastEvents = [
  { title: "MMN Inaugural Seminar", highlight: "Purpose discovery sessions with community leaders" },
  { title: "Leadership Development Workshop", highlight: "Equipping individuals with purpose-driven leadership skills" },
  { title: "Community Outreach Program", highlight: "Reaching individuals across multiple communities in Accra" },
];

function buildGCalLink(event: Event) {
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.gcalStart}/${event.gcalEnd}&details=${details}&location=${location}`;
}

function RegisterModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Please fill in your name and email.");
    setLoading(true);
    try {
      const res = await registerForEvent({
        event_name: event.title,
        event_date: event.date,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      toast.success(res.message);
      onClose();
    } catch {
      toast.error("Registration failed. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-2xl p-8 shadow-elevated border w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-heading text-xl font-bold">Register for Event</h3>
            <p className="text-muted-foreground text-sm mt-1">{event.title}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-6 bg-muted rounded-lg p-3">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{event.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{event.time}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reg-name" className="text-sm font-medium mb-1 block">Full Name <span className="text-destructive">*</span></label>
            <input id="reg-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="reg-email" className="text-sm font-medium mb-1 block">Email <span className="text-destructive">*</span></label>
            <input id="reg-email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" type="email" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="reg-phone" className="text-sm font-medium mb-1 block">Phone (optional)</label>
            <input id="reg-phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+234 800 000 0000" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering…</> : "Confirm Registration"}
          </Button>
        </form>

        <div className="mt-4 pt-4 border-t">
          <a
            href={buildGCalLink(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Add to Google Calendar
          </a>
        </div>
      </div>
    </div>
  );
}

const Events = () => {
  useSEO({
    title: "Events",
    description: "Join MeaningMatters Network at upcoming workshops, seminars, webinars, and mentorship events.",
  });

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Events</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Join us at our upcoming events or explore highlights from past gatherings.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((e, i) => (
              <SectionReveal key={i}>
                <div className="bg-card rounded-xl p-6 shadow-card border flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{e.type}</span>
                    <h3 className="font-heading font-semibold text-lg mt-2">{e.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1 mb-2">{e.description}</p>
                    <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{e.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{e.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{e.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button onClick={() => setSelectedEvent(e)} className="gradient-primary text-primary-foreground border-0">
                      Register <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                    <a
                      href={buildGCalLink(e)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-center text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> Add to Calendar
                    </a>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 gradient-subtle">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold mb-8">Past Events</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {pastEvents.map((e, i) => (
              <SectionReveal key={i}>
                <div className="bg-card rounded-xl p-6 shadow-card border">
                  <h3 className="font-heading font-semibold mb-2">{e.title}</h3>
                  <p className="text-muted-foreground text-sm">{e.highlight}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && <RegisterModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </Layout>
  );
};

export default Events;
