import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { ArrowRight } from "lucide-react";

const posts = [
  { title: "5 Steps to Discovering Your Life's Purpose", category: "Spiritual Growth", date: "Feb 10, 2026", excerpt: "Purpose isn't found by accident — it's uncovered through intentional self-discovery. Here's how to begin your journey." },
  { title: "How Mentorship Transforms Academic Performance", category: "Academic Excellence", date: "Feb 3, 2026", excerpt: "Studies show that mentored youth achieve 20% higher grades. We explore why mentorship matters." },
  { title: "Building Moral Courage in a Digital Age", category: "Moral Development", date: "Jan 25, 2026", excerpt: "In a world of online pressures, moral courage is more essential than ever. Practical tips for youth navigating today's challenges." },
  { title: "Leadership Lessons from Young Changemakers", category: "Leadership", date: "Jan 18, 2026", excerpt: "Meet three young leaders who are transforming their communities through purpose-driven leadership." },
  { title: "The Power of Community in Youth Development", category: "Community", date: "Jan 10, 2026", excerpt: "No young person should grow alone. How community support accelerates growth and purpose discovery." },
  { title: "Preparing for University: A Holistic Approach", category: "Academic Excellence", date: "Jan 3, 2026", excerpt: "Academic success starts with a strong foundation. Our guide covers spiritual, moral, and academic preparation." },
];

const Blog = () => {
  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Blog & Insights</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Thought leadership, practical advice, and stories of purpose-driven youth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <SectionReveal key={i}>
                <article className="bg-card rounded-xl overflow-hidden shadow-card border group hover:shadow-elevated transition-shadow">
                  <div className="h-40 gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground/60 font-heading text-sm">{p.category}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                    <h3 className="font-heading font-semibold mt-1 mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{p.excerpt}</p>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 cursor-pointer">
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
