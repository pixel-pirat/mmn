import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const upcomingEvents = [
  { title: "Purpose Discovery Workshop", date: "March 15, 2026", time: "10:00 AM – 2:00 PM", location: "Community Center, Lagos", type: "Workshop" },
  { title: "Youth Leadership Summit 2026", date: "April 5–6, 2026", time: "9:00 AM – 5:00 PM", location: "Grand Conference Hall, Accra", type: "Seminar" },
  { title: "Faith & Academic Excellence Webinar", date: "April 20, 2026", time: "6:00 PM – 7:30 PM", location: "Online (Zoom)", type: "Webinar" },
  { title: "Mentorship Kick-Off 2026", date: "May 1, 2026", time: "3:00 PM – 5:00 PM", location: "MMN HQ", type: "Mentorship" },
];

const pastEvents = [
  { title: "Annual Youth Conference 2025", highlight: "500+ attendees from 12 countries" },
  { title: "Moral Leadership Bootcamp", highlight: "3-day intensive with 15 industry leaders" },
  { title: "Academic Excellence Awards Night", highlight: "Celebrating top achieving youth scholars" },
];

const Events = () => {
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
                    <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{e.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{e.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{e.location}</span>
                    </div>
                  </div>
                  <Button className="gradient-primary text-primary-foreground border-0 shrink-0">
                    Register <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
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
    </Layout>
  );
};

export default Events;
