<template>
	<div>
		<v-navigation-drawer v-model="drawer" app class="pt-4" mini-variant>
			<router-link to="/people" class="d-block text-center mx-auto mb-9">
				<v-icon>mdi-account-group</v-icon>
			</router-link>

			<router-link to="/attendance" class="d-block text-center mx-auto mb-9">
				<v-icon>mdi-clipboard-list</v-icon>
			</router-link>

			<router-link to="/settings" class="d-block text-center mx-auto mb-9">
				<v-icon>mdi-cog</v-icon>
			</router-link>
		</v-navigation-drawer>

		<v-main>
			<router-view class="pa-10"/>
		</v-main>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			drawer: true,

			links: ['/people', '/assistance', '/settings']
		};
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
