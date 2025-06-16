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

<div class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md space-y-4">
    <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Note</h3>
    <input
      type="text"
      bind:value={title}
      class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    />
    <textarea
      bind:value={content}
      rows="4"
      class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    ></textarea>
    <div class="flex justify-end space-x-2">
      <button on:click={() => dispatch('cancel')} class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        Cancel
      </button>
      <button on:click={save} class="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white">
        Save
      </button>
    </div>
  </div>
</div>
