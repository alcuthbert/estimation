<template>
	<b-card no-body>
        <h4 slot="header">
			{{ title }}
			<b-button-group>
				<b-button
					size="md"
					variant="secondary"
					v-if="hasCreateSubtaskAccess"
					v-b-modal="`subtask-editor`">
					<font-awesome-icon icon="plus-square"/>
					Create subtask
				</b-button>

				<b-button
					size="md"
					variant="warning"
					v-if="hasEditTaskAccess"
					@click="selectTask(task)"
					v-b-modal="`task-editor-${id}`">
					<font-awesome-icon icon="edit"/>
					Edit
				</b-button>

				<b-button
					size="md"
					variant="danger"
					v-if="hasDeleteTaskAccess"
					v-b-modal="`task-delete-${id}`">
					<font-awesome-icon icon="trash"/>
					Delete
				</b-button>
			</b-button-group>
		</h4>

        <!-- <b-card-body v-for="subtask in subtasks" :key="subtask.id">
            <subtask :model="subtask"></subtask>
        </b-card-body> -->

		<subtask
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

import { RIGHTS_SUBTASK_CREATE } from '@/common/resources/rights'
import { RIGHTS_TASK_EDIT } from '@/common/resources/rights'
import { RIGHTS_TASK_DELETE } from '@/common/resources/rights'

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
				title: 'Subask Editor',
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
						validator: ''
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
		onSubtaskSaved() {
			SubtasksService
				.getByTaskId(this.id)
				.then(response => {
					this.subtasks = response.data
				})
				.catch(() => this.$toaster.error('Error'))
		},
		onSubtaskDeleted() {
			SubtasksService
				.getByTaskId(this.id)
				.then(response => {
					this.subtasks = response.data
				})
				.catch(() => this.$toaster.error('Error'))
		},
		onEstimationSaved(obj) {
			// eslint-disable-next-line
			console.log("Task. onEstimationSaved", obj)

			SubtasksService
				.getByTaskId(this.id)
				.then(response => {
					this.subtasks = response.data
				})
				.catch(() => this.$toaster.error('Error'))
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

