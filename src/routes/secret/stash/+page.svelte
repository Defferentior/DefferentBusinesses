<script lang="ts">

    import defferentiator from '$lib/images/defferentiator-circular-logo-25.png'
    import linkedIn from '$lib/images/640px-LinkedIn.png'
    import logoWithText from '$lib/images/LOGOwithText.png'



</script>

<title>{'Defferent Businesses'}</title>
<body id="root">
    <div class="Titlelist">
    <h1>Secrets</h1> <img src={defferentiator} alt={"logo"} class={["logo"].join(' ')} />
  </div> 

  <img src={linkedIn}  alt={"logo"} class={["logo","bounce"].join(' ')} />

  <img src={logoWithText} alt={"logo"} class={["logo"].join(' ')} />

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

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

  .Titlelist {
    display: flex;
    flex-wrap: flex-start;
    justify-content: center;
    animation: fadeIn 1s ease-in;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  @keyframes slideInFromLeft {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
}

  .contactbar{
    display: flex;
    flex-wrap: flex-start;
    justify-content: center;
    margin: 0 2em;
    list-style: none;
    margin-bottom: .5em;
    animation: slideInFromLeft 1s ease-out;
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

  @keyframes slideOutToRight {
    0% { transform: translateX(0); }
    100% { transform: translateX(100%); }
}

@keyframes fadeOut {
    0% { opacity: 1; }
    50% { opacity: 0; }
    70% { opacity: 0; }
    75% { opacity: .5; }
    95% { opacity: .2; }
    100% { opacity: 0; }
}

.Titlelist:hover {
    animation: fadeOut 6s ease-out;
    opacity: 0;
}

  address a:hover {
    color: #0056b3;
    text-decoration: underline;
    transition: color 0.3s ease, text-decoration 0.3s ease;
}

@keyframes bounce {
  0% { transform: translate(0, 0); }
  5% { opacity: .25; }
  10% { opacity: .5; }
  25% { transform: translate(500%, 0); }
  50% { transform: translate(100%, 150%); }
  60% { opacity: 1; transform: translate(0, 500%); }
  75% { transform: translate(-250%, 300%); }
  80% { transform: translate(-305%, -25%); }
  85% { opacity: 0; }
  90% { opacity: .7; }
  100% { transform: translate(0, 0) }
}

.bounce {
  top : 20em;
  left : 10em;
  position: absolute;
  animation: bounce 5s infinite;
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

}


</style>