<template>
	<div>
		<v-app-bar app color="navbar" flat dark>
			<v-container class="py-0 fill-height">
				<v-avatar class="mr-10" color="grey darken-1" size="42">
					<img src="../../assets/IMG_LOGO.jpg" alt="John"
				/></v-avatar>

				<v-btn v-for="link in links" :key="link.link" text @click="sendToView(link)">
					{{ link.name }}
				</v-btn>

				<v-spacer></v-spacer>
			</v-container>
		</v-app-bar>

		<v-main>
			<router-view class="pa-10" />
		</v-main>
	</div>
</template>

<script>
export default {
	name: 'frame',
	data() {
		return {
			drawer: true,

			links: [
				{ name: 'Personas', link: 'people' },
				{ name: 'Asistencia', link: 'attendance' },
				{ name: 'Ajustes', link: 'settings' }
			]
		};
	},
	methods: {
		sendToView(item) {
			this.$router.push(item.link);
		}
	},
	mounted() {
		const theme = localStorage.getItem('useDarkTheme');
		if (theme) {
			if (theme == 'true') {
				this.$vuetify.theme.dark = true;
			} else this.$vuetify.theme.dark = false;
		}
	}
};
</script>

<style scoped>
a {
	text-decoration: none;
}
</style>
