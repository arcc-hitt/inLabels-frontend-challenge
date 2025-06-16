export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const BASE_URL = 'https://684ed832f0c9c9848d294907.mockapi.io/notes';

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
    order
  });

  if (search) {
    q.append('search', search);
  }

  const url = `${BASE_URL}?${q.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.warn(`fetchNotes() got ${res.status} from ${url}`);
    return [];
  }

  const data = await res.json();
  // Ensure we return an array of objects with defined .id
  if (!Array.isArray(data)) return [];
  return data.filter((item) => typeof item.id === 'string');
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

  if (!res.ok) {
    throw new Error(`Failed to create note: ${res.status}`);
  }

  return res.json();
}

export async function updateNote(id: string, data: Partial<Note>): Promise<Note> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteNote(id: string): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}