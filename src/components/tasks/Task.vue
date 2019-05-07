<template>
	<b-card no-body class="my-2">
        <h4 slot="header">
			{{ title }}
			<b-button-group>
				<b-button
					size="md"
					variant="secondary"
					v-if="hasCreateSubtaskAccess && !isMerged && !isClosed"
					v-b-modal="`subtask-editor`">
					<font-awesome-icon icon="plus"/>
					Create subtask
				</b-button>

				<b-button
					size="md"
					variant="warning"
					v-if="hasEditTaskAccess && !isMerged && !isClosed"
					@click="selectTask(task)"
					v-b-modal="`task-editor-${id}`">
					<font-awesome-icon icon="edit"/>
					Edit
				</b-button>

				<b-button
					size="md"
					variant="danger"
					v-if="hasDeleteTaskAccess && !isMerged && !isClosed"
					v-b-modal="`task-delete-${id}`">
					<font-awesome-icon icon="trash"/>
					Delete
				</b-button>
			</b-button-group>
		</h4>

		<subtask
			:cr="cr"
			:model="subtask"
			v-for="subtask in subtasks"
			:key="subtask.id"
			@subtask-deleted="onSubtaskDeleted"
			@subtask-saved="onSubtaskSaved"
			@estimation-saved="onEstimationSaved">
		</subtask>

		<editor
			:options="taskEditorOptions"
			:data="taskEditorData"
			@task-saved="onTaskSaved">
		</editor>

		<editor
			:options="subtaskEditorOptions"
			:data="{taskId: taskId}"
			@subtask-saved="onSubtaskSaved">
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
import Rights from "@/common/services/Rights"
import { mapGetters } from 'vuex'
import { GET_MY_ROLE } from '@/store/getter-types'

import Technologies from '@/common/resources/technologies'

import { RIGHTS_SUBTASK_CREATE } from '@/common/resources/rights'
import { RIGHTS_TASK_EDIT } from '@/common/resources/rights'
import { RIGHTS_TASK_DELETE } from '@/common/resources/rights'

import { STATUS_MERGED } from '@/common/resources/statuses'
import { STATUS_CLOSED } from '@/common/resources/statuses'

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
						hidden: true
					},
					{
						id: 'name',
						validator: 'required|min:5'
					},
					{
						id: 'changeRequestId',
						validator: '',
						disabled: true,
						hidden: true
					}
				]
			},
			subtaskEditorOptions: {
				modalId: `subtask-editor`,
				title: 'Subtask Editor',
				emitName: 'subtask-saved',
				service: require('@/common/services/Subtasks').default,
				fields: [
					{
						id: 'id',
						validator: '',
						disabled: true,
						hidden: true
					},
					{
						id: 'name',
						validator: 'required|min:5'
					},
					{
						id: 'taskId',
						validator: '',
						disabled: true,
						hidden: true
					},
					{
						id: 'description',
						validator: ''
					},
					{
						id: 'technology',
						validator: '',
						type: 'select',
						options: Technologies
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
		id: Number,
		cr: Object
	},
	methods: {
		refreshSubtasks() {
			SubtasksService
				.getByTaskId(this.id)
				.then(response => {
					this.subtasks = response.data
				})
				.catch(() => this.$toaster.error('Error'))
		},
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
		onSubtaskSaved() {
			this.refreshSubtasks()
		},
		onSubtaskDeleted() {
			this.refreshSubtasks()
		},
		onEstimationSaved() {
			this.refreshSubtasks()
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
			return this.task !== null ? 'Task: ' + this.task.name : ''
		},
		taskId() {
			return this.task !== null ? this.task.id : null
		},
		hasCreateSubtaskAccess() {
			return Rights.check(this.myRole, RIGHTS_SUBTASK_CREATE)
		},
		hasEditTaskAccess() {
			return Rights.check(this.myRole, RIGHTS_TASK_EDIT)
		},
		hasDeleteTaskAccess() {
			return Rights.check(this.myRole, RIGHTS_TASK_DELETE)
		},
		isClosed() {
			return this.cr !== null ? this.cr.status === STATUS_CLOSED : false
		},
		isMerged() {
			return this.cr !== null ? this.cr.status === STATUS_MERGED : false
		},
		...mapGetters({
			myRole: GET_MY_ROLE
		})
	},
	components: {
		Subtask,
		Editor,
		Deleter
	}
}
</script>

