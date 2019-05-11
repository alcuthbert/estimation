<template>
    <b-modal
			:id="options.modalId"
			:ref="options.modalId"
			:title="$t('message.' + options.title) | ucfirst"
			@ok="onOk"
			@cancel="onCancel"
			@shown="onShown"
			scrollable>
        <b-form>
            <b-form-group
					v-for="field in options.fields"
					:key="field.id"
					v-show="!field.hidden"
					:label="$t('message.' + field.id) | ucfirst"
					:label-for="field.id">
				<b-form-select v-if="field.type && field.type === 'select'"
					:id="field.id"
					:name="field.id"
					type="select"
					:options="field.options"
					v-model="form[field.id]"
					:disabled="field.disabled === true"
					required
					v-validate="field.validator"
					:state="validateState(field.id)"
					:aria-describedby="`${field.id}-error`">
				</b-form-select>

                <b-form-input v-else
					:id="field.id"
					:name="field.id"
					type="text"
					v-model="form[field.id]"
					:disabled="field.disabled === true"
					required
					v-validate="field.validator"
					:state="validateState(field.id)"
					:aria-describedby="`${field.id}-error`" >
				</b-form-input>
				
				<b-form-invalid-feedback :id="`${field.id}-error`">
					{{ errors.first(field.id) }}
				</b-form-invalid-feedback>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script>
export default {
	props: {
		options: Object,
		data: Object
	},
	data() {
		return {
			form: {}
		}
	},
    methods: {
        onCancel() {
			this.formToDefaults()

			this.$root.$emit('bv::hide::modal', this.options.modalId)
		},
		onOk(e) {
			e.preventDefault()

			this.$validator.validate().then(valid => {
				if (!valid) {
					return false;
				}

				this.options.service
					.save(this.form)
					.then(() => {
						this.$emit(this.options.emitName, this.form)

						this.$toaster.success(`Record(s) saved successfully`)

						this.formToDefaults()
					})
					.catch(() => {
						this.$toaster.error('Error')

						this.formToDefaults()
					})

				this.$root.$emit('bv::hide::modal', this.options.modalId)
			})
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.errors.has(ref)
			}

			return null
		},
		onShown(e) {
			if (this.data !== null && this.data !== undefined && e.modalId === this.options.modalId) {
				this.options.fields.forEach(field => {
					this.form[field.id] = this.data[field.id]
				})

				if (this.data.id) {
					this.$validator.validate()
				}
			}
		},
		formToDefaults() {
			Object.keys(this.form).forEach(fieldName => {
				this.$validator.flag(fieldName, {
					dirty: false,
					validated: false
				})
			})

			this.form = {}
		}
	},
	computed: {
		validationFailed() {
			return this.errors.any()
		}
	}
}
</script>
