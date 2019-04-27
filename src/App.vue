<template>
	<div id="app">
		<navi></navi>

		<b-container>
			<router-view></router-view>
		</b-container>
	</div>
</template>

<script>

import Navi from './components/helpers/Navi.vue'

export default {
	name: 'app',
	created() {
		if (this.$store.state.identity === null) {
			this.$store.dispatch('getIdentity')
		}
	},
	components: {
		Navi
	}
}

</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* text-align: center;
	color: #2c3e50; */
	/* margin-top: 60px; */
}
</style>
