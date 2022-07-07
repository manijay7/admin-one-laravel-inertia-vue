import "./bootstrap";
import "../css/app.css";

import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";

import { createPinia } from "pinia";
import { useStyleStore } from "@/stores/style.js";
import { useLayoutStore } from "@/stores/layout.js";

import { darkModeKey, styleKey } from "@/config.js";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import { Inertia } from "@inertiajs/inertia";

import App from "./Layouts/App.vue";

const pinia = createPinia();

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText || "Admin One";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const page = resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob("./Pages/**/*.vue")
    );
    page.then((module) => {
      module.default.layout = module.default.layout || App;
    });
    return page;
  },
  setup({ el, app, props, plugin }) {
    return createApp({ render: () => h(app, props) })
      .use(plugin)
      .use(pinia)
      .use(ZiggyVue, Ziggy)
      .mount(el);
  },
});

InertiaProgress.init({ color: "#4B5563" });

const styleStore = useStyleStore(pinia);
const layoutStore = useLayoutStore(pinia);

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Collapse mobile aside menu on route change */
Inertia.on("navigate", (event) => {
  layoutStore.asideMobileToggle(false);
  layoutStore.asideLgToggle(false);
});
