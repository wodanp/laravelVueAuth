import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath } from "url";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueJsx from "@vitejs/plugin-vue-jsx";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, "src");

//TODO entscheiden für 1 icon variante

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "src/main.ts",
            ],
            refresh: true,
        }),
        vue(),
        vueJsx({}),
        AutoImport({
            imports: ["vue"],
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: "Icon",
                }),
            ],
            dts: path.resolve(pathSrc, "auto-imports.d.ts"),
        }),
        Components({
            resolvers: [
                IconsResolver({
                    enabledCollections: ["ep"],
                }),
                ElementPlusResolver(),
            ],
            dts: path.resolve(pathSrc, "components.d.ts"),
        }),
        Icons({
            autoInstall: true,
        }),
        createSvgIconsPlugin({
            iconDirs: [
                fileURLToPath(new URL("src/assets/svgs", import.meta.url)),
            ],
            symbolId: "svg-[dir]-[name]",
            svgoOptions: true,
        }),
        Inspect(),
    ],
    resolve: {
        alias: [
            // {
            //     find: /\@\//,
            //     replacement: fileURLToPath(new URL("./src/", import.meta.url)),
            // },
            { find: "@", replacement: pathSrc },
        ],
    },
});
