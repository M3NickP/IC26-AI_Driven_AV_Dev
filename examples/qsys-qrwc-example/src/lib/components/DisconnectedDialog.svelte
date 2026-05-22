<script lang="ts">
  import { qrwcSvelte } from '../qrwc';
</script>

<main class="container mx-auto max-w-lg px-5 py-8">
  <h1 class="text-2xl font-semibold">Q-SYS · QRWC</h1>
  <p class="text-base-content/70 mb-5 text-sm">
    Core: <kbd class="kbd kbd-sm">{qrwcSvelte.coreIp}</kbd> · WebSocket (non-secure) via
    <kbd class="kbd kbd-sm">qrwc-svelte</kbd>
  </p>

  <div
    role="alert"
    class="alert alert-warning alert-outline alert-vertical sm:alert-horizontal"
  >
    <span
      class="bg-warning text-warning-content flex size-10 shrink-0 items-center justify-center rounded-full"
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
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </span>
    <div class="text-base-content">
      <h2 class="text-warning font-bold">Not connected</h2>
      <p class="text-sm">
        Status: <strong>{qrwcSvelte.connectionStatus}</strong> · Attempts:
        <strong>{qrwcSvelte.connectionAttemptCount}</strong>
      </p>
      <p class="mt-2 text-xs opacity-80">
        Enable <strong>Q-SYS Remote WebSocket Control</strong> on the core, ensure this machine can reach
        <kbd class="kbd kbd-sm">{qrwcSvelte.coreIp}</kbd>, and that components use <strong>Script Access</strong>
        set to All or External.
      </p>
    </div>
  </div>
</main>
