<template>
    <b-card-body>
        <b-card-title>
            {{ '#' + model.id + ': ' + model.name }}
        </b-card-title>

        <b-card-sub-title mb="2">
            Technology: {{model.technology}}
        </b-card-sub-title>

        <b-card-text>
            {{model.description}}
        </b-card-text>

        <!-- <div v-for="estimation in model.estimations" :key="estimation.id">
            <estimation :model="estimation"></estimation>
        </div> -->

        <estimations-table :items="model.estimations"></estimations-table>
    </b-card-body>
</template>


<script>
// import Estimation from "@/components/tasks/Estimation"
import EstimationsTable from "@/components/tasks/EstimationsTable"

export default {
	data() {
		return {
		};
	},
	props: {
		model: Object
    },
    components: {
        // Estimation,
        EstimationsTable
    }
}
</script>
