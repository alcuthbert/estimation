<template>
	<b-card no-body>
        <h4 slot="header">{{ title }}</h4>

        <!-- <b-card-body v-for="subtask in subtasks" :key="subtask.id">
            <subtask :model="subtask"></subtask>
        </b-card-body> -->

		<subtask
			:model="subtask"
			v-for="subtask in subtasks"
			:key="subtask.id"></subtask>
    </b-card>
</template>

<script>
import Subtask from "@/components/tasks/Subtask"
import SubtasksService from "@/common/services/Subtasks"
import TasksService from "@/common/services/Tasks"

export default {
	data() {
		return {
			task: null,
			subtasks: []
		};
	},
	props: {
		id: Number
    },
	mounted() {
		TasksService
			.findById(this.id)
			.then(response => {
				this.task = response.data
			})
			.catch(() => this.$toaster.error('Error'))

		SubtasksService
			.getByTaskId(this.id)
			.then(response => {
				this.subtasks = response.data
			})
			.catch(() => this.$toaster.error('Error'))
	},
	computed: {
		title() {
			return this.task !== null ? '#' + this.task.id + ': ' + this.task.name : ''
		}
	},
	components: {
		Subtask
	}
}
</script>

