<template>
	<div>
		<b-form @submit="onSubmit" @reset="onReset">
			<b-alert variant="danger" show>
				{{errors.all()}}
			</b-alert>

			<b-form-group :label="$t('message.name') | ucfirst" label-for="name">
				<b-form-input 
					id="name"
					name="name"
					type="text"
					v-model="item.name"
					required
					v-validate="'required|alpha_num|min:6'"
					:state="validateState('name')"
					aria-describedby="name-error" />
				<b-form-invalid-feedback id="name-error">
					{{ errors.first('name') }}
				</b-form-invalid-feedback>
			</b-form-group>

			<b-form-group :label="$t('message.number') | ucfirst" label-for="number">
				<b-form-input
					id="number"
					name="number"
					type="text"
					v-model="item.number"
					v-validate="'required|alpha_num'"
					:state="validateState('number')"
					aria-describedby="number-error" />
				<b-form-invalid-feedback id="number-error">
					{{ errors.first('number') }}
				</b-form-invalid-feedback>
			</b-form-group>

			<b-form-group :label="$t('message.version') | ucfirst" label-for="version">
				<b-form-input 
					id="version"
					name="version"
					type="text"
					v-model="item.version"
					v-validate="'alpha_num'"
					:state="validateState('version')"
					aria-describedby="version-error" />
				<b-form-invalid-feedback id="version-error">
					{{ errors.first('version') }}
				</b-form-invalid-feedback>
			</b-form-group>

			<b-form-group label="Jira" label-for="jira-link">
				<b-form-input
					id="jira-link"
					name="jira-link"
					type="text"
					v-model="item.jira_link"
					v-validate="{url: {require_protocol: true }}"
					:state="validateState('jira-link')"
					aria-describedby="jira-link-error" />
				<b-form-invalid-feedback id="jira-link-error">
					{{ errors.first('jira-link') }}
				</b-form-invalid-feedback>
			</b-form-group>

			<b-form-group :label="$t('message.project') | ucfirst" label-for="project">
				<b-form-input 
					id="project"
					name="project"
					type="text"
					v-model="item.project"
					v-validate="'alpha_num'"
					:state="validateState('project')"
					aria-describedby="project-error" />
				<b-form-invalid-feedback id="project-error">
					{{ errors.first('project') }}
				</b-form-invalid-feedback>
			</b-form-group>

			<b-button type="submit" variant="primary" :disabled="validationFailed">
				{{ $t("message.submit") | ucfirst }}
				</b-button>
			<b-button type="reset" variant="secondary">
				{{ $t("message.cancel") | ucfirst }}
			</b-button>
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
		validationFailed() {
			return this.errors.any()
		},
		...mapGetters({
			identity: "getIdentity"
		})
	},
	methods: {
		onReset() {
			this.$root.$emit('bv::hide::modal', 'cr-editor')
		},
		onSubmit(e) {
			e.preventDefault();

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
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.errors.has(ref)
			}

			return null
		},
	}
}
</script>
