import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'
import './styles/theme.css'
import App from './App.vue'
import router from './router'
import { initRipple } from './utils/ripple'
import { initI18nDom } from './i18n'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY
if (!amplitudeApiKey) {
  console.warn('Amplitude API key missing — analytics disabled')
} else if (!window.__lanlinkAmplitudeInitialized) {
  // Keep the browser SDK singleton across app lifecycle and Vite HMR.
  window.__lanlinkAmplitudeInitialized = true

  // Load analytics asynchronously so session replay/recording code does not inflate
  // the initial application entry chunk. Preserve the required explicit home event.
  router.isReady().then(async () => {
    try {
      const amplitude = await import('@amplitude/unified')
      amplitude.initAll(amplitudeApiKey, {
        analytics: { autocapture: true },
        sessionReplay: { sampleRate: 1 }
      })

      if (router.currentRoute.value.name === 'home') {
        amplitude.track('Viewed Home Page', {
          prompt_version: 'BA400.4'
        })
      }
    } catch (error) {
      // Avoid permanently locking the singleton flag if the analytics SDK fails to load.
      window.__lanlinkAmplitudeInitialized = false
      console.warn('Amplitude initialization failed — analytics disabled', error)
    }
  })
}

app.mount('#app')
initI18nDom()

// 全局按钮点击波纹（事件委托，任何 .ant-btn 生效）
initRipple()
