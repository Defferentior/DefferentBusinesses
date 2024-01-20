<script lang="ts"> 

    import { type AnswersCardInterface } from "$lib/models";
    import path1 from '$lib/images/path1.svg';
    import SvelteMarkdown from 'svelte-markdown';

    let replacementImage = path1;

    export let answerscard : AnswersCardInterface = {
        id: '0',
        name: '',
        url: null,
        image: null,
        answers: null
    };

  let showFullText = false;
  function toggleFullText() {
    showFullText = !showFullText;
  }

</script>

<div class="answerscard" class:expanded={showFullText}>
    <div class="answerscard-header">
      <h2>
        <a class="answerscard-head-link" style="text-decoration: none;" href={answerscard.url}>
          {answerscard.name}
        </a>
      </h2>
    </div>
    {#if showFullText}
    <div>
      <h2>Questions Asked of</h2>
     <SvelteMarkdown source={answerscard.answers} />
    </div>
    {:else}
    <div>
      <h2>Questions Asked of</h2>
    </div>
    {/if}
    <button id="moreButton" on:click={toggleFullText}>
      {showFullText ? 'Less' : 'More'}
    </button>
    <button id="wideButton" on:click={toggleFullText}>
      ...
    </button>
    {#if !answerscard.image}
    <img src={replacementImage} alt={answerscard.name} class={["answerscard-image","imgshow"].join(' ')} />
    {/if}
    {#if answerscard.image}
    <img src={answerscard.image} alt={answerscard.name} class={["answerscard-image","imgshow"].join(' ')} />
    {/if}
</div>

<style>

.answerscard {
  display: grid; /* Enable Grid */
  flex-grow: 1;
  box-sizing: border-box;
  grid-template-areas:"image header header header"
                      "image content content content"
                      "image content content content"
                      "wideButton wideButton wideButton wideButton";
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
  overflow: hidden;
}


#wideButton {
    display: flex;
    grid-area: wideButton;
    justify-content: center;
    width: 100%;
    align-items: center;
    border: none;
    height: 1.5rem;
    box-shadow: 0px -2px 5px 0px rgba(0,0,0,0.15);
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    border-radius: 2rem;
  }

.answerscard.expanded {
    max-height: none;
  }

  #moreButton {
    max-height: 2rem;
    position: absolute;
    top: 1rem;
    right: 0%;
    transform: translate(-50%, -50%);
  }

.answerscard-header {
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  font-weight: 600;
  grid-area: header;
  line-height: 1.4em;
  min-width: 0;
  position: relative
}

.answerscard-link {
  border-radius: .25rem;
  display: inline-block;
  font-size: .625rem;
  font-weight: 700;
  line-height: 1.5em;
  margin-bottom: auto;
  margin-top: auto;
  padding: 0 .375rem;
}

.answerscard-head-link {
  border-radius: .25rem;
}

.answerscard-content {
  display: flex;
  grid-area: content;
  
}

.answerscard-image {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  width: 85%; /* Adjust width as needed */
  height: auto;
  grid-area: image;
  align-self: top;
  margin-right: 1em; /* Space between image and links */
  border-radius: 1em; /* Optional: Rounds the corners of the image */
  background: var(--image-background); /* Use a CSS variable for the background */
  padding: .4em; /* Adjust as needed, creates space around the image */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* Optional: Adds shadow for depth */
  object-fit: cover; /* Ensures the image covers the padding area */
}

.answerscard-image:hover {
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

  .answerscard {
    background-color: #dce5be; /* Adjusted light green with more depth */
    color: #757340; /* Darker gold text for better contrast */
    box-shadow: 0 0 5px rgba(117, 115, 64, 0.5); /* Adjusted gold shadow for better definition */
  }

  .answerscard-image {
    background: var(--image-background); /* Uses the darker background variable */
    /* ... other styles ... */
  }

  .answerscard-header {
    color: #9c9a50; /* Less pastel, more pronounced gold */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .answerscard-head-link {
    color: #9c9a50; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .answerscard-head-link:hover,
  .answerscard-head-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }

  .answerscard-link {
    color: #9c9a50; /* Less pastel, more pronounced gold */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .answerscard-link:hover,
  .answerscard-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }

  #wideButton {
    background-color: #e6e8d4;
    color: #757340;
  }
}

@media (prefers-color-scheme: dark) {

  .answerscard {
    background-color: #3d5a4c; /* Soft dark green background */
    color: #c5b358; /* Soft gold text */
    box-shadow: 0 0 5px rgba(197, 179, 88, 0.5); /* Softer gold shadow */
  }

  .answerscard-header {
    color: #c9b037; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .answerscard-head-link {
    color: #c9b037; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .answerscard-head-link:hover,
  .answerscard-head-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }

  .answerscard-link {
    color: #c9b037; /* Paler gold links */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .answerscard-link:hover,
  .answerscard-link:focus {
    background-color: var(--link-hover-background);
    color: var(--link-hover-color);
    text-decoration: none; /* Optional: remove if you want underline on hover */
  }

  #wideButton {
    background-color: #4f7565;
    color: #c5b358;
  }
}

@media only screen and (max-width: 360px) {
  .answerscard {
    grid-template-areas:"header header header"
    "tags tags tags"
    "links links links";
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    text-align: center;
  }

}

@media only screen and (max-width: 300px) {
  .answerscard-link {
    border-radius: .25rem;
    display: inline-block;
    font-size: .55rem;
    font-weight: 700;
    line-height: 1.5em;
    margin-bottom: auto;
    margin-top: auto;
    padding: 0.25rem;
  }
  .answerscard-header {

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