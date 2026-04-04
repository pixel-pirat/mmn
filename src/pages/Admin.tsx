import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Heart, Handshake, Mail, Bell, Calendar,
  LogOut, LayoutDashboard, ChevronDown, Loader2, Trash2,
  BookOpen, ShoppingBag, Plus, X, Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  adminLogin, getMe, getDashboardStats,
  getVolunteers, getMentors, getPartners, getMessages,
  getSubscribers, getEventRegistrations,
  updateVolunteer, updateMentor, updatePartner, updateMessage,
  deleteVolunteer, deleteMentor, deletePartner, deleteMessage,
  getBooks, adminCreateBook, adminUpdateBook, adminDeleteBook,
  getOrders, updateOrder,
  type AdminUser, type DashboardStats, type Submission, type Subscriber,
  type StoreBook, type Order,
} from "@/lib/api";
import { useSEO } from "@/lib/seo";

const TOKEN_KEY = "mmn_admin_token";
const getToken = () => localStorage.getItem(TOKEN_KEY) ?? "";
const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

function LoginScreen({ onLogin }: { onLogin: (token: string, user: AdminUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(email, password);
      setToken(res.token);
      onLogin(res.token, res.admin);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="bg-card rounded-2xl p-8 shadow-elevated border w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
            <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-bold">MMN Admin</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage the platform</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adm-email" className="text-sm font-medium mb-1 block">Email</label>
            <input id="adm-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@meaningmatters.org" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label htmlFor="adm-pass" className="text-sm font-medium mb-1 block">Password</label>
            <input id="adm-pass" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</> : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="bg-card rounded-xl p-5 border shadow-card flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-heading font-bold">{value.toLocaleString()}</p>
        <p className="text-muted-foreground text-xs">{label}</p>
      </div>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  unread: "bg-blue-100 text-blue-700",
  read: "bg-muted text-muted-foreground",
  replied: "bg-green-100 text-green-700",
  registered: "bg-blue-100 text-blue-700",
  attended: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  paid: "bg-green-100 text-green-700",
  fulfilled: "bg-emerald-100 text-emerald-700",
  active: "bg-green-100 text-green-700",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

type TableAction = { label: string; value: string };

function SubmissionsTable({ rows, columns, statusActions, onStatusChange, onDelete, loading }: {
  rows: Submission[];
  columns: { key: string; label: string }[];
  statusActions: TableAction[];
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}) {
  if (loading) return <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div>;
  if (!rows.length) return <div className="py-12 text-center text-muted-foreground text-sm">No submissions yet.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {columns.map(c => <th key={c.key} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{c.label}</th>)}
            <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
            <th className="py-3 px-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id} className="border-b hover:bg-muted/40 transition-colors">
              {columns.map(c => <td key={c.key} className="py-3 px-3 max-w-[200px] truncate">{String(row[c.key] ?? "—")}</td>)}
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={row.status} />
                  <div className="relative group">
                    <button className="p-1 rounded hover:bg-muted transition-colors"><ChevronDown className="h-3 w-3 text-muted-foreground" /></button>
                    <div className="absolute left-0 top-6 z-10 bg-card border rounded-lg shadow-elevated py-1 hidden group-hover:block min-w-[120px]">
                      {statusActions.map(a => (
                        <button key={a.value} onClick={() => onStatusChange(row.id, a.value)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors">{a.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-3">
                <button onClick={() => onDelete(row.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Book Form Modal ──────────────────────────────────────────
const COVER_OPTIONS = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-orange-500 to-red-500",
  "from-violet-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
];

function BookModal({ book, token, onClose, onSaved }: {
  book: StoreBook | null;
  token: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: book?.title ?? "",
    author: book?.author ?? "",
    price: String(book?.price ?? ""),
    category: book?.category ?? "",
    description: book?.description ?? "",
    cover_color: book?.cover_color ?? COVER_OPTIONS[0],
    in_stock: book?.in_stock ?? true,
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (book) {
        await adminUpdateBook(book.id, token, payload as unknown as Partial<StoreBook>);
        toast.success("Book updated.");
      } else {
        await adminCreateBook(token, payload as unknown as Partial<StoreBook>);
        toast.success("Book added.");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-2xl p-6 shadow-elevated border w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-bold text-lg">{book ? "Edit Book" : "Add Book"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Title *</label>
              <input value={form.title} onChange={set("title")} required placeholder="Book title" className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Author *</label>
              <input value={form.author} onChange={set("author")} required placeholder="Author name" className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Price (GH₵) *</label>
              <input type="number" value={form.price} onChange={set("price")} required min="0" placeholder="e.g. 80" className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Category</label>
              <input value={form.category} onChange={set("category")} placeholder="e.g. Leadership" className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Description</label>
            <textarea value={form.description} onChange={set("description")} rows={3} placeholder="Short description..." className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="text-xs font-medium mb-2 block">Cover Color</label>
            <div className="flex gap-2 flex-wrap">
              {COVER_OPTIONS.map(c => (
                <button key={c} type="button" onClick={() => setForm(f => ({ ...f, cover_color: c }))}
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c} border-2 transition-all ${form.cover_color === c ? "border-foreground scale-110" : "border-transparent"}`}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.in_stock} onChange={e => setForm(f => ({ ...f, in_stock: e.target.checked }))} className="rounded" />
            In Stock
          </label>
          <Button disabled={loading} className="gradient-primary text-primary-foreground border-0 w-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…</> : book ? "Save Changes" : "Add Book"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Books Section ────────────────────────────────────────────
function BooksSection({ token }: { token: string }) {
  const [books, setBooks] = useState<StoreBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalBook, setModalBook] = useState<StoreBook | null | undefined>(undefined); // undefined = closed

  const load = useCallback(async () => {
    setLoading(true);
    try { setBooks(await getBooks()); } catch { toast.error("Failed to load books."); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this book?")) return;
    try { await adminDeleteBook(id, token); toast.success("Deleted."); load(); } catch { toast.error("Delete failed."); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold">Books ({books.length})</h2>
        <Button size="sm" onClick={() => setModalBook(null)} className="gradient-primary text-primary-foreground border-0">
          <Plus className="h-4 w-4 mr-1" /> Add Book
        </Button>
      </div>
      {loading ? <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div> : (
        <div className="overflow-x-auto bg-card rounded-xl border shadow-card">
          <table className="w-full text-sm">
            <thead><tr className="border-b">
              {["Title", "Author", "Price", "Category", "Stock", ""].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id} className="border-b hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3 font-medium max-w-[180px] truncate">{b.title}</td>
                  <td className="py-3 px-3 text-muted-foreground">{b.author}</td>
                  <td className="py-3 px-3">GH₵{b.price}</td>
                  <td className="py-3 px-3 text-muted-foreground">{b.category}</td>
                  <td className="py-3 px-3"><StatusBadge status={b.in_stock ? "active" : "cancelled"} /></td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      <button onClick={() => setModalBook(b)} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Edit"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalBook !== undefined && (
        <BookModal book={modalBook} token={token} onClose={() => setModalBook(undefined)} onSaved={load} />
      )}
    </div>
  );
}

// ── Orders Section ───────────────────────────────────────────
function OrdersSection({ token }: { token: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setOrders(await getOrders(token)); } catch { toast.error("Failed to load orders."); } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const handleStatus = async (id: number, status: string) => {
    try { await updateOrder(id, token, { status }); toast.success("Updated."); load(); } catch { toast.error("Update failed."); }
  };

  if (loading) return <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div>;

  return (
    <div className="bg-card rounded-xl border shadow-card overflow-hidden">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-heading font-semibold">Orders ({orders.length})</h2>
      </div>
      {!orders.length ? <div className="py-12 text-center text-muted-foreground text-sm">No orders yet.</div> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b">
              {["Customer", "Email", "Total", "Items", "Status", "Date", ""].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3 font-medium">{o.customer_name}</td>
                  <td className="py-3 px-3 text-muted-foreground max-w-[160px] truncate">{o.customer_email}</td>
                  <td className="py-3 px-3 font-semibold">GH₵{o.total}</td>
                  <td className="py-3 px-3 text-muted-foreground">{Array.isArray(o.items) ? o.items.length : "—"} item(s)</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <StatusBadge status={o.status} />
                      <div className="relative group">
                        <button className="p-1 rounded hover:bg-muted"><ChevronDown className="h-3 w-3 text-muted-foreground" /></button>
                        <div className="absolute left-0 top-6 z-10 bg-card border rounded-lg shadow-elevated py-1 hidden group-hover:block min-w-[120px]">
                          {["pending","paid","fulfilled","cancelled"].map(s => (
                            <button key={s} onClick={() => handleStatus(o.id, s)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted capitalize">{s}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-3" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────
type Section = "dashboard" | "volunteers" | "mentors" | "partners" | "messages" | "subscribers" | "events" | "books" | "orders";

const NAV: { key: Section; label: string; icon: React.ElementType; group?: string }[] = [
  { key: "dashboard",   label: "Overview",     icon: LayoutDashboard },
  { key: "volunteers",  label: "Volunteers",   icon: Users,        group: "People" },
  { key: "mentors",     label: "Mentors",      icon: Heart,        group: "People" },
  { key: "partners",    label: "Partners",     icon: Handshake,    group: "People" },
  { key: "messages",    label: "Messages",     icon: Mail,         group: "People" },
  { key: "subscribers", label: "Newsletter",   icon: Bell,         group: "People" },
  { key: "events",      label: "Event Regs",   icon: Calendar,     group: "People" },
  { key: "books",       label: "Books",        icon: BookOpen,     group: "Store" },
  { key: "orders",      label: "Orders",       icon: ShoppingBag,  group: "Store" },
];

function Dashboard({ token, admin, onLogout }: { token: string; admin: AdminUser; onLogout: () => void }) {
  const [section, setSection] = useState<Section>("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [data, setData] = useState<Submission[] | Subscriber[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { getDashboardStats(token).then(setStats).catch(() => {}); }, [token]);

  const loadSection = useCallback(async (s: Section) => {
    if (["dashboard", "books", "orders"].includes(s)) return;
    setLoadingData(true);
    try {
      const loaders: Record<string, () => Promise<Submission[] | Subscriber[]>> = {
        volunteers: () => getVolunteers(token),
        mentors:    () => getMentors(token),
        partners:   () => getPartners(token),
        messages:   () => getMessages(token),
        subscribers:() => getSubscribers(token),
        events:     () => getEventRegistrations(token),
      };
      setData(await loaders[s]());
    } catch (err) { toast.error((err as Error).message); }
    finally { setLoadingData(false); }
  }, [token]);

  useEffect(() => { loadSection(section); }, [section, loadSection]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const updaters: Partial<Record<Section, (id: number, token: string, body: Record<string, string>) => Promise<unknown>>> = {
        volunteers: updateVolunteer, mentors: updateMentor, partners: updatePartner, messages: updateMessage,
      };
      await updaters[section]?.(id, token, { status });
      toast.success("Status updated.");
      loadSection(section);
      getDashboardStats(token).then(setStats).catch(() => {});
    } catch (err) { toast.error((err as Error).message); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this record?")) return;
    try {
      const deleters: Partial<Record<Section, (id: number, token: string) => Promise<void>>> = {
        volunteers: deleteVolunteer, mentors: deleteMentor, partners: deletePartner, messages: deleteMessage,
      };
      await deleters[section]?.(id, token);
      toast.success("Deleted.");
      loadSection(section);
      getDashboardStats(token).then(setStats).catch(() => {});
    } catch (err) { toast.error((err as Error).message); }
  };

  const SECTION_CONFIG: Partial<Record<Section, { columns: { key: string; label: string }[]; statusActions: TableAction[] }>> = {
    volunteers: { columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "created_at", label: "Date" }], statusActions: [{ label: "Approve", value: "approved" }, { label: "Reject", value: "rejected" }, { label: "Pending", value: "pending" }] },
    mentors:    { columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "expertise", label: "Expertise" }, { key: "created_at", label: "Date" }], statusActions: [{ label: "Approve", value: "approved" }, { label: "Reject", value: "rejected" }, { label: "Pending", value: "pending" }] },
    partners:   { columns: [{ key: "org_name", label: "Organization" }, { key: "contact_name", label: "Contact" }, { key: "email", label: "Email" }, { key: "created_at", label: "Date" }], statusActions: [{ label: "Approve", value: "approved" }, { label: "Reject", value: "rejected" }, { label: "Pending", value: "pending" }] },
    messages:   { columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "subject", label: "Subject" }, { key: "created_at", label: "Date" }], statusActions: [{ label: "Mark Read", value: "read" }, { label: "Mark Replied", value: "replied" }, { label: "Mark Unread", value: "unread" }] },
    events:     { columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "event_name", label: "Event" }, { key: "created_at", label: "Date" }], statusActions: [{ label: "Attended", value: "attended" }, { label: "Cancelled", value: "cancelled" }, { label: "Registered", value: "registered" }] },
  };

  const currentConfig = SECTION_CONFIG[section];
  const groups = ["People", "Store"];

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-card border-r flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:flex`}>
        <div className="p-5 border-b">
          <p className="font-heading font-bold text-sm">MMN Admin</p>
          <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
        </div>
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          <button onClick={() => { setSection("dashboard"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${section === "dashboard" ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
            <LayoutDashboard className="h-4 w-4 shrink-0" /> Overview
          </button>
          {groups.map(group => (
            <div key={group}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-1">{group}</p>
              {NAV.filter(n => n.group === group).map(n => (
                <button key={n.key} onClick={() => { setSection(n.key); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${section === n.key ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <n.icon className="h-4 w-4 shrink-0" />
                  {n.label}
                  {n.key === "messages" && stats?.unread_messages ? (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">{stats.unread_messages}</span>
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-3 border-t">
          <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(o => !o)} className="lg:hidden p-1.5 rounded hover:bg-muted transition-colors">
              <LayoutDashboard className="h-5 w-5" />
            </button>
            <h1 className="font-heading font-bold capitalize">{section === "dashboard" ? "Overview" : section}</h1>
          </div>
          <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {admin.name}</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {section === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Users}      label="Volunteers"   value={stats?.volunteers ?? 0}          color="bg-emerald-500" />
                <StatCard icon={Heart}      label="Mentors"      value={stats?.mentors ?? 0}             color="bg-pink-500" />
                <StatCard icon={Handshake}  label="Partners"     value={stats?.partners ?? 0}            color="bg-blue-500" />
                <StatCard icon={Mail}       label="Unread Msgs"  value={stats?.unread_messages ?? 0}     color="bg-amber-500" />
                <StatCard icon={Bell}       label="Subscribers"  value={stats?.subscribers ?? 0}         color="bg-violet-500" />
                <StatCard icon={Calendar}   label="Event Regs"   value={stats?.event_registrations ?? 0} color="bg-teal-500" />
                <StatCard icon={BookOpen}   label="Books"        value={0}                               color="bg-indigo-500" />
                <StatCard icon={ShoppingBag} label="Orders"     value={0}                               color="bg-orange-500" />
              </div>
              <div className="bg-card rounded-xl border p-6 shadow-card">
                <h2 className="font-heading font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-2">
                  {NAV.filter(n => n.key !== "dashboard").map(n => (
                    <button key={n.key} onClick={() => setSection(n.key)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground text-xs font-medium transition-colors">
                      <n.icon className="h-3.5 w-3.5" /> {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === "books" && <BooksSection token={token} />}
          {section === "orders" && <OrdersSection token={token} />}

          {section === "subscribers" && (
            <div className="bg-card rounded-xl border shadow-card overflow-hidden">
              <div className="p-5 border-b flex items-center justify-between">
                <h2 className="font-heading font-semibold">Newsletter Subscribers</h2>
                <span className="text-xs text-muted-foreground">{(data as Subscriber[]).length} active</span>
              </div>
              {loadingData ? <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Email</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Subscribed</th>
                    </tr></thead>
                    <tbody>
                      {(data as Subscriber[]).map(s => (
                        <tr key={s.id} className="border-b hover:bg-muted/40">
                          <td className="py-3 px-4">{s.email}</td>
                          <td className="py-3 px-4"><StatusBadge status={s.status} /></td>
                          <td className="py-3 px-4 text-muted-foreground">{new Date(s.subscribed_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {currentConfig && !["subscribers", "books", "orders"].includes(section) && (
            <div className="bg-card rounded-xl border shadow-card overflow-hidden">
              <div className="p-5 border-b flex items-center justify-between">
                <h2 className="font-heading font-semibold capitalize">{section}</h2>
                <span className="text-xs text-muted-foreground">{(data as Submission[]).length} total</span>
              </div>
              <SubmissionsTable rows={data as Submission[]} columns={currentConfig.columns} statusActions={currentConfig.statusActions} onStatusChange={handleStatusChange} onDelete={handleDelete} loading={loadingData} />
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

const Admin = () => {
  useSEO({ title: "Admin", description: "MMN Admin Dashboard" });
  const navigate = useNavigate();
  const [token, setTokenState] = useState(getToken);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    getMe(token).then(setAdmin).catch(() => { clearToken(); setTokenState(""); }).finally(() => setChecking(false));
  }, [token]);

  if (checking) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!token || !admin) return <LoginScreen onLogin={(t, u) => { setTokenState(t); setAdmin(u); }} />;
  return <Dashboard token={token} admin={admin} onLogout={() => { clearToken(); setTokenState(""); setAdmin(null); navigate("/"); }} />;
};

export default Admin;
