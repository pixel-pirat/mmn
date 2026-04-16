import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Calendar, User, Facebook, Twitter, MessageCircle, ArrowRight } from "lucide-react";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";
import { useSEO } from "@/lib/seo";

const SITE_URL = "https://meaningmatters.org";

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = encodeURIComponent(`${SITE_URL}/blog/${slug}`);
  const text = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] text-white text-xs font-medium hover:opacity-90 transition-opacity"
      >
        <Facebook className="h-3.5 w-3.5" /> Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1DA1F2] text-white text-xs font-medium hover:opacity-90 transition-opacity"
      >
        <Twitter className="h-3.5 w-3.5" /> Twitter
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${url}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-medium hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
      </a>
    </div>
  );
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug ?? "");

  useSEO({
    title: post?.title ?? "Article",
    description: post?.excerpt ?? "",
    path: `/blog/${slug ?? ""}`,
    type: "article",
  });
  });

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  // Render markdown-style bold (**text**) and paragraphs
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("**") && block.endsWith("**")) {
        return <h3 key={i} className="font-heading text-xl font-bold mt-8 mb-3">{block.replace(/\*\*/g, "")}</h3>;
      }
      // Inline bold
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**")
              ? <strong key={j} className="text-foreground font-semibold">{part.replace(/\*\*/g, "")}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-16">
        <div className="container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="inline-block text-xs font-medium bg-primary-foreground/15 text-primary-foreground px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="prose-like">
            {renderContent(post.content)}
          </div>

          {/* Share */}
          <div className="mt-10 pt-8 border-t">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="font-heading text-xl font-bold mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="bg-card rounded-xl p-5 border shadow-card hover:shadow-elevated transition-shadow group">
                    <span className="text-xs text-muted-foreground">{r.category}</span>
                    <h4 className="font-heading font-semibold mt-1 mb-2 group-hover:text-primary transition-colors text-sm">{r.title}</h4>
                    <span className="text-primary text-xs font-medium flex items-center gap-1">Read More <ArrowRight className="h-3 w-3" /></span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 gradient-subtle rounded-xl p-8 text-center border">
            <h3 className="font-heading text-xl font-bold mb-2">Ready to Get Involved?</h3>
            <p className="text-muted-foreground text-sm mb-4">Join thousands of young people discovering their purpose through MMN's programs.</p>
            <Link to="/get-involved" className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
              Join the Movement <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
