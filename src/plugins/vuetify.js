import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		options: {
			customProperties: true
		},
		themes: {
			light: {
				primary: '#C3073F',
				secondary: '#EEE2DC',
				accent: colors.shades.black,
				table: colors.red.accent3,
				background: '#FFFFFF',
				navbar: '#BAB2B5'
			},
			dark: {
				primary: '#C3073F',
				secondary: colors.grey.darken3,
				accent: colors.shades.black,
				table: colors.red.accent3,
				background: '#1A1A1D',
				navbar: '#4E4E50s'
			}
		}
	}
});
