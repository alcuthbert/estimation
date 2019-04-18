<template>
    <div>
        <h3>Subtask {{model.id}}</h3>
        <div v-for="estimation in model.estimations" :key="estimation.id">
            <estimation :model="estimation"></estimation>
        </div>
    </div>
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
