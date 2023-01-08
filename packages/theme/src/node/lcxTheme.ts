import { path, getDirname } from '@vuepress/utils'
import {Theme} from "@vuepress/core";
import {defaultViteBundlerConfig, mergeViteBundlerConfig, resolveUserConfig} from "./resolveBundlerConfig.js";
import viteBundler from "@vuepress/bundler-vite";

const __dirname = getDirname(import.meta.url);
console.log(__dirname)

export const lcxTheme = (themeConfig: Record<string, unknown>): Theme => {
    return {
        name: 'vuepress-theme-lcx',
        onInitialized(app) {
            const userConfig = resolveUserConfig(themeConfig)

            if (app.options.bundler.name === '@vuepress/bundler-vite') {
                const options = defaultViteBundlerConfig()
                const viteBundlerOptions = mergeViteBundlerConfig(options, userConfig)
                // @ts-ignore
                app.options.bundler = viteBundler(viteBundlerOptions)
            }
        },
        templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),
        templateDev: path.resolve(__dirname, '../../templates/index.dev.html'),
        clientConfigFile: path.resolve(
            __dirname,
            '../client/config.js'
        ),
    }
}
