import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, BookOpen, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useSEO } from "@/lib/seo";

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  cover_color: string; // tailwind gradient class fallback
  in_stock: boolean;
}

// Static seed books — admin can manage these via the dashboard
export const SEED_BOOKS: Book[] = [
  { id: 1,  title: "Atomic Habits",                      author: "James Clear",           price: 65, category: "Personal Development", description: "An easy and proven way to build good habits and break bad ones.",                                    cover_color: "from-orange-500 to-red-500",     in_stock: true },
  { id: 2,  title: "In Charge",                          author: "Myles Munroe",          price: 50, category: "Leadership",           description: "Discover the power of true leadership and how to take charge of your life and destiny.",              cover_color: "from-blue-600 to-indigo-700",    in_stock: true },
  { id: 3,  title: "Start With Why",                     author: "Simon Sinek",           price: 55, category: "Leadership",           description: "How great leaders inspire everyone to take action by starting with purpose.",                         cover_color: "from-teal-500 to-cyan-600",      in_stock: true },
  { id: 4,  title: "Unleash Purpose",                    author: "MMN",                   price: 45, category: "Purpose & Identity",   description: "A guide to discovering, developing, and living out your God-given purpose.",                          cover_color: "from-emerald-500 to-teal-600",   in_stock: true },
  { id: 5,  title: "How Successful People Think",        author: "John C. Maxwell",       price: 45, category: "Personal Development", description: "Change your thinking, change your life — lessons from the world's most successful minds.",             cover_color: "from-violet-500 to-purple-600",  in_stock: true },
  { id: 6,  title: "Secrets of the Millionaire Mind",    author: "T. Harv Eker",          price: 40, category: "Finance & Wealth",     description: "Mastering the inner game of wealth and reprogramming your financial blueprint.",                      cover_color: "from-amber-500 to-orange-600",   in_stock: true },
  { id: 7,  title: "Maximizing Your Potential",          author: "Myles Munroe",          price: 45, category: "Purpose & Identity",   description: "Unlock the hidden you and live the life you were created to live.",                                   cover_color: "from-green-500 to-emerald-600",  in_stock: true },
  { id: 8,  title: "How to Talk to Anyone",              author: "Leil Lowndes",          price: 50, category: "Personal Development", description: "92 little tricks for big success in relationships and communication.",                                cover_color: "from-pink-500 to-rose-600",      in_stock: true },
  { id: 9,  title: "Gifted Hands",                       author: "Ben Carson",            price: 40, category: "Inspiration",          description: "The remarkable story of Dr. Ben Carson — a journey from poverty to world-renowned neurosurgeon.",     cover_color: "from-cyan-500 to-blue-600",      in_stock: true },
  { id: 10, title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", price: 65, category: "Personal Development", description: "Powerful lessons in personal change that have shaped generations of leaders.",                        cover_color: "from-indigo-500 to-violet-600",  in_stock: true },
  { id: 11, title: "The Psychology of Money",            author: "Morgan Housel",         price: 50, category: "Finance & Wealth",     description: "Timeless lessons on wealth, greed, and happiness.",                                                  cover_color: "from-yellow-500 to-amber-600",   in_stock: true },
  { id: 12, title: "No Excuse!",                         author: "Brian Tracy",           price: 50, category: "Personal Development", description: "The power of self-discipline to achieve your goals in life.",                                        cover_color: "from-red-500 to-rose-600",       in_stock: true },
  { id: 13, title: "The Richest Man in Babylon",         author: "George S. Clason",      price: 45, category: "Finance & Wealth",     description: "Ancient wisdom on building wealth, financial success, and personal prosperity.",                     cover_color: "from-amber-400 to-yellow-500",   in_stock: true },
  { id: 14, title: "Tough Times Never Last",             author: "Robert H. Schuller",    price: 45, category: "Inspiration",          description: "But tough people do — a message of hope and resilience for every season of life.",                   cover_color: "from-sky-500 to-blue-600",       in_stock: true },
  { id: 15, title: "The Power of Now",                   author: "Eckhart Tolle",         price: 55, category: "Spiritual Growth",     description: "A guide to spiritual enlightenment and living fully in the present moment.",                         cover_color: "from-lime-500 to-green-600",     in_stock: true },
  { id: 16, title: "Make Today Count",                   author: "John C. Maxwell",       price: 45, category: "Personal Development", description: "The secret of your success is determined by your daily agenda.",                                     cover_color: "from-fuchsia-500 to-pink-600",   in_stock: true },
  { id: 17, title: "Good Morning, Holy Spirit",          author: "Benny Hinn",            price: 40, category: "Spiritual Growth",     description: "A life-changing encounter with the person and presence of the Holy Spirit.",                         cover_color: "from-blue-400 to-sky-500",       in_stock: true },
  { id: 18, title: "Think and Grow Rich",                author: "Napoleon Hill",         price: 50, category: "Finance & Wealth",     description: "The classic guide to achieving success through the power of thought and definite purpose.",           cover_color: "from-orange-400 to-amber-500",   in_stock: true },
  { id: 19, title: "The 15 Invaluable Laws of Growth",   author: "John C. Maxwell",       price: 60, category: "Personal Development", description: "Live them and reach your potential — timeless principles for intentional growth.",                   cover_color: "from-teal-600 to-emerald-700",   in_stock: true },
  { id: 20, title: "Things I Wish I Knew at 18",         author: "Dennis Trittin",        price: 50, category: "Purpose & Identity",   description: "Life lessons for the road ahead — practical wisdom for young adults.",                              cover_color: "from-violet-400 to-purple-500",  in_stock: true },
  { id: 21, title: "Becoming a Person of Influence",     author: "John C. Maxwell",       price: 50, category: "Leadership",           description: "How to positively impact the lives of others through authentic influence.",                          cover_color: "from-rose-500 to-red-600",       in_stock: true },
  { id: 22, title: "Think Like a Billionaire",           author: "Donald Trump",          price: 60, category: "Finance & Wealth",     description: "Everything you need to know about success, real estate, and life.",                                 cover_color: "from-yellow-400 to-orange-500",  in_stock: true },
  { id: 23, title: "Think and Grow Rich (2nd Copy)",     author: "Napoleon Hill",         price: 50, category: "Finance & Wealth",     description: "The classic guide to achieving success through the power of thought and definite purpose.",           cover_color: "from-amber-600 to-orange-700",   in_stock: true },
  { id: 24, title: "Rich Dad Poor Dad",                  author: "Robert T. Kiyosaki",    price: 45, category: "Finance & Wealth",     description: "What the rich teach their kids about money that the poor and middle class do not.",                  cover_color: "from-green-600 to-teal-700",     in_stock: true },
  { id: 25, title: "Psychology of Wealth",               author: "Charles Richards",      price: 50, category: "Finance & Wealth",     description: "Understand your relationship with money and unlock the mindset of financial abundance.",             cover_color: "from-indigo-400 to-blue-500",    in_stock: true },
  { id: 26, title: "Success Is Not an Accident",         author: "Tommy Newberry",        price: 50, category: "Personal Development", description: "Change your choices, change your life — a blueprint for intentional success.",                       cover_color: "from-emerald-400 to-green-500",  in_stock: true },
  { id: 27, title: "Think Big",                          author: "Ben Carson",            price: 40, category: "Inspiration",          description: "Unleashing your potential for excellence — a call to dream bigger and act bolder.",                  cover_color: "from-sky-400 to-cyan-500",       in_stock: true },
  { id: 28, title: "Understanding Your Potential",       author: "Myles Munroe",          price: 45, category: "Purpose & Identity",   description: "Discovering the hidden you — a powerful exploration of your God-given gifts.",                       cover_color: "from-purple-500 to-violet-600",  in_stock: true },
  { id: 29, title: "Talent Is Never Enough",             author: "John C. Maxwell",       price: 60, category: "Leadership",           description: "Discover the choices that will take you beyond your talent.",                                        cover_color: "from-red-400 to-rose-500",       in_stock: true },
  { id: 30, title: "Think for Yourself",                 author: "Vikram Mansharamani",   price: 45, category: "Personal Development", description: "Restoring common sense in an age of experts and artificial intelligence.",                           cover_color: "from-cyan-600 to-teal-700",      in_stock: true },
  { id: 31, title: "Cashflow Quadrant",                  author: "Robert T. Kiyosaki",    price: 50, category: "Finance & Wealth",     description: "Rich dad's guide to financial freedom — understanding the four ways people earn money.",             cover_color: "from-lime-600 to-green-700",     in_stock: true },
];

const CATEGORIES = ["All", "Personal Development", "Leadership", "Finance & Wealth", "Purpose & Identity", "Spiritual Growth", "Inspiration"];

interface CartItem extends Book { qty: number; }

function BookCover({ book }: { book: Book }) {
  return (
    <div className={`w-full aspect-[3/4] rounded-xl bg-gradient-to-br ${book.cover_color} flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_8px)]" />
      <BookOpen className="h-10 w-10 text-white/60 mb-3" />
      <p className="text-white font-heading font-bold text-center text-sm leading-tight line-clamp-3">{book.title}</p>
    </div>
  );
}

function CartDrawer({ items, onClose, onQty, onRemove }: {
  items: CartItem[];
  onClose: () => void;
  onQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const PAYSTACK = "https://paystack.com/pay/mmn-store";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card w-full max-w-sm flex flex-col shadow-elevated border-l">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-heading font-bold text-lg">Your Cart ({items.length})</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Your cart is empty.</p>
            </div>
          )}
          {items.map(item => (
            <div key={item.id} className="flex gap-3 items-start">
              <div className={`w-14 h-20 rounded-lg bg-gradient-to-br ${item.cover_color} shrink-0 flex items-center justify-center`}>
                <BookOpen className="h-5 w-5 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-tight line-clamp-2">{item.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{item.author}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => onQty(item.id, -1)} className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Decrease">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                  <button onClick={() => onQty(item.id, 1)} className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Increase">
                    <Plus className="h-3 w-3" />
                  </button>
                  <span className="ml-auto text-sm font-semibold">GH₵{item.price * item.qty}</span>
                  <button onClick={() => onRemove(item.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t space-y-3">
            <div className="flex items-center justify-between font-heading font-bold">
              <span>Total</span>
              <span>GH₵{total}</span>
            </div>
            <a href={PAYSTACK} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="gradient-primary text-primary-foreground border-0 w-full font-semibold">
                Checkout via Paystack <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground text-center">Secure payment. All major cards accepted.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const Store = () => {
  useSEO({
    title: "Bookstore",
    description: "Browse MeaningMatters Network's curated collection of books on purpose, leadership, and personal development.",
  });

  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = category === "All" ? SEED_BOOKS : SEED_BOOKS.filter(b => b.category === category);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === book.id);
      if (existing) return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  const removeItem = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">MMN Bookstore</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Curated books on purpose, leadership, and personal development to fuel your journey.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b">
        <div className="container py-3 flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  category === c ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >{c}</button>
            ))}
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors text-sm font-medium shrink-0">
            <ShoppingCart className="h-4 w-4" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Books grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((book, i) => (
              <SectionReveal key={book.id}>
                <div className="group flex flex-col">
                  <div className="relative mb-3">
                    <BookCover book={book} />
                    {!book.in_stock && (
                      <div className="absolute inset-0 bg-background/70 rounded-xl flex items-center justify-center">
                        <span className="text-xs font-semibold bg-muted px-2 py-1 rounded-full">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full self-start mb-1">{book.category}</span>
                  <h3 className="font-heading font-bold text-sm leading-tight mb-0.5 line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{book.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-heading font-bold text-base">GH₵{book.price}</span>
                    <Button
                      size="sm"
                      disabled={!book.in_stock}
                      onClick={() => addToCart(book)}
                      className="gradient-primary text-primary-foreground border-0 text-xs px-3"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {cartOpen && (
        <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQty={updateQty} onRemove={removeItem} />
      )}
    </Layout>
  );
};

export default Store;
