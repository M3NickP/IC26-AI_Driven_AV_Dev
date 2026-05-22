<script lang="ts">
  import ConnectionStatusPage from '../pages/ConnectionStatusPage.svelte';
  import VideoRoutingPage from '../pages/VideoRoutingPage.svelte';
  import AudioPage from '../pages/AudioPage.svelte';

  type PageId = 'status' | 'video' | 'audio';

  const pages: { id: PageId; label: string }[] = [
    { id: 'status', label: 'Status' },
    { id: 'video', label: 'Video' },
    { id: 'audio', label: 'Audio' },
  ];

  let selectedPage = $state<PageId>('status');
</script>

<div class="bg-base-100 flex h-dvh flex-col">
  <main class="min-h-0 flex-1 overflow-y-auto">
    {#if selectedPage === 'status'}
      <ConnectionStatusPage />
    {:else if selectedPage === 'video'}
      <VideoRoutingPage />
    {:else}
      <AudioPage />
    {/if}
  </main>

  <nav class="dock dock-md border-base-300 bg-base-100 z-10 border-t" aria-label="Main navigation">
    {#each pages as page (page.id)}
      <button
        type="button"
        class:dock-active={selectedPage === page.id}
        aria-current={selectedPage === page.id ? 'page' : undefined}
        onclick={() => (selectedPage = page.id)}
      >
        {#if page.id === 'status'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        {:else if page.id === 'video'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        {/if}
        <span class="dock-label">{page.label}</span>
      </button>
    {/each}
  </nav>
</div>
