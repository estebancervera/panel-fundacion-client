<template>
	<v-card :elevation="0">
		<v-card-title class="font-weight-bold">
			Asistencias
			<v-spacer></v-spacer>
			<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
		</v-card-title>
		<v-data-table :headers="headers" :items="assistances" :items-per-page="5" :search="search" multi-sort>
			<template v-slot:top>
				<v-toolbar flat>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
								Agregar Asistencia
							</v-btn>
						</template>
						<v-card class="mx-auto">
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row justify="center">
										<v-date-picker v-model="editedItem.date" :landscape="true"></v-date-picker>
									</v-row>
								</v-container>
								<v-container>
									<h2 class="pa-4">Lista de Personas</h2>
									<v-list rounded>
										<v-list-item-group v-model="editedItem.people" multiple>
											<template v-for="item in all_people">
												<v-list-item :key="item.id" :value="item.id" active-class="light-blue lighten-3">
													<template v-slot:default="{ active }">
														<v-list-item-content>
															<v-list-item-title
																class="text-left"
																v-text="`${item.firstname} ${item.lastname}`"
															></v-list-item-title>
														</v-list-item-content>

														<v-list-item-action>
															<v-checkbox :input-value="active" color="white "></v-checkbox>
														</v-list-item-action>
													</template>
												</v-list-item>
											</template>
										</v-list-item-group>
									</v-list>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="close">
									Cancelar
								</v-btn>
								<v-btn color="blue darken-1" text @click="save">
									Guardar
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
								<v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>

			<template v-slot:[`item.total_people`]="{ item }">
				<v-chip :color="getColor(item.total_people)" dark>
					{{ item.total_people }}
				</v-chip>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)">
					mdi-pencil
				</v-icon>
				<v-icon small @click="deleteItem(item)">
					mdi-delete
				</v-icon>
			</template>
			<template v-slot:no-data>
				<v-btn color="primary" @click="initialize">
					Reset
				</v-btn>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
//import VueNumeric from 'vue-numeric';

export default {
	components: {
		//VueNumeric
	},
	data() {
		return {
			search: '',
			dialog: false,
			dialogDelete: false,
			//date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
			headers: [
				{ text: 'Fecha', value: 'date' },
				{ text: 'Asistencia', value: 'total_people', align: 'center' },
				{ text: 'Acciones', value: 'actions', sortable: false, align: 'right' }
			],

			assistances: [
				{
					uuid: uuidv4(),
					date: moment().format('YYYY-MM-DD'),
					total_people: 2,
					people: ['id213123123', 'id213234234123']
				}
			],
			all_people: [
				{
					id: 'id213123123',
					firstname: 'Esteban',
					lastname: 'Cervera'
				},
				{
					id: 'id213234234123',
					firstname: 'Luis',
					lastname: 'Cervera'
				},
				{
					id: 'id123545624',
					firstname: 'Carlos',
					lastname: 'Cervera'
				},
				{
					id: 'id213353252323',
					firstname: 'Juan',
					lastname: 'Cervera'
				}
			],
			editedIndex: -1,
			editedItem: {
				uuid: uuidv4(),
				date: moment().format('YYYY-MM-DD'),
				people: []
			},
			defaultItem: {
				date: moment().format('YYYY-MM-DD'),
				people: []
			},
			numberRule: v => {
				//if (!v.trim()) return true;
				if (!isNaN(parseFloat(v)) && v >= 0) return true;
				return 'El numero tiene que ser mayor o igual a 0';
			}
		};
	},
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Nueva Asistencia' : 'Editar Asistencia';
		}
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		}
	},
	methods: {
		getColor(people) {
			if (people < 5) return 'red';
			else if (people < 10) return 'orange';
			else return 'green';
		},

		editItem(item) {
			this.editedIndex = this.assistances.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.assistances.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.people.splice(this.editedIndex, 1);
			this.closeDelete();
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			this.editedItem.total_people = this.editedItem.people.length;
			if (this.editedIndex > -1) {
				Object.assign(this.assistances[this.editedIndex], this.editedItem);
			} else {
				this.assistances.push(this.editedItem);
			}
			//console.log(this.editedItem);
			this.close();
		}
	}
};
</script>

<style scoped></style>
