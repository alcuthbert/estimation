<template>
	<div>
		<b-form @submit="onSubmit" @reset="onReset">
			<b-form-group :label="$t('message.name') | ucfirst" label-for="name">
				<b-form-input id="name" type="text" v-model="item.name" required />
			</b-form-group>

			<b-form-group :label="$t('message.version') | ucfirst" label-for="version">
				<b-form-input id="version" type="text" v-model="item.version" />
			</b-form-group>

			<b-form-group label="Jira" label-for="jira_link">
				<b-form-input id="jira_link" type="text" v-model="item.jira_link" />
			</b-form-group>

			<b-form-group :label="$t('message.project') | ucfirst" label-for="project">
				<b-form-input id="project" type="text" v-model="item.project" />
			</b-form-group>

			<b-button type="submit" variant="primary">{{ $t("message.submit") | ucfirst }}</b-button>
			<b-button type="reset" variant="secondary">{{ $t("message.cancel") | ucfirst }}</b-button>
		</b-form>
	</div>
</template>

<script>
import CRService from '@/common/services/ChangeRequests.js'
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			statuses: [
				{text: 'Select One', value: null},
				{text: 'Open', value: 'open'},
				{text: 'Closed', value: 'closed'},
				{text: 'Approved', value: 'approved'},
			],
			owners: [
				{text: 'Select One', value: null},
				{text: 'Noelia O\'Kon', value: 1},
				{text: 'Edwin Beier', value: 2},
			]
		}
	},
	props: {
		item: Object
	},
	computed: {
		...mapGetters({
			identity: "getIdentity"
		})
	},
	methods: {
		onReset() {
			this.$root.$emit('bv::hide::modal', 'cr-editor')
		},
		onSubmit() {
			CRService
				.save(this.item)
				.then((response) => {
					this.$emit('cr-saved', response.data)
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.log('cr save error', error)
				})

			this.$root.$emit('bv::hide::modal', 'cr-editor')
		}
	}
}
</script>
