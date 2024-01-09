<script lang="ts">
    //expose a property called items 

    import { type BusinessCardInterface } from "$lib/models";

    import BusinessCard from "./children/BusinessCard.component.svelte";

    export let businesscards : BusinessCardInterface[] = [];

    $: sortedBusinesscards = [...businesscards].sort((a, b) => {
        if (a.image === null) return 1;
        if (b.image === null) return -1;
        return a.image.localeCompare(b.image);
    });


</script>

<div class="businesscards">
    {#each sortedBusinesscards as businesscard}
        <BusinessCard businesscard={businesscard} />
    {/each}
</div>

<style>
    .businesscards {
        display: flex;
        flex-direction: column;
        margin-top: .5em;
    }
</style>