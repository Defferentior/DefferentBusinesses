<script lang="ts">
    export let data;

    import BusinessCardsList from "$lib/components/businesscards/BusinessCardsList.component.svelte";
    import defferentiator from '$lib/images/defferentiator-circular-logo-25.png'
</script>

<body id="root">
    <div class="Titlelist">
    <h1>Businesses</h1> <img src={defferentiator} alt={"logo"} class={["logo"].join(' ')} />
    </div>
    <BusinessCardsList businesscards={data.Businesses} />
</body>

<style>

#root {
  max-width: 850px;
  margin: auto auto;
  padding: .5rem;
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

.logo {
  max-width: 3em;
  padding: 1em;
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

}


</style>