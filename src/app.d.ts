// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		 interface Platform {
			eng: {
				COUNTER: DurableObjectNamespace;
			}
			context: {
				waitUntil: (promise: Promise<void>) => void;
			}
			caches: CacheStorage & { default: Cache }
		 }
	}
}

export {};
