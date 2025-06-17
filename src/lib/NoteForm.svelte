<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ create: { title: string; content: string } }>();

  let title = '';
  let content = '';
  
  // track touched fields
  let touched = { title: false, content: false };
  // store error messages
  let errors: { title?: string; content?: string } = {};

  // validation logic
  function validate() {
    const errs: typeof errors = {};
    if (!title.trim()) {
      errs.title = 'Title is required.';
    } else if (title.length > 100) {
      errs.title = 'Title must be under 100 characters.';
    }
    if (!content.trim()) {
      errs.content = 'Content is required.';
    } else if (content.length > 1000) {
      errs.content = 'Content must be under 1000 characters.';
    }
    errors = errs;
    return Object.keys(errs).length === 0;
  }

  function handleBlur(field: 'title' | 'content') {
    touched[field] = true;
    validate();
  }

  function submit() {
    touched = { title: true, content: true };
    if (!validate()) return;
    dispatch('create', { title: title.trim(), content: content.trim() });
    title = '';
    content = '';
    touched = { title: false, content: false };
    errors = {};
  }
</script>

<form on:submit|preventDefault={submit} class="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-3">
  <div>
    <input
      type="text"
      bind:value={title}
      placeholder="Title"
      on:blur={() => handleBlur('title')}
      class="w-full p-2 border rounded
             {errors.title && touched.title 
               ? 'border-red-500 focus:border-red-600' 
               : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'} 
             bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    />
    {#if errors.title && touched.title}
      <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
    {/if}
  </div>

  <div>
    <textarea
      bind:value={content}
      placeholder="Content"
      rows="4"
      on:blur={() => handleBlur('content')}
      class="w-full p-2 border rounded
             {errors.content && touched.content 
               ? 'border-red-500 focus:border-red-600' 
               : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'} 
             bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    ></textarea>
    {#if errors.content && touched.content}
      <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>
    {/if}
  </div>

  <button
    type="submit"
    class="px-4 py-2 rounded text-white
           {validate() 
             ? 'bg-blue-600 hover:bg-blue-700' 
             : 'bg-blue-300 cursor-not-allowed'}"
    disabled={!validate()}
  >
    Add Note
  </button>
</form>
