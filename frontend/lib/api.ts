const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cmr-hospitality-suite.onrender.com";

async function request(method: string, path: string, body?: unknown) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    throw new Error("Session expired. Please log in again.");
  }

  if (response.status === 403) {
    throw new Error("You do not have permission to perform this action.");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || "Request failed");
  }

  return response.json();
}

export const api = {
  get: (path: string) => request("GET", path),
  post: (path: string, body: unknown) => request("POST", path, body),
  patch: (path: string, body: unknown) => request("PATCH", path, body),
  delete: (path: string) => request("DELETE", path),
};