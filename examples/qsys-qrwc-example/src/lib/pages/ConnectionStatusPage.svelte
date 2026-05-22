<script lang="ts">
  import { qrwcSvelte } from '../qrwc';
</script>

<div class="px-5 py-6">
  <h1 class="text-2xl font-semibold">Connection</h1>
  <p class="text-base-content/70 mb-5 text-sm">
    Core: <kbd class="kbd kbd-sm">{qrwcSvelte.coreIp}</kbd> · WebSocket (non-secure) via
    <kbd class="kbd kbd-sm">qrwc-svelte</kbd>
  </p>

  <div
    role="alert"
    class="alert alert-success alert-outline alert-vertical sm:alert-horizontal"
  >
    <span
      class="bg-success text-success-content flex size-10 shrink-0 items-center justify-center rounded-full"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-6 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>
    <div class="text-base-content">
      <h2 class="text-success font-bold">Connected</h2>
      <p class="text-sm">
        Active core: <strong>{qrwcSvelte.activeCore}</strong> ·
        <kbd class="kbd kbd-sm">{qrwcSvelte.coreIp}</kbd>
      </p>
      <p class="mt-2 text-xs opacity-80">
        Use <kbd class="kbd kbd-sm">qrwcSvelte.useComponent('…')</kbd> only after this state — controls require
        an established connection.
      </p>
    </div>
  </div>
</div>
