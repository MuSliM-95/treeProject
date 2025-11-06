import { api } from '@/shared/api'

import { ITree, ITreeLink } from '../types'

class TreeLinkService {
	public async createTreeLink(tree: ITree) {
		const response = await api.post<ITreeLink>('api/tree/create-link', {
			tree
		})

		return response
	}

	public async getTreeLink(token: string) {
		const response = await api.get<{ tree: ITree }>(
			`api/tree/link/${token}`
		)

		return response
	}
}

export const treeLinkService = new TreeLinkService()
