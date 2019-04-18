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
		</div>

		<div class="col-lg-12" v-for="task in tasks" :key="task.id" >
			<task :id="task.id"></task>
		</div>
	</div>
</template>

<script>
import TasksService from '@/common/services/Tasks'
import Task from "@/components/tasks/Task"

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
		TasksService
			.findByCrId(this.crId)
			.then(response => {
				this.tasks = response.data
			})
			.catch(() => this.$toaster.error('Error'))
	},
	components: {
		Task
	}
};
</script>
