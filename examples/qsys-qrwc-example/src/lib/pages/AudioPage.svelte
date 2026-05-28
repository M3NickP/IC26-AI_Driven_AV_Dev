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
    { input: 1, label: 'Left Display Audio' },
    { input: 2, label: 'Right Display Audio' },
    { input: 3, label: 'Sonos' },
    { input: 4, label: 'Pink Noise' },
  ];

  const pgmSel = qrwcSvelte.useComponent('PGMSel');
  const pgmGain = qrwcSvelte.useComponent('PGMGain');
  const micGain = qrwcSvelte.useComponent('MicGain');
  const ducker = qrwcSvelte.useComponent('Ducker');

  const pgmSources: RoutedSource[] = sourceOptions.map((source) => ({
    ...source,
    control: pgmSel.useButton(`output.1.input.${source.input}.select`),
  }));

  const pgmLevel = pgmGain.useKnob('gain');
  const pgmMute = pgmGain.useButton('mute');
  const micLevel = micGain.useKnob('gain');
  const micMute = micGain.useButton('mute');
  const duckerActive = ducker.useButton('active');

  function selectSource(input: number): void {
    const selectedSource = pgmSources.find((source) => source.input === input);
    if (!selectedSource) return;
    selectedSource.control.state = true;
  }

  function getCurrentSourceLabel(): string {
    const activeSource = pgmSources.find((source) => source.control.state);
    return activeSource ? activeSource.label : 'Unknown / No active source';
  }
</script>

<div class="px-5 py-6">
  <h1 class="text-2xl font-semibold">Audio</h1>
  <p class="text-base-content/70 mt-2 text-sm">
    Select the program source and adjust PGM and microphone levels.
  </p>

  {#if duckerActive.state}
    <div
      role="alert"
      class="alert alert-warning alert-outline alert-vertical mt-5 sm:alert-horizontal"
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
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </span>
      <div class="text-base-content">
        <h2 class="text-warning font-bold">Microphone is in use</h2>
        <p class="text-sm">The ducker is active — program audio is being attenuated.</p>
      </div>
    </div>
  {/if}

  <div class="mt-5 grid gap-4">
    <section class="card bg-base-100 border-base-300 border shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-lg">Program Source</h2>
        <p class="text-sm">
          Current source:
          <strong>{getCurrentSourceLabel()}</strong>
        </p>

        <div class="mt-2 grid grid-cols-2 gap-2">
          {#each pgmSources as source (source.input)}
            <button
              type="button"
              class="btn {source.control.state ? 'btn-primary' : 'btn-outline'}"
              onclick={() => selectSource(source.input)}
            >
              {source.label}
            </button>
          {/each}
        </div>
      </div>
    </section>

    <div class="grid gap-4 md:grid-cols-2">
      <section class="card bg-base-100 border-base-300 border shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-lg">PGM</h2>
          <p class="text-sm">
            Level: <strong>{pgmLevel.string}</strong>
          </p>

          <input
            type="range"
            class="range range-primary mt-3 w-full"
            min={pgmLevel.valueMin}
            max={pgmLevel.valueMax}
            step="0.01"
            bind:value={pgmLevel.value}
            aria-label="PGM level"
          />

          <button
            type="button"
            class="btn mt-3 w-full {pgmMute.state ? 'btn-error' : 'btn-outline'}"
            onclick={() => pgmMute.toggle()}
          >
            {pgmMute.state ? 'Unmute PGM' : 'Mute PGM'}
          </button>
        </div>
      </section>

      <section class="card bg-base-100 border-base-300 border shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-lg">Microphone</h2>
          <p class="text-sm">
            Level: <strong>{micLevel.string}</strong>
          </p>

          <input
            type="range"
            class="range range-primary mt-3 w-full"
            min={micLevel.valueMin}
            max={micLevel.valueMax}
            step="0.01"
            bind:value={micLevel.value}
            aria-label="Microphone level"
          />

          <button
            type="button"
            class="btn mt-3 w-full {micMute.state ? 'btn-error' : 'btn-outline'}"
            onclick={() => micMute.toggle()}
          >
            {micMute.state ? 'Unmute Mic' : 'Mute Mic'}
          </button>
        </div>
      </section>
    </div>
  </div>
</div>
