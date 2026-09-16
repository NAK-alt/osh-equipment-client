// Resolve a stored image path to a displayable URL.
//   - Full http(s) URLs (e.g. a Firebase Storage signed URL returned by the API) -> as-is
//   - Local/legacy paths like "/uploads/equipment/xxx.jpg" or "/uploads/qr-codes/..." -> API base + path
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");

export function imageUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

export { API_BASE };