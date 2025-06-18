<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import NoteItem from "./NoteItem.svelte";
  import type { Note } from "./api";

  export let notes: Note[] = [];

  const dispatch = createEventDispatcher<{
    delete: string;
    update: Note;
  }>();

  function handleDelete(id: string) {
    dispatch("delete", id);
  }

  function handleUpdate(note: Note) {
    dispatch("update", note);
  }
</script>

{#if notes.length === 0}
  <p class="text-center text-gray-500 dark:text-gray-400 mt-6">
    No notes available.
  </p>
{:else}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each notes as note (note.id)}
      <NoteItem
        {note}
        on:delete={(e) => handleDelete(e.detail)}
        on:update={(e) => handleUpdate(e.detail)}
      />
    {/each}
  </div>
{/if}
