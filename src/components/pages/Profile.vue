<template>
	<b-row>
		<b-col sm=12 md=12 lg=12 mx="auto">
			<b-card no-body v-if="identity">
				<h4 slot="header">
					{{ $t('message.my_profile') | ucfirst }}
				</h4>

				<b-list-group flush>
					<b-list-group-item>
						{{ $t('message.name') | ucfirst }}: {{identity.name}}
					</b-list-group-item>

					<b-list-group-item>
						{{ $t('message.role') | ucfirst }}: {{identity.role}}
					</b-list-group-item>

					<b-list-group-item>
						Email: {{identity.email}}
					</b-list-group-item>

					<b-list-group-item>
						{{ $t('message.created') | ucfirst }}: {{identity.created_at}}
					</b-list-group-item>
				</b-list-group>
			</b-card>

			<b-card no-body v-else="">
				<h4 slot="header">{{ $t('message.my_profile') | ucfirst }}</h4>

				<b-card-body>
					<b-card-text>
						{{ $t('message.no_info') | ucfirst }}
					</b-card-text>
				</b-card-body>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_IDENTITY } from '@/store/getter-types'

export default {
	data() {
		return {
			
		}
	},
	computed: {
		...mapGetters({
			identity: GET_IDENTITY
		})
	}
}
</script>

