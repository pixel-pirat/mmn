import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { ArrowRight, Search } from "lucide-react";
import { blogPosts, categories } from "@/data/blogPosts";
import { useSEO } from "@/lib/seo";

const Blog = () => {
  useSEO({
    title: "Blog & Insights", path: "/blog",
    description: "Thought leadership, practical advice, and stories of purpose-driven youth from MeaningMatters Network.",
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogPosts.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No articles found. Try a different search or category.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <SectionReveal key={p.slug}>
                  <article className="bg-card rounded-xl overflow-hidden shadow-card border group hover:shadow-elevated transition-shadow h-full flex flex-col">
                    <div className="h-40 gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground/70 font-heading text-sm font-medium px-4 text-center">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs text-muted-foreground">{p.date}</span>
                      <h3 className="font-heading font-semibold mt-1 mb-2 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">{p.excerpt}</p>
                      <Link
                        to={`/blog/${p.slug}`}
                        className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
