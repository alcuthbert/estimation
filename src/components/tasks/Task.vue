<template>
	<div>
		<h1>Task {{id}}</h1>

		<b-row>
			<b-col md="12" v-for="subtask in subtasks" :key="subtask.id">
				<subtask :model="subtask"></subtask>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import Subtask from "@/components/tasks/Subtask"
import SubtasksService from "@/common/services/Subtasks"

export default {
	data() {
		return {
			subtasks: []
		};
	},
	props: {
		id: Number
    },
	mounted() {
		SubtasksService
			.getByTaskId(this.id)
			.then(response => {
				this.subtasks = response.data
			})
			.catch(() => this.$toaster.error('Error'))
	},
	components: {
		Subtask
	}
}
</script>

