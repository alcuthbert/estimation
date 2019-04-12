<template>
	<b-navbar-nav class="ml-auto">
		<lang-nav></lang-nav>

		<b-nav-item-dropdown right>
			<template slot="button-content">
				<em>{{getUserName() | ucfirst}}</em>
			</template>
			<b-dropdown-item href="#" :to="{name: $routeNames.profile}">
				{{$t("message.profile") | ucfirst}}
			</b-dropdown-item>
			<b-dropdown-item href="#" @click="logout">
				{{$t("message.logout") | ucfirst}}
			</b-dropdown-item>
		</b-nav-item-dropdown>
	</b-navbar-nav>
</template>

<script>
import LangNav from './LangNav'
import AuthService from '@/common/services/AuthService.js'
import RouteNames from '@/routeNames.js'
import {MUTATION_REMOVE_IDENTITY} from '@/store/mutation-types.js'
import { mapMutations, mapGetters } from 'vuex';
import { GET_IDENTITY } from '@/store/getter-types'

export default {
	methods: {
		logout() {
			AuthService.logout()
			this.removeIdentity()
			this.$router.push({name: RouteNames.login})
		},
		getUserName() {
			return (this.identity !== null) ? this.identity.name : 'User'
		},
		...mapMutations({
			removeIdentity: MUTATION_REMOVE_IDENTITY
		})
	},
	computed: {
		...mapGetters({
			identity: GET_IDENTITY
		})
	},
	components: {
		LangNav
	}
}
</script>