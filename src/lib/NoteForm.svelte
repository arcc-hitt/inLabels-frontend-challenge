<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let title = '';
  let content = '';
  const dispatch = createEventDispatcher<{
    create: { title: string; content: string };
  }>();

  function submit() {
    if (!title.trim() || !content.trim()) return;
    dispatch('create', { title, content });
    title = '';
    content = '';
  }
</script>

<form
  on:submit|preventDefault={submit}
  class="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-3"
>
  <input
    type="text"
    bind:value={title}
    placeholder="Title"
    class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    required
  />
  <textarea
    bind:value={content}
    placeholder="Content"
    rows="4"
    class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    required
  ></textarea>
  <button
    type="submit"
    class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
  >
    Add Note
  </button>
</form>
