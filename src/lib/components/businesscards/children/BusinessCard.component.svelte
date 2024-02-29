<script lang="ts"> 

    import { type BusinessCardInterface } from "$lib/models";
    import { onMount } from 'svelte';
    import path1 from '$lib/images/path1.svg';

    let replacementImage = path1;
    let screenWidth: number;

    export let businesscard : BusinessCardInterface = {
        id: '0',
        name: '',
        url: null,
        image: null,
        similarweb: '',
        builtwith: '',
        linkedin: '',
        dunandbradsheet: '',
        craft: '',
        wikipedia: '',
        longitude: 0,
        latitude: 0,
        address: '',
        glassdoor: '',
        crunchbase: '',
        cbinsights: '',
        wappalyzer: '',
        biz_int: '',
        category: ''

    };

    onMount(() => {
      screenWidth = window.innerWidth;
      window.addEventListener('resize', () => {
        screenWidth = window.innerWidth;
      });
    });

    let links: any[] = [  ]


  $: {
    links = screenWidth > 900 ? [
      { name: 'Website', url: businesscard.url || undefined },
      { name: 'SimilarWeb', url: businesscard.similarweb },
      { name: 'LinkedIn', url: businesscard.linkedin },
      { name: 'BuiltWith', url: businesscard.builtwith },
      { name: 'Glassdoor', url: businesscard.glassdoor },
      { name: 'CB Insights', url: businesscard.cbinsights },
      { name: 'Crunchbase', url: businesscard.crunchbase },
      { name: 'Wappalyzer', url: businesscard.wappalyzer },
      { name: 'Craft.co', url: businesscard.craft},
      { name: 'Wikipedia', url: businesscard.wikipedia},
      { name: 'Dun & Bradstreet', url: businesscard.dunandbradsheet },
    ] : [
      { name: 'Website', url: businesscard.url || undefined },
      { name: 'LinkedIn', url: businesscard.linkedin },
      { name: 'BuiltWith', url: businesscard.builtwith },
      { name: 'Glassdoor', url: businesscard.glassdoor },
      { name: 'CB Insights', url: businesscard.cbinsights },
      { name: 'Crunchbase', url: businesscard.crunchbase },
      { name: 'Wappalyzer', url: businesscard.wappalyzer },
      { name: 'Craft.co', url: businesscard.craft},
      { name: 'Wikipedia', url: businesscard.wikipedia},
      { name: 'SimilarWeb', url: businesscard.similarweb },
      { name: 'Dun & Bradstreet', url: businesscard.dunandbradsheet },
    ];
    links = links.filter(link => link.url);
  }

</script>

<div class="businesscard">
    <div class="businesscard-header">
      <h2>
        <a class="businesscard-head-link" style="text-decoration: none;" href={businesscard.url}>
          {businesscard.name}
        </a>
      </h2>
    </div>

    <div class="business-card-tags">
      <span>
        {businesscard.category}
      </span>
    </div>

    <div class="businesscard-biz_ints">
      {#if businesscard.biz_int}
      <h4>
        <a class="businesscard-biz_int" href={businesscard.biz_int}>Business Intelligence</a>
      </h4>
      {/if}
    </div>

    <div class="businesscard-links">
      {#each links as link, i (link.name)}
        <a class="businesscard-link link-{i}" href={link.url}>{link.name}</a>
      {/each}
    </div>
    {#if !businesscard.image}
    <img src={replacementImage} alt={businesscard.name} class={["businesscard-image","imgshow"].join(' ')} />
    {/if}
    {#if businesscard.image}
    <img src={businesscard.image} alt={businesscard.name} class={["businesscard-image","imgshow"].join(' ')} />
    {/if}
</div>

<style>

.businesscard {
  display: grid; /* Enable Grid */
  flex-grow: 1;
  box-sizing: border-box;
  grid-template-areas:"image header header tags"
                      "image biz_int biz_int biz_int"
                      "image links links links";
  grid-template-columns: min(20%,200px) 1fr auto;
  grid-template-rows: auto auto;
  margin: .25rem;
  padding: .35rem;
  min-height: 150px;
  min-height: 200px;
  max-height: 250px;
  max-width: 850px;
  position: relative;
  text-align: left;
  border-radius: .25em;
}

.businesscard-header {
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  font-weight: 600;
  grid-area: header;
  line-height: 1.4em;
  min-width: 0;
  position: relative;
  height: 1.5em;
}

.businesscard-link {
  border-radius: .25rem;
  display: inline-block;
  font-size: .625rem;
  font-weight: 700;
  line-height: 1.5em;
  margin-bottom: auto;
  margin-top: auto;
  padding: 0 .375rem;
}

.businesscard-head-link {
  border-radius: .25rem;
  padding-bottom: 0;
}

.businesscard-links {
  display: flex;
  grid-area: links;
  
}

.businesscard-biz_ints {
  display: flex;
  grid-area: biz_int;
  font-size: 1.25em;
  margin-left: .5em;
}

.businesscard-image {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  width: 85%; /* Adjust width as needed */
  height: auto;
  grid-area: image;
  align-self: center;
  margin-right: 1em; /* Space between image and links */
  border-radius: 1em; /* Optional: Rounds the corners of the image */
  background: var(--image-background); /* Use a CSS variable for the background */
  padding: .4em; /* Adjust as needed, creates space around the image */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* Optional: Adds shadow for depth */
  object-fit: cover; /* Ensures the image covers the padding area */
}

.businesscard-image:hover {
  transform: scale(1.05); /* Slightly enlarges the image */
  opacity: 0.9; /* Slightly reduces opacity */
}

.card-content {
  text-align: left; /* Align text to the left */
  display: grid; /* Enable Grid for content */
}

@media (prefers-color-scheme: light) {
  :root {
    --image-background: #e6e8d4; /* Slightly darker image background to contrast white logos */
    --link-hover-background: #c5b86c; /* Richer gold background on hover */
    --link-hover-color: #4e4e36; /* Darker text color on hover */
  }

  .businesscard {
    background-color: #dce5be; /* Adjusted light green with more depth */
    color: #757340; /* Darker gold text for better contrast */
    box-shadow: 0 0 5px rgba(117, 115, 64, 0.5); /* Adjusted gold shadow for better definition */
  }

  .businesscard-image {
    background: var(--image-background); /* Uses the darker background variable */
    /* ... other styles ... */
  }

  .businesscard-header {
    color: #9c9a50; /* Less pastel, more pronounced gold */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .businesscard-head-link {
    color: #9c9a50; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .businesscard-head-link:hover,
  .businesscard-head-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }

  .businesscard-link {
    color: #9c9a50; /* Less pastel, more pronounced gold */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .businesscard-link:hover,
  .businesscard-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }

  .businesscard-biz_int {
    color: #9c9a50; /* Less pastel, more pronounced gold */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .businesscard-biz_int:hover,
  .businesscard-biz_int:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }
}

@media (prefers-color-scheme: dark) {

  .businesscard {
    background-color: #3d5a4c; /* Soft dark green background */
    color: #c5b358; /* Soft gold text */
    box-shadow: 0 0 5px rgba(197, 179, 88, 0.5); /* Softer gold shadow */
  }

  .businesscard-header {
    color: #c9b037; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .businesscard-head-link {
    color: #c9b037; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .businesscard-head-link:hover,
  .businesscard-head-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }

  .businesscard-link {
    color: #9c892c; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .businesscard-link:hover,
  .businesscard-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }
}

@media only screen and (max-width: 360px) {
  .businesscard {
    grid-template-areas:"header header header"
    "tags tags tags"
    "links links links";
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    text-align: center;
  }

}

@media only screen and (max-width: 300px) {
  .businesscard-link {
    border-radius: .25rem;
    display: inline-block;
    font-size: .55rem;
    font-weight: 700;
    line-height: 1.5em;
    margin-bottom: auto;
    margin-top: auto;
    padding: 0.25rem;
  }
  .businesscard-header {

    font-size: 1em;
    font-weight: 600;
    line-height: 1.4em;
  }
}

@media only screen and (max-width: 360px) {
  .imgshow {
      visibility: hidden;
  }
}

@media only screen and (max-width: 460px) {
  .dnbshow {
      visibility: hidden;
  }
}


@media only screen and (max-width: 700px) {
  .businesscard-image {
      width: 80%;
  }
}

@media only screen and (max-width: 700px) {
  .businesscard-image {
      width: 80%;
  }
}

@media only screen and (max-width: 500px) {
  .businesscard {
    padding: .25rem;
  }

  .businesscard-image {
      width: 75%;
  }
}

/* Hide all links by default */
.businesscard-link {
  display: none;
}

/* Show the first and second link on small screens and up */
@media (min-width: 100px) {
  .link-0,
  .link-1 {
    display: inline-block;
  }
}

/* Show the third and fourth link on slightly larger screens and up */
@media (min-width: 250px) {
  .link-2,
  .link-3 {
    display: inline-block;
  }
}

/* Show the fifth link on medium screens and up */
@media (min-width: 350px) {
  .link-4{
    display: inline-block;
  }
}

/* Show the sixth link on large screens and up */
@media (min-width: 450px) {
  .link-5 {
    display: inline-block;
  }
}

/* Show the seventh link on large screens and up */
@media (min-width: 500px) {
  .link-6 {
    display: inline-block;
  }
}

/* Show the eighth link on large screens and up */
@media (min-width: 560px) {
  .link-7 {
    display: inline-block;
  }
}

/* Show the ninth link on large screens and up */
@media (min-width: 630px) {
  .link-8 {
    display: inline-block;
  }
}

/* Show the tenth link on large screens and up */
@media (min-width: 700px) {
  .link-9 {
    display: inline-block;
  }
}

/* Show the eleventh link on large screens and up */
@media (min-width: 770px) {
  .link-10 {
    display: inline-block;
  }
}

</style>