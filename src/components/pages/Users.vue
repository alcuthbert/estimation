<template>
	<div>
		<h1>Users</h1>
		<vuetable ref="vuetable"
			:data="users"
			:fields="fields"
		></vuetable>
	</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import axios from 'axios'

export default {
	data() {
		return {
			users: [],
			fields: ['id', 'name', 'nickname', 'email', 'birthdate', 'gender']
		}
	},
	mounted() {
		axios
			.get('/api/users')
			.then(response => {
				this.users = response.data.data
			})
	},
	components: {
		Vuetable
	}
}
</script>
