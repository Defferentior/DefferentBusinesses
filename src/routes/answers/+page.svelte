<script lang="ts">
  export let data;

  import AnswersCardsList from "$lib/components/answerscards/AnswersCardsList.component.svelte";
  import defferentiator from '$lib/images/defferentiator-circular-logo-25.png'

  import PageNumbers from "$lib/components/pagenumbers/PageNumbers.component.svelte";
  import type { AnswersCardInterface } from "$lib/models/index.js";
  import { PageStore } from "$lib/stores/Page.Store";

  let searchTerm = '';
  let filterImage = false;
  let page: number = 1;
  let maxPage: number = 1;
  let pages: number[] = [1];

  $: {
    page = $PageStore.page;
    maxPage = $PageStore.maxPage;
    pages = $PageStore.pages;
  }
  const pageSize = 20;

  let filteredAnswers: AnswersCardInterface[] = [];

  $: sortedAnswers = [...data.Businesses].sort((a, b) => {
    if (a.image === null) return 1;
    if (b.image === null) return -1;
    return a.image.localeCompare(b.image);
  });

$: filteredAnswers = sortedAnswers.filter(answers => 
answers.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    && (!filterImage || answers.image !== null)
    && ( answers.answers !== null )
);

$: if (maxPage === 0){
  PageStore.update(state => ({ ...state, page: 1 }));
  PageStore.update(state => ({ ...state, pages: [1] }));
}

$: if (page > maxPage && maxPage > 0){
  PageStore.update(state => ({ ...state, page: maxPage }));
  PageStore.update(state => ({ ...state, pages: Array.from(Array(state.maxPage).keys()).map(i => i + 1) }));
}

let paginatedAnswers = filteredAnswers.slice((page - 1) * pageSize, (page) * pageSize);

$: {
  paginatedAnswers = filteredAnswers.slice((page - 1) * pageSize, (page) * pageSize);

const newMaxPage = Math.ceil(filteredAnswers.length / pageSize);
if (newMaxPage !== maxPage) {
  maxPage = newMaxPage;
  PageStore.update(state => ({ ...state, maxPage }));
}

const newPages = Array.from({length: newMaxPage}, (_, i) => i + 1);
if (newPages !== pages) {
  pages = newPages;
  PageStore.update(state => ({ ...state, pages }));
}
}

</script>

<nav>
  <a href="/answers" >Answers</a>
  <a href="/" >Businesses</a>
</nav>

<title>{'Defferent Businesses'}</title>
<body id="root">
  <div class="Titlelist">
  <h1>Business Answers</h1> <img src={defferentiator} alt={"logo"} class={["logo"].join(' ')} />
  </div> 
  <h3>Only Include Businesses With:  </h3>
  <div>
    <input name="imagecheckbox" type="checkbox" bind:checked={filterImage} /> Picture |
  <input name="namesearch" type="text" bind:value={searchTerm} placeholder="Search..." /> Name
</div>

<a href="/secret/stash" class="secret-link">Secrets Stash</a>

<PageNumbers />
  <AnswersCardsList answerscards={paginatedAnswers} />
<PageNumbers />

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


</style>