import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            We'd love to hear from you. Reach out for inquiries, partnerships, or just to say hello.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              <SectionReveal>
                <div className="bg-card rounded-xl p-6 shadow-card border space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Email</h4>
                      <p className="text-muted-foreground text-sm">info@meaningmatters.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Phone</h4>
                      <p className="text-muted-foreground text-sm">+1 (555) 000-0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Office</h4>
                      <p className="text-muted-foreground text-sm">123 Purpose Drive, Suite 100<br />Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border h-48 bg-muted flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground/40" />
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <SectionReveal>
                <div className="bg-card rounded-xl p-8 shadow-card border">
                  <h3 className="font-heading text-2xl font-bold mb-6">Send Us a Message</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input placeholder="Your Name" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                      <input placeholder="Email Address" type="email" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <input placeholder="Subject" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
                    <Button className="gradient-primary text-primary-foreground border-0 w-full" size="lg">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
