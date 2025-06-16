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
  class="bg-gray-500 p-4 rounded shadow space-y-3"
>
  <input
    type="text"
    bind:value={title}
    placeholder="Title"
    class="w-full p-2 border rounded"
    required
  />
  <textarea
    bind:value={content}
    placeholder="Content"
    class="w-full p-2 border rounded"
    rows="4"
    required
  ></textarea>
  <button
    type="submit"
    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Add Note
  </button>
</form>
