'use client'

import { type PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/app/store/store'

import { ToastProvider } from './ToastProvider'
import { TanstackQueryProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<TanstackQueryProvider>
					<ToastProvider />
					{children}
				</TanstackQueryProvider>
			</PersistGate>
		</Provider>
	)
}
