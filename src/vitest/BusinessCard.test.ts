import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import BusinessCardsList from '$lib/components/businesscards/BusinessCardsList.component.svelte';
import { waitFor } from '@testing-library/dom';
import type { BusinessCardInterface } from '$lib/models';
// import +page.svelte from the source folder

describe('List Tests', () => {
    beforeEach(async() => {
        /* make a test businesscard array */

        //let div;
        const businesscardstest: BusinessCardInterface[] = [
          {
            id: '8ac86035-4edd-5e3c-713a-217c53f92ee3', //uuid junk
            name: 'John Doe',
            url: 'https://www.johndoe.com',
            image: 'https://www.johndoe.com/image.png',
            similarweb: null,
            builtwith: null,
            linkedin: null,
            dunandbradsheet: null,
            latitude: null,
            longitude: null,
          }
        ];
        render(BusinessCardsList, { businesscards: businesscardstest });

        // Wait for the div to be added to the DOM
        await waitFor(() => {
          const div = document.querySelector('div');
          if (!div) {
              throw new Error('Div not found');
          }
          /*else if(![...div.classList].some(className => className.startsWith('businesscards')))
          {
            console.log("div", div)
            throw new Error('Div does not have the correct class');
          }*/

      });
    })
    it.only('renders a list', () => {
      const div = document.querySelector('div');
      console.log("document",document.location)
      console.log("div", div)
      console.log("reading div", div?.classList)
      expect(document.querySelector('div')).not.toBe(null);
    })
    it('div has proper classname', () => {
      //const div = document.querySelector('div');
      expect(div).not.toBe(null);
      if(div)
      {
        expect([...div.classList].some(className => className.startsWith('businesscards'))).toBe(true);
      }
    });
    /* The BusinesscardList div has a class of businesscards
    
    it('renders empty list', () => {
        expect(document.querySelector('div')).toHaveClass('businesscards');
    });*/
});
