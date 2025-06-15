export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

const API_BASE = 'https://684ed832f0c9c9848d294907.mockapi.io/notes';

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function createNote(data: {
  title: string;
  content: string;
}): Promise<Note> {
  const payload = {
    ...data,
    createdAt: new Date().toISOString()
  };
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function updateNote(
  id: number,
  data: { title: string; content: string }
): Promise<Note> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}
