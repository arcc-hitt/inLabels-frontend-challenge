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
        await deleteNote(note.id);
        dispatch("delete", note.id);
        confirming = false;
    }

    async function save(updated: { title: string; content: string }) {
        const updatedNote = await updateNote(note.id, updated);
        dispatch("update", updatedNote);
        editing = false;
    }
</script>

<div class="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {note.title}
    </h2>
    <p class="text-gray-700 dark:text-gray-300">{note.content}</p>
    <small class="text-gray-500 dark:text-gray-400">
        {new Date(note.createdAt).toLocaleString()}
    </small>
    <div class="mt-2 space-x-2">
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
