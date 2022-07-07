<script setup>
import { computed } from "vue";
import { useLayoutStore } from "@/stores/layout.js";
import BaseLevel from "@/components/BaseLevel.vue";
import JustboilLogo from "@/components/JustboilLogo.vue";

const year = computed(() => new Date().getFullYear());

const isFooterBarVisible = computed(() => !useLayoutStore().isFullScreen);
</script>

<template>
  <footer
    v-show="isFooterBarVisible"
    class="bg-white py-2 px-6 dark:bg-gray-900/70"
  >
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
          >&copy; {{ year }},
          <a href="#" target="_blank">IS Evolution Consult</a>.</b
        >
      </div>
      <div class="md:py-2"></div>
    </BaseLevel>
  </footer>
</template>
