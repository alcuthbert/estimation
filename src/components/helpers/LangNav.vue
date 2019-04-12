<template>
	<b-nav-item-dropdown right>
		<template slot="button-content">
			<flag :iso="$i18n.locale === 'ru' ? 'ru' : 'gb'" />
			{{$t('message.language') | ucfirst}}
		</template>
		<b-dropdown-item href="#" @click="$i18n.locale = 'en'">
			<flag iso="gb" />
			English
		</b-dropdown-item>
		<b-dropdown-item href="#" @click="$i18n.locale = 'ru'">
			<flag iso="ru" />
			Русский
		</b-dropdown-item>
	</b-nav-item-dropdown>
</template>