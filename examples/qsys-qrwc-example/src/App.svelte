<script lang="ts">
  import { qrwcSvelte } from './lib/qrwc';
  import AppNav from './lib/components/AppNav.svelte';
  import DisconnectedDialog from './lib/components/DisconnectedDialog.svelte';
</script>

{#if qrwcSvelte.isConnected}
  <AppNav />
{:else}
  <DisconnectedDialog />
{/if}
