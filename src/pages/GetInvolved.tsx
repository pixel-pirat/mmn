import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Heart, Users, Handshake, DollarSign, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { submitVolunteer, submitMentor, submitPartner, submitContact } from "@/lib/api";
import { useSEO } from "@/lib/seo";

const tabs = [
  { key: "join", label: "Join Us", icon: UserPlus },
  { key: "partner", label: "Partner & Support", icon: Handshake },
  { key: "donate", label: "Donate", icon: DollarSign },
];

const ROLE_OPTIONS = [
  { value: "member", label: "Become a Member" },
  { value: "volunteer", label: "Volunteer" },
  { value: "mentor", label: "Become a Mentor" },
];

const DONATION_AMOUNTS = ["GH₵50", "GH₵100", "GH₵200", "GH₵500"];
const PAYSTACK_LINK = "https://paystack.com/pay/mmn-donate";

function JoinForm() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("member");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", occupation: "", motivation: "", expertise: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === "mentor") {
        await submitMentor({ name: form.name, email: form.email, expertise: form.expertise, experience: form.motivation });
      } else if (role === "volunteer") {
        await submitVolunteer({ name: form.name, email: form.email, phone: form.phone, motivation: form.motivation });
      } else {
        await submitContact({
          name: form.name, email: form.email,
          subject: "Membership Application",
          message: `Phone: ${form.phone}\nOccupation: ${form.occupation}\nMotivation: ${form.motivation}`,
        });
      }
      toast.success("Application submitted! We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", occupation: "", motivation: "", expertise: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-heading text-2xl font-bold mb-2">Join the MMN Community</h3>
      <p className="text-muted-foreground mb-6 text-sm">Choose how you'd like to be part of the movement.</p>

      {/* Role selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ROLE_OPTIONS.map(r => (
          <button
            key={r.value}
            type="button"
            onClick={() => setRole(r.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
              role === r.value
                ? "gradient-primary text-primary-foreground border-transparent"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="join-name" className="text-sm font-medium mb-1 block">Full Name <span className="text-destructive">*</span></label>
            <input id="join-name" value={form.name} onChange={set("name")} placeholder="Your full name" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="join-email" className="text-sm font-medium mb-1 block">Email <span className="text-destructive">*</span></label>
            <input id="join-email" type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor="join-phone" className="text-sm font-medium mb-1 block">Phone Number <span className="text-destructive">*</span></label>
          <input id="join-phone" value={form.phone} onChange={set("phone")} placeholder="+233 XX XXX XXXX" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>

        {role === "member" && (
          <div>
            <label htmlFor="join-occ" className="text-sm font-medium mb-1 block">Occupation <span className="text-destructive">*</span></label>
            <input id="join-occ" value={form.occupation} onChange={set("occupation")} placeholder="e.g. Student, Engineer, Teacher" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        )}

        {role === "mentor" && (
          <div>
            <label htmlFor="join-exp" className="text-sm font-medium mb-1 block">Area of Expertise <span className="text-destructive">*</span></label>
            <input id="join-exp" value={form.expertise} onChange={set("expertise")} placeholder="e.g. Business, Education, Engineering" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        )}

        <div>
          <label htmlFor="join-motivation" className="text-sm font-medium mb-1 block">
            {role === "mentor" ? "Mentoring Background" : role === "volunteer" ? "Why do you want to volunteer?" : "Why do you want to join MMN?"}
            <span className="text-destructive"> *</span>
          </label>
          <textarea id="join-motivation" value={form.motivation} onChange={set("motivation")} placeholder="Tell us more..." rows={4} required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>

        <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}

function PartnerForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ org: "", contact: "", email: "", details: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitPartner({ org_name: form.org, contact_name: form.contact, email: form.email, details: form.details });
      toast.success("Partnership inquiry received! We'll be in touch.");
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
      <p className="text-muted-foreground mb-6 text-sm">Collaborate with MMN to amplify purpose-driven living in your community.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="par-org" className="text-sm font-medium mb-1 block">Organization Name <span className="text-destructive">*</span></label>
            <input id="par-org" value={form.org} onChange={set("org")} placeholder="Your organization" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="par-contact" className="text-sm font-medium mb-1 block">Contact Person <span className="text-destructive">*</span></label>
            <input id="par-contact" value={form.contact} onChange={set("contact")} placeholder="Full name" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor="par-email" className="text-sm font-medium mb-1 block">Email <span className="text-destructive">*</span></label>
          <input id="par-email" type="email" value={form.email} onChange={set("email")} placeholder="contact@organization.com" required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label htmlFor="par-details" className="text-sm font-medium mb-1 block">How would you like to partner? <span className="text-destructive">*</span></label>
          <textarea id="par-details" value={form.details} onChange={set("details")} placeholder="Describe your partnership idea..." rows={4} required className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>
        <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit Inquiry"}
        </Button>
      </form>
    </div>
  );
}

function DonateTab() {
  const [selected, setSelected] = useState("GH₵100");
  return (
    <div className="text-center py-4">
      <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
      <h3 className="font-heading text-2xl font-bold mb-2">Support Our Mission</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
        Your contribution empowers individuals to discover and live their purpose. Every cedi makes a difference.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {DONATION_AMOUNTS.map(amt => (
          <button key={amt} onClick={() => setSelected(amt)}
            className={`px-6 py-3 rounded-lg border-2 font-semibold transition-colors ${
              selected === amt ? "gradient-primary text-primary-foreground border-transparent" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >{amt}</button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-4">Secure payment via Paystack.</p>
      <a href={`${PAYSTACK_LINK}`} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="gradient-primary text-primary-foreground border-0">Donate {selected} Now</Button>
      </a>
      <p className="text-xs text-muted-foreground mt-4">
        Prefer bank transfer? <a href="/contact" className="text-primary underline underline-offset-2">Contact us</a> for details.
      </p>
    </div>
  );
}

const GetInvolved = () => {
  useSEO({
    title: "Get Involved", path: "/get-involved",
    description: "Join, volunteer, mentor, partner, or donate to support MeaningMatters Network's mission.",
  });
  const [activeTab, setActiveTab] = useState("join");

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
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === t.key ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                <t.icon className="h-4 w-4" />{t.label}
              </button>
            ))}
          </div>
          <SectionReveal>
            <div className="bg-card rounded-xl p-8 shadow-card border">
              {activeTab === "join" && <JoinForm />}
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
