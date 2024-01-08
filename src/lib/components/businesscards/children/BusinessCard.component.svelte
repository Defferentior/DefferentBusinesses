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

<style>

.businesscard {
  display: grid; /* Enable Grid */
  flex-grow: 1;
  box-sizing: border-box;
  grid-template-areas:"image header header header"
                      "image tags tags tags"
                      "image links links links";
  grid-template-columns: min(20%,200px) 1fr auto;
  grid-template-rows: auto auto;
  margin: 1em;
  padding: .5rem;
  min-height: 150px;
  min-height: 200px;
  max-height: 250px;
  max-width: 800px;
  position: relative;
  text-align: left;
  border-radius: 1em;
}

.businesscard-header {
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  font-weight: 600;
  grid-area: header;
  line-height: 1.4em;
  min-width: 0;
  position: relative
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
}

.businesscard-links {
  display: flex;
  grid-area: links;
  
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

  .businesscard-header:hover,
  .businesscard-header:focus {
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
    color: #c9b037; /* Paler gold links */
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

@media only screen and (max-width: 410px) {
  .linkinshow {
      display: none;
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

</style>