/**
 * MMN API client — talks to our own Express/PostgreSQL backend.
 * Set VITE_API_URL in your .env (defaults to localhost:4000 for dev).
 */

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function post<T>(path: string, body: Record<string, string>): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.errors?.[0]?.msg ?? data?.error ?? "Request failed");
  return data as T;
}

async function get<T>(path: string, token: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Request failed");
  return data as T;
}

async function patch<T>(path: string, token: string, body: Record<string, string>): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Request failed");
  return data as T;
}

async function del(path: string, token: string): Promise<void> {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Delete failed");
}

// ── Public form submissions ──────────────────────────────────

export const submitVolunteer = (data: Record<string, string>) =>
  post<{ message: string }>("/api/volunteers", data);

export const submitMentor = (data: Record<string, string>) =>
  post<{ message: string }>("/api/mentors", data);

export const submitPartner = (data: Record<string, string>) =>
  post<{ message: string }>("/api/partners", data);

export const submitContact = (data: Record<string, string>) =>
  post<{ message: string }>("/api/contact", data);

export const subscribeNewsletter = (email: string) =>
  post<{ message: string }>("/api/newsletter/subscribe", { email });

export const registerForEvent = (data: Record<string, string>) =>
  post<{ message: string }>("/api/events/register", data);

// ── Admin auth ───────────────────────────────────────────────

export const adminLogin = (email: string, password: string) =>
  post<{ token: string; admin: AdminUser }>("/api/auth/login", { email, password });

export const getMe = (token: string) =>
  get<AdminUser>("/api/auth/me", token);

// ── Admin data reads ─────────────────────────────────────────

export const getDashboardStats = (token: string) =>
  get<DashboardStats>("/api/dashboard/stats", token);

export const getRecentActivity = (token: string) =>
  get<RecentActivity>("/api/dashboard/recent", token);

export const getVolunteers = (token: string, status?: string) =>
  get<Submission[]>("/api/volunteers", token, status ? { status } : undefined);

export const getMentors = (token: string, status?: string) =>
  get<Submission[]>("/api/mentors", token, status ? { status } : undefined);

export const getPartners = (token: string) =>
  get<Submission[]>("/api/partners", token);

export const getMessages = (token: string, status?: string) =>
  get<Submission[]>("/api/contact", token, status ? { status } : undefined);

export const getSubscribers = (token: string) =>
  get<Subscriber[]>("/api/newsletter", token);

export const getEventRegistrations = (token: string, event?: string) =>
  get<Submission[]>("/api/events/registrations", token, event ? { event } : undefined);

// ── Admin updates ────────────────────────────────────────────

export const updateVolunteer = (id: number, token: string, body: Record<string, string>) =>
  patch(`/api/volunteers/${id}`, token, body);

export const updateMentor = (id: number, token: string, body: Record<string, string>) =>
  patch(`/api/mentors/${id}`, token, body);

export const updatePartner = (id: number, token: string, body: Record<string, string>) =>
  patch(`/api/partners/${id}`, token, body);

export const updateMessage = (id: number, token: string, body: Record<string, string>) =>
  patch(`/api/contact/${id}`, token, body);

export const deleteVolunteer = (id: number, token: string) => del(`/api/volunteers/${id}`, token);
export const deleteMentor    = (id: number, token: string) => del(`/api/mentors/${id}`, token);
export const deletePartner   = (id: number, token: string) => del(`/api/partners/${id}`, token);
export const deleteMessage   = (id: number, token: string) => del(`/api/contact/${id}`, token);

// ── Types ────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Submission {
  id: number;
  name?: string;
  email?: string;
  org_name?: string;
  event_name?: string;
  subject?: string;
  status: string;
  notes?: string;
  created_at: string;
  [key: string]: unknown;
}

export interface Subscriber {
  id: number;
  email: string;
  status: string;
  subscribed_at: string;
}

export interface DashboardStats {
  volunteers: number;
  mentors: number;
  partners: number;
  unread_messages: number;
  subscribers: number;
  event_registrations: number;
}

export interface RecentActivity {
  volunteers: Submission[];
  messages: Submission[];
  registrations: Submission[];
}

// ── Store ────────────────────────────────────────────────────

export const getBooks = () =>
  fetch(`${BASE}/api/books`).then(r => r.json()) as Promise<StoreBook[]>;

export const createBook = (token: string, data: Partial<StoreBook>) =>
  patch<StoreBook>("/api/books", token, data as Record<string, string>);

export const adminCreateBook = async (token: string, data: Partial<StoreBook>): Promise<StoreBook> => {
  const res = await fetch(`${BASE}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error ?? "Failed to create book");
  return json;
};

export const adminUpdateBook = (id: number, token: string, data: Partial<StoreBook>) =>
  patch<StoreBook>(`/api/books/${id}`, token, data as Record<string, string>);

export const adminDeleteBook = (id: number, token: string) => del(`/api/books/${id}`, token);

export const getOrders = (token: string) =>
  get<Order[]>("/api/orders", token);

export const updateOrder = (id: number, token: string, body: Record<string, string>) =>
  patch<Order>(`/api/orders/${id}`, token, body);

export const placeOrder = (data: {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  items: { id: number; title: string; qty: number; price: number }[];
  total: number;
}) => post<{ message: string; order: Order }>("/api/orders", data as unknown as Record<string, string>);

export interface StoreBook {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  cover_color: string;
  in_stock: boolean;
  created_at?: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  items: { id: number; title: string; qty: number; price: number }[];
  total: number;
  status: string;
  notes?: string;
  created_at: string;
}
