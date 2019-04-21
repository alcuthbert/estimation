<template>
	<b-row>
		<b-col sm="12" md="12" lg="12" mx=auto>
			<b-card no-body my="4" v-if="cr">
				<b-card-header>
					<h4 slot="header">{{ '#' + cr.id + ': ' + cr.name }}</h4>
					<b-button
							variant="primary"
							@click="close()"
							v-if="hasCloseAccess && isMerged">
						Close
					</b-button>
				</b-card-header>

				<b-card-body>
					<b-card-title>Status: {{cr.status}}</b-card-title>
					<b-card-sub-title class="mb-3">{{cr.project}}</b-card-sub-title>
					<b-card-sub-title class="mb-2">
						<a href="#" class="card-link">{{cr.jira_link}}</a>
					</b-card-sub-title>

					<b-row>
						<b-col sm="4">
							<b-list-group flush>
								<b-list-group-item>Version: {{cr.version}}</b-list-group-item>
								<b-list-group-item>Owner: {{cr.owner}}</b-list-group-item>
							</b-list-group>
						</b-col>
						<b-col sm="4">
							<b-list-group flush>
								<b-list-group-item>Created: {{cr.created}}</b-list-group-item>
								<b-list-group-item>Project: {{cr.project}}</b-list-group-item>
							</b-list-group>
						</b-col>
						<b-col sm="4">
							<b-list-group flush>
								<b-list-group-item>Assignee: Assigniee1</b-list-group-item>
								<b-list-group-item>Assignee: Assignee2</b-list-group-item>
							</b-list-group>
						</b-col>
					</b-row>
				</b-card-body>

				<b-card-body>
					<task :id="task.id" v-for="task in cr.tasks" :key="task.id"></task>
				</b-card-body>
			</b-card>

			<b-card no-body style="max-width: 20rem;" v-else>
				<h4 slot="header">CR Card</h4>

				<b-card-body>
					<b-card-text>There is no info</b-card-text>
				</b-card-body>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import Task from "@/components/tasks/Task";
import ChangeRequests from '@/common/services/ChangeRequests'
import Rights from "@/common/services/Rights"
import { mapGetters } from 'vuex';
import { GET_IDENTITY } from '@/store/getter-types'
import { ROLE_USER } from '@/common/resources/roles'
import { RIGHTS_CR_CLOSE } from '@/common/resources/rights'
import { STATUS_MERGED } from '@/common/resources/statuses'
import { STATUS_CLOSED } from '@/common/resources/statuses'

export default {
	data() {
		return {
			cr: null
		};
	},
	props: ['crId'],
	methods: {
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
		}
	},
	computed: {
		myRole() {
			if (this.identity === null || this.identity === undefined) {
				return ROLE_USER
			}

			return this.identity.role
		},
		isMerged() {
			return this.cr.status === STATUS_MERGED
		},
		hasCloseAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_CLOSE)
		},
		...mapGetters({
			identity: GET_IDENTITY
		})
	},
	mounted() {
		ChangeRequests
			.getById(this.crId)
			.then(response => {
				this.cr = response.data
			})
	},
	components: {
		Task
	}
};
</script>
