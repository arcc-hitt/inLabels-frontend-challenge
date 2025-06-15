<script lang="ts">
  import { createEventDispatcher } from 'svelte';
    import NoteItem from './NoteItem.svelte';
    import type { Note } from './api';

  export let notes: Note[] = [];
  const dispatch = createEventDispatcher<{
    delete: number;
    update: Note;
  }>();
</script>

<div class="space-y-4">
  {#each notes as note (note.id)}
    <NoteItem
      {note}
      on:delete={(e) => dispatch('delete', e.detail)}
      on:update={(e) => dispatch('update', e.detail)}
    />
  {/each}
  {#if notes.length === 0}
    <p class="text-gray-500">No notes found.</p>
  {/if}
</div>
