<template>
	<b-dropdown text="Button text via Prop" variant="default">
		<template slot="button-content">
			<flag :iso="$i18n.locale === 'ru' ? 'ru' : 'gb'" />
		</template>
		<b-dropdown-item href="#" @click="$i18n.locale = 'ru'">
			<flag iso="ru" />
			Русский
		</b-dropdown-item>
		<b-dropdown-item href="#" @click="$i18n.locale = 'en'">
			<flag iso="gb" />
			English
		</b-dropdown-item>
	</b-dropdown>    
</template>

