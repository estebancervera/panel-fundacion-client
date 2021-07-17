<template>
	<div>
		<v-app-bar color="background" flat>
			<v-toolbar-title class="font-weight-bold pl-10 ">Fundación Valentina Arrigunaga Peón A.C.</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn class="rounded-pill" dark @click="sendToLogin">
				Panel Administrador
			</v-btn>
		</v-app-bar>

		<v-row align="center" class="ma-16">
			<h2 class=" text-sm-h4 text-md-h3 text-lg-h3 font-weight-light font-italic text-center">
				"Contribuir a disminuir problemas sociales mediante la impartición de talleres sobre prevención del delito,
				cultura de la paz y cohesión social."
			</h2>
		</v-row>
		<v-row>
			<v-col cols="12" sm="12" md="7">
				<v-carousel
					cycle
					height="600"
					hide-delimiter-background
					show-arrows-on-hover
					class="py-6 px-16 "
					:show-arrows="false"
				>
					<v-carousel-item v-for="(image, i) in images" :src="image.src" :key="i"> </v-carousel-item>
				</v-carousel>
			</v-col>
			<v-col cols="12" sm="12" md="5">
				<div class="pa-10">
					<v-img max-height="135" max-width="500" src="../assets/IMG_LOGO.jpg"></v-img>
					<div class="mt-16">
						<h2>
							Quienes somos?
						</h2>
						<p class="text-sm-body-1">
							La fundación inicia en 1925 por la señorita Valentina Arrigunaga, con la atención a los ninos y jovenes,
							cuyo oficio era limpiar zapatos en la plaza grande. El objetivo, hasta nuestros dias, es atraer a nuestros
							jovenes a traves del deporte y la cultura, para luego impartir talleres de promoción humana que promuevan
							la prevención del delito, la cohesion social y la cultura de la paz, que contribuyan a que nuestros
							jovenes se puedan integrar y retribuir a la sociedad.
						</p>
					</div>
				</div>
			</v-col>
		</v-row>

		<v-row align="center" class="mt-16 mx-16"> </v-row>

		<v-row class="mx-16">
			<v-col> </v-col>
		</v-row>

		<v-footer dark padless>
			<v-card class="flex" flat tile>
				<v-card-title class="blue-grey darken-2">
					<strong class="subheading">Contactanos en nuestras redes sociales!</strong>

					<v-spacer></v-spacer>

					<v-btn v-for="icon in socials" :key="icon.link" class="mx-4" :href="icon.link" target="_blank" icon>
						<v-icon size="24px">
							{{ icon.icon }}
						</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text class="py-2 white--text text-center">
					{{ new Date().getFullYear() }} — <strong>Fundación Valentina Arrigunaga Peón A.C.</strong>
				</v-card-text>
			</v-card>
		</v-footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
			slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
			images: [
				{ src: require('../assets/foto1.jpg') },
				{ src: require('../assets/foto2.jpg') },
				{ src: require('../assets/foto3.jpg') },
				{ src: require('../assets/foto4.jpg') }
			],
			socials: [{ icon: 'mdi-facebook', link: 'https://www.facebook.com/fundacionvalentinaarrigunagapeon/' }]
		};
	},
	methods: {
		sendToLogin() {
			if (localStorage.getItem('jwt') == null) {
				this.$router.push('login');
			} else {	
				//let user = JSON.parse(localStorage.getItem('user'));
				this.$router.push('/admin/people');
			}
		}
	}
};
</script>
