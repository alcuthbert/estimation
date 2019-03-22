<template>
    <div class="row">
        <div class="col-sm-3 offset-sm-4">
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group
                    label="Username"
                    label-for="username">
                    <b-form-input
                    id="username"
                    type="text"
                    v-model="form.username"
                    required
                    placeholder="Username" />
                </b-form-group>

                <b-form-group label="Password" label-for="password">
                    <b-form-input
                    id="password"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Password" />
                </b-form-group>

                <b-form-group id="exampleGroup4">
                    <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                        <b-form-checkbox value="me">Remember me</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="default">Reset</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
          checked: []
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.password = ''
        this.form.usernamename = ''
        this.form.checked = []
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>