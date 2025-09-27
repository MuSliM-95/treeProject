import React from 'react'
import { Theme } from '../../types'
import { useAppDispatch } from '../../hooks/useHooks'
import { buttonActivate } from '../../hooks'
import { useTranslation } from 'react-i18next'

interface Props {
	setTheme: React.Dispatch<React.SetStateAction<Theme>>
	theme: Theme
}

export const ThemePane: React.FC<Props> = ({setTheme, theme}) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation('tree')
    
	const handleTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value as Theme)
		dispatch(buttonActivate({activate: false}))
	}
	return (
		<div className="rounded-lg z-50 px-3 py-1 w-[140px] ">
			<form className="flex flex-col gap-1 bg-white">
				<select
					id="theme-select"
					name="theme"
					className="text-sm rounded border border-gray-300 p-1"
					onChange={handleTheme}
					defaultValue={theme}
				>
					<option value={Theme.DARK}>{t('theme.dark')}</option>
					<option value={Theme.LIGHT}>{t('theme.light')}</option>
				</select>
			</form>
		</div>
	)
}
