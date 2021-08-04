<template>
	<v-card :elevation="0" color="transparent">
		<v-alert v-model="alertShowing" close-text="Close Alert" :type="alertType" dark dismissible>
			{{ alertMessage }}
		</v-alert>
		<v-card-title class="font-weight-bold">
			Asistencias
			<v-spacer></v-spacer>
			<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
		</v-card-title>
		<v-data-table :headers="headers" :items="attendances" :items-per-page="5" :search="search" multi-sort>
			<template v-slot:top>
				<v-toolbar flat class="transparent">
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
												<v-list-item :key="item._id" :value="item._id" active-class="light-blue lighten-3">
													<template v-slot:default="{ active }">
														<v-list-item-content>
															<v-list-item-title
																class="text-left"
																v-text="`${item.name} ${item.first_last_name} ${item.second_last_name}`"
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
			<template v-slot:[`item.date`]="{ item }">
				{{ getDateFormat(item.date) }}
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
				<div class="my-3">
					<h2 class="py-3 text-h3 ">No hay Asistencias</h2>
					<v-btn color="primary" @click="getAttendance">
						Refrescar
					</v-btn>
				</div>
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

			alertMessage: '',
			alertShowing: false,
			alertType: 'error',

			headers: [
				{ text: 'Fecha', value: 'date' },
				{ text: 'Asistencia', value: 'total_people', align: 'center' },
				{ text: 'Acciones', value: 'actions', sortable: false, align: 'right' }
			],

			attendances: [
				{
					uuid: uuidv4(),
					date: moment().format('YYYY-MM-DD'),
					total_people: 2,
					people: ['id213123123', 'id213234234123']
				}
			],
			all_people: [
				{
					_id: 'id213123123',
					name: 'Esteban',
					last_name: 'Cervera'
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
		setupAlert(msg, type) {
			this.alertMessage = msg;
			this.alertShowing = true;
			this.alertType = type;
		},
		getColor(people) {
			if (people < 5) return 'red';
			else if (people < 10) return 'orange';
			else return 'green';
		},
		getDateFormat(string) {
			return moment(string).format('DD-MMM-YYYY');
		},
		editItem(item) {
			this.editedIndex = this.attendances.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.attendances.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			//this.people.splice(this.editedIndex, 1);
			this.deleteAttendance();
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
				//EDIT
				//Object.assign(this.assistances[this.editedIndex], this.editedItem);

				this.editAttendance();
			} else {
				//ADD
				//this.assistances.push(this.editedItem);
				this.addAttendance();
			}
			//console.log(this.editedItem);
			this.close();
		},
		getDate(date) {
			const dateString = moment(date).format('YYYY-MM-DD');
			let _date = new Date(); // this creates a date object in the user's timezone
			_date.setYear(dateString.slice(0, 4));
			_date.setMonth(parseInt(dateString.slice(5, 7)) - 1); // months a indexed at 0 in js
			_date.setDate(dateString.slice(8, 10));
			_date = _date.toISOString().substring(0, 10);

			console.log(_date);
			return _date;
		},

		getTotalAttendance(attendances) {
			attendances.forEach(attendance => {
				attendance.date = this.getDate(attendance.date);
				//console.log(attendance.date);
				attendance.total_people = attendance.people.length;
			});

			return attendances;
		},

		// NETWORK LOGIC
		async getPeople() {
			try {
				const token = localStorage.getItem('jwt');

				if (!token) {
					throw new Error('No token');
				}
				await fetch(process.env.VUE_APP_API_URL + 'people/list', {
					headers: {
						Authorization: 'Bearer ' + token
					}
				})
					.then(response => response.json())
					.then(data => {
						//console.log(data);
						this.all_people = data.data;
					});
			} catch (error) {
				console.log(error);
				this.setupAlert(error, 'error');
			}
		},
		async getAttendance() {
			try {
				const token = localStorage.getItem('jwt');

				if (!token) {
					throw new Error('No token');
				}
				await fetch(process.env.VUE_APP_API_URL + 'attendance/', {
					headers: {
						Authorization: 'Bearer ' + token
					}
				})
					.then(response => response.json())
					.then(data => {
						//console.log(data.data);
						this.attendances = this.getTotalAttendance(data.data);
					});
			} catch (error) {
				console.log(error);
				this.setupAlert(error, 'error');
			}
		},

		async addAttendance() {
			try {
				const token = localStorage.getItem('jwt');

				if (!token) {
					throw new Error('No token');
				}
				const formData = new FormData();
				//formData.append('uuid', uuidv4());
				const date = moment(this.editedItem.date);
				formData.append('date', date);
				formData.append('uuid', uuidv4());
				formData.append('people', this.editedItem.people);

				const requestOptions = {
					headers: {
						Authorization: 'Bearer ' + token
					},
					method: 'POST',
					body: formData
				};

				await fetch(process.env.VUE_APP_API_URL + 'attendance/', requestOptions).then(async response => {
					if (response.ok) {
						this.setupAlert('Asistencia agregada correctamente', 'success');
					} else {
						const data = await response.json();
						this.setupAlert(data.msg, 'error');
					}
				});
				this.getAttendance();
				this.getPeople();
			} catch (error) {
				console.log(error);
				this.setupAlert(error, 'error');
			}
		},
		async editAttendance() {
			try {
				const token = localStorage.getItem('jwt');

				if (!token) {
					throw new Error('No token');
				}
				console.log(this.editedItem.date);
				const formData = new FormData();
				const date = moment(this.editedItem.date);
				formData.append('date', date);
				formData.append('people', this.editedItem.people);

				const requestOptions = {
					headers: {
						Authorization: 'Bearer ' + token
					},
					method: 'PUT',
					body: formData
				};

				await fetch(process.env.VUE_APP_API_URL + `attendance/${this.editedItem._id}`, requestOptions).then(
					async response => {
						if (response.ok) {
							this.setupAlert('Asistencia editada correctamente', 'success');
						} else {
							const data = await response.json();
							this.setupAlert(data.msg, 'error');
						}
					}
				);
				this.getAttendance();
				this.getPeople();
			} catch (error) {
				console.log(error);
				this.setupAlert(error, 'error');
			}
		},
		async deleteAttendance() {
			try {
				const token = localStorage.getItem('jwt');

				if (!token) {
					throw new Error('No token');
				}
				await fetch(process.env.VUE_APP_API_URL + `attendance/${this.editedItem._id}`, {
					headers: {
						Authorization: 'Bearer ' + token
					},
					method: 'DELETE'
				}).then(async response => {
					if (response.ok) {
						this.setupAlert('Asistencia eliminada correctamente', 'success');
					} else {
						const data = await response.json();
						this.setupAlert(data.msg, 'error');
					}
				});
				this.getAttendance();
				this.getPeople();
			} catch (error) {
				console.log(error);
				this.setupAlert(error, 'error');
			}
		}
	},
	created() {
		this.getAttendance();
		this.getPeople();
	}
};
</script>

<style scoped></style>
