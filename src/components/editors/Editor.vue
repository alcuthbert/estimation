<template>
    <!-- <b-modal
			:id="options.id"
			:ref="options.id"
			:title="options.title | ucfirst"
			@ok="onOk" 
			@cancel="onCancel"
			scrollable> -->
        <b-form @submit="onSubmit" @reset="onReset">
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

			<b-button-group>
				<b-button type="submit" variant="primary" :disabled="validationFailed">
					{{ $t("message.submit") | ucfirst }}
					</b-button>
				<b-button type="reset" variant="secondary">
					{{ $t("message.cancel") | ucfirst }}
				</b-button>
			</b-button-group>
        </b-form>
    <!-- </b-modal> -->
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
			console.log("onReset")

			this.form = {}

			this.$root.$emit('bv::hide::modal', this.options.id)
		},
		onSubmit(e) {
			e.preventDefault();

			this.$validator.validate().then(valid => {
				if (!valid) {
					return false;
				}

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
		}
	},
	computed: {
		validationFailed() {
			return this.errors.any()
		}
	},
	mounted() {
		// this.form = {}

		// eslint-disable-next-line
		console.log("mounted. data", this.data)

		// this.options.fields.forEach(field => {
		// 	this.form[field.id] = null
		// })

		this.$root.$on('bv::modal::show', () => {
			if (this.data !== null && this.data !== undefined) {
				this.options.fields.forEach(field => {
					this.form[field.id] = this.data[field.id]
				})

				// eslint-disable-next-line
				console.log("bv::modal::show. form", this.form)
			} else {
				// eslint-disable-next-line
				console.log("bv::modal::show. null")
				
				// this.options.fields.forEach(field => {
				// 	this.form[field.id] = null
				// })
			}
		})
	}
}
</script>
