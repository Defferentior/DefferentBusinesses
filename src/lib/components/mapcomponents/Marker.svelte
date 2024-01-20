<script lang="ts">
  /**
   * Comments for the Future:
   * Taken from https://github.com/dimfeld/svelte-maplibre/ as of 2024-19-01
   */
  import maplibre, { type LngLatLike, type PointLike } from 'maplibre-gl';
  import { createEventDispatcher } from 'svelte';
  import { updatedMarkerContext } from './context';
  import type { MarkerClickInfo } from './types';
  import type * as GeoJSON from 'geojson';

  export let lngLat: LngLatLike;
  /** Handle mouse events */
  export let interactive = true;
  /** Make markers tabbable and add the button role. */
  export let asButton = false;
  export let draggable = false;
  /** A GeoJSON Feature related to the point. This is only actually used to send an ID and set of properties along with
   * the event, and can be safely omitted. The `lngLat` prop controls the marker's location even if this is provided. */
  export let feature: GeoJSON.Feature | null = null;
  /** An offset in pixels to apply to the marker. */
  export let offset: PointLike | undefined = undefined;
  /** The z-index of the marker. This can also be set via CSS classes using the `class` prop */
  export let zIndex: number | undefined = undefined;
  /** The rotation angle of the marker (clockwise, in degrees) */
  export let rotation: number = 0;

  const dispatch = createEventDispatcher();
  const { map, layerEvent, self: marker } = updatedMarkerContext();

  function addMarker(node: HTMLDivElement) {
    $marker = new maplibre.Marker({
      element: node,
      rotation,
      draggable,
      offset,
    })
      .setLngLat(lngLat)
      .addTo($map);

    const dragStartListener = () => sendEvent('dragstart');
    const dragListener = () => {
      propagateLngLatChange();
      sendEvent('drag');
    };
    const dragEndListener = () => {
      propagateLngLatChange();
      sendEvent('dragend');
    };

    if (draggable) {
      $marker.on('dragstart', dragStartListener);
      $marker.on('drag', dragListener);
      $marker.on('dragend', dragEndListener);
    }

    return {
      destroy() {
        if (draggable) {
          $marker?.off('dragstart', dragStartListener);
          $marker?.off('drag', dragListener);
          $marker?.off('dragend', dragEndListener);
        }
        $marker?.remove();
      },
    };
  }

  function manageClasses(node: HTMLDivElement, initialAddedClasses: string | undefined) {
    // These classes are added by MapLibre and we don't want to mess with them.
    const frozenClasses = node.className;

    function updateClasses(newClassNames: string | undefined) {

        node.className = frozenClasses;
    }

    updateClasses(initialAddedClasses);

    return {
      update: updateClasses,
    };
  }

  $: $marker?.setLngLat(lngLat);
  $: $marker?.setOffset(offset ?? [0, 0]);
  $: $marker?.setRotation(rotation);

  function propagateLngLatChange() {
    let newPos = $marker?.getLngLat();
    if (!newPos) {
      return;
    }

    // Update the props using the same format they are already in.
    if (Array.isArray(lngLat)) {
      lngLat = [newPos.lng, newPos.lat];
    } else if (lngLat && 'lon' in lngLat) {
      lngLat = { lon: newPos.lng, lat: newPos.lat };
    } else {
      lngLat = newPos;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      sendEvent('click');
    }
  }

  function sendEvent(eventName: string) {
    if (!interactive) {
      return;
    }

    let loc = $marker?.getLngLat();
    if (!loc) {
      return;
    }

    const lngLat: [number, number] = [loc.lng, loc.lat];
    let data: MarkerClickInfo = {
      map: $map!,
      marker: $marker!,
      lngLat,
      features: [
        {
          type: 'Feature',

          properties: feature?.properties ?? {},
          geometry: {
            type: 'Point',
            coordinates: lngLat,
          },
        },
      ],
    };

    $layerEvent = {
      ...data,
      layerType: 'marker',
      type: eventName,
    };

    dispatch(eventName, data);
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  use:addMarker
  class="markerClass"
  style:z-index={zIndex}
  tabindex={asButton ? 0 : undefined}
  role={asButton ? 'button' : undefined}
  on:click={() => sendEvent('click')}
  on:dblclick={() => sendEvent('dblclick')}
  on:contextmenu={() => sendEvent('contextmenu')}
  on:mouseenter={(e) => {
    sendEvent('mouseenter');
  }}
  on:mouseleave={() => {
    sendEvent('mouseleave');
  }}
  on:mousemove={() => sendEvent('mousemove')}
  on:keydown={handleKeyDown}
>
  <slot />
</div>

<style>
.markerClass {
  font-size : .6rem; /* text-sm */
  text-align: center; /* text-center */
  border: 1px solid #edf2f7; /* border border-gray-200 */
  border-radius: 9999px; /* rounded-full */
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  display: grid; /* grid */
  place-items: center; /* place-items-center */
}

.markerClass:focus {
  outline: 2px solid black; /* focus:outline-2 focus:outline-black */
}

@media (prefers-color-scheme: light) {
  .markerClass {
    background-color: #dce5be; /* Adjusted light green with more depth */
    color: #757340; /* Darker gold text for better contrast */
    box-shadow: 0 0 5px rgba(117, 115, 64, 0.5); /* Adjusted gold shadow for better definition */
  }
}

@media (prefers-color-scheme: dark) {
  .markerClass {
    background-color: #3d5a4c; /* Soft dark green background */
    color: #c5b358; /* Soft gold text */
    box-shadow: 0 0 5px rgba(197, 179, 88, 0.5); /* Softer gold shadow */
  }
}
  
</style>