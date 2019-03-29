<template>
  <div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card my-3">
        <h5 class="card-header">Sign In</h5>

        <div class="card-body">
          <b-form @submit="onSubmit" v-if="show">
            <b-form-group label="Username" label-for="username">
              <b-form-input id="username" type="text" v-model="form.username" required/>
            </b-form-group>

            <b-form-group label="Password" label-for="password">
              <b-form-input id="password" type="password" v-model="form.password" required/>
            </b-form-group>

            <b-form-group id="exampleGroup4">
              <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                <b-form-checkbox value="me">Remember me</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="button" variant="warning">Forgot password</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from './../common/services/AuthService.js'
import RouteNames from './../routeNames.js'

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        checked: []
      },
      show: true
    };
  },
  methods: {
    onSubmit() {
      AuthService.login();
      this.$router.push({name: RouteNames.home});
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.password = "";
      this.form.usernamename = "";
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>