<script lang="ts"> 

    import { type BusinessCardInterface } from "$lib/models";

    export let businesscard : BusinessCardInterface = {
        id: '0',
        name: '',
        url: null,
        image: null,
        similarweb: '',
        builtwith: '',
        linkedin: '',
        dunandbradsheet: '',
        /*wappalyzer: '',
        crunchbase: '',
        g2: '',
        trustpilot: '',
        yellowpages: '',
        wikipedia: '',
        yelp: '',
        appstore: '',
        googleplay: ''*/
    };

</script>

<div class="businesscard">
    <div class="businesscard-header">
      <h2>
        <a class="businesscard-head-link" href={businesscard.url}>
          {businesscard.name}
        </a>
      </h2>
    </div>
    <div class="businesscard-links">
        <a class="businesscard-link" href={businesscard.url || undefined}>Website</a>
        <a class="businesscard-link" href={businesscard.similarweb}>SimilarWeb</a>
        <a class="businesscard-link" href={businesscard.builtwith}>BuiltWith</a>
        {#if businesscard.linkedin}
            <a class={["businesscard-link","linkinshow"].join(' ')} href={businesscard.linkedin}>LinkedIn</a>
        {/if}
        {#if businesscard.dunandbradsheet}
            <a class={["businesscard-link","dnbshow"].join(' ')} href={businesscard.dunandbradsheet}>Dun & Bradstreet</a>
        {/if}
    </div>
    <img src={businesscard.image} alt={businesscard.name} class={["businesscard-image","imgshow"].join(' ')} />
</div>

