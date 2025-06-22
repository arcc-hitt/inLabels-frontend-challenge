export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

const BASE_URL = 'https://684ed832f0c9c9848d294907.mockapi.io/notes';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err}`);
  }
  return (await res.json()) as T;
}

export async function fetchNotes(
  page = 1,
  limit = 10,
  sortBy: 'createdAt' | 'title' = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  search = ''
): Promise<Note[]> {
  const q = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    order,
  });
  if (search) {
    q.append('search', search);
  }
  const url = `${BASE_URL}?${q}`;
  const res = await fetch(url);
  return handleResponse<Note[]>(res);
}

export async function createNote(data: {
  title: string;
  content: string;
}): Promise<Note> {
  const payload = {
    ...data,
    createdAt: new Date().toISOString()
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse<Note>(res);
}

export async function updateNote(
  id: string,
  data: { title: string; content: string }
): Promise<Note> {
  const payload = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse<Note>(res);
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
}

export async function fetchTotalCount(): Promise<number> {
  const res = await fetch(BASE_URL);
  if (!res.ok) return 0;
  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}