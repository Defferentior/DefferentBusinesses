<script lang="ts">
    /*
    * Comments for the Future:
    * This is the page that displays all of the businesses in the database.
    * In order to get the Map to work, I had to use the svelte-maplibre package.
    * The Marker and popup code were taken explicitly from https://github.com/dimfeld/svelte-maplibre/ as of 2024-19-01
    * The Zindex shenanagins are to make sure that the markers are displayed in the correct order even when updated.
    */
    export let data;

    import BusinessCardsList from "$lib/components/businesscards/BusinessCardsList.component.svelte";
    import defferentiator from '$lib/images/defferentiator-circular-logo-25.png'

    import PageNumbers from "$lib/components/pagenumbers/PageNumbers.component.svelte";
    import type { BusinessCardInterface } from "$lib/models/index.js";
    import { PageStore } from "$lib/stores/Page.Store";
    import { MapLibre } from 'svelte-maplibre';
    //import DefaultMarker from "$lib/components/mapcomponents/DefaultMarker.svelte";
    import Marker from "$lib/components/mapcomponents/Marker.svelte";
    import Popup from "$lib/components/mapcomponents/Popup.svelte"; 

    let searchTerm = '';
    let filterLinkedin = false;
    let filterImage = false;
    let filterLocation = false;
    let filterTableau = false;
    let page: number = 1;
    let maxPage: number = 1;
    let pages: number[] = [1];
    let markers: { lngLat: [number, number]; label: string; name: string }[] = [];

    $: {
      page = $PageStore.page;
      maxPage = $PageStore.maxPage;
      pages = $PageStore.pages;
    }

    const pageSize = 20;

    let filteredBusinesses: BusinessCardInterface[] = [];
    let sortedBusinesses: BusinessCardInterface[] = [];
    let paginatedBusinesses: BusinessCardInterface[] = [];

$: sortedBusinesses = data.Businesses ? [...data.Businesses].sort((a, b) => {
    if (a.image === null) return 1;
    if (b.image === null) return -1;
    return a.image.localeCompare(b.image);
  }).sort((a, b) => {
    if (a.priority === null) return -1;
    if (b.priority === null) return 1;
    return b.priority - a.priority;
  }) : [];

  $: filteredBusinesses = sortedBusinesses.filter(business => 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      && (!filterLinkedin || business.linkedin !== null)
      && (!filterImage || business.image !== null)
      && (!filterLocation || (business.longitude !== null && business.latitude !== null))
      && (!filterTableau || business.tableau !== null)
  );

  $: if (maxPage === 0){
    PageStore.update(state => ({ ...state, page: 1 }));
    PageStore.update(state => ({ ...state, pages: [1] }));
  }
  
  $: {
    const newMaxPage = Math.ceil(filteredBusinesses.length / pageSize);
    const newPages = Array.from({length: newMaxPage}, (_, i) => i + 1);

    if (newMaxPage !== maxPage) {
      maxPage = newMaxPage;
      PageStore.update(state => ({ ...state, maxPage }));
    }

    if (newPages.toString() !== pages.toString()) {
      pages = newPages;
      PageStore.update(state => ({ ...state, pages }));
    }

    if (page > maxPage && maxPage > 0) {
      page = maxPage;
      PageStore.update(state => ({ ...state, page }));
    }
  }

  $: {

    paginatedBusinesses = filteredBusinesses.slice((page - 1) * pageSize, (page) * pageSize);

    markers = filteredBusinesses
    .filter(business => business.longitude && business.latitude)
    .map(business => {
      return {
        lngLat: [business.longitude as number, business.latitude as number],
        label: business.name,
        name: business.name,
        //address: business.address as string
      }
    })
  }

</script>


<title>{'Defferent Businesses'}</title>

<nav>
  <a href="/answers" >Answers</a>
  <a href="/" >Businesses</a>
</nav>

<body id="root">
  <div class="Titlelist">
    <h1>Businesses</h1> <img src={defferentiator} alt={"logo"} class={["logo"].join(' ')} />
  </div> 

  <MapLibre
  center={[-118.15,34]}
    zoom={7.25}
    class="map"
    standardControls
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  >
  {#each markers as { lngLat, label, name }, i (label)}
    <Marker
      {lngLat}
      zIndex={ (markers.length - i)*3/markers.length}
    >
      <span>
        {label.substring(0,4)}
      </span>

      <Popup openOn="click" offset={[0, -10]}>
        <div class="text-lg font-bold">{name}</div>
      </Popup>
    </Marker>
  {/each}
  </MapLibre>

  <h3>Only Include Businesses With:  </h3>

  <div>
    <div>
      <b>
      <input name="tableaucheckbox" type="checkbox" bind:checked={filterTableau} /> Defferentiator Tableau Projects
    </b>
    </div>
    <input name="linkedincheckbox" type="checkbox" bind:checked={filterLinkedin} /> LinkedIn
    <input name="imagecheckbox" type="checkbox" bind:checked={filterImage} /> Picture |
    <input name="locationcheckbox" type="checkbox" bind:checked={filterLocation} /> Location
    <div>
      <input name="namesearch" type="text" bind:value={searchTerm} placeholder="Search..." /> Name
    </div>
  </div>



  <a href="/secret/stash" class="secret-link">Secrets Stash</a>

  <PageNumbers />
    <BusinessCardsList businesscards={paginatedBusinesses} />
  <PageNumbers />

  <div class="contactbar">
    <address> <a href="mailto:timemctigue@gmail.com">E-Mail</a></address>
    <address> <a href="https://www.linkedin.com/in/timothy-mctigue-30507429a/">Linkedin</a></address>
  </div>
  <div>
    <p>
      Please, if you have an oppurtunity to hire me, I would be very grateful.
    </p>
    <p>
      I am extremely unemployed and so can't find a job or someone to hire me despite my resume, however I work consistently, I work hard, I'm a self starter, I find insights and I love data.</p>
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
    top: 95%;
    font-size: 12px;
    opacity: 0;
  }

  nav {
    width: 100%; /* Take up the full width of the page */
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.15); /* Add a shadow */
    position: sticky; /* Make the nav stick to the top of the page */
    height: 1.5em; /* Specify the height of the nav */
    top: 0; /* Stick to the top */
    z-index: 100; /* Ensure the nav is above other elements */
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

    address a {
      color: #757340;
    }

    nav {
      background: #2e433a; /* Add a background color */
    }

    nav a {
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

  address a {
    color: #757340;
  }

  nav {
    background: #d6e8d4; /* Add a background color */
  }

  nav a {
    color: #757340;
  }
  

}

:global(.map) {
    height: 400px;
  }

  .leaflet-control {
  z-index: 1000;
}

.map {
  z-index: 1000;
}

</style>