<template>
	<b-modal
		:id="modalId"
		:ref="modalId"
		header-bg-variant="default"
		title="Change-Request Editor"
		scrollable
		@shown="onShown"
		@cancel="onCancel"
		@ok="onSubmit">
		<b-form>
			<b-form-group :label="$t('message.name') | ucfirst" label-for="name">
				<b-form-input 
					id="name"
					name="name"
					type="text"
					v-model="form.name"
					required
					v-validate="'required|min:4'"
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
					required
					v-model="form.number"
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
					v-model="form.version"
					v-validate=""
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
					v-model="form.jira_link"
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
					v-model="form.project"
					required
					v-validate="'alpha_num'"
					:state="validateState('project')"
					aria-describedby="project-error" />
				<b-form-invalid-feedback id="project-error">
					{{ errors.first('project') }}
				</b-form-invalid-feedback>
			</b-form-group>

			<b-form-fieldset label="Tasks">
				<b-button variant="secondary" @click="addTask">
					Add
				</b-button>

				<b-form-group v-for="task in tasks" :key="task.id">
					<b-form-input v-model="task.name" />
				</b-form-group>
			</b-form-fieldset>
		</b-form>
	</b-modal>
</template>

<script>
import Vue from "vue"
import CRService from '@/common/services/ChangeRequests'
import { mapGetters } from "vuex";
import { GET_IDENTITY } from '@/store/getter-types'
import { STATUS_WAITING_FOR_APPROVE } from "@/common/resources/statuses"

export default {
	data() {
		return {
			form: {
				id: null,
				name: "",
				number: "",
				status: STATUS_WAITING_FOR_APPROVE,
				jira_link: "",
				owner: this.myId,
				version: "",
				project: "",
				created: "",
				assignee_1: null,
				assignee_2: null
			},
			tasks: []
		}
	},
	props: {
		modalId: String,
		inputItem: Object
	},
	computed: {
		validationFailed() {
			return this.errors.any()
		},
		myId() {
			return (this.identity !== null && this.identity !== undefined) ? this.identity.id : null
		},
		...mapGetters({
			identity: GET_IDENTITY
		})
	},
	methods: {
		onCancel() {
			this.formToDefaults()

			this.$root.$emit('bv::hide::modal', this.modalId)
		},
		onSubmit(e) {
			e.preventDefault();

			this.$validator.validate().then(valid => {
				if (!valid) {
					return false;
				}

				CRService
					.save(this.form)
					.then((response) => {
						this.form.id = response.data.id

						this.tasks.forEach(task => {
							task.changeRequestId = this.form.id
						})
						
						return CRService.saveTasks(this.form.id, this.tasks)
					})
					.then(() => {
						this.$emit('cr-saved', this.form)

						this.$toaster.success(`Record(s) saved successfully`)

						this.formToDefaults()
					})
					.catch((error) => {
						// eslint-disable-next-line
						console.log('cr save error', error)

						this.$toaster.error('Error while saving')

						this.formToDefaults()
					})

				this.$root.$emit('bv::hide::modal', this.modalId)
			})
		},
		onShown(e) {
			if (this.inputItem !== null && this.inputItem !== undefined && e.modalId === this.modalId) {
				Vue.util.extend(this.form, this.inputItem)

				// eslint-disable-next-line
				// console.log('this.inputItem !== null', this.inputItem)

				if (this.inputItem.id) {
					CRService
						.getTasks(this.inputItem.id)
						.then(res => this.tasks = res.data)

					this.$validator.validate()
				}
			} else {
				this.formToDefaults()
			}
		},
		addTask() {
			this.tasks.push({
				id: null,
				changeRequestId: this.form.id,
				name: ""
			})
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.errors.has(ref)
			}

			return null
		},
		formToDefaults() {
			this.form = {
				id: null,
				name: "",
				number: "",
				status: STATUS_WAITING_FOR_APPROVE,
				jira_link: "",
				owner: this.myId,
				version: "",
				project: "",
				created: "",
				assignee_1: null,
				assignee_2: null
			}

			this.tasks = []
		}
	}
}
</script>
