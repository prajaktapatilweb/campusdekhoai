export async function apiFetch<T = any>(
  url: string,
  options: RequestInit = {},
  redirectOn401 = true,
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
    if (response.status === 401 && redirectOn401) {
      window.location.href = "/login";

      throw new Error("Unauthorized");
    }
    console.log("API Response:", data, response);
    // Other API errors
    if (!response.ok) {
      alert(data.error || data.message || "Something went wrong");
      throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "API Error");
  }
}
