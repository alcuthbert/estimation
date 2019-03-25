<template>
  <div>
    <b-form >
      <b-form-group id="exampleInputGroup1" label="Email address:" label-for="email">
        <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email" />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Name" label-for="name">
        <b-form-input id="name" type="text" v-model="form.name" required />
      </b-form-group>

      <b-form-group id="exampleInputGroup3" label="Nickname" label-for="nickname">
        <b-form-input id="nickname" required v-model="form.nickname" />
      </b-form-group>

      <b-form-group id="exampleInputGroup4" label="Sex" label-for="gender">
        <b-form-select id="gender" :options="genders" required v-model="form.gender" />
      </b-form-group>

      <!-- <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          id: null,
          nickname: '',
          gender: ''
        },
        genders: [
          { text: 'Select One', value: null },
          { text: 'Male', value: 'M' },
          { text: 'Female', value: 'F' }
        ],
      }
    },
    props: {
        cr: Object,
        foo: String
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>
