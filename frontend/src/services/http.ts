const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(
  /\/$/,
  ''
);

const parseJson = async <T>(response: Response): Promise<T | null> => {
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    return null;
  }

  return (await response.json()) as T;
};

const request = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined)
    }
  });

  const payload = await parseJson<{ message?: string } & T>(response);

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed with ${response.status}`);
  }

  return payload as T;
};

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body)
    }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }),
  delete: <T>(path: string) =>
    request<T>(path, {
      method: 'DELETE'
    })
};

