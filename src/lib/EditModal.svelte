<script lang="ts">
  import { createEventDispatcher } from 'svelte';
    import type { Note } from './api';

  export let note: Note;
  const dispatch = createEventDispatcher<{
    save: { title: string; content: string };
    cancel: void;
  }>();

  let title = note.title;
  let content = note.content;

  function save() {
    dispatch('save', { title, content });
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div class="p-6 rounded shadow w-full max-w-md">
    <h3 class="font-bold mb-4">Edit Note</h3>
    <input bind:value={title} class="w-full p-2 border rounded mb-2" />
    <textarea bind:value={content} class="w-full p-2 border rounded mb-4"></textarea>
    <div class="flex justify-end space-x-2">
      <button on:click={() => dispatch('cancel')} class="px-4 py-2">
        Cancel
      </button>
      <button on:click={save} class="px-4 py-2 bg-green-600 text-white rounded">
        Save
      </button>
    </div>
  </div>
</div>
