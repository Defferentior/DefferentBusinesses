<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    export let data
    

</script>

<main>
    <h1>{data.Businesses.name}</h1>
</main>