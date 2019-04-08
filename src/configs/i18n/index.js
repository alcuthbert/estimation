import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from './messages.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: 'ru',
	messages,
})

export default i18n