<template>
	<b-row>
		<b-col sm=12 md=12 lg=12 mx="auto">
			<b-card no-body v-if="identity">
				<h4 slot="header">
					My Profile
				</h4>

				<b-list-group flush>
					<b-list-group-item>
						Name: {{identity.name}}
					</b-list-group-item>

					<b-list-group-item>
						Role: {{identity.role}}
					</b-list-group-item>

					<b-list-group-item>
						Email: {{identity.email}}
					</b-list-group-item>

					<b-list-group-item>
						Created at: {{identity.created_at}}
					</b-list-group-item>
				</b-list-group>
			</b-card>

			<b-card no-body v-else="">
				<h4 slot="header">My Profile</h4>

				<b-card-body>
					<b-card-text>
						There is no info for the user
					</b-card-text>
				</b-card-body>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_IDENTITY } from '@/store/getter-types'
// import Task from "@/components/tasks/Task";

export default {
	data() {
		return {
			
		}
	},
	computed: {
		...mapGetters({
			identity: GET_IDENTITY
		})
	},
	beforeMount() {
		
	},
	components: {
		// Task
	}
}
</script>

