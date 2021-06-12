<template>
	<v-app>
		<div id="app">
			<router-view />
		</div>
	</v-app>
</template>

<style>
.theme--dark.v-application {
	background-color: var(--v-background-base, #121212) !important;
}
.theme--light.v-application {
	background-color: var(--v-background-base, white) !important;
}
</style>
