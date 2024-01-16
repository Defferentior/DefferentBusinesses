<script lang="ts">
    //expose a property called items 

    import { type BusinessCardInterface } from "$lib/models";

    import BusinessCard from "./children/BusinessCard.component.svelte";

    export let businesscards : BusinessCardInterface[] = [];

</script>

<div class="businesscards">
    {#each businesscards as businesscard (businesscard.id)}
        <BusinessCard {businesscard} />
    {/each}
</div>

<style>
    .businesscards {
        display: flex;
        flex-direction: column;
    }
</style>