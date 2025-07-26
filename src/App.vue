<template>
  <div id="slot" :class="{ inverted: inverted }">
    <div id="jackpot">@PuVPNbot <span id="jp"></span></div>
    <div id="reels">
      <div class="reel" ref="reel0"></div>
      <div class="reel" ref="reel1"></div>
      <div class="reel" ref="reel2"></div>
      <div class="reel" ref="reel3"></div>
      <div class="reel" ref="reel4"></div>
    </div>
    <div id="controls">
      <button type="button" id="spin" @click="spin">SPIN</button>
      <label>
        <input
          type="checkbox"
          name="autoplay"
          id="autoplay"
          v-model="autoplay"
        />
        Autoplay
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Slot from "./js/Slot";

const inverted = false;
const autoplay = ref(false);

const reel0 = ref<HTMLDivElement | null>(null);
const reel1 = ref<HTMLDivElement | null>(null);
const reel2 = ref<HTMLDivElement | null>(null);
const reel3 = ref<HTMLDivElement | null>(null);
const reel4 = ref<HTMLDivElement | null>(null);

let slot: Slot;

onMounted(() => {
  slot = new Slot(document.getElementById("slot") as HTMLElement, {
    inverted,
    onSpinStart(symbols) {
      console.log("onSpinStart", symbols);
    },
    onSpinEnd(symbols) {
      console.log("onSpinEnd", symbols);
    },
  });
});

function spin() {
  slot.spin();
}
</script>

<style src="./css/style.css"></style>
