import { sendTree } from '.'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { toastMessageHandler } from '@/shared/utils'

import { treeLinkService } from '../services/tree.link.service'
import { ITree } from '../types'

import { useAppDispatch } from './useHooks'

export function useFindTreeMutation() {
	const dispatch = useAppDispatch()
	const route = useRouter()
	const {
		mutate: findTree,
		isPending,
		data
	} = useMutation({
		mutationKey: ['get-tree'],
		mutationFn: (token: string) => treeLinkService.getTreeLink(token),
		onSuccess(data: { tree: ITree }) {
			dispatch(sendTree(data))
			route.push('/tree')
		},
		onError(error: Error) {
            route.push('/tree')
			toastMessageHandler(error)
		}
	
	})

	return { findTree, isPending, data }
}
