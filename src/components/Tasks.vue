<template>
	<div class="row">
		<div class="col-lg-12">
			<h1>Tasks: #{{crId}}</h1>

			<b-button-group class="mb-3">
				<b-button variant="success">
					Create new
					<font-awesome-icon icon="plus-square"/>
				</b-button>
				<b-button variant="secondary">
					Merge
					<font-awesome-icon icon="object-ungroup"/>
				</b-button>
			</b-button-group>

			<b-table
				:items="tasks"
				:fields="fields">
			</b-table>
		</div>
	</div>
</template>

<script>
import Tasks from '@/common/services/Tasks'

export default {
	data() {
		return {
			tasks: [],
			fields: [
				{ name: "id", title: "id" },
				{ name: "name", title: "name" },
			]
		};
	},
	props: {
		crId: Number
	},
	mounted() {
		Tasks.
			findByCrId(this.crId)
			.then(response => {
				this.tasks = response.data
			})
			.catch(() => this.$toaster.error('Error'))
	}
};
</script>
