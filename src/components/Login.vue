<template>
	<v-container>
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

						<validation-provider v-slot="{ errors }" name="checkbox">
							<v-checkbox
								v-model="remember"
								:error-messages="errors"
								:value="true"
								label="Rememeber"
								type="checkbox"
								required
							></v-checkbox>
						</validation-provider>

						<v-btn class="mr-4" type="submit" :disabled="invalid" color="primary">
							Iniciar Sesión
						</v-btn>
					</form>
				</validation-observer>
			</v-card>
		</v-row>
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
		show1: false
	}),

	methods: {
		submit() {
			this.$refs.observer.validate();
			//login
		},
		clear() {
			this.name = '';
			this.phoneNumber = '';
			this.email = '';
			this.select = null;
			this.checkbox = null;
			this.$refs.observer.reset();
		}
	}
};
</script>
