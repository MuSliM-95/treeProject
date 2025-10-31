'use client'

import { LuLogOut } from 'react-icons/lu'
import { IUser } from '@/features/auth/types'
import { useLogoutMutation } from '../hooks'
import { Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useTranslation } from 'react-i18next'

interface UserButtonProps {
	user: IUser
}

export function UserButton({ user }: UserButtonProps) {
	const { t } = useTranslation('auth')
	const { logout, isLoadingLogout } = useLogoutMutation(t)

	if (!user) return null

	return (
		<DropdownMenu>
		<DropdownMenuTrigger>
		  <Avatar>
			<AvatarImage src={user.picture} />
			<AvatarFallback>{user.name?.slice(0, 1)}</AvatarFallback>
		  </Avatar>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="w-40" align="end">
		  <DropdownMenuItem disabled={isLoadingLogout} onClick={() => logout()}>
			<LuLogOut className="mr-2 size-4" />
			{t('profile.logout')}
		  </DropdownMenuItem>
		</DropdownMenuContent>
	  </DropdownMenu>
	)
}

export function UserButtonLoading() {
	return <Skeleton className='h-10 w-10 rounded-full' />
}
