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

        <b-button-group>
            <b-button
				size="md"
				variant="warning"
				v-b-modal="`subtask-editor-${model.id}`">
				<font-awesome-icon icon="edit"/>
				Edit
			</b-button>

			<b-button
				size="md"
				variant="danger"
				v-b-modal="`subtask-delete-${model.id}`">
				<font-awesome-icon icon="trash"/>
				Delete
			</b-button>
        </b-button-group>

        <!-- <div v-for="estimation in model.estimations" :key="estimation.id">
            <estimation :model="estimation"></estimation>
        </div> -->

        <estimations-table :items="model.estimations"></estimations-table>

        <editor
			:options="subtaskEditorOptions"
			:data="model"
			@subtask-saved="onSubtaskSaved">
		</editor>

		<deleter
			:options="subtaskDeleteOptions"
			:object="model"
			@subtask-deleted="onSubtaskDeleted">
		</deleter>
    </b-card-body>
</template>


<script>
// import Estimation from "@/components/tasks/Estimation"
import EstimationsTable from "@/components/tasks/EstimationsTable"

import Editor from "@/components/editors/EditorModal"
import Deleter from "@/components/editors/DeleteModal"

export default {
	data() {
		return {
			subtaskEditorOptions: {
				modalId: `subtask-editor-${this.model.id}`,
				title: 'Subtask Editor',
				emitName: 'subtask-saved',
				service: require('@/common/services/Subtasks').default,
				fields: [
					{
						id: 'id',
						validator: '',
						disabled: true,
						visible: false
					},
					{
						id: 'name',
						validator: 'required|min:5'
					},
					{
						id: 'taskId',
						validator: '',
						disabled: true,
						visible: false
					},
					{
						id: 'description',
						validator: ''
					},
					{
						id: 'technology',
						validator: ''
					}
				]
			},
			subtaskDeleteOptions: {
				modalId: `subtask-delete-${this.model.id}`,
				title: 'Delete Subtask',
				emitName: 'subtask-deleted',
				service: require('@/common/services/Subtasks').default
			}
		};
	},
	props: {
		model: Object
    },
    methods: {
        onSubtaskSaved(obj) {
            this.$emit('subtask-saved', obj)
        },
        onSubtaskDeleted(obj) {
            this.$emit('subtask-deleted', obj)
        }
    },
    components: {
        // Estimation,
        EstimationsTable,
        Deleter,
        Editor
    },
    computed: {
        id() {
            return this.model !== null ? this.model.id : null
        }
    }
}
</script>
