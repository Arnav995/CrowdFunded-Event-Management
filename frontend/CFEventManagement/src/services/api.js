const BASE = "http://localhost:3530/api";

const get = (url, token) =>
  fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} }).then(r => r.json());

const post = (url, body, token) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  }).then(r => r.json());

const put = (url, body, token) =>
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  }).then(r => r.json());

export const loginUser       = (email, password) => post(`${BASE}/auth/login`, { email, password });
export const signupUser      = (name, email, password) => post(`${BASE}/auth/signup`, { name, email, password });
export const getApprovedEvents = () => get(`${BASE}/events/approved`);
export const getEventById    = (id) => get(`${BASE}/events/${id}`);
export const getEventProgress = (id) => get(`${BASE}/events/${id}/progress`);
export const getUserEvents   = (token) => get(`${BASE}/events/my-events`, token);
export const getMyTransactions = (token) => get(`${BASE}/transactions/my`, token);
export const createEvent     = (data, token) => post(`${BASE}/events`, data, token);
export const contribute      = (event_id, amount, token) => post(`${BASE}/contribute`, { event_id, amount }, token);
export const getAdminStats   = (token) => get(`${BASE}/admin/stats`, token);
export const getPendingEvents = (token) => get(`${BASE}/admin/events/pending`, token);
export const getAllEvents     = (token) => get(`${BASE}/admin/events`, token);
export const approveEvent    = (id, token) => put(`${BASE}/admin/events/${id}/approve`, null, token);
export const rejectEvent     = (id, token) => put(`${BASE}/admin/events/${id}/reject`, null, token);
export const checkExpired    = (token) => put(`${BASE}/events/check-expired`, null, token);
export const getAllTransactions = (token) => get(`${BASE}/admin/transactions`, token);