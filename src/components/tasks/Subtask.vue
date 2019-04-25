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

		<b-button-group>
            <b-button
				size="md"
				variant="secondary"
				@click="selectEstimation()"
				v-b-modal="`estimation-editor`">
				Estimate
			</b-button>
        </b-button-group>

		<editor
			:options="estimationEditorOptions"
			:data="estimationEditorData"
			@estimation-saved="onEstimationSaved">
		</editor>

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
import { mapGetters } from 'vuex'

// import Estimation from "@/components/tasks/Estimation"
import EstimationsTable from "@/components/tasks/EstimationsTable"

import Editor from "@/components/editors/EditorModal"
import Deleter from "@/components/editors/DeleteModal"

import { GET_IDENTITY } from '@/store/getter-types'
import { GET_MY_ID } from '@/store/getter-types'

import { ESTIMATION_FIRST } from '@/common/resources/estimation-types'

export default {
	props: {
		model: Object
    },
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
						validator: 'required'
					}
				]
			},
			estimationEditorOptions: {
				modalId: `estimation-editor`,
				title: 'Estimation Editor',
				emitName: 'estimation-saved',
				service: require('@/common/services/Estimations').default,
				fields: [
					{
						id: 'id',
						validator: '',
						disabled: true,
						visible: false
					},
					{
						id: 'subtaskId',
						validator: '',
						disabled: true,
						visible: false
					},
					{
						id: 'type',
						validator: '',
						disabled: true,
						visible: false
					},
					{
						id: 'estimator',
						validator: '',
						disabled: true,
						visible: false
					},
					{
						id: 'dvk',
						validator: 'required'
					},
					{
						id: 'imp',
						validator: 'required'
					},
					{
						id: 'e_test',
						validator: 'required'
					},
					{
						id: 'e_test_tech',
						validator: 'required'
					}
				]
			},
			estimationEditorData: null,
			subtaskDeleteOptions: {
				modalId: `subtask-delete-${this.model.id}`,
				title: 'Delete Subtask',
				emitName: 'subtask-deleted',
				service: require('@/common/services/Subtasks').default
			}
		};
	},
    methods: {
        onSubtaskSaved(obj) {
            this.$emit('subtask-saved', obj)
        },
        onSubtaskDeleted(obj) {
            this.$emit('subtask-deleted', obj)
		},
		onEstimationSaved(obj) {
			this.$emit('estimation-saved', obj)

			// eslint-disable-next-line
			console.log("Subtask. onEstimationSaved", obj)
		},
		selectEstimation(item = null) {
			if (item === null) {
				this.estimationEditorData = {
					subtaskId: this.model.id,
					estimator: this.estimator,
					type: this.estimationType
				}
			}
		},
    },
    components: {
        // Estimation,
        EstimationsTable,
        Deleter,
        Editor
	},
	computed: {
		estimationType() {
			return ESTIMATION_FIRST
		},
		...mapGetters({
			identity: GET_IDENTITY,
			estimator: GET_MY_ID
		})
	}
}
</script>
