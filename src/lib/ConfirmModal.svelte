<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    confirm: void;
    cancel: void;
  }>();
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div class="bg-white p-6 rounded shadow w-full max-w-sm">
    <h3 class="text-lg font-bold mb-4">Confirm Delete</h3>
    <p class="mb-6">Are you sure you want to delete this note?</p>
    <div class="flex justify-end space-x-2">
      <button on:click={() => dispatch('cancel')} class="px-4 py-2">
        Cancel
      </button>
      <button
        on:click={() => dispatch('confirm')}
        class="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete
      </button>
    </div>
  </div>
</div>
