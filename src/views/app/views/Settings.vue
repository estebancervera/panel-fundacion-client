<template>
	<v-card class="ma-16" elevation="0" color="secondary">
		<settings-controls />
	</v-card>
</template>

<script>
import SettingsControls from '../../../components/SettingsControls.vue';

export default {
	name: 'Settings',
	components: {
		SettingsControls
	}
};
</script>
