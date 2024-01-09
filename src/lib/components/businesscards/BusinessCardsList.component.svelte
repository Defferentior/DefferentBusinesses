<script lang="ts">
    //expose a property called items 

    import { type BusinessCardInterface } from "$lib/models";

    import BusinessCard from "./children/BusinessCard.component.svelte";

    export let businesscards : BusinessCardInterface[] = [];

</script>

<div class="businesscards">
    {#each businesscards as businesscard}
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