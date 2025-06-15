<script lang="ts">
  import { onMount } from 'svelte';
  import NoteForm from './lib/NoteForm.svelte';
  import NoteList from './lib/NoteList.svelte';
  import type { Note } from './lib/api';
  import { fetchNotes, createNote } from './lib/api';

  let notes: Note[] = [];

  onMount(async () => {
    notes = await fetchNotes();
  });

  function handleCreate(detail: { title: string; content: string }) {
    createNote(detail).then((newNote) => {
      notes = [newNote, ...notes];
    });
  }

  function handleDelete(id: number) {
    notes = notes.filter((n) => n.id !== id);
  }

  function handleUpdate(updated: Note) {
    notes = notes.map((n) => (n.id === updated.id ? updated : n));
  }
</script>

<main class="max-w-2xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Notes</h1>
  <NoteForm on:create={(e) => handleCreate(e.detail)} />
  <NoteList
    {notes}
    on:delete={(e) => handleDelete(e.detail)}
    on:update={(e) => handleUpdate(e.detail)}
  />
</main>
