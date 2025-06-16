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

<div class="bg-white p-4 rounded shadow">
    <h2 class="text-black font-semibold">{note.title}</h2>
    <p class="text-gray-700">{note.content}</p>
    <small class="text-gray-400">
        {new Date(note.createdAt).toLocaleString()}
    </small>
    <div class="mt-2 space-x-2">
        <button on:click={() => (editing = true)} class="text-blue-500">
            Edit
        </button>
        <button on:click={() => (confirming = true)} class="text-red-500">
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
