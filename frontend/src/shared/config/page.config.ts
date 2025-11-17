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

	oauth: {
		existsInfo: '/oauth/exists-info',
	    connect: '/oauth/connect'

	},

	user: {
		profile: '/dashboard/profile',
		setting: '/dashboard/settings'
	},

	info: {
		lear_more: 'lear-more',
		terms: 'terms'
	}
} as const
