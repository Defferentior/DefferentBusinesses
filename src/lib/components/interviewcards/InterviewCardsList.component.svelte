<script lang="ts">
    //expose a property called items 

    import { type InterviewCardInterface } from "$lib/models";

    import InterviewCard from "./children/InterviewCard.component.svelte";

    export let interviewcards : InterviewCardInterface[] = [];

</script>

<div class="interviewcards">
    {#each interviewcards as interviewcard}
        <InterviewCard interviewcard={interviewcard} />
    {/each}
</div>

<style>
    .interviewcards {
        display: flex;
        flex-direction: column;
    }
</style>