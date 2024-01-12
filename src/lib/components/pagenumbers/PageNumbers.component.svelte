<script lang="ts">
	//import BusinessCard from "../businesscards/children/BusinessCard.component.svelte";
  import { PageStore } from "$lib/stores/Page.Store";

    export let showInput: number | null = null;
    export let inputPageNumber = '';
    let page: number = 1;
    let maxPage: number = 1;
    let pages: number[] = [1];

    $: {
      page = $PageStore.page;
      maxPage = $PageStore.maxPage;
      pages = $PageStore.pages;
    }


    function goToPage(pageNumber: number) {
      PageStore.update(state => ({ ...state, page: pageNumber }));
    }

    function goToInputPageNumber() {
        const pageNumber = parseInt(inputPageNumber);
        if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber <= maxPage) {
            goToPage(pageNumber);
        }
        showInput = null;
    }

    function handleKeyPress(event: { key: string; }) {
        if (event.key === 'Enter') {
            goToInputPageNumber();
        }
    }
</script>


<div class="PageNumbers">
    {#each pages as pageNumber (pageNumber)}
      {#if pageNumber != page && (pageNumber === 1 || pageNumber === maxPage || (pageNumber >= page - 2 && pageNumber <= page + 2 && pageNumber <= maxPage))}
        <button on:click={() => goToPage(pageNumber)}>{pageNumber}</button>
      {:else if pageNumber === page }
        <button class="current-page" on:click={() => goToPage(pageNumber)}>{pageNumber}</button>
      {:else if (pageNumber === page - 3 || pageNumber === page + 3 && pageNumber <= maxPage)}
        {#if showInput === pageNumber}
            <input class="GoTo" type="number" bind:value={inputPageNumber} on:blur={goToInputPageNumber} on:keydown={handleKeyPress} />
        {:else}
          <button on:click={() => {showInput = pageNumber;}} on:keydown={(event) => {if (event.key === 'Enter') {showInput = pageNumber;}}} style="cursor:pointer;">...</button>
        {/if}
      {/if}
    {/each}
</div>


<style>

.PageNumbers {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.PageNumbers button {
padding: 5px;
border: none;
background-color: transparent;
text-decoration: underline;
cursor: pointer;
}

.PageNumbers button:hover {
  color: #0056b3;
}

.PageNumbers button.current-page {
text-decoration: none;
font-weight: bold;
font-size: 1.2em;
}


.GoTo {
width: 3em; /* Adjust as needed */
text-align: center;
}

@media (prefers-color-scheme: dark) {
  .PageNumbers button {
      color: #c5b358;
    }
}

@media (prefers-color-scheme: light) {
  .PageNumbers button {
    color: #757340;
    }
  }

</style>
