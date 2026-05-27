<script lang="ts">
  import type { ButtonControl } from 'qrwc-svelte';
  import { qrwcSvelte } from '../qrwc';

  type SourceOption = {
    input: number;
    label: string;
  };

  type RoutedSource = SourceOption & {
    control: ButtonControl;
  };

  const sourceOptions: SourceOption[] = [
    { input: 1, label: 'Logo Screen' },
    { input: 4, label: 'PC' },
    { input: 5, label: 'Laptop' },
    { input: 6, label: 'Apple TV' },
  ];

  const videoRouter = qrwcSvelte.useComponent('VideoRouter');

  const display1Routes: RoutedSource[] = sourceOptions.map((source) => ({
    ...source,
    control: videoRouter.useButton(`Display 1 ${source.input}`),
  }));

  const display2Routes: RoutedSource[] = sourceOptions.map((source) => ({
    ...source,
    control: videoRouter.useButton(`Display 2 ${source.input}`),
  }));

  function routeDisplay(routes: RoutedSource[], input: number): void {
    const selectedSource = routes.find((route) => route.input === input);
    if (!selectedSource) return;
    selectedSource.control.state = true;
  }

  function getCurrentRouteLabel(routes: RoutedSource[]): string {
    const activeSource = routes.find((route) => route.control.state);
    return activeSource ? activeSource.label : 'Unknown / No active route';
  }
</script>

<div class="px-5 py-6">
  <h1 class="text-2xl font-semibold">Video Routing</h1>
  <p class="text-base-content/70 mt-2 text-sm">
    Route sources independently for Display 1 and Display 2.
  </p>

  <div class="mt-5 grid gap-4 md:grid-cols-2">
    <section class="card bg-base-100 border-base-300 border shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-lg">Display 1</h2>
        <p class="text-sm">
          Current source:
          <strong>{getCurrentRouteLabel(display1Routes)}</strong>
        </p>

        <div class="mt-2 grid grid-cols-2 gap-2">
          {#each display1Routes as route (route.input)}
            <button
              type="button"
              class="btn {route.control.state ? 'btn-primary' : 'btn-outline'}"
              onclick={() => routeDisplay(display1Routes, route.input)}
            >
              {route.label}
            </button>
          {/each}
        </div>
      </div>
    </section>

    <section class="card bg-base-100 border-base-300 border shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-lg">Display 2</h2>
        <p class="text-sm">
          Current source:
          <strong>{getCurrentRouteLabel(display2Routes)}</strong>
        </p>

        <div class="mt-2 grid grid-cols-2 gap-2">
          {#each display2Routes as route (route.input)}
            <button
              type="button"
              class="btn {route.control.state ? 'btn-primary' : 'btn-outline'}"
              onclick={() => routeDisplay(display2Routes, route.input)}
            >
              {route.label}
            </button>
          {/each}
        </div>
      </div>
    </section>
  </div>
</div>
