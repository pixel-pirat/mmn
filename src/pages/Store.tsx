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
  {
    id: 1,
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    price: 80,
    category: "Purpose & Identity",
    description: "A groundbreaking manifesto on the meaning of life that has transformed millions of lives worldwide.",
    cover_color: "from-emerald-500 to-teal-600",
    in_stock: true,
  },
  {
    id: 2,
    title: "Start With Why",
    author: "Simon Sinek",
    price: 75,
    category: "Leadership",
    description: "How great leaders inspire everyone to take action by starting with purpose.",
    cover_color: "from-blue-500 to-indigo-600",
    in_stock: true,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 90,
    category: "Personal Development",
    description: "An easy and proven way to build good habits and break bad ones.",
    cover_color: "from-orange-500 to-red-500",
    in_stock: true,
  },
  {
    id: 4,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 85,
    category: "Personal Development",
    description: "Powerful lessons in personal change that have shaped generations of leaders.",
    cover_color: "from-violet-500 to-purple-600",
    in_stock: true,
  },
  {
    id: 5,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    price: 70,
    category: "Purpose & Identity",
    description: "How we can learn to fulfil our potential by developing a growth mindset.",
    cover_color: "from-pink-500 to-rose-600",
    in_stock: true,
  },
  {
    id: 6,
    title: "Leaders Eat Last",
    author: "Simon Sinek",
    price: 78,
    category: "Leadership",
    description: "Why some teams pull together and others don't — the biology of trust and leadership.",
    cover_color: "from-cyan-500 to-blue-600",
    in_stock: false,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(SEED_BOOKS.map(b => b.category)))];

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
