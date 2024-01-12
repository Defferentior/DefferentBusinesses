import * as SvelteStore from 'svelte/store';
import type { PageStateInterface } from './pagenumbers/PageState.interface';

export const PageStore = SvelteStore.writable<PageStateInterface>({
    page: 1,
    maxPage: 1,
    pages: [1],
});
/*
export const PageStoreSubscribe = PageStore.subscribe;
export const PageStoreSet = PageStore.set;

export const setPage = (page: number) => {
    PageStore.update((store) => {
        store.page = page;
        return store;
    });
}*/
/*
export const setMaxPage = (maxPage: number) => {
    PageStore.update((store) => {
        store.maxPage = maxPage;
        return store;
    });
}

export const PageStorePaginate = (page: number, maxPage: number) => {
    PageStore.set({
        page: page,
        maxPage: maxPage,
        pages:  Array.from({length: maxPage + 1}, (_, i) => i + 1),
    });
}

export const PageStoreReset = (maxPage: number) => {
    PageStore.update(store=>({
        ...store,
        maxPage: maxPage,
        pages:  Array.from({length: maxPage + 1}, (_, i) => i + 1),
    }));
}
*/