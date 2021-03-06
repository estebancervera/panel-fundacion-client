<template>
	<v-container>
		<v-alert
			v-model="alert"
			transition="slide-y-transition"
			border="left"
			close-text="Close Alert"
			:type="alertType"
			dismissible
		>
			{{ alertMessage }}
		</v-alert>
		<v-row justify="space-around">
			<v-img max-height="250" max-width="500" src="../assets/IMG_LOGO.jpg"></v-img>
		</v-row>
		<v-row justify="space-around">
			<v-card outlined elevation="2" shaped width="600" class="pa-6" color="secondary">
				<validation-observer ref="observer" v-slot="{ invalid }">
					<form @submit.prevent="submit">
						<validation-provider v-slot="{ errors }" name="Email" rules="required|email">
							<v-text-field v-model="email" :error-messages="errors" label="Email" required></v-text-field>
						</validation-provider>

						<validation-provider v-slot="{ errors }" name="Contraseña" rules="required">
							<v-text-field
								v-model="password"
								:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								:error-messages="errors"
								:type="show1 ? 'text' : 'password'"
								name="input-10-1"
								label="Contraseña"
								@click:append="show1 = !show1"
							></v-text-field>
						</validation-provider>

						<v-btn class="mr-4" type="submit" :disabled="invalid" color="primary">
							Iniciar Sesión
						</v-btn>
					</form>
				</validation-observer>
			</v-card>
		</v-row>
		<v-dialog v-model="loadingDialog" hide-overlay persistent width="100">
			<v-card color="primary" dark>
				<v-card-text class="text-center">
					<v-progress-circular indeterminate color="white" size="50" class="mt-4"> </v-progress-circular>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

extend('digits', {
	...digits,
	message: 'El campo {_field_} necesita ser de {length} digitos. ({_value_})'
});

extend('required', {
	...required,
	message: 'El campo {_field_} no puede estar vacio'
});

extend('max', {
	...max,
	message: '{_field_} may not be greater than {length} characters'
});

extend('regex', {
	...regex,
	message: '{_field_} {_value_} does not match {regex}'
});

extend('email', {
	...email,
	message: 'Email no es valido'
});

export default {
	components: {
		ValidationProvider,
		ValidationObserver
	},
	data: () => ({
		email: '',
		password: '',
		remember: false,
		show1: false,
		loadingDialog: false,

		alert: false,
		alertMessage: '',
		alertType: 'error'
	}),

	methods: {
		submit() {
			this.$refs.observer.validate();
			//login
			this.sendLogin();
		},
		setupAlert(active, message, type) {
			this.alert = active;
			this.alertMessage = message;
			this.alertType = type;
		},
		clear() {
			this.name = '';
			this.password = '';
			this.phoneNumber = '';
			this.email = '';
			this.select = null;
			this.checkbox = null;
			this.$refs.observer.reset();
		},
		async sendLogin() {
			try {
				this.loadingDialog = true;
				const formData = new FormData();
				formData.append('email', this.email);
				formData.append('password', this.password);

				const requestOptions = {
					method: 'POST',
					body: formData
				};
				this.clear();
				await fetch(process.env.VUE_APP_API_URL + 'login/', requestOptions)
					.then(response => response.json())
					.then(response => {
						console.log(response);
						try {
							localStorage.setItem('user', JSON.stringify(response.user));
							localStorage.setItem('jwt', response.token);

							if (localStorage.getItem('jwt') != null) {
								this.loadingDialog = false;
								this.$router.push('/admin/people');
							}
						} catch (error) {
							console.log(error);
							this.setupAlert(true, error, 'error');
							//show Alert
							this.loadingDialog = false;
						}
					});
			} catch (error) {
				this.setupAlert(true, 'Email o Contraseña es incorrecta.', 'error');
				this.loadingDialog = false;
			}
		}
	}
};
</script>
