<script lang="ts">
  import { createEventDispatcher } from 'svelte';
    import NoteItem from './NoteItem.svelte';
    import type { Note } from './api';

  export let notes: Note[] = [];

  const dispatch = createEventDispatcher<{
    delete: string;
    update: Note;
  }>();

  function handleDelete(id: string) {
    dispatch('delete', id);
  }

  function handleUpdate(note: Note) {
    dispatch('update', note);
  }
</script>

<div class="space-y-4">
  {#each notes as note (note.id)}
    <NoteItem
      {note}
      on:delete={(e) => handleDelete(e.detail)}
      on:update={(e) => handleUpdate(e.detail)}
    />
  {/each}
  {#if notes.length === 0}
    <p class="text-center text-gray-500">No notes found.</p>
  {/if}
</div>
