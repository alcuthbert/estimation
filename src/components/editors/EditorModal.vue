<template>
    <b-modal
			:id="options.id"
			:ref="options.id"
			:title="options.title | ucfirst"
			@ok="onSubmit"
			@cancel="onReset"
			@shown="onShown"
			scrollable>
        <b-form>
            <b-form-group
					v-for="field in options.fields"
					:key="field.id"
					:label="field.id | ucfirst"
					:label-for="field.id">
                <b-form-input 
					:id="field.id"
					:name="field.id"
					type="text"
					v-model="form[field.id]"
					:disabled="field.disabled === true"
					required
					v-validate="field.validator"
					:state="validateState(field.id)"
					:aria-describedby="`${field.id}-error`" />
				<b-form-invalid-feedback :id="`${field.id}-error`">
					{{ errors.first(field.id) }}
				</b-form-invalid-feedback>
            </b-form-group>

			<!-- <b-button-group>
				<b-button type="submit" variant="primary" :disabled="validationFailed">
					{{ $t("message.submit") | ucfirst }}
					</b-button>
				<b-button type="reset" variant="secondary">
					{{ $t("message.cancel") | ucfirst }}
				</b-button>
			</b-button-group> -->
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
        onReset() {
			// eslint-disable-next-line
			console.log("onReset", this.options.id)

			this.form = {}

			this.$root.$emit('bv::hide::modal', this.options.id)
		},
		onSubmit(e) {
			e.preventDefault();

			this.$validator.validate().then(valid => {
				if (!valid) {
					return false;
				}

				// eslint-disable-next-line
				console.log("valid: data", this.data)

				this.options.service
					.save(this.form)
					.then(() => {
						this.$emit(this.options.emitName, this.form)

						this.$toaster.success(`Record(s) saved successfully`)

						this.form = {}
					})
					.catch(() => {
						this.$toaster.error('Error')

						this.form = {}
					})

				this.$root.$emit('bv::hide::modal', this.options.id)
			})
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.errors.has(ref)
			}

			return null
		},
		onShown(e) {
			// eslint-disable-next-line
			console.log("onShown. e", e)

			// eslint-disable-next-line
			console.log("onShown. data", this.data)

			if (this.data !== null && this.data !== undefined && e.modalId === this.options.id) {
				this.options.fields.forEach(field => {
					this.form[field.id] = this.data[field.id]
				})

				this.$validator.validate()

				// eslint-disable-next-line
				console.log("this.data !== null. form", this.form)
			} else {
				// eslint-disable-next-line
				console.log("this.data === null", this.form)
			}
		},
	},
	computed: {
		validationFailed() {
			return this.errors.any()
		}
	}
}
</script>
