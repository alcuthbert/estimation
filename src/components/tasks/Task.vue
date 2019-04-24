<template>
	<b-card no-body>
        <h4 slot="header">
			{{ title }}
			<b-button
				size="md"
				variant="secondary"
				v-b-modal.task-editor>
				Edit task
			</b-button>
		</h4>

        <!-- <b-card-body v-for="subtask in subtasks" :key="subtask.id">
            <subtask :model="subtask"></subtask>
        </b-card-body> -->

		<subtask
			:model="subtask"
			v-for="subtask in subtasks"
			:key="subtask.id">
		</subtask>

		<editor
			:options="taskEditorOptions"
			@task-saved="onTaskSaved">
		</editor>
    </b-card>
</template>

<script>
import Editor from "@/components/editors/Editor"
import Subtask from "@/components/tasks/Subtask"
import SubtasksService from "@/common/services/Subtasks"
import TasksService from "@/common/services/Tasks"

export default {
	data() {
		return {
			task: null,
			subtasks: [],
			taskEditorOptions: {
				id: 'task-editor',
				title: 'Task Editor',
				emitName: 'task-saved',
				service: require('@/common/services/Tasks').default,
				fields: [
					{
						id: 'name',
						validator: 'required|min:5',
						disabled: false,
						visible: true
					},
					{
						id: 'changeRequestId',
						validator: '',
						disabled: true,
						visible: false
					}
				]
			}
		};
	},
	props: {
		id: Number
	},
	methods: {
		onTaskSaved(task) {
			this.$root.$emit('bv::hide::modal', 'task-editor')

			// eslint-disable-next-line
			console.log("task", task)

			TasksService
				.findById(this.id)
				.then(response => {
					this.task = response.data

					this.$toaster.success('Task is loaded')
				})
				.catch(() => this.$toaster.error('Error'))
		}
	},
	mounted() {
		TasksService
			.findById(this.id)
			.then(response => {
				this.task = response.data

				this.$toaster.success('Task is loaded')
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
		Subtask,
		Editor
	}
}
</script>

