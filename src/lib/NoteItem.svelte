<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { deleteNote, updateNote, type Note } from "./api";
    import EditModal from "./EditModal.svelte";
    import ConfirmModal from "./ConfirmModal.svelte";

    export let note: Note;
    const dispatch = createEventDispatcher<{
        delete: string;
        update: Note;
    }>();

    let editing = false;
    let confirming = false;

    async function remove() {
        dispatch("delete", note.id);
        confirming = false;
    }

    async function save(updated: { title: string; content: string }) {
        dispatch("update", { ...note, ...updated });
        editing = false;
    }
</script>

<div class="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2 flex flex-col justify-between h-full">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {note.title}
    </h2>
    <p class="text-gray-700 dark:text-gray-300">{note.content}</p>
    <div class="flex flex-col text-sm text-gray-500 dark:text-gray-400">
    <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
    {#if note.updatedAt}
      <span class="text-xs text-gray-600 dark:text-gray-500">
        Edited: {new Date(note.updatedAt).toLocaleString()}
      </span>
    {/if}
  </div>
    <div class="mt-2 flex space-x-2 text-sm">
        <button
            on:click={() => (editing = true)}
            class="text-blue-600 hover:text-blue-800"
        >
            Edit
        </button>
        <button
            on:click={() => (confirming = true)}
            class="text-red-600 hover:text-red-800"
        >
            Delete
        </button>
    </div>

    {#if editing}
        <EditModal
            {note}
            on:save={(e) => save(e.detail)}
            on:cancel={() => (editing = false)}
        />
    {/if}

    {#if confirming}
        <ConfirmModal
            on:confirm={remove}
            on:cancel={() => (confirming = false)}
        />
    {/if}
</div>
