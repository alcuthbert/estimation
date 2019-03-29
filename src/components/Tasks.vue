<template>
  <div class="row">
    <div class="col-lg-12">
      <h1>Tasks: #{{crId}}</h1>

      <b-button-group class="mb-3">
        <b-button variant="success">
          Create new
          <font-awesome-icon icon="plus-square"/>
        </b-button>
        <b-button variant="secondary">
          Merge
          <font-awesome-icon icon="object-ungroup"/>
        </b-button>
      </b-button-group>

      <vuetable ref="vuetable" :data="tasks" :fields="fields"></vuetable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vuetable from "vuetable-2/src/components/Vuetable";
// import CustomActions from "./helpers/CustomActions.vue";
// import Subtasks from './CRSubtasks'

export default {
  data() {
    return {
      tasks: [],
      fields: [
        { name: "id", title: "id" },
        { name: "name", title: "name" },
        {
          name: "__component:custom-actions",
          title: "Actions"
        }
      ]
    };
  },
  props: {
    crId: String
  },
  mounted() {
    axios.get("/api/tasks").then(response => {
      this.tasks = response.data.data.filter(task => {
        return task.cr_id == this.crId;
      });
    });
  },
  components: {
    Vuetable,
    // CustomActions
  }
};
</script>
