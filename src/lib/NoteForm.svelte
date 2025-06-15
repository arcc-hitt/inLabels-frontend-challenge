<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    create: { title: string; content: string };
  }>();

  let title = '';
  let content = '';

  function submit() {
    dispatch('create', { title, content });
    title = '';
    content = '';
  }
</script>

<form on:submit|preventDefault={submit} class="mb-6">
  <input
    bind:value={title}
    placeholder="Title"
    required
    class="w-full p-2 border rounded mb-2"
  />
  <textarea
    bind:value={content}
    placeholder="Content"
    required
    class="w-full p-2 border rounded mb-2"
  ></textarea>
  <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
    Add Note
  </button>
</form>
