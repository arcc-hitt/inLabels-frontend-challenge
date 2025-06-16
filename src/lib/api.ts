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
  sortBy = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  search = ''
): Promise<Note[]> {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    order,
  });

  if (search) {
    query.append('title', `~${search}`);
  }

  const res = await fetch(`${BASE_URL}?${query.toString()}`);
  return res.json();
}

export async function createNote(data: Omit<Note, 'id' | 'createdAt'>): Promise<Note> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
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