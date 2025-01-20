import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-ux/**/*.{svelte,js}',
		'./node_modules/layerchart/**/*.{svelte,js}'
	],
	mode: 'jit',
	theme: {
		screens: {
			xs: '500px',
			showNavLinks: '870px',
			...defaultTheme.screens
		},
		extend: {
			fontFamily: {
				'gilroy-extrabold': ['gilroy-extrabold', 'sans-serif'],
				'sf-pro-rounded-medium': ['sf-pro-rounded-medium', 'sans-serif'],
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
			},
			borderWidth: {
				thin: '0.5px',
				'1': '1.5px'
			},
			boxShadow: {
				sm: '0px 0px 4px rgba(0, 0, 0, 0.1)',
				input: '0 0 0 1px #FF5722',
				'custom-shadow':
					"'0px 0px 0px 1px #0E3F7E08, 0px 1px 1px -0.5px #2A334508, 0px 3px 3px -1.5px #2A334608, 0px 6px 6px -3px #2A334608, 0px 12px 12px -6px #0E3F7E08, 0px 24px 24px -12px #0E3F7E10'"
			},
			gradientColorStops: {
				'white-opaque': 'rgba(255, 255, 255, 0.03)',
				'purple-opaque': 'rgba(110, 84, 148, 0.99)',
				transparent: 'rgba(255, 255, 255, 0)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
			},
			colors: {
				background: colors.white,
				muted: colors.slate[50],
				faint: '#FDFDFD',
				brand: {
					primary: colors.blue[600],
					primaryLight: colors.blue[50],
					secondary: colors.sky[400],
					secondaryLight: colors.sky[50]
				},
				text: {
					primary: colors.slate[700],
					secondary: colors.slate[600],
					light: colors.slate[500]
				},
				border: {
					primary: colors.slate[400],
					secondary: colors.slate[200],
					light: colors.slate[100]
				},
				affirmative: {
					primary: colors.emerald[500],
					light: colors.emerald[50]
				},
				warning: {
					primary: colors.amber[500],
					light: colors.amber[50]
				},
				destructive: {
					primary: colors.rose[500],
					light: colors.red[50]
				}
			},
			keyframes: {
				slideback: {
					'0%, 20%, 100%': { transform: 'translateX(0%)' },
					'10%': { transform: 'translateX(10%)' }
				},
				arrow: {
					'0%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(25%)' },
					'40%': { transform: 'translateX(-25%)' },
					'60%': { transform: 'translateX(25%)' },
					'100%': { transform: 'translateX(-25%)' }
				},
				blob: {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)'
					},
					'33%': {
						transform: 'translate(10rem, -6rem) scale(1.25)'
					},
					'66%': {
						transform: 'translate(-30rem, 3rem) scale(2)'
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)'
					}
				},
				pulseout: {
					'0%': {
						transform: 'scale(0.8)',
						'box-shadow': '0 0 0 0 rgba(144, 238, 144, 0.5)'
					},
					'70%': {
						transform: 'scale(1)',
						'box-shadow': '0 0 0 60px rgba(144, 238, 144, 0)'
					},
					'100%': {
						transform: 'scale(0.8)'
					}
				}
			},
			animation: {
				slideback: 'slideback 2s ease-in-out infinite',
				blob: 'blob 12s infinite',
				'spin-slow': 'spin 300s linear infinite',
				pulseout: 'pulseout 1s infinite'
			}
		}
	},
	plugins: []
};
