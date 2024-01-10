<script lang="ts">
    export let data;

    import BusinessCardsList from "$lib/components/businesscards/BusinessCardsList.component.svelte";
    import defferentiator from '$lib/images/defferentiator-circular-logo-25.png'

    let searchTerm = '';
    let filterLinkedin = false;
    let filterImage = false;
    let page = 1;
    const pageSize = 20;

  $: sortedBusinesses = [...data.Businesses].sort((a, b) => {
    if (a.image === null) return 1;
    if (b.image === null) return -1;
    return a.image.localeCompare(b.image);
  });

    $: filteredBusinesses = sortedBusinesses.filter(business => 
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        && (!filterLinkedin || business.linkedin !== null)
        && (!filterImage || business.image !== null)
    );

    $: maxPage = Math.ceil(filteredBusinesses.length / pageSize);

    $: if (page > maxPage && maxPage > 0) page = maxPage;

    $: paginatedBusinesses = filteredBusinesses.slice((page - 1) * pageSize, (page) * pageSize);

    $: pages = Array.from({length: maxPage + 1}, (_, i) => i + 1);

    function goToPage(pageNumber: number) {
        page = pageNumber;
    }

    let showInput: number | null = null;
    let inputPageNumber = '';

    function goToInputPageNumber() {
        const pageNumber = parseInt(inputPageNumber);
        if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber <= maxPage) {
            page = pageNumber;
        }
        showInput = null;
    }

    function handleKeyPress(event: { key: string; }) {
        if (event.key === 'Enter') {
            goToInputPageNumber();
        }
    }

</script>

<title>{'Defferent Businesses'}</title>
<body id="root">
    <div class="Titlelist">
    <h1>Businesses</h1> <img src={defferentiator} alt={"logo"} class={["logo"].join(' ')} />
    </div> 
    <h3>Only Include Businesses With:  </h3>
    <div>
      <input name="linkedincheckbox" type="checkbox" bind:checked={filterLinkedin} /> LinkedIn
      <input name="imagecheckbox" type="checkbox" bind:checked={filterImage} /> Picture |
    <input name="namesearch" type="text" bind:value={searchTerm} placeholder="Search..." /> Name
  </div>

  <a href="/secret/stash" class="secret-link">Secrets Stash</a>
  
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

  <BusinessCardsList businesscards={paginatedBusinesses} />

  <div class="PageNumbers">
    {#each pages as pageNumber (pageNumber)}
      {#if pageNumber <= maxPage}
        {#if pageNumber != page && (pageNumber === 1 || pageNumber === maxPage || (pageNumber >= page - 2 && pageNumber <= page + 2))}
          <button on:click={() => goToPage(pageNumber)}>{pageNumber}</button>
        {:else if pageNumber === page }
          <button class="current-page" on:click={() => goToPage(pageNumber)}>{pageNumber}</button>
        {:else if (pageNumber === page - 3 || pageNumber === page + 3)}
          {#if showInput === pageNumber}
              <input class="GoTo" type="number" bind:value={inputPageNumber} on:blur={goToInputPageNumber} on:keydown={handleKeyPress} />
          {:else}
            <button on:click={() => {showInput = pageNumber;}} on:keydown={(event) => {if (event.key === 'Enter') {showInput = pageNumber;}}} style="cursor:pointer;">...</button>
          {/if}
        {/if}
      {/if}
    {/each}
  </div>



  <div class="contactbar">
    <address> <a href="mailto:timemctigue@gmail.com">E-Mail</a></address>
    <address> <a href="https://www.linkedin.com/in/timothy-mctigue-30507429a/">Linkedin</a></address>
  </div>
</body>

<style>

  #root {
    max-width: 850px;
    margin: auto auto;
    --side-margin: 1rem;
    text-align: center;
  }

  .Titlelist {
    display: flex;
    flex-wrap: flex-start;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }


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

  .GoToPage {
      display: flex;
      gap: 5px;
  }

  .GoTo {
    width: 3em; /* Adjust as needed */
    text-align: center;
  }

  .contactbar{
    display: flex;
    flex-wrap: flex-start;
    justify-content: center;
    margin: 0 2em;
    list-style: none;
    margin-bottom: .5em;
  }

  .contactbar address {
      margin: 0 .25em;
  }

  .logo {
    max-height: 3em;
    max-width: 3em;
    padding-top: 1em;
    padding-left: 1em;
    padding-right: 1em;
    position: center;
  }
  .secret-link {
    position: fixed;
    right: 10px;
    top: 30%;
    font-size: 12px;
    opacity: 0;
  }


  @media (prefers-color-scheme: dark) {
    :root {
      --image-background: #4f7565; /* Dark mode image background */
      --link-hover-background: #50655e; /* Darker green background on hover */
      --link-hover-color: #e0d068; /* Lighter gold color on hover */
    }

    body {
      background: #2e433a; /* Muted dark green background */
      color: #c5b358; /* Softer gold text */
    }

    .PageNumbers button {
      color: #c5b358;
    }

    address a {
      color: #757340;
    }

  }

@media (prefers-color-scheme: light) {
  :root {
    --image-background: #e6e8d4; /* Slightly darker image background to contrast white logos */
    --link-hover-background: #c5b86c; /* Richer gold background on hover */
    --link-hover-color: #4e4e36; /* Darker text color on hover */
  }

  body {
    background: #d6e8d4; /* Less pastel, more subdued green background */
    color: #757340; /* Darker gold text for better readability */
  }

  .PageNumbers button {
    color: #757340;
    }

  address a {
    color: #757340;
  }
  

}


</style>