import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";
import { useSEO } from "@/lib/seo";

const WHATSAPP_NUMBER = "2348000000000"; // Replace with real WhatsApp number

const Contact = () => {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with MeaningMatters Network for inquiries, partnerships, or to learn more about our programs.",
  });

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill in all required fields.");
    setLoading(true);
    try {
      const res = await submitContact({ name: form.name, email: form.email, subject: form.subject, message: form.message });
      toast.success(res.message);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please email us directly at info@meaningmatters.org");
    } finally {
      setLoading(false);
    }
  };

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
                      <a href="mailto:info@meaningmatters.org" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        info@meaningmatters.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Phone</h4>
                      <a href="tel:+2348000000000" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        +234 800 000 0000
                      </a>
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
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center shrink-0">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">WhatsApp</h4>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20MMN%2C%20I%20have%20an%20inquiry`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              {/* Google Maps embed */}
              <div className="rounded-xl overflow-hidden border h-48">
                <iframe
                  title="MMN Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46307326!2d3.1438710!3d6.5480350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <SectionReveal>
                <div className="bg-card rounded-xl p-8 shadow-card border">
                  <h3 className="font-heading text-2xl font-bold mb-6">Send Us a Message</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ct-name" className="text-sm font-medium mb-1 block">Your Name <span className="text-destructive">*</span></label>
                        <input id="ct-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                      </div>
                      <div>
                        <label htmlFor="ct-email" className="text-sm font-medium mb-1 block">Email Address <span className="text-destructive">*</span></label>
                        <input id="ct-email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" type="email" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ct-subject" className="text-sm font-medium mb-1 block">Subject</label>
                      <input id="ct-subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="What's this about?" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="ct-message" className="text-sm font-medium mb-1 block">Your Message <span className="text-destructive">*</span></label>
                      <textarea id="ct-message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help..." rows={5} required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
                    </div>
                    <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full" size="lg">
                      {loading
                        ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
                        : <><Send className="mr-2 h-4 w-4" /> Send Message</>
                      }
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
