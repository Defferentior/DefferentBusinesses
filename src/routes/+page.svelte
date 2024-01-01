<script lang="ts">
    export let data;
</script>

<h1>Defferent Businesses</h1>

{#each data.Businesses as { name }}
    <h2>{name}</h2>
{/each}