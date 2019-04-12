<template>
	<div class="row">
		<div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
			<b-card no-body class="my-4" v-if="cr">
				<h4 slot="header">{{ '#' + cr.id + ': ' + cr.name }}</h4>
				<b-card-body>
					<b-card-title>Status: {{cr.status}}</b-card-title>
					<b-card-sub-title class="mb-3">{{cr.project}}</b-card-sub-title>
					<b-card-sub-title class="mb-2">
						<a href="#" class="card-link">{{cr.jira_link}}</a>
					</b-card-sub-title>

					<div class="row">
						<div class="col-sm-4">
							<b-list-group flush>
								<b-list-group-item>Version: {{cr.version}}</b-list-group-item>
								<b-list-group-item>Owner: {{cr.owner}}</b-list-group-item>
							</b-list-group>
						</div>
						<div class="col-sm-4">
							<b-list-group flush>
								<b-list-group-item>Created: {{cr.created}}</b-list-group-item>
								<b-list-group-item>Project: {{cr.project}}</b-list-group-item>
							</b-list-group>
						</div>
						<div class="col-sm-4">
							<b-list-group flush>
								<b-list-group-item>Assignee: Assigniee1</b-list-group-item>
								<b-list-group-item>Assignee: Assignee2</b-list-group-item>
							</b-list-group>
						</div>
					</div>
				</b-card-body>

				<b-card-body>
					<tasks :cr-id="crId"></tasks>
				</b-card-body>
			</b-card>

			<b-card no-body style="max-width: 20rem;" v-else>
				<h4 slot="header">CR Card</h4>

				<b-card-body>
					<b-card-text>There is no info</b-card-text>
				</b-card-body>
			</b-card>
		</div>
	</div>
</template>

<script>
import Tasks from "@/components/Tasks";
import ChangeRequests from '@/common/services/ChangeRequests'

export default {
	data() {
		return {
			cr: null
		};
	},
	props: {
		crId: Number
	},
	computed: {

	},
	mounted() {
		ChangeRequests
			.getById(this.crId)
			.then(response => {
				this.cr = response.data
			})
	},
	components: {
		Tasks
	}
};
</script>
