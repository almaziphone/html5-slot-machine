<template>
  <div id="slot" ref="slotRef">
    <div id="jackpot">
      <span class="glow-text">StarsSmile</span>:
      <span class="glow-text" id="jp">1000000$</span>
    </div>
    <div id="reels">
      <div class="reel"></div>
      <div class="reel"></div>
      <div class="reel"></div>
      <div class="reel"></div>
      <div class="reel"></div>
    </div>
    <div id="controls">
      <button type="button" id="spin">КРУТИТЬ</button>
      <label>
        <input type="checkbox" name="autoplay" id="autoplay" />
        Автоигра
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Slot from "./lib/Slot";
import { playEndSound, playSpinSound } from "./lib/audio";

const slotRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (slotRef.value) {
    const slot = new Slot(slotRef.value, {
      inverted: false,
      onSpinStart: () => playSpinSound(),
      onSpinEnd: () => playEndSound(),
    });
  }
});
</script>

<style scoped>
@import "./css/style.css";
</style>
