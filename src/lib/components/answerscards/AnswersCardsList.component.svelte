<script lang="ts">
    //expose a property called items 

    import { type AnswersCardInterface } from "$lib/models";

    import AnswersCard from "./children/AnswersCard.component.svelte";

    export let answerscards : AnswersCardInterface[] = [];

</script>

<div class="answerscards">
    {#each answerscards as answerscard}
        <AnswersCard answerscard={answerscard} />
    {/each}
</div>

<style>
    .answerscards {
        display: flex;
        flex-direction: column;
    }
</style>