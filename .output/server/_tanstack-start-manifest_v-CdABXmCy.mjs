//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CdABXmCy.js
var tsrStartManifest = () => ({
  routes: {
    __root__: {
      filePath: "/vercel/sandbox/primary/src/routes/__root.tsx",
      children: ["/", "/auth"],
      preloads: [
        "/assets/index-2dMSpw5r.js",
        "/assets/rolldown-runtime-Bh1tDfsg.js",
        "/assets/theme-DjMA5HfB.js",
        "/assets/dist-CzUwd2eM.js",
      ],
      scripts: [
        {
          attrs: {
            type: "module",
            async: !0,
            src: "/assets/index-2dMSpw5r.js",
          },
        },
      ],
    },
    "/": {
      filePath: "/vercel/sandbox/primary/src/routes/index.tsx",
      children: void 0,
      preloads: [
        "/assets/routes-27o-Xv9h.js",
        "/assets/ThemeToggle-D-R7hces.js",
      ],
    },
    "/auth": {
      filePath: "/vercel/sandbox/primary/src/routes/auth.tsx",
      children: void 0,
      preloads: ["/assets/auth-BbZdy2oX.js", "/assets/ThemeToggle-D-R7hces.js"],
    },
  },
});
//#endregion
export { tsrStartManifest };
