<template>
	<b-row>
		<b-col sm="12" md="12" lg="12" mx="auto">
			<b-card my="4" no-body>
				<h5 slot="header">{{ $t("message['change requests']") | ucfirst }}</h5>

				<b-card-body>
					<b-button-group class="mb-3">
						<b-button
								variant="primary"
								v-b-modal.cr-editor
								@click="selectRowItem()"
								v-if="hasCreateAccess">
							<font-awesome-icon icon="plus-square"/>
							{{ $t("message.create") | ucfirst }}
						</b-button>
						<b-button
								variant="secondary"
								@click="getItems()">
							<font-awesome-icon icon="sync"/>
							{{ $t("message.refresh") | ucfirst }}
						</b-button>
					</b-button-group>

					<b-row>
						<b-col md="4">
							<b-form-group :label="$t('message.filter') | ucfirst">
								<b-input-group>
									<b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
									<b-input-group-append>
										<b-button
											variant="primary"
											:disabled="!filter"
											@click="filter = ''"
										>{{ $t("message.clear") | ucfirst }}</b-button>
									</b-input-group-append>
								</b-input-group>
							</b-form-group>
						</b-col>

						<b-col md="4">
							<b-form-group :label="$t('message.sort') | ucfirst">
								<b-input-group>
									<b-form-select v-model="sortBy" :options="sortOptions"></b-form-select>
									<b-form-select v-model="sortDesc">
										<option :value="false">Asc</option>
										<option :value="true">Desc</option>
									</b-form-select>
								</b-input-group>
							</b-form-group>
						</b-col>

						<b-col md="4">
							<b-form-group :label="$t('message.per_page') | ucfirst">
								<b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
							</b-form-group>
						</b-col>
					</b-row>

					<b-table
						bordered
						hover
						selectable
						select-mode="single"
						selectedVariant="warning"
						:busy="isBusy"
						:items="items"
						:fields="fields"
						:current-page="currentPage"
						:per-page="perPage"
						:sort-by.sync="sortBy"
						:sort-desc.sync="sortDesc"
						:filter="filter"
						@filtered="onFiltered"
						>
						<div slot="table-busy" class="text-center text-primary my-2">
							<b-spinner class="align-middle" variant="secondary"></b-spinner>
							<strong>Loading...</strong>
						</div>

						<template slot="details" slot-scope="row">
							<b-form-checkbox
								v-model="row.detailsShowing"
								@change="row.toggleDetails"
								variant="success"
								>{{ row.detailsShowing ? 'Hide' : 'Show'}} details</b-form-checkbox>
						</template>

						<template slot="show" slot-scope="row">
							<b-button-group>
								<router-link :to="{name: $routeNames.changeRequest, params: {crId: row.item.id}}">
									<b-button size="sm" variant="primary">
										<font-awesome-icon icon="search"/>
									</b-button>
								</router-link>
							</b-button-group>
						</template>

						<template slot="actions" slot-scope="row">
							<b-button-group>
								<b-button size="sm"
										variant="success"
										v-if="hasApproveAccess && waitingForApprove(row.item)"
										@click="approve(row.item)">
									Approve
								</b-button>

								<!-- <b-button size="sm"
										variant="secondary"
										v-if="hasAssignAccess && approved(row.item)"
										@click="assign(row.item)">
									Assign1
								</b-button>

								<b-button size="sm"
										variant="secondary"
										v-if="hasAssignAccess && approved(row.item)"
										@click="assign(row.item)">
									Assign2
								</b-button> -->

								<b-button size="sm"
										variant="warning"
										v-b-modal.cr-editor
										@click="selectRowItem(row.item)"
										v-if="hasEditAccess">
									<font-awesome-icon icon="edit"/>
								</b-button>

								<b-button size="sm"
										variant="danger"
										v-b-modal.delete-modal
										@click="selectRowItem(row.item)"
										v-if="hasDeleteAccess">
									<font-awesome-icon icon="trash"/>
								</b-button>
							</b-button-group>
						</template>

						<template slot="row-details" slot-scope="row">
							<b-card>
								<ul>
									<li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
								</ul>
							</b-card>
						</template>
					</b-table>

					<b-row>
						<b-col md="6" class="my-1">
							<b-pagination
								v-model="currentPage"
								:total-rows="totalRows"
								:per-page="perPage"
								class="my-0"
								></b-pagination>
						</b-col>
					</b-row>
				</b-card-body>
			</b-card>
		</b-col>

		<c-r-editor
			modalId="cr-editor"
			:inputItem="selectedItem"
			@cr-saved="onCrSaved">
		</c-r-editor>

		<b-modal
				id="delete-modal"
				ref="delete-modal"
				title="Delete"
				@ok="onDeletionConfirmed()">
			<h3>Are you sure?</h3>
		</b-modal>
	</b-row>
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"
import CREditor from "@/components/editors/CREditor"
import CRs from "@/common/services/ChangeRequests"
import Rights from "@/common/services/Rights"
import { STATUS_WAITING_FOR_APPROVE } from '@/common/resources/statuses'
import { STATUS_APPROVED } from '@/common/resources/statuses'
import { RIGHTS_CR_CREATE } from '@/common/resources/rights'
import { RIGHTS_CR_EDIT } from '@/common/resources/rights'
import { RIGHTS_CR_DELETE } from '@/common/resources/rights'
import { RIGHTS_CR_APPROVE } from '@/common/resources/rights'
import { RIGHTS_CR_ASSIGN } from '@/common/resources/rights'
import { GET_MY_ROLE } from '@/store/getter-types'

export default {
	data() {
		return {
			isBusy: false,
			selectedItem: null,
			items: [],
			fields: [
				// { key: "details", title: "details", sortable: false },
				{ key: "show", title: "show", sortable: false },
				{ key: "id", title: "id", sortable: true },
				{ key: "name", title: "name", sortable: true },
				{ key: "number", title: "number", sortable: true },
				{ key: "status", title: "status", sortable: true },
				{ key: "jira_link", title: "jira_link", sortable: false },
				{ key: "owner", title: "owner", sortable: true },
				{ key: "version", title: "version", sortable: true },
				// { key: "created", title: "created", sortable: true },
				{ key: "project", title: "project", sortable: true },
				{ key: "actions", title: "actions", sortable: false }
			],
			currentPage: 1,
			perPage: 5,
			pageOptions: [1, 5, 10, 15, 20],
			sortBy: "id",
			sortOptions: [
				"id",
				"name",
				"number",
				"status",
				"owner",
				"version",
				"created",
				"project"
			],
			sortDesc: false,
			totalRows: 0,
			filter: null
		}
	},
	mounted() {
		this.getItems()
	},
	methods: {
		getItems() {
			this.isBusy = true

			CRs.getItems()
				.then(response => {
					this.isBusy = false

					this.items = response.data
					this.totalRows = this.items.length
				})
				.catch(() => {
					this.isBusy = false
					this.items = []
				})
		},
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
		selectRowItem(item = null) {
			this.selectedItem = (item !== null) ? Vue.util.extend({}, item) : null
		},
		onCrSaved(item) {
			const found = this.items.find(el => el.id === item.id)

			if (found) {
				Vue.util.extend(found, item)
			} else {
				this.items.push(item)
			}

			this.selectedItem = null
		},
		onDeletionConfirmed() {
			CRs.delete(this.selectedItem.id)
				.then(() => {
					const found = this.items.find(el => el.id === this.selectedItem.id)

					if (found) {
						this.items.splice(this.items.indexOf(found), 1)
					}

					this.selectedItem = null
				})
				.catch(error => {
					// eslint-disable-next-line
					console.log("onDeletionConfirmed err", error)

					this.selectedItem = null
				})
		},
		waitingForApprove(item) {
			return item.status === STATUS_WAITING_FOR_APPROVE
		},
		approved(item) {
			return item.status === STATUS_APPROVED
		},
		approve(item) {
			item.status = STATUS_APPROVED

			CRs
				.save(item)
				.then(() => {
					this.$toaster.success('Change-request has successfully approved')
				})
				.catch(() => {
					this.$toaster.error('Error on approve')
				})
		},
		assign() {
			
		}
	},
	computed: {
		hasCreateAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_CREATE)
		},
		hasEditAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_EDIT)
		},
		hasDeleteAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_DELETE)
		},
		hasApproveAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_APPROVE)
		},
		hasAssignAccess() {
			return Rights.check(this.myRole, RIGHTS_CR_ASSIGN)
		},
		...mapGetters({
			myRole: GET_MY_ROLE
		})
	},
	components: {
		CREditor
	}
}
</script>
