<template>
	<v-card :elevation="0" color="transparent">
		<v-card-title class="font-weight-bold">
			Ajustes
			<v-spacer></v-spacer>
		</v-card-title>
		<v-container>
			<v-row>
				<v-switch v-model="isDark" inset :label="isDark ? 'Dark Mode' : 'Light Mode'"></v-switch>

				<v-spacer> </v-spacer>

				<v-btn color="primary" depressed elevation="2" large raised rounded @click="logout"> Cerrar Sesión</v-btn>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
//import moment from 'moment';
//import { v4 as uuidv4 } from 'uuid';
//import VueNumeric from 'vue-numeric';

export default {
	components: {
		//VueNumeric
	},
	data() {
		return {
			isDark: false
		};
	},
	computed: {},

	watch: {
		isDark(val) {
			this.$vuetify.theme.dark = val;
			localStorage.setItem('useDarkTheme', val.toString());
		}
	},
	methods: {
		logout() {
			localStorage.clear();
			this.$router.push('/');
		}
	},
	mounted() {
		const theme = localStorage.getItem('useDarkTheme');
		if (theme) {
			if (theme == 'true') {
				this.isDark = true;
			} else this.isDark = false;
		}
	}
};
</script>

<style scoped></style>
