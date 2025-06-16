<script lang="ts">
  import { onMount } from 'svelte';
  import NoteForm from './lib/NoteForm.svelte';
  import NoteList from './lib/NoteList.svelte';
  import type { Note } from './lib/api';
  import { fetchNotes, createNote, deleteNote, updateNote } from './lib/api';

  let notes: Note[] = [];
  let page = 1;
  const limit = 10;
  let sortBy: 'createdAt' | 'title' = 'createdAt';
  let order: 'asc' | 'desc' = 'desc';
  let search = '';

  // Load notes from the API
  async function loadNotes() {
    notes = await fetchNotes(page, limit, sortBy, order, search);
  }

  // Initial load
  onMount(loadNotes);

  // Reload whenever page, sortBy, order, or search changes
  $: if (page || sortBy || order || search) {
    loadNotes();
  }

  // Handlers for child component events
  function handleCreate(detail: { title: string; content: string }) {
    createNote(detail).then(() => {
      page = 1;
      loadNotes();
    });
  }

  function handleDelete(id: string) {
    deleteNote(id).then(loadNotes);
  }

  function handleUpdate(detail: Note) {
    updateNote(detail.id, { title: detail.title, content: detail.content }).then(loadNotes);
  }

  // Pagination controls
  function prevPage() {
    if (page > 1) page -= 1;
  }

  function nextPage() {
    if (notes.length === limit) page += 1;
  }
</script>

<main class="max-w-3xl mx-auto p-4 space-y-6">
  <h1 class="text-2xl font-bold">Notes</h1>

  <!-- Search & Sort Controls -->
  <div class="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
    <div class="flex-1">
      <label class="block mb-1">Search by Title</label>
      <input
        type="text"
        bind:value={search}
        placeholder="Search..."
        class="w-full p-2 border rounded"
      />
    </div>
    <div>
      <label class="block mb-1">Sort By</label>
      <select bind:value={sortBy} class="p-2 border rounded">
        <option value="createdAt">Created At</option>
        <option value="title">Title</option>
      </select>
    </div>
    <div>
      <label class="block mb-1">Order</label>
      <select bind:value={order} class="p-2 border rounded">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  </div>

  <!-- New Note Form -->
  <NoteForm on:create={(e) => handleCreate(e.detail)} />

  <!-- Notes List -->
  <NoteList
    {notes}
    on:delete={(e) => handleDelete(e.detail)}
    on:update={(e) => handleUpdate(e.detail)}
  />

  <!-- Pagination -->
  <div class="flex justify-between items-center">
    <button
      on:click={prevPage}
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      disabled={page === 1}
    >
      Previous
    </button>
    <span>Page {page}</span>
    <button
      on:click={nextPage}
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      disabled={notes.length < limit}
    >
      Next
    </button>
  </div>
</main>