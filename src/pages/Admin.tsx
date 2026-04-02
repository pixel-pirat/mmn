import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Heart, Handshake, Mail, Bell, Calendar,
  LogOut, LayoutDashboard, ChevronDown, Loader2, Trash2, CheckCircle, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  adminLogin, getMe, getDashboardStats, getRecentActivity,
  getVolunteers, getMentors, getPartners, getMessages,
  getSubscribers, getEventRegistrations,
  updateVolunteer, updateMentor, updatePartner, updateMessage,
  deleteVolunteer, deleteMentor, deletePartner, deleteMessage,
  type AdminUser, type DashboardStats, type Submission, type Subscriber,
} from "@/lib/api";
import { useSEO } from "@/lib/seo";

// ── Auth store (simple localStorage) ────────────────────────
const TOKEN_KEY = "mmn_admin_token";
const getToken = () => localStorage.getItem(TOKEN_KEY) ?? "";
const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// ── Login screen ─────────────────────────────────────────────
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
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage submissions</p>
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

// ── Stat card ────────────────────────────────────────────────
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

// ── Status badge ─────────────────────────────────────────────
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
  active: "bg-green-100 text-green-700",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

// ── Submissions table ────────────────────────────────────────
type TableAction = { label: string; value: string };

function SubmissionsTable({
  rows,
  columns,
  statusActions,
  onStatusChange,
  onDelete,
  loading,
}: {
  rows: Submission[];
  columns: { key: string; label: string }[];
  statusActions: TableAction[];
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}) {
  if (loading) return <div className="py-12 text-center text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
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
              {columns.map(c => (
                <td key={c.key} className="py-3 px-3 max-w-[200px] truncate">
                  {String(row[c.key] ?? "—")}
                </td>
              ))}
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={row.status} />
                  <div className="relative group">
                    <button className="p-1 rounded hover:bg-muted transition-colors">
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </button>
                    <div className="absolute left-0 top-6 z-10 bg-card border rounded-lg shadow-elevated py-1 hidden group-hover:block min-w-[120px]">
                      {statusActions.map(a => (
                        <button
                          key={a.value}
                          onClick={() => onStatusChange(row.id, a.value)}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors"
                        >
                          {a.label}
                        </button>
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

// ── Main admin dashboard ─────────────────────────────────────
type Section = "dashboard" | "volunteers" | "mentors" | "partners" | "messages" | "subscribers" | "events";

const NAV: { key: Section; label: string; icon: React.ElementType }[] = [
  { key: "dashboard",   label: "Dashboard",    icon: LayoutDashboard },
  { key: "volunteers",  label: "Volunteers",   icon: Users },
  { key: "mentors",     label: "Mentors",      icon: Heart },
  { key: "partners",    label: "Partners",     icon: Handshake },
  { key: "messages",    label: "Messages",     icon: Mail },
  { key: "subscribers", label: "Newsletter",   icon: Bell },
  { key: "events",      label: "Event Regs",   icon: Calendar },
];

function Dashboard({ token, admin, onLogout }: { token: string; admin: AdminUser; onLogout: () => void }) {
  const [section, setSection] = useState<Section>("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [data, setData] = useState<Submission[] | Subscriber[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load stats on mount
  useEffect(() => {
    getDashboardStats(token).then(setStats).catch(() => {});
  }, [token]);

  // Load section data
  const loadSection = useCallback(async (s: Section) => {
    if (s === "dashboard") return;
    setLoadingData(true);
    try {
      const loaders: Record<Section, () => Promise<Submission[] | Subscriber[]>> = {
        dashboard:   () => Promise.resolve([]),
        volunteers:  () => getVolunteers(token),
        mentors:     () => getMentors(token),
        partners:    () => getPartners(token),
        messages:    () => getMessages(token),
        subscribers: () => getSubscribers(token),
        events:      () => getEventRegistrations(token),
      };
      setData(await loaders[s]());
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoadingData(false);
    }
  }, [token]);

  useEffect(() => { loadSection(section); }, [section, loadSection]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const updaters: Partial<Record<Section, (id: number, token: string, body: Record<string, string>) => Promise<unknown>>> = {
        volunteers: updateVolunteer,
        mentors:    updateMentor,
        partners:   updatePartner,
        messages:   updateMessage,
      };
      await updaters[section]?.(id, token, { status });
      toast.success("Status updated.");
      loadSection(section);
      getDashboardStats(token).then(setStats).catch(() => {});
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    try {
      const deleters: Partial<Record<Section, (id: number, token: string) => Promise<void>>> = {
        volunteers: deleteVolunteer,
        mentors:    deleteMentor,
        partners:   deletePartner,
        messages:   deleteMessage,
      };
      await deleters[section]?.(id, token);
      toast.success("Deleted.");
      loadSection(section);
      getDashboardStats(token).then(setStats).catch(() => {});
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  // Section config
  const SECTION_CONFIG: Partial<Record<Section, {
    columns: { key: string; label: string }[];
    statusActions: TableAction[];
  }>> = {
    volunteers: {
      columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "created_at", label: "Date" }],
      statusActions: [{ label: "Approve", value: "approved" }, { label: "Reject", value: "rejected" }, { label: "Pending", value: "pending" }],
    },
    mentors: {
      columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "expertise", label: "Expertise" }, { key: "created_at", label: "Date" }],
      statusActions: [{ label: "Approve", value: "approved" }, { label: "Reject", value: "rejected" }, { label: "Pending", value: "pending" }],
    },
    partners: {
      columns: [{ key: "org_name", label: "Organization" }, { key: "contact_name", label: "Contact" }, { key: "email", label: "Email" }, { key: "created_at", label: "Date" }],
      statusActions: [{ label: "Approve", value: "approved" }, { label: "Reject", value: "rejected" }, { label: "Pending", value: "pending" }],
    },
    messages: {
      columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "subject", label: "Subject" }, { key: "created_at", label: "Date" }],
      statusActions: [{ label: "Mark Read", value: "read" }, { label: "Mark Replied", value: "replied" }, { label: "Mark Unread", value: "unread" }],
    },
    events: {
      columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "event_name", label: "Event" }, { key: "created_at", label: "Date" }],
      statusActions: [{ label: "Attended", value: "attended" }, { label: "Cancelled", value: "cancelled" }, { label: "Registered", value: "registered" }],
    },
  };

  const currentConfig = SECTION_CONFIG[section];

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-card border-r flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:flex`}>
        <div className="p-5 border-b">
          <p className="font-heading font-bold text-sm">MMN Admin</p>
          <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(n => (
            <button
              key={n.key}
              onClick={() => { setSection(n.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${section === n.key ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <n.icon className="h-4 w-4 shrink-0" />
              {n.label}
              {n.key === "messages" && stats?.unread_messages ? (
                <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">{stats.unread_messages}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
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
          {/* Dashboard overview */}
          {section === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard icon={Users}      label="Volunteers"    value={stats?.volunteers ?? 0}           color="bg-emerald-500" />
                <StatCard icon={Heart}      label="Mentors"       value={stats?.mentors ?? 0}              color="bg-pink-500" />
                <StatCard icon={Handshake}  label="Partners"      value={stats?.partners ?? 0}             color="bg-blue-500" />
                <StatCard icon={Mail}       label="Unread Msgs"   value={stats?.unread_messages ?? 0}      color="bg-amber-500" />
                <StatCard icon={Bell}       label="Subscribers"   value={stats?.subscribers ?? 0}          color="bg-violet-500" />
                <StatCard icon={Calendar}   label="Event Regs"    value={stats?.event_registrations ?? 0}  color="bg-teal-500" />
              </div>
              <div className="bg-card rounded-xl border p-6 shadow-card">
                <h2 className="font-heading font-semibold mb-1">Quick Actions</h2>
                <p className="text-muted-foreground text-sm mb-4">Use the sidebar to manage each submission type.</p>
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

          {/* Subscribers (read-only list) */}
          {section === "subscribers" && (
            <div className="bg-card rounded-xl border shadow-card overflow-hidden">
              <div className="p-5 border-b flex items-center justify-between">
                <h2 className="font-heading font-semibold">Newsletter Subscribers</h2>
                <span className="text-xs text-muted-foreground">{(data as Subscriber[]).length} active</span>
              </div>
              {loadingData
                ? <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div>
                : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b"><th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Email</th><th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th><th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Subscribed</th></tr></thead>
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
                )
              }
            </div>
          )}

          {/* All other sections */}
          {currentConfig && section !== "subscribers" && (
            <div className="bg-card rounded-xl border shadow-card overflow-hidden">
              <div className="p-5 border-b flex items-center justify-between">
                <h2 className="font-heading font-semibold capitalize">{section}</h2>
                <span className="text-xs text-muted-foreground">{(data as Submission[]).length} total</span>
              </div>
              <SubmissionsTable
                rows={data as Submission[]}
                columns={currentConfig.columns}
                statusActions={currentConfig.statusActions}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                loading={loadingData}
              />
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

// ── Page entry point ─────────────────────────────────────────
const Admin = () => {
  useSEO({ title: "Admin", description: "MMN Admin Dashboard" });

  const navigate = useNavigate();
  const [token, setTokenState] = useState(getToken);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    getMe(token)
      .then(setAdmin)
      .catch(() => { clearToken(); setTokenState(""); })
      .finally(() => setChecking(false));
  }, [token]);

  const handleLogin = (t: string, user: AdminUser) => {
    setTokenState(t);
    setAdmin(user);
  };

  const handleLogout = () => {
    clearToken();
    setTokenState("");
    setAdmin(null);
    navigate("/");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!token || !admin) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard token={token} admin={admin} onLogout={handleLogout} />;
};

export default Admin;
