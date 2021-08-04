<template>
	<v-card :elevation="0" color="transparent">
		<v-card-title class="font-weight-bold">
			Personas
			<v-spacer></v-spacer>
			<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
		</v-card-title>
		<v-data-table :headers="headers" :items="people" :items-per-page="5" :search="search" multi-sort>
			<template v-slot:top>
				<v-toolbar flat color="transparent">
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="1000px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
								Agregar Persona
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-container>
										<h2 class="mb-4">Datos Generales</h2>
										<v-row>
											<v-col cols="12" sm="4" md="4">
												<v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
											</v-col>
											<v-col cols="12" sm="4" md="4">
												<v-text-field v-model="editedItem.first_last_name" label="Apellido Paterno"></v-text-field>
											</v-col>
											<v-col cols="12" sm="4" md="4">
												<v-text-field v-model="editedItem.second_last_name" label="Apellido Materno"></v-text-field>
											</v-col>
											<!-- <v-col cols="12" sm="6" md="6">
												<v-text-field
													v-model="editedItem.total_given"
													:rules="[numberRule]"
													label="Ayudas"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="6">
												<v-text-field
													v-model="editedItem.total_assistance"
													:rules="[numberRule]"
													label="Asistencias"
												></v-text-field>
											</v-col> -->
										</v-row>
										<v-row justify="center">
											<v-col cols="12" sm="12" md="12">
												<h2 class="pb-2 font-weight-light">Fecha de Nacimiento</h2>
												<v-date-picker v-model="editedItem.birthday"></v-date-picker>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col>
												<v-radio-group v-model="editedItem.gender" row>
													<v-radio label="Hombre" color="blue" value="male"></v-radio>
													<v-radio label="Mujer" color="pink" value="female"></v-radio>
												</v-radio-group>
											</v-col>
											<v-col>
												<v-switch
													v-model="editedItem.active"
													inset
													:label="`${getActive(editedItem.active)}`"
												></v-switch>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="6" md="8">
												<v-text-field
													counter
													:rules="phoneRules"
													v-model="editedItem.phone"
													label="Telefono"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.curp" label="CURP"></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-textarea
													outlined
													name="input-7-4"
													label="Dirección"
													value=""
													rows="2"
													auto-grow
													clearable
													v-model="editedItem.address"
												></v-textarea>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-select :items="education" label="Educación" v-model="editedItem.education" dense></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="8" md="8">
												<v-radio-group v-model="editedItem.is_married" row>
													<v-radio :label="'Casad' + (editedItem.gender == 'male' ? 'o' : 'a')" :value="true"></v-radio>
													<v-radio
														:label="'Solter' + (editedItem.gender == 'male' ? 'o' : 'a')"
														:value="false"
													></v-radio>
												</v-radio-group>
											</v-col>
											<v-col cols="12" sm="4" md="4">
												<v-text-field
													v-model="editedItem.number_children"
													:rules="[numberRule]"
													label="Numero de Hijos"
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.job" label="Ocupación"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="8">
												<v-text-field
													v-model="editedItem.place_of_work"
													label="Lugar de Trabajo/Estudio"
												></v-text-field>
											</v-col>
										</v-row>
										<v-row align="center">
											<v-col cols="12" sm="12" md="12">
												<v-select
													:items="insurance"
													label="Servicio Médico"
													v-model="editedItem.insurance"
													dense
												></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="6" md="6">
												<v-text-field
													v-model="editedItem.monthly_income"
													:rules="[numberRule]"
													label="Ingreso Mensual"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="6">
												<v-text-field v-model="editedItem.religion.religion" label="Religión"></v-text-field>
											</v-col>
										</v-row>
									</v-container>
									<v-container>
										<h2 class="pa-4">Datos Alimenticios</h2>
										<v-row>
											<v-col>
												<v-subheader>CARNES (POLLO, RES, PUERCO, PESCADO)</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.meats"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-subheader>HUEVO</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.eggs"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-subheader>LECHE Y DERIVADOS (YOGHOURT)</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.dairy"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-subheader>VERDURAS</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.vegetables"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-subheader>LEGUMINOSAS (FRIJOL Y LENTEJAS))</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.legumes"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-subheader>CEREALES (PAN, TORTILLA , ARROZ)</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.cereals"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-subheader>JUGOS</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.juices"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-subheader>REFRESCOS EMBOTELLADOS</v-subheader>
												<v-slider
													v-model="editedItem.food_behavior_weekly.sodas"
													:tick-labels="healthScale"
													:max="2"
													step="1"
													ticks="always"
													tick-size="4"
												></v-slider>
											</v-col>
										</v-row>
									</v-container>
									<v-container>
										<h2 class="pa-2">Datos de Vivienda</h2>
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-select
													:items="ownership"
													label="Propiedad"
													v-model="editedItem.living_place.ownership_type"
													dense
												></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="12" md="4">
												<v-select
													:items="walls"
													label="Paredes"
													v-model="editedItem.living_place.materials.walls"
													dense
												></v-select>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-select
													:items="ceilings"
													label="Techos"
													v-model="editedItem.living_place.materials.ceilings"
													dense
												></v-select>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-select
													:items="floors"
													label="Pisos"
													v-model="editedItem.living_place.materials.floors"
													dense
												></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="6" md="6">
												<v-select
													:items="hygiene"
													label="Higiene"
													v-model="editedItem.living_place.materials.hygiene"
													dense
												></v-select>
											</v-col>
											<v-col cols="12" sm="6" md="6">
												<v-select
													:items="bathrooms"
													label="Sanitarios"
													v-model="editedItem.living_place.materials.bathroom"
													dense
												></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="6" md="6">
												<v-text-field
													v-model="editedItem.living_place.number_floors"
													:rules="[numberRule]"
													label="# de pisos/plantas"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="6">
												<v-text-field
													v-model="editedItem.living_place.number_rooms"
													:rules="[numberRule]"
													label="# de cuartos"
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-text-field
													v-model="editedItem.living_place.sleeping_rooms"
													:rules="[numberRule]"
													label="# de cuartos para dormir"
												></v-text-field>
											</v-col>
										</v-row>
									</v-container>

									<h2 class="mb-2">Pagos/Ayudas</h2>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-simple-table dense>
												<template v-slot:default>
													<thead>
														<tr>
															<th class="text-left">
																Fecha
															</th>
															<th class="text-left">
																Cantidad
															</th>
															<th class="text-left">
																Motivo
															</th>

															<th class="text-left"></th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="(item, index) in editedItem.given" :key="item.uuid">
															<td class="text-left">{{ getPaymentDate(item.date) }}</td>
															<td class="text-left">{{ item.amount }}</td>
															<td class="text-left">{{ item.reason }}</td>

															<td>
																<button @click="deletePayment(index)">
																	<v-icon color="red darken-2">mdi-close</v-icon>
																</button>
															</td>
														</tr>
													</tbody>
												</template>
											</v-simple-table>
											<v-expand-transition>
												<div class="mt-1 newFormTables rounded" v-show="addingNewPayment">
													<v-form ref="newPaymentInput" v-on:submit.prevent="addNewPaymentForm">
														<v-container>
															<v-row>
																<v-col cols="12" md="3">
																	<v-text-field
																		v-model="newPaymentDateString"
																		label="Fecha"
																		solo
																		required
																		dense
																		single-line
																	></v-text-field>
																</v-col>
																<v-col cols="12" md="2">
																	<v-text-field
																		v-model="newPaymentAmount"
																		label="Cantidad"
																		required
																		solo
																		dense
																		single-line
																		:rules="[numberRule]"
																	></v-text-field>
																</v-col>
																<v-col cols="12" md="5">
																	<v-text-field
																		v-model="newPaymentReason"
																		label="Motivo"
																		required
																		solo
																		dense
																		single-line
																	></v-text-field>
																</v-col>

																<v-col cols="12" md="2">
																	<button @click="addingNewPayment = false" class="mt-2 mr-1 ">
																		<v-icon color="red darken-2">mdi-close</v-icon>
																	</button>
																</v-col>
															</v-row>
														</v-container>
													</v-form>
												</div>
											</v-expand-transition>
											<v-btn @click="addNewPayment" class="mt-3" block elevation="2"> + Agregar Pago</v-btn>
										</v-col>
									</v-row>
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
			<template v-slot:[`item.birthday`]="{ item }">
				{{ getDateFormat(item.birthday) }}
			</template>
			<!-- <template v-slot:[`item.image`]="{ item }">
				<v-avatar class="ma-1">
					<img :src="item.image" alt="John" />
				</v-avatar>
			</template> -->
			<template v-slot:[`item.total_given`]="{ item }">
				<v-chip :color="getColor(item.total_given)" dark>
					{{ item.total_given }}
				</v-chip>
			</template>
			<template v-slot:[`item.active`]="{ item }">
				<v-chip :color="getColorActive(item.active)" dark>
					{{ item.active ? 'Activo' : 'Inactivo' }}
				</v-chip>
			</template>
			<template v-slot:[`item.gender`]="{ item }">
				<v-chip :color="getColorGender(item.gender)" dark>
					{{ item.gender === 'female' ? 'Mujer' : 'Hombre' }}
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
				<v-btn color="primary" @click="getPeople">
					Reset
				</v-btn>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
//import VueNumeric from 'vue-numeric';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default {
	components: {
		//VueNumeric
	},
	data() {
		return {
			search: '',
			dialog: false,
			dialogDelete: false,

			newImage: null,
			addingNewPayment: false,
			newPaymentDateString: moment().format('L'),
			newPaymentAmount: '',
			newPaymentReason: '',

			education: ['Analfabeta', 'Primaria', 'Secundaria', 'Preparatoria', 'Profesional'],
			insurance: [
				'IMSS',
				'ISSTE',
				'O’HORÁN',
				'CENTRO DE SALUD',
				'PEMEX',
				'DEFENSA MARINA',
				'SEGURO POPULAR',
				'PARTICULAR'
			],
			ownership: ['Propia', 'Rentada', 'Prestada', 'Invasión', 'Intestada'],
			walls: [
				'Bajareque y/o barro',
				'Mampostería',
				'Madera',
				'Lámina de Zinc',
				'Lámina de cartón',
				'Lámina de asbesto',
				'Bloques'
			],
			ceilings: ['Concreto', 'Lámina de Zinc', 'Lámina de cartón', 'Lámina de asbesto', 'Paja'],
			floors: ['Tierra', 'Cemento', 'Ladrillos'],
			hygiene: ['Limpia', 'Sucia', 'Ordenada', 'Desordenada', 'Ventilada', 'Poco Ventilada'],
			bathrooms: ['Baño', 'Letrina', 'Fecalismo al aire libre'],
			healthScale: ['1 a 2 días', '3 a 5 días', '6 a 7 días'],
			headers: [
				// {
				// 	text: 'Foto',
				// 	align: 'start',
				// 	sortable: false,
				// 	value: 'image'
				// },
				{ text: 'Nombre', value: 'name' },
				{ text: 'Apellidos', value: 'last_name' },
				{ text: 'Genero', value: 'gender', align: 'center' },
				{ text: 'Fecha de Nacimiento', value: 'birthday' },
				{ text: 'Ayudas', value: 'total_given', align: 'center' },
				//{ text: '# Asistencias', value: 'total_assistance', align: 'center' },
				{ text: 'Estado', value: 'active', align: 'center' },
				{ text: 'Acciones', value: 'actions', sortable: false }
			],
			people: [],
			editedIndex: -1,
			editedItem: {
				image: 'https://source.unsplash.com/random/50x50',
				name: '',
				first_last_name: '',
				second_last_name: '',
				birth_date: '',
				active: true,
				gender: 'male',
				address: '',
				curp: '',
				phone: '',
				education: '', //picker
				is_married: true,
				number_children: 0,
				job: '',
				place_of_work: '',
				monthly_income: 0,
				insurance: '', //picker
				/*
					  0 - 1 to 2 days
					  1 - 3 to 5 days
					  2 - 6 to 7 days
					*/
				food_behavior_weekly: {
					meats: 0,
					eggs: 0,
					dairy: 0,
					vegetables: 0,
					legumes: 0,
					cereals: 0,
					juices: 0,
					sodas: 0
				},
				living_place: {
					ownership_type: '', // picker
					materials: {
						walls: '', //picker
						ceilings: '', //picker
						floors: '', //picker
						hygiene: '', //picker
						bathroom: '' //picker
					},
					number_floors: 0,
					number_rooms: 0,
					sleeping_rooms: 0,
					trash_solution: '' //picker
				},
				religion: {
					religion: '' //picker
				},
				given: [],
				assistance: [
					//dates or ids
				]
			},
			defaultItem: {
				image: 'https://source.unsplash.com/random/50x50',
				name: '',
				first_last_name: '',
				second_last_name: '',
				birth_date: '',
				total_given: 0,
				curp: '',
				total_assistance: 0,
				active: true,
				gender: 'male',
				address: '',
				phone: '',
				education: '', //picker
				is_married: true,
				number_children: 0,
				job: '',
				place_of_work: '',
				monthly_income: 0,
				insurance: '', //picker
				/*
					  0 - 1 to 2 days
					  1 - 3 to 5 days
					  2 - 6 to 7 days
					*/
				food_behavior_weekly: {
					meats: 0,
					eggs: 0,
					dairy: 0,
					vegetables: 0,
					legumes: 0,
					cereals: 0,
					juices: 0,
					sodas: 0
				},
				living_place: {
					ownership_type: '', // picker
					materials: {
						walls: '', //picker
						ceilings: '', //picker
						floors: '', //picker
						hygiene: '', //picker
						bathroom: '' //picker
					},
					number_floors: 0,
					number_rooms: 0,
					sleeping_rooms: 0,
					trash_solution: '' //picker
				},
				religion: {
					religion: '' //picker
				},
				given: [],
				assistance: [
					//dates or ids
				]
			},
			numberRule: v => {
				//if (!v.trim()) return true;
				if (!isNaN(parseFloat(v)) && v >= 0) return true;
				return 'El numero tiene que ser mayor o igual a 0';
			},
			phoneRules: [v => v.length <= 10 || 'Maximo 10 caracteres']
		};
	},
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Nueva Persona' : 'Editar Persona';
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
		getColor(money) {
			if (money > 2000) return 'red';
			else if (money > 1000) return 'orange';
			else return 'green';
		},
		getColorActive(active) {
			if (!active) return 'red';
			else return 'green';
		},
		getColorGender(gender) {
			if (gender != 'female') return 'blue';
			else return 'pink';
		},
		getGender(gender) {
			return gender === 'female' ? 'Mujer' : 'Hombre';
		},
		getActive(active) {
			return active ? 'Activo' : 'Inactivo';
		},
		getPaymentDate(date) {
			return moment(date).format('L');
		},
		editItem(item) {
			this.editedIndex = this.people.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		getTotalGiven(people) {
			//console.log(people);

			people.forEach(person => {
				person.birthday = moment(person.birthday).format('YYYY-MM-DD');
				//console.log(person.birthday);

				person.total_given = person.given.reduce((total, value) => {
					return total + value.amount;
				}, 0);
			});
			//console.log(people);
			return people;
		},
		getDateFormat(string) {
			return moment(string).format('DD-MMM-YYYY');
		},

		deleteItem(item) {
			this.editedIndex = this.people.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.deletePeople();
			this.closeDelete();
		},
		addNewPaymentForm() {
			var payment = {
				date: moment(this.newPaymentDateString).valueOf(),
				amount: this.newPaymentAmount,
				reason: this.newPaymentReason,
				uuid: uuidv4()
			};
			this.editedItem.given.push(payment);

			this.newPaymentDateString = moment().format('L');
			this.newPaymentAmount = '';
			this.newPaymentReason = '';
		},
		addNewPayment() {
			this.newPaymentDateString = moment().format('L');
			if (!this.addingNewPayment) {
				this.addingNewPayment = !this.addingNewPayment;
			} else {
				this.$refs.newPaymentInput.$el.requestSubmit();
				this.addingNewPayment = !this.addingNewPayment;
			}
		},
		deletePayment(index) {
			this.editedItem.given.splice(index, 1);
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
			if (this.editedIndex > -1) {
				//edit
				//Object.assign(this.people[this.editedIndex], this.editedItem);
				this.editPeople();
			} else {
				//add
				//this.people.push(this.editedItem);
				this.addPeople();
			}
			this.close();
		},

		// NETWORK LOGIC

		async getPeople() {
			const token = localStorage.getItem('jwt');

			if (!token) {
				throw new Error('No token');
			}

			await fetch(process.env.VUE_APP_API_URL + 'people/', {
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
				.then(response => response.json())
				.then(data => {
					this.people = this.getTotalGiven(data.data);
				});
		},

		async addPeople() {
			const token = localStorage.getItem('jwt');

			if (!token) {
				throw new Error('No token');
			}

			const formData = new FormData();
			//formData.append('uuid', uuidv4());
			const birthday = moment(this.editedItem.birthday);
			formData.append('name', this.editedItem.name);
			formData.append('first_last_name', this.editedItem.first_last_name);
			formData.append('second_last_name', this.editedItem.second_last_name);
			formData.append('birthday', birthday);
			formData.append('gender', this.editedItem.gender);
			formData.append('active', this.editedItem.active);
			formData.append('curp', this.editedItem.curp);
			formData.append('address', this.editedItem.address);
			formData.append('phone', this.editedItem.phone);
			formData.append('education', this.editedItem.education);
			formData.append('is_married', this.editedItem.is_married);
			formData.append('number_children', this.editedItem.number_children);
			formData.append('job', this.editedItem.job);
			formData.append('place_of_work', this.editedItem.place_of_work);
			formData.append('monthly_income', this.editedItem.monthly_income);
			formData.append('insurance', this.editedItem.insurance);
			formData.append('food_behavior_weekly', JSON.stringify(this.editedItem.food_behavior_weekly));
			formData.append('living_place', JSON.stringify(this.editedItem.living_place));
			formData.append('religion', this.editedItem.religion);
			formData.append('given', JSON.stringify(this.editedItem.given));
			if (this.newImage) {
				formData.append('file', this.newImage);
			}

			const requestOptions = {
				headers: {
					Authorization: 'Bearer ' + token
				},
				method: 'POST',
				body: formData
			};

			await fetch(process.env.VUE_APP_API_URL + 'people/', requestOptions).then(response => {
				response.json();
			});
			this.getPeople();
		},
		async editPeople() {
			const token = localStorage.getItem('jwt');

			if (!token) {
				throw new Error('No token');
			}

			const formData = new FormData();
			const birthday = moment(this.editedItem.birthday);
			formData.append('name', this.editedItem.name);
			formData.append('first_last_name', this.editedItem.first_last_name);
			formData.append('second_last_name', this.editedItem.second_last_name);
			formData.append('birthday', birthday);
			formData.append('gender', this.editedItem.gender);
			formData.append('curp', this.editedItem.curp);
			formData.append('active', this.editedItem.active);
			formData.append('address', this.editedItem.address);
			formData.append('phone', this.editedItem.phone);
			formData.append('education', this.editedItem.education);
			formData.append('is_married', this.editedItem.is_married);
			formData.append('number_children', this.editedItem.number_children);
			formData.append('job', this.editedItem.job);
			formData.append('place_of_work', this.editedItem.place_of_work);
			formData.append('monthly_income', this.editedItem.monthly_income);
			formData.append('insurance', this.editedItem.insurance);
			formData.append('food_behavior_weekly', JSON.stringify(this.editedItem.food_behavior_weekly));
			formData.append('living_place', JSON.stringify(this.editedItem.living_place));
			formData.append('religion', this.editedItem.religion);
			formData.append('given', JSON.stringify(this.editedItem.given));
			if (this.newImage) {
				formData.append('file', this.newImage);
			}

			const requestOptions = {
				headers: {
					Authorization: 'Bearer ' + token
				},
				method: 'PUT',
				body: formData
			};

			await fetch(process.env.VUE_APP_API_URL + `people/${this.editedItem._id}`, requestOptions).then(response => {
				response.json();
			});
			this.getPeople();
		},
		async deletePeople() {
			const token = localStorage.getItem('jwt');

			if (!token) {
				throw new Error('No token');
			}

			await fetch(process.env.VUE_APP_API_URL + `people/${this.editedItem._id}`, {
				headers: {
					Authorization: 'Bearer ' + token
				},
				method: 'DELETE'
			});
			this.getPeople();
		}
	},
	created() {
		this.getPeople();
	}
};
</script>

<style scoped></style>
