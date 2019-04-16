<template>
	<div>
		<h1>Users</h1>
		<b-table
			:items="users"
			:fields="fields"
		></b-table>
	</div>
</template>

<script>
import Users from '@/common/services/Users'

export default {
	data() {
		return {
			users: [],
			fields: ['id', 'name', 'email', 'role']
		}
	},
	mounted() {
		Users
			.find()
			.then(response => {
				this.users = response.data
			})
			.catch(() => this.$toaster.error('Error'))
	},
	components: {

	}
}
</script>
