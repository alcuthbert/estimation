<template>
	<b-row>
		<b-col sm="12" md="12" lg="12" mx=auto>
			<b-card no-body my="4" v-if="cr">
				<b-card-header>
					<h4 slot="header">
						{{ $t('message.change_request') | ucfirst }}: {{ cr.name }}
					</h4>

					<b-button
							variant="primary"
							@click="approve()"
							v-if="hasApproveAccess && isWaitingForApprove">
						{{ $t('message.approve') | ucfirst }}
					</b-button>

					<b-button
							variant="primary"
							@click="close()"
							v-if="hasCloseAccess && isMerged">
						{{ $t('message.close') | ucfirst }}
					</b-button>
				</b-card-header>

				<b-card-body>
					<b-card-title>
						{{$t('message.status') | ucfirst}}: {{cr.status}}
					</b-card-title>
					<b-card-sub-title class="mb-3">
						{{ $t('message.project') | ucfirst }}: {{cr.project}}
					</b-card-sub-title>
					<b-card-sub-title class="mb-2">
						<a href="#" class="card-link">{{cr.jira_link}}</a>
					</b-card-sub-title>

					<b-row>
						<b-col sm="4">
							<b-list-group flush>
								<b-list-group-item>
									{{ $t('message.version') | ucfirst }}: {{cr.version}}
								</b-list-group-item>
								<b-list-group-item>
									{{ $t('message.owner') | ucfirst }}: {{cr.owner}}
								</b-list-group-item>
							</b-list-group>
						</b-col>

						<b-col sm="4">
							<b-list-group flush>
								<b-list-group-item>
									{{ $t('message.created') | ucfirst }}: {{cr.created}}
									</b-list-group-item>
								<b-list-group-item>
									{{ $t('message.project') | ucfirst }}: {{cr.project}}
								</b-list-group-item>
							</b-list-group>
						</b-col>

						<b-col sm="4">
							<b-list-group flush>
								<b-list-group-item>
									{{ $t('message.assignee') | ucfirst }} 1: {{cr.assignee_1 ? getAssigneeName(cr.assignee_1) : 'none'}}
									<b-button
										size="sm"
										variant="secondary"
										v-if="hasAssignAccess && isApproved"
										v-b-modal.assign-1>
										{{ $t('message.assign') | ucfirst }} 1
									</b-button>
								</b-list-group-item>

								<b-list-group-item>
									{{ $t('message.assignee') | ucfirst }} 2: {{cr.assignee_2 ? getAssigneeName(cr.assignee_2) : 'none'}}
									<b-button
										size="sm"
										variant="secondary"
										v-if="hasAssignAccess && isApproved"
										v-b-modal.assign-2>
										{{ $t('message.assign') | ucfirst }} 2
									</b-button>
								</b-list-group-item>
							</b-list-group>
						</b-col>

						<b-col sm="6">
							<b-button-group>
								<b-button
									size="lg"
									variant="secondary"
									v-if="hasCreateTaskAccess && !isMerged && !isClosed"
									@click="selectTask()"
									v-b-modal.task-editor>
									<font-awesome-icon icon="plus"/>
									{{ $t('message.create_task') | ucfirst }}
								</b-button>

								<b-button
									size="lg"
									variant="warning"
									v-if="hasMergeAccess && isAssigned && !isMerged && !isClosed"
									@click="merge()">
									<font-awesome-icon icon="clone"/>
									{{ $t('message.merge') | ucfirst }}
								</b-button>

								<b-button
									size="lg"
									variant="secondary"
									v-if="hasMergeAccess && isWaitingForMerge"
									@click="mergeCompleted()">
									<font-awesome-icon icon="check"/>
									{{ $t('message.complete_merge') | ucfirst }}
								</b-button>
							</b-button-group>
						</b-col>
					</b-row>
				</b-card-body>
			</b-card>

			<b-card no-body style="max-width: 20rem;" v-else>
				<h4 slot="header">CR Card</h4>

				<b-card-body>
					<b-card-text>
						{{ $t('message.no_info') | ucfirst }}
					</b-card-text>
				</b-card-body>
			</b-card>
		</b-col>

		<b-col sm="12" md="12" lg="12" mx=auto>
			<task
				:id="task.id"
				:cr="cr"
				v-for="task in tasks"
				:key="task.id"
				@task-deleted="onTaskDeleted"
				>
			</task>
		</b-col>

		<b-modal
				id="assign-1"
				ref="assign-1"
				title="Assign first"
				@ok="onAssignFirst()">
			<b-form>
				<b-form-group
					label="Assignee 1"
					label-for="assignee-1">
					<b-form-select
						id="assignee-1"
						name="assignee-1"
						v-model="assignee_1"
						:options="estimatorsFiltered">
					</b-form-select>
				</b-form-group>
			</b-form>
		</b-modal>

		<b-modal
				id="assign-2"
				ref="assign-2"
				title="Assign second"
				@ok="onAssignSecond()">
			<b-form>
				<b-form-group
					label="Assignee 2"
					label-for="assignee-2">
					<b-form-select
						id="assignee-2"
						name="assignee-2"
						v-model="assignee_2"
						:options="estimatorsFiltered">
					</b-form-select>
				</b-form-group>
			</b-form>
		</b-modal>

		<editor
			:options="taskEditorOptions"
			:data="taskEditorData"
			@task-saved="onTaskSaved">
		</editor>
	</b-row>
</template>

<script>
import Task from "@/components/tasks/Task"
import Editor from "@/components/editors/EditorModal"
import ChangeRequests from '@/common/services/ChangeRequests'
import Rights from "@/common/services/Rights"
import Users from "@/common/services/Users"

// import RouteNames from '@/routeNames.js'
import { mapGetters } from 'vuex'
import { GET_MY_ROLE } from '@/store/getter-types'

import { RIGHTS_CR_CLOSE } from '@/common/resources/rights'
import { RIGHTS_CR_APPROVE } from '@/common/resources/rights'
import { RIGHTS_CR_ASSIGN } from '@/common/resources/rights'
import { RIGHTS_CR_MERGE } from '@/common/resources/rights'

import { RIGHTS_TASK_CREATE } from '@/common/resources/rights'

import { STATUS_MERGED } from '@/common/resources/statuses'
import { STATUS_CLOSED } from '@/common/resources/statuses'
import { STATUS_APPROVED } from '@/common/resources/statuses'
import { STATUS_WAITING_FOR_APPROVE } from '@/common/resources/statuses'
import { STATUS_ASSIGNED } from '@/common/resources/statuses'
import { STATUS_WAITING_FOR_MERGE } from '@/common/resources/statuses'

export default {
	data() {
		return {
			cr: null,
			estimators: [],
			assignee_1: null,
			assignee_2: null,
			taskEditorOptions: {
				modalId: 'task-editor',
				title: 'Task Editor',
				emitName: 'task-saved',
				service: require('@/common/services/Tasks').default,
				fields: [
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
			taskEditorData: null
		};
	},
	props: ['crId'],
	methods: {
		refresh() {
			ChangeRequests
				.getById(this.crId)
				.then(response => {
					this.cr = response.data

					this.$toaster.success('Change-request info updated')
				})
		},
		close() {
			this.cr.status = STATUS_CLOSED

			ChangeRequests
				.save(this.cr)
				.then(() => {
					this.$toaster.success('Change-request has successfully closed')
				})
				.catch(() => {
					this.$toaster.error('Error on close')
				})
		},
		merge() {
			this.cr.status = STATUS_WAITING_FOR_MERGE

			ChangeRequests
				.save(this.cr)
				.then(() => {
					this.$toaster.success('Change-request is now ready for merge')
					this.refresh()
				})
				.catch(() => {
					this.$toaster.error('Error on merge')
				})
		},
		mergeCompleted() {
			this.cr.status = STATUS_MERGED

			ChangeRequests
				.save(this.cr)
				.then(() => {
					this.$toaster.success('Merge completed')
					this.refresh()
				})
				.catch(() => {
					this.$toaster.error('Error on merge complete')
				})
		},
		approve() {
			this.cr.status = STATUS_APPROVED

			ChangeRequests
				.save(this.cr)
				.then(() => {
					this.$toaster.success('Change-request has successfully approved')
				})
				.catch(() => {
					this.$toaster.error('Error on approve')
				})
		},
		onAssignFirst() {
			this.cr.assignee_1 = this.assignee_1

			if (this.cr.assignee_1 && this.cr.assignee_2) {
				this.cr.status = STATUS_ASSIGNED
			}

			ChangeRequests
				.save(this.cr)
				.then(() => {
					this.$toaster.success('Estimator has successfully assigned')
				})
				.catch(() => {
					this.$toaster.error('Error on assign')
				})
		},
		onAssignSecond() {
			this.cr.assignee_2 = this.assignee_2

			if (this.cr.assignee_1 && this.cr.assignee_2) {
				this.cr.status = STATUS_ASSIGNED
			}

			ChangeRequests
				.save(this.cr)
				.then(() => {
					this.$toaster.success('Estimator has successfully assigned')
				})
				.catch(() => {
					this.$toaster.error('Error on assign')
				})
		},
		getAssigneeName(id) {
			const found = this.estimators.find(estimator => estimator.value === id)

			return found ? found.text : 'none'
		},
		onTaskSaved() {
			this.refresh()
		},
		onTaskDeleted(task) {
			const found = this.cr.tasks.find(el => el.id === task.id)

			if (found) {
				this.cr.tasks.splice(this.cr.tasks.indexOf(found), 1)
			}
		},
		selectTask(item = null) {
			if (item === null) {
				this.taskEditorData = {
					changeRequestId: this.changeRequestId
				}
			}
		},
	},
	computed: {
		changeRequestId() {
			return this.cr === null ? null : this.cr.id
		},
		changeRequestName() {
			return this.cr === null ? null : this.cr.name
		},
		isClosed() {
			return this.cr.status === STATUS_CLOSED
		},
		isMerged() {
			return this.cr.status === STATUS_MERGED
		},
		isAssigned() {
			return this.cr.status === STATUS_ASSIGNED
		},
		isApproved() {
			return this.cr.status === STATUS_APPROVED
		},
		isWaitingForApprove() {
			return this.cr.status === STATUS_WAITING_FOR_APPROVE
		},
		isWaitingForMerge() {
			return this.cr.status === STATUS_WAITING_FOR_MERGE
		},
		hasCloseAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_CLOSE)
		},
		hasApproveAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_APPROVE)
		},
		hasAssignAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_ASSIGN)
		},
		hasCreateTaskAccess() {
			return Rights.check(this.myRole, RIGHTS_TASK_CREATE)
		},
		hasMergeAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_MERGE)
		},
		tasks() {
			return this.cr === null ? [] : this.cr.tasks
		},
		estimatorsFiltered() {
			return this.estimators.filter(estimator => {
				if (this.cr === null) {
					return estimator
				}

				if ((estimator.value === this.cr.assignee_1) || (estimator.value === this.cr.assignee_2)) {
					return false
				}

				return estimator
			})
		},
		...mapGetters({
			myRole: GET_MY_ROLE
		})
	},
	beforeMount() {
		ChangeRequests
			.getById(this.crId)
			.then(response => {
				this.cr = response.data
			})

		Users
			.findEstimators()
			.then(response => {
				response.data.forEach(el => {
					this.estimators.push({
						value: el.id,
						text: el.name
					})
				})
			})
		
	},
	components: {
		Task,
		Editor
	}
};
</script>
