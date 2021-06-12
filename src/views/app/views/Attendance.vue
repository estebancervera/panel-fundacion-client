<template>
	<v-card class="ma-16" elevation="0" color="secondary">
		<DataTable />
	</v-card>
</template>

<script>
import DataTable from '../../../components/AttendanceDataTable.vue';

export default {
	name: 'Attendance',
	components: {
		DataTable
	}
};
</script>
