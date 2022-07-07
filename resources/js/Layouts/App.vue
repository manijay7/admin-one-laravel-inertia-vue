<script setup>
import { computed } from "vue";
import { useMainStore } from "@/stores/main.js";
import { useLayoutStore } from "@/stores/layout.js";
import menu from "@/menu.js";
import FooterBar from "@/components/FooterBar.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import NavBar from "@/components/NavBar.vue";
import AsideMenu from "@/components/AsideMenu.vue";

const mainStore = useMainStore();

mainStore.setUser({
  name: "John Doe",
  email: "john@example.com",
  avatar:
    "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93",
});

const layoutStore = useLayoutStore();
layoutStore.fullScreenToggle(false);

const isAsideLgActive = computed(() => layoutStore.isAsideLgActive);

const overlayClick = () => {
  layoutStore.asideLgToggle(false);
};
</script>

<template>
  <NavBar />
  <AsideMenu :menu="menu" />
  <slot />
  <FooterBar />
  <OverlayLayer
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>
