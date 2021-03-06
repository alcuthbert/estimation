<template>
    <b-card-body>
        <b-card-title>
            {{ $t('message.subtask') | ucfirst }}: {{ model.name }}
        </b-card-title>

        <b-card-sub-title mb="2">
            {{ $t('message.technology') | ucfirst }}: {{model.technology}}
        </b-card-sub-title>

        <b-card-text mb="2">
            {{model.description}}
        </b-card-text>

        <b-button-group mb="2">
            <b-button
				size="md"
				variant="warning"
				v-if="hasEditSubtaskAccess && !isMerged && !isClosed"
				v-b-modal="`subtask-editor-${model.id}`">
				<font-awesome-icon icon="edit"/>
				{{ $t('message.edit') | ucfirst }}
			</b-button>

			<b-button
				size="md"
				variant="danger"
				v-if="hasDeleteSubtaskAccess && !isMerged && !isClosed"
				v-b-modal="`subtask-delete-${model.id}`">
				<font-awesome-icon icon="trash"/>
				{{ $t('message.delete') | ucfirst }}
			</b-button>
        </b-button-group>

        <estimations-table
			v-if="model.estimations.length"
			:items="model.estimations"
			class="my-2">
		</estimations-table>

		<b-alert
			v-else-if="!model.estimations.length"
			variant="info"
			show
			class="my-2">
			{{ $t('message.no_estimations') | ucfirst }}
		</b-alert>

		<b-button-group class="my-2">
            <b-button
				size="md"
				variant="secondary"
				v-if="hasCreateEstimationAccess && model.estimations.length <= 1 && isAssigned"
				@click="selectEstimation()"
				v-b-modal="`estimation-editor`">
				{{ $t('message.estimate') | ucfirst }}
			</b-button>

			<b-button
				size="md"
				variant="warning"
				v-if="hasMergeAccess && isWaitingForMerge && model.estimations.length === 2"
				@click="selectFinalEstimation()"
				v-b-modal="`final-estimation-editor`">
				<font-awesome-icon icon="clone"/>
				{{ $t('message.merge') | ucfirst }}
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

		<editor
			:options="finalEstimationEditorOptions"
			:data="finalEstimationEditorData"
			@final-estimation-saved="onFinalEstimationSaved">
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
import EstimationsTable from "@/components/tasks/EstimationsTable"

import Editor from "@/components/editors/EditorModal"
import Deleter from "@/components/editors/DeleteModal"

import Rights from "@/common/services/Rights"
import { GET_MY_ROLE } from '@/store/getter-types'

import { RIGHTS_SUBTASK_EDIT } from '@/common/resources/rights'
import { RIGHTS_SUBTASK_DELETE } from '@/common/resources/rights'
import { RIGHTS_ESTIMATION_CREATE } from '@/common/resources/rights'
import { RIGHTS_CR_MERGE } from '@/common/resources/rights'

import { GET_IDENTITY } from '@/store/getter-types'
import { GET_MY_ID } from '@/store/getter-types'

import { STATUS_ASSIGNED } from '@/common/resources/statuses'
import { STATUS_WAITING_FOR_MERGE } from '@/common/resources/statuses'
import { STATUS_MERGED } from '@/common/resources/statuses'
import { STATUS_CLOSED } from '@/common/resources/statuses'

import { ESTIMATION_FIRST } from '@/common/resources/estimation-types'
import { ESTIMATION_SECOND } from '@/common/resources/estimation-types'
import { ESTIMATION_FINAL } from '@/common/resources/estimation-types'

import Technologies from '@/common/resources/technologies'

export default {
	props: {
		model: Object,
		cr: Object
    },
	data() {
		return {
			subtaskEditorOptions: {
				modalId: `subtask-editor-${this.model.id}`,
				title: 'subtask_editor',
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
				title: 'estimation_editor',
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
			finalEstimationEditorOptions: {
				modalId: `final-estimation-editor`,
				title: 'final_estimation',
				emitName: 'final-estimation-saved',
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
			finalEstimationEditorData: null,
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
		},
		onFinalEstimationSaved(obj) {
			// eslint-disable-next-line
			console.log("Subtask.onFinalEstimationSaved", this.model.estimations)

			this.$toaster.success('Estimations merged successfully')

			this.$emit('estimation-saved', obj)
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
		selectFinalEstimation(item = null) {
			if (item === null) {
				this.finalEstimationEditorData = {
					subtaskId: this.model.id,
					estimator: this.estimator,
					type: ESTIMATION_FINAL
				}
			}
		}
    },
    components: {
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
		hasMergeAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_MERGE)
		},
		isAssigned() {
			return this.cr !== null ? this.cr.status === STATUS_ASSIGNED : false
		},
		isWaitingForMerge() {
			return this.cr !== null ? this.cr.status === STATUS_WAITING_FOR_MERGE : false
		},
		isClosed() {
			return this.cr !== null ? this.cr.status === STATUS_CLOSED : false
		},
		isMerged() {
			return this.cr !== null ? this.cr.status === STATUS_MERGED : false
		},
		...mapGetters({
			identity: GET_IDENTITY,
			estimator: GET_MY_ID,
			myRole: GET_MY_ROLE
		})
	}
}
</script>
