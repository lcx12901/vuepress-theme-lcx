import {ViteBundlerOptions} from "@vuepress/bundler-vite";
export const mergeViteBundlerConfig = (options: ViteBundlerOptions, config: ViteBundlerOptions): ViteBundlerOptions => {
    const userViteConfig = config?.viteOptions || {}

    if (typeof userViteConfig?.css?.postcss === 'string') {
        throw new Error('String type postcss is not supported yet')
    }

    const userPostcssPlugins = userViteConfig?.css?.postcss?.plugins || []
    if (!Array.isArray(userPostcssPlugins)) {
        throw new Error('plugins for postcss must be an array')
    }

    const viteOptions = {
        ...userViteConfig || {},
        ...{
            css: {
                ...userViteConfig?.css || {},
                ...{
                    postcss: {
                        ...userViteConfig?.css?.postcss || {},
                        ...{
                            plugins: [
                                ...userPostcssPlugins,
                                ...(options?.viteOptions?.css?.postcss as any)?.plugins
                            ],
                        }
                    },
                }
            },
        }
    }

    return {
        viteOptions: { ...viteOptions },
        vuePluginOptions: { ...(options?.vuePluginOptions || {}), ...(config?.vuePluginOptions || {}) }
    }
}

export const defaultViteBundlerConfig = (): ViteBundlerOptions => ({
    viteOptions: {
        css: {
            postcss: {
                plugins: [
                    // postcssImport,
                    // tailwindcssNesting,
                    // tailwindcss(tailwindcssConfig as unknown as Config),
                    // autoprefixer({}),
                    // postcssEach
                ]
            }
        },
    }
})

export const resolveUserConfig = (config: Record<string, unknown>) => {
    return config['viteBundler'] as ViteBundlerOptions || {}
}
