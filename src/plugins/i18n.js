import { createI18n } from 'vue-i18n'
import fr from '@/assets/i18n/fr.json'
import en from '@/assets/i18n/en.json'
import ar from '@/assets/i18n/ar.json'

export default createI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: { fr, en, ar }
})