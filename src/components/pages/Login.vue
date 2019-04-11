<template>
	<div class="row">
		<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
			<div class="card my-3">
				<h5 class="card-header">
					{{ $t('message.signin') | ucfirst }}
					<lang></lang>
				</h5>

				<div class="card-body">
					<b-form @submit="onSubmit">
						<b-alert v-if="serverError" variant=danger show>
							Username and password do not match
						</b-alert>

						<b-form-group :label="$t('message.username') | ucfirst" label-for="username">
							<b-form-input
								id="username"
								name="username"
								type="text"
								v-model="form.username"
								required
								v-validate="'required|min:6'"
								:state="validateState('username')"
								aria-describedby="username-error"/>
							<b-form-invalid-feedback id="username-error">
								{{ errors.first('username') }}
							</b-form-invalid-feedback>
						</b-form-group>

						<b-form-group :label="$t('message.password') | ucfirst" label-for="password">
							<b-form-input
								id="password"
								name="password"
								type="password"
								v-model="form.password"
								required
								v-validate="'required|min:6'"
								:state="validateState('password')"
								aria-describedby="password-error" />
							<b-form-invalid-feedback id="password-error">
								{{ errors.first('password') }}
							</b-form-invalid-feedback>
						</b-form-group>

						<b-form-group>
							<b-link href="#foo">
								{{ $t('message.forgot_password') | ucfirst }}
							</b-link>
						</b-form-group>

						<b-button type="submit" variant="primary" :disabled="validationFailed">
							{{ $t('message.submit') | ucfirst }}
						</b-button>
						<b-button type="button" variant="secondary" :to="{name: $routeNames.signup}">
							{{ $t('message.sign_up') | ucfirst }}
						</b-button>
					</b-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthService from '@/common/services/AuthService.js'
import RouteNames from '@/routeNames.js'
import {MUTATION_SET_IDENTITY} from './../../mutationTypes.js'
import Lang from '@/components/helpers/Lang'

const md5 = require('js-md5');

export default {
	data() {
		return {
			form: {
				username: "",
				password: "",
			},
			serverError: false
		};
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();

			const user = {
				username: this.form.username,
				password: md5(this.form.password)
			}

			AuthService
				.login(user)
				.then((response) => {
					const identity = response.data[0];

					this.$store.commit(MUTATION_SET_IDENTITY, identity)

					this.$router.push({name: RouteNames.home})

					this.$toaster.success('Welcome!')
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.log('error', error)

					this.$toaster.error('Something went wrong')

					this.serverError = true
					this.$router.push({name: RouteNames.login})
				})
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.errors.has(ref)
			}

			return null
		},
		onReset() {
			// evt.preventDefault();
		}
	},
	computed: {
		validationFailed() {
			return this.errors.any()
		}
	},
	components: {
		Lang
	}
}
</script>