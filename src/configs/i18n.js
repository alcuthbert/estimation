import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
	en: {
		message: {
			hello_message: 'This is a simple application for the load estimation of tasks',
			start_work: 'To start working you can go to',
			'change requests': 'change requests',
			login: 'login',
			logout: 'logout',
			profile: 'profile',
			language: 'language',
			create: 'create',
			refresh: 'refresh',
			filter: 'filter',
			sort: 'sort',
			submit: 'submit',
			cancel: 'cancel',
			clear: 'clear',
			username: 'username',
			password: 'password',
			forgot_password: 'forgot password',
			remember_me: 'remember me',
			signin: 'Sign In',
			name: 'name',
			status: 'status',
			owner: 'owner',
			version: 'version',
			project: 'project',
			select_one: 'select one',
			open: 'open',
			closed: 'closed',
			approved: 'approved',
		}
	},
	ru: {
		message: {
			hello_message: 'Ну вот вы и попали на приложение для проведения оценки очень интересных и клевых задач.',
			start_work: 'чтобы начать, идите по линку',
			'change requests': 'требования',
			login: 'войти',
			logout: 'выйти',
			profile: 'профиль',
			language: 'язык',
			create: 'создать',
			refresh: 'обновить',
			filter: 'фильтр',
			sort: 'сортировка',
			submit: 'подтвердить',
			cancel: 'отмена',
			clear: 'очистить',
			username: 'имя',
			password: 'пароль',
			forgot_password: 'забыл пароль',
			remember_me: 'запомнить',
			signin: 'вход',
			name: 'имя',
			status: 'статус',
			owner: 'владелец',
			version: 'версия',
			project: 'проект',
			select_one: 'выберите',
			open: 'открыто',
			closed: 'закрыто',
			approved: 'подтверждено'
		}
	}
}

const i18n = new VueI18n({
	locale: 'ru',
	messages,
})

export default i18n