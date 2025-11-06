import { useMutation } from '@tanstack/react-query'

import { toastMessageHandler } from '@/shared/utils'

import { treeLinkService } from '../services/tree.link.service'
import { ITree } from '../types'

export function useCreateLinkMutation() {
	const {
		mutate: createLink,
		isPending,
		data,
		error
	} = useMutation({
		mutationKey: ['createTreeLink'],
		mutationFn: (tree: ITree) => treeLinkService.createTreeLink(tree),
		onSuccess() {},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { createLink, isPending, data, error }
}
