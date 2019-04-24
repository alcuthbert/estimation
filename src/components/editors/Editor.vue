<template>
    <!-- <b-modal
			:id="options.id"
			:ref="options.id"
			:title="options.title | ucfirst"
			@ok="onOk" 
			@cancel="onCancel"
			scrollable> -->
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
					:disabled="field.disabled"
					required
					v-validate="field.validator"
					:state="validateState(field.id)"
					:aria-describedby="`${field.id}-error`" />
				<b-form-invalid-feedback :id="`${field.id}-error`">
					{{ errors.first(field.id) }}
				</b-form-invalid-feedback>
            </b-form-group>
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
        onCancel() {
			// eslint-disable-next-line
			console.log("onCancel")
		},
		onOk(e) {
			e.preventDefault();

			this.$validator.validate().then(valid => {
				if (!valid) {
					return false;
				}

				// eslint-disable-next-line
				console.log("valid: data", this.data)

				// this.form[this.modelId.field] = this.modelId.value
				// this.data.forEach((value) => {
				// 	this.form[prop] = value
				// })
				// $$.each(this.data, function(key, value) {
				// 	this.form[key] = value
				// });

				this.options.service
					.save(this.form)
					.then(() => {
						this.$toaster.success('success')

						this.$emit(this.options.emitName, this.form)

						this.form = {}
					})
					.catch(() => {
						this.$toaster.error('Error')

						this.form = {}
					})
			})
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.errors.has(ref)
			}

			return null
		}
    },
	mounted() {
		// this.form = {}

		// eslint-disable-next-line
		// console.log("mounted data", this.data)

		// this.options.fields.forEach(field => {
		// 	this.form[field.id] = ''
		// })

		// this.$root.$on('bv::modal::show', () => {
		// 	if (this.data !== null && this.data !== undefined) {
		// 		// eslint-disable-next-line
		// 		// console.log("bv::modal::show data", this.data)
		// 	}
		// })
	}
}
</script>
