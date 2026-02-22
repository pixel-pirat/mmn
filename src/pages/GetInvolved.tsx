import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Heart, Users, Handshake, DollarSign } from "lucide-react";

const tabs = [
  { key: "volunteer", label: "Volunteer", icon: Users },
  { key: "mentor", label: "Become a Mentor", icon: Heart },
  { key: "partner", label: "Partner With Us", icon: Handshake },
  { key: "donate", label: "Donate", icon: DollarSign },
];

const GetInvolved = () => {
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
          {/* Tabs */}
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

          {/* Forms */}
          <SectionReveal>
            <div className="bg-card rounded-xl p-8 shadow-card border">
              {activeTab === "volunteer" && (
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">Volunteer With Us</h3>
                  <p className="text-muted-foreground mb-6 text-sm">Share your time and skills to empower the next generation.</p>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                      <input placeholder="Email" type="email" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <input placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    <textarea placeholder="Why do you want to volunteer?" rows={4} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
                    <Button className="gradient-primary text-primary-foreground border-0 w-full">Submit Application</Button>
                  </form>
                </div>
              )}
              {activeTab === "mentor" && (
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">Become a Mentor</h3>
                  <p className="text-muted-foreground mb-6 text-sm">Guide a young person on their journey to purpose and growth.</p>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                      <input placeholder="Email" type="email" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <input placeholder="Area of Expertise" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    <textarea placeholder="Tell us about your mentoring experience" rows={4} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
                    <Button className="gradient-primary text-primary-foreground border-0 w-full">Apply as Mentor</Button>
                  </form>
                </div>
              )}
              {activeTab === "partner" && (
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">Partner With Us</h3>
                  <p className="text-muted-foreground mb-6 text-sm">Collaborate with MMN to amplify youth empowerment in your community.</p>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input placeholder="Organization Name" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                      <input placeholder="Contact Person" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <input placeholder="Email" type="email" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    <textarea placeholder="How would you like to partner with us?" rows={4} className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
                    <Button className="gradient-primary text-primary-foreground border-0 w-full">Submit Inquiry</Button>
                  </form>
                </div>
              )}
              {activeTab === "donate" && (
                <div className="text-center py-8">
                  <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">Support Our Mission</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                    Your generous contribution empowers young people to discover and live their purpose. Every donation makes a difference.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center mb-6">
                    {["$25", "$50", "$100", "$250"].map((amt) => (
                      <button key={amt} className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                        {amt}
                      </button>
                    ))}
                  </div>
                  <Button size="lg" className="gradient-primary text-primary-foreground border-0">
                    Donate Now
                  </Button>
                </div>
              )}
            </div>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
