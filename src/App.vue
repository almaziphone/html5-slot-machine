<template>
  <div id="slot">
    <div id="jackpot">@PuVPNbot <span id="jp"></span></div>
    <div id="reels">
      <div class="reel"></div>
      <div class="reel"></div>
      <div class="reel"></div>
      <div class="reel"></div>
      <div class="reel"></div>
    </div>
    <div id="controls">
      <button type="button" id="spin" @click="spin">SPIN</button>
      <label>
        <input type="checkbox" id="autoplay" v-model="autoplay" /> Autoplay
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Slot from "./lib/Slot";

const autoplay = ref(false);
let slot: Slot | null = null;

function spin() {
  slot?.spin();
}

onMounted(() => {
  const el = document.getElementById("slot");
  if (el) {
    slot = new Slot(el);
  }
});
</script>
