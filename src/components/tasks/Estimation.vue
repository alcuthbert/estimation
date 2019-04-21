<template>
    <b-form inline>
        <label
            class="mr-sm-2"
            for="estimator">
            Estimator
        </label>
        <b-input id="estimator" v-model="model.estimator"></b-input>

        <label
            class="mr-sm-2"
            for="dvk">
            DVK
        </label>
        <b-input id="dvk" v-model="model.dvk"></b-input>

        <label
            class="mr-sm-2"
            for="imp">
            IMP
        </label>
        <b-input id="imp" v-model="model.imp"></b-input>

        <label
            class="mr-sm-2"
            for="e-test">
            E-Test
        </label>
        <b-input id="e-test" v-model="model.e_test"></b-input>

        <label
            class="mr-sm-2"
            for="e-test-tech">
            E-Test-tech
        </label>
        <b-input id="e-test-tech" v-model="model.e_test_tech"></b-input>
    </b-form>
</template>

<script>
export default {
    data() {
		return {
            
		};
	},
	props: {
		model: Object
    }
}
</script>

