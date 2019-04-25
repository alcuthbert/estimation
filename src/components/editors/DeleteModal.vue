<template>
    <b-modal
            :id="options.modalId"
			:ref="options.modalId"
			:title="options.title | ucfirst"
            @ok="onDeletionConfirmed()">
        <h3>Are you sure?</h3>
    </b-modal>
</template>

<script>
export default {
    props: {
		options: Object,
		object: Object
	},
    methods: {
        onDeletionConfirmed() {
            // eslint-disable-next-line
            // console.log("onDeletionConfirmed ", this.objectId)

			this.options.service
                .delete(this.object.id)
				.then(() => {
					this.$emit(this.options.emitName, this.object)

                    this.$toaster.success(`Record(s) deleted successfully`)
				})
				.catch(error => {
					// eslint-disable-next-line
					console.log("onDeletionConfirmed err", error)
				})

            this.$root.$emit('bv::hide::modal', this.options.modalId)
		}
    }
}
</script>