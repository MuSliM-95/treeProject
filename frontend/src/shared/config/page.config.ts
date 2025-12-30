export const pageConfig = {
	home: '/',

	tree: {
		tree: '/tree',
		feedback: '/tree/feedback'
	},

	auth: {
		login: '/auth/login',
		register: '/auth/register',
		resetPassword: '/auth/reset-password'
	},

	user: {
		profile: '/dashboard/profile',
		setting: '/dashboard/settings'
	},

	info: {
		learn_more: 'learn-more',
		terms: 'terms'
	}
} as const
