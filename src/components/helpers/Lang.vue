<template>
    <b-nav-item-dropdown :text="$t('message.language') | ucfirst" right>
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

<script>
export default {
    methods: {
        // getHtml() {
        //     return ``
        // }
    }
}
</script>
