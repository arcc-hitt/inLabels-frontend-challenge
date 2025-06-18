<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    confirm: void;
    cancel: void;
  }>();
</script>

<div class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-sm space-y-4">
    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Confirm Delete</h3>
    <p class="text-gray-700 dark:text-gray-300">Are you sure you want to delete this note?</p>
    <div class="flex justify-end space-x-2">
      <button on:click={() => dispatch('cancel')} class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        Cancel
      </button>
      <button on:click={() => dispatch('confirm')} class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white">
        Delete
      </button>
    </div>
  </div>
</div>
