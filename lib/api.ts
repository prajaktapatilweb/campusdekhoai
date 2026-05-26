export async function apiFetch<T = any>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json();

    // Unauthorized
    if (response.status === 401) {
      window.location.href = "/login";

      throw new Error("Unauthorized");
    }

    // Other API errors
    if (!response.ok) {
      throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "API Error");
  }
}
