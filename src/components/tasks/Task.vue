<template>
	<b-card no-body>
        <h4 slot="header">
			{{ title }}

			<b-button
				size="md"
				variant="warning"
				@click="selectTask(task)"
				v-b-modal="`task-editor-${id}`">
				<font-awesome-icon icon="edit"/>
				Edit
			</b-button>

			<b-button
				size="md"
				variant="danger"
				v-b-modal="`task-delete-${id}`">
				<font-awesome-icon icon="trash"/>
				Delete
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
			:data="taskEditorData"
			@task-saved="onTaskSaved">
		</editor>

		<deleter
			:options="taskDeleteOptions"
			:object="task"
			@task-deleted="onTaskDeleted">
		</deleter>
    </b-card>
</template>

<script>
import Vue from "vue"
import Editor from "@/components/editors/EditorModal"
import Deleter from "@/components/editors/DeleteModal"
import Subtask from "@/components/tasks/Subtask"
import SubtasksService from "@/common/services/Subtasks"
import TasksService from "@/common/services/Tasks"

export default {
	data() {
		return {
			task: null,
			subtasks: [],
			taskEditorOptions: {
				modalId: `task-editor-${this.id}`,
				title: 'Task Editor',
				emitName: 'task-saved',
				service: require('@/common/services/Tasks').default,
				fields: [
					{
						id: 'id',
						validator: '',
						disabled: true,
						visible: false
					},
					{
						id: 'name',
						validator: 'required|min:5'
					},
					{
						id: 'changeRequestId',
						validator: '',
						disabled: true,
						visible: false
					}
				]
			},
			taskDeleteOptions: {
				modalId: `task-delete-${this.id}`,
				title: 'Delete Task',
				emitName: 'task-deleted',
				service: require('@/common/services/Tasks').default
			},
			taskEditorData: null
		};
	},
	props: {
		id: Number
	},
	methods: {
		onTaskSaved() {
			TasksService
				.findById(this.id)
				.then(response => {
					this.task = response.data
				})
				.catch(() => this.$toaster.error('Error'))
		},
		onTaskDeleted(task) {
			this.$emit('task-deleted', task)
		},
		selectTask(item = null) {
			if (item === null) {
				this.taskEditorData = {
					changeRequestId: this.changeRequestId
				}
			} else {
				this.taskEditorData = Vue.util.extend({}, item)
			}
		}
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
		Subtask,
		Editor,
		Deleter
	}
}
</script>

