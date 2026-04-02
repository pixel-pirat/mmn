import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Heart, Users, Handshake, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitVolunteer, submitMentor, submitPartner } from "@/lib/api";
import { useSEO } from "@/lib/seo";

const tabs = [
  { key: "volunteer", label: "Volunteer", icon: Users },
  { key: "mentor", label: "Become a Mentor", icon: Heart },
  { key: "partner", label: "Partner With Us", icon: Handshake },
  { key: "donate", label: "Donate", icon: DollarSign },
];

const DONATION_AMOUNTS = ["$25", "$50", "$100", "$250"];
const PAYSTACK_LINK = "https://paystack.com/pay/mmn-donate"; // Replace with real Paystack payment link

function VolunteerForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", motivation: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Please fill in all required fields.");
    setLoading(true);
    try {
      const res = await submitVolunteer({ name: form.name, email: form.email, phone: form.phone, motivation: form.motivation });
      toast.success(res.message);
      setForm({ name: "", email: "", phone: "", motivation: "" });
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-heading text-2xl font-bold mb-2">Volunteer With Us</h3>
      <p className="text-muted-foreground mb-6 text-sm">Share your time and skills to empower the next generation.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vol-name" className="text-sm font-medium mb-1 block">Full Name <span className="text-destructive">*</span></label>
            <input id="vol-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="vol-email" className="text-sm font-medium mb-1 block">Email <span className="text-destructive">*</span></label>
            <input id="vol-email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" type="email" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor="vol-phone" className="text-sm font-medium mb-1 block">Phone Number</label>
          <input id="vol-phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+234 800 000 0000" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label htmlFor="vol-motivation" className="text-sm font-medium mb-1 block">Why do you want to volunteer?</label>
          <textarea id="vol-motivation" value={form.motivation} onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))} placeholder="Tell us what drives you..." rows={4} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>
        <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}

function MentorForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", expertise: "", experience: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Please fill in all required fields.");
    setLoading(true);
    try {
      const res = await submitMentor({ name: form.name, email: form.email, expertise: form.expertise, experience: form.experience });
      toast.success(res.message);
      setForm({ name: "", email: "", expertise: "", experience: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-heading text-2xl font-bold mb-2">Become a Mentor</h3>
      <p className="text-muted-foreground mb-6 text-sm">Guide a young person on their journey to purpose and growth.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="men-name" className="text-sm font-medium mb-1 block">Full Name <span className="text-destructive">*</span></label>
            <input id="men-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="men-email" className="text-sm font-medium mb-1 block">Email <span className="text-destructive">*</span></label>
            <input id="men-email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" type="email" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor="men-expertise" className="text-sm font-medium mb-1 block">Area of Expertise</label>
          <input id="men-expertise" value={form.expertise} onChange={e => setForm(f => ({ ...f, expertise: e.target.value }))} placeholder="e.g. Engineering, Education, Business" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label htmlFor="men-exp" className="text-sm font-medium mb-1 block">Mentoring Experience</label>
          <textarea id="men-exp" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} placeholder="Tell us about your mentoring background..." rows={4} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>
        <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Apply as Mentor"}
        </Button>
      </form>
    </div>
  );
}

function PartnerForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ org: "", contact: "", email: "", details: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.org || !form.email) return toast.error("Please fill in all required fields.");
    setLoading(true);
    try {
      const res = await submitPartner({ org_name: form.org, contact_name: form.contact, email: form.email, details: form.details });
      toast.success(res.message);
      setForm({ org: "", contact: "", email: "", details: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-heading text-2xl font-bold mb-2">Partner With Us</h3>
      <p className="text-muted-foreground mb-6 text-sm">Collaborate with MMN to amplify youth empowerment in your community.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="par-org" className="text-sm font-medium mb-1 block">Organization Name <span className="text-destructive">*</span></label>
            <input id="par-org" value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} placeholder="Your organization" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="par-contact" className="text-sm font-medium mb-1 block">Contact Person</label>
            <input id="par-contact" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Full name" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor="par-email" className="text-sm font-medium mb-1 block">Email <span className="text-destructive">*</span></label>
          <input id="par-email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="contact@organization.com" type="email" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label htmlFor="par-details" className="text-sm font-medium mb-1 block">How would you like to partner?</label>
          <textarea id="par-details" value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} placeholder="Describe your partnership idea..." rows={4} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>
        <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit Inquiry"}
        </Button>
      </form>
    </div>
  );
}

function DonateTab() {
  const [selected, setSelected] = useState("$50");

  return (
    <div className="text-center py-4">
      <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
      <h3 className="font-heading text-2xl font-bold mb-2">Support Our Mission</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
        Your generous contribution empowers young people to discover and live their purpose. Every donation makes a difference.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {DONATION_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => setSelected(amt)}
            className={`px-6 py-3 rounded-lg border-2 font-semibold transition-colors ${
              selected === amt
                ? "gradient-primary text-primary-foreground border-transparent"
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {amt}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-4">Secure payment via Paystack. All major cards accepted.</p>
      <a href={`${PAYSTACK_LINK}?amount=${selected.replace("$", "")}`} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="gradient-primary text-primary-foreground border-0">
          Donate {selected} Now
        </Button>
      </a>
      <p className="text-xs text-muted-foreground mt-4">
        Prefer bank transfer?{" "}
        <a href="/contact" className="text-primary underline underline-offset-2">Contact us</a> for details.
      </p>
    </div>
  );
}

const GetInvolved = () => {
  useSEO({
    title: "Get Involved",
    description: "Volunteer, mentor, partner, or donate to support MeaningMatters Network's mission of empowering youth.",
  });

  const [activeTab, setActiveTab] = useState("volunteer");

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Get Involved</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            There are many ways to be part of the purpose-driven movement. Find yours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === t.key ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          <SectionReveal>
            <div className="bg-card rounded-xl p-8 shadow-card border">
              {activeTab === "volunteer" && <VolunteerForm />}
              {activeTab === "mentor" && <MentorForm />}
              {activeTab === "partner" && <PartnerForm />}
              {activeTab === "donate" && <DonateTab />}
            </div>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
