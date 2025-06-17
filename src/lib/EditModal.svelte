<script lang="ts">
  import { createEventDispatcher } from 'svelte';
    import type { Note } from './api';

  export let note: Note;
  const dispatch = createEventDispatcher<{ save: { title: string; content: string }; cancel: void }>();

  let title = note.title;
  let content = note.content;
  let touched = { title: false, content: false };
  let errors: { title?: string; content?: string } = {};

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
    dispatch('save', { title: title.trim(), content: content.trim() });
  }

  function cancel() {
    dispatch('cancel');
  }
</script>

<div class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md space-y-4">
    <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Note</h3>
    
    <div>
      <input
        type="text"
        bind:value={title}
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
        rows="4"
        bind:value={content}
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

    <div class="flex justify-end space-x-2">
      <button
        on:click={cancel}
        class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        Cancel
      </button>
      <button
        on:click={submit}
        class="px-4 py-2 rounded text-white
               {validate() 
                 ? 'bg-green-600 hover:bg-green-700' 
                 : 'bg-green-300 cursor-not-allowed'}"
        disabled={!validate()}
      >
        Save
      </button>
    </div>
  </div>
</div>
