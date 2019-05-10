<template>
	<b-row class="">
		<b-col class="mx-auto" sm="9" md="7" lg="5">
			<b-card no-body class="my-3" bg-variant="dark" text-variant="white">
				<b-card-header>
					{{ $t('message.sign_up') | ucfirst }}
					<lang></lang>
				</b-card-header>

				<b-card-body>
					<b-form @submit="onSubmit">
						<b-form-group :label="$t('message.username') | ucfirst" label-for="username">
							<b-form-input
								id="username"
								name="username"
								type="text"
								v-model="username"
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
								v-model="password"
								required
								v-validate="'required|min:6'"
								:state="validateState('password')"
								aria-describedby="password-error" />
							<b-form-invalid-feedback id="password-error">
								{{ errors.first('password') }}
							</b-form-invalid-feedback>
						</b-form-group>

						<b-form-group label="E-mail" label-for="email">
							<b-form-input
								id="email"
								name="email"
								type="email"
								v-model="email"
								v-validate="'email'"
								:state="validateState('email')"
								aria-describedby="email-error" />
							<b-form-invalid-feedback id="email-error">
								{{ errors.first('email') }}
							</b-form-invalid-feedback>
						</b-form-group>

						<b-button type="submit" variant="primary" :disabled="errors.any()" class="mr-2">
							{{ $t('message.submit') | ucfirst }}
						</b-button>

						<b-button variant="light" :to="{name: $routeNames.login}">
							{{ $t('message.back') | ucfirst }}
						</b-button>
					</b-form>
				</b-card-body>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import Lang from '@/components/helpers/Lang'
import AuthService from '@/common/services/AuthService.js'
import RouteNames from '@/routeNames.js'
import {ROLE_USER} from '@/common/resources/roles'

const md5 = require('js-md5');

export default {
	data() {
		return {
			username: "",
			password: "",
			email: ""
		}
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();

			const user = {
				name: this.username,
				password: md5(this.password),
				email: this.email,
				created_at: "",
				updated_at: "",
				role: ROLE_USER
			}

			AuthService
				.signup(user)
				.then(() => {
					this.$toaster.success('You have been successfully registered!', {timeout: 8000})
					
					this.$router.push({name: RouteNames.login})
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.log('error', error)
					
					this.$toaster.error('Something went wrong')
				})
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.errors.has(ref)
			}

			return null
		},
	},
	computed: {
		validationFailed() {
			return this.errors.any()
		},
	},
	components: {
		Lang
	}
}
</script>

