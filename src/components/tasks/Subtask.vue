<template>
    <b-card no-body>
        <h4 slot="header">Subtask {{model.id}}</h4>

        <b-card-body>
            <div v-for="estimation in model.estimations" :key="estimation.id">
                <estimation :model="estimation"></estimation>
            </div>
        </b-card-body>
    </b-card>
</template>


<script>
import Estimation from "@/components/tasks/Estimation"
export default {
	data() {
		return {
		};
	},
	props: {
		model: Object
    },
    components: {
        Estimation
    }
}
</script>
