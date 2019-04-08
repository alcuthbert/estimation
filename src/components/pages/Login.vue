<template>
	<div class="row">
		<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
			<div class="card my-3">
			<h5 class="card-header">
				{{ $t('message.signin') | ucfirst }}
				<b-dropdown text="Button text via Prop" variant="default">
					<template slot="button-content">
						<flag :iso="$i18n.locale === 'ru' ? 'ru' : 'gb'" />
					</template>
					<b-dropdown-item href="#" @click="$i18n.locale = 'ru'">
						<flag iso="ru" />
						Русский
					</b-dropdown-item>
					<b-dropdown-item href="#" @click="$i18n.locale = 'en'">
						<flag iso="gb" />
						English
					</b-dropdown-item>
				</b-dropdown>
			</h5>

			<div class="card-body">
				<b-form @submit="onSubmit" v-if="show">
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

					<b-form-group id="exampleGroup4">
						<b-form-checkbox-group v-model="form.checked" id="exampleChecks">
						<b-form-checkbox value="me">
							{{ $t('message.remember_me') | ucfirst }}
						</b-form-checkbox>
						</b-form-checkbox-group>
					</b-form-group>

					<b-button type="submit" variant="primary" :disabled="validationFailed">
						{{ $t('message.submit') | ucfirst }}
					</b-button>
					<b-button type="button" variant="secondary">
						{{ $t('message.forgot_password') | ucfirst }}
					</b-button>
				</b-form>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthService from './../../common/services/AuthService.js'
import RouteNames from './../../routeNames.js'
import {MUTATION_SET_IDENTITY} from './../../mutationTypes.js'

export default {
	data() {
		return {
			form: {
				username: "",
				password: "",
				checked: []
			},
			show: true,
			serverError: false
		};
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();

			const user = {
				username: this.form.username,
				password: this.form.password
			}

			AuthService
				.login(user)
				.then(() => {
					this.$router.push({name: RouteNames.home})
					this.$store.commit(MUTATION_SET_IDENTITY, {name: user.username})
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.log('error', error)

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
	}
}
</script>