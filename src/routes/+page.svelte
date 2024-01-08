<script lang="ts">
    export let data;

    import BusinessCardsList from "$lib/components/businesscards/BusinessCardsList.component.svelte";
</script>

<h1>Defferent Businesses</h1>

<BusinessCardsList businesscards={data.Businesses} />
