<script lang="ts">
  import { onMount } from 'svelte';
  import NoteForm from './lib/NoteForm.svelte';
  import NoteList from './lib/NoteList.svelte';
  import type { Note } from './lib/api';
  import { fetchNotes, createNote, deleteNote, updateNote } from './lib/api';
    import { theme, type Theme } from './lib/theme';

  function nextTheme() {
    theme.update((t) =>
      t === 'system' ? 'dark' : t === 'dark' ? 'light' : 'system'
    );
  }

  const labels: Record<Theme, string> = {
    system: 'System',
    dark: 'Dark',
    light: 'Light'
  };

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
    updateNote(detail.id, {
      title: detail.title,
      content: detail.content,
    }).then(loadNotes);
  }

  // Pagination controls
  function prevPage() {
    if (page > 1) page -= 1;
  }

  function nextPage() {
    if (notes.length === limit) page += 1;
  }
</script>

<main class="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">Notes</h1>

  <div class="flex justify-end mb-4">
    <button
      on:click={nextTheme}
      class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      Theme: {labels[$theme]}
    </button>
  </div>

  <!-- New Note Form -->
  <NoteForm on:create={(e) => handleCreate(e.detail)} />

  <!-- Search & Sort Controls -->
  <div class="space-y-4 md:flex md:items-end md:space-x-4 md:space-y-0">
    <div class="flex-1">
      <label for="searchInput" class="block mb-1 text-gray-700 dark:text-gray-300">
        Search by Title
      </label>
      <input
        id="searchInput"
        type="text"
        bind:value={search}
        placeholder="Search..."
        class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      />
    </div>

    <div class="flex flex-row space-x-4 justify-between">
      <div>
        <label for="sortBySelect" class="block mb-1 text-gray-700 dark:text-gray-300">
          Sort By
        </label>
        <select
          id="sortBySelect"
          bind:value={sortBy}
          class="p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div>
        <label for="orderSelect" class="block mb-1 text-gray-700 dark:text-gray-300">
          Order
        </label>
        <select
          id="orderSelect"
          bind:value={order}
          class="p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  </div>

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
      class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
      disabled={page === 1}
    >
      Previous
    </button>
    <span class="text-gray-900 dark:text-gray-100">Page {page} of {Math.ceil(notes.length / limit)}</span>
    <button
      on:click={nextPage}
      class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
      disabled={notes.length < limit}
    >
      Next
    </button>
  </div>
</main>
