<template>
    <b-card-body>
        <b-card-title>
            {{ '#' + model.id + ': ' + model.name }}
        </b-card-title>

        <b-card-sub-title mb="2">
            Technology: {{model.technology}}
        </b-card-sub-title>

        <b-card-text mb="2">
            {{model.description}}
        </b-card-text>

        <b-button-group mb="2">
            <b-button
				size="md"
				variant="warning"
				v-if="hasEditSubtaskAccess"
				v-b-modal="`subtask-editor-${model.id}`">
				<font-awesome-icon icon="edit"/>
				Edit
			</b-button>

			<b-button
				size="md"
				variant="danger"
				v-if="hasDeleteSubtaskAccess"
				v-b-modal="`subtask-delete-${model.id}`">
				<font-awesome-icon icon="trash"/>
				Delete
			</b-button>
        </b-button-group>

        <!-- <div v-for="estimation in model.estimations" :key="estimation.id">
            <estimation :model="estimation"></estimation>
        </div> -->

        <estimations-table
			v-if="model.estimations.length"
			:items="model.estimations"
			class="my-2">
		</estimations-table>

		<b-alert
			v-else
			variant="warning"
			show
			class="my-2">
			There are no estimations
		</b-alert>

		<b-button-group class="my-2">
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

import Rights from "@/common/services/Rights"
import { GET_MY_ROLE } from '@/store/getter-types'

import { RIGHTS_SUBTASK_EDIT } from '@/common/resources/rights'
import { RIGHTS_SUBTASK_DELETE } from '@/common/resources/rights'
import { RIGHTS_ESTIMATION_CREATE } from '@/common/resources/rights'

import { GET_IDENTITY } from '@/store/getter-types'
import { GET_MY_ID } from '@/store/getter-types'

import { ESTIMATION_FIRST } from '@/common/resources/estimation-types'
import { ESTIMATION_SECOND } from '@/common/resources/estimation-types'

import Technologies from '@/common/resources/technologies'

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
						hidden: true
					},
					{
						id: 'name',
						validator: 'required|min:5'
					},
					{
						id: 'taskId',
						validator: '',
						disabled: true,
						hidden: true
					},
					{
						id: 'description',
						validator: ''
					},
					{
						id: 'technology',
						validator: 'required',
						type: 'select',
						options: Technologies
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
						hidden: true
					},
					{
						id: 'subtaskId',
						validator: '',
						disabled: true,
						hidden: true
					},
					{
						id: 'type',
						validator: '',
						disabled: true,
						hidden: true
					},
					{
						id: 'estimator',
						validator: '',
						disabled: true,
						hidden: true
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
			switch(this.model.estimations.length) {
				case 0:
					return ESTIMATION_FIRST
				case 1:
					return ESTIMATION_SECOND
			}

			return null
		},
		hasEditSubtaskAccess() {
			return Rights.check(this.myRole, RIGHTS_SUBTASK_EDIT)
		},
		hasDeleteSubtaskAccess() {
			return Rights.check(this.myRole, RIGHTS_SUBTASK_DELETE)
		},
		hasCreateEstimationAccess() {
			return Rights.check(this.myRole, RIGHTS_ESTIMATION_CREATE)
		},
		...mapGetters({
			identity: GET_IDENTITY,
			estimator: GET_MY_ID,
			myRole: GET_MY_ROLE
		})
	}
}
</script>
