'use client'

import { useState } from 'react'
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormItem,
  FormControl,
  FormMessage,
  FormField
} from '@/shared/components'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordSchema, TypeChangePasswordSchema } from '@/features/user/schemes/change-password-schema'
import { useUpdatePasswordMutation } from '../hooks/useUpdatePasswordMutation'

interface IPChangePasswordDialog {
  // onSuccess?: () => void,
  isTwoFactorEnabled: boolean

}

export function ChangePasswordDialog({ isTwoFactorEnabled }: IPChangePasswordDialog) {
  const { t } = useTranslation('auth')
  const [passwordStatus, setPasswordStatus] = useState('')
  const [isShowCode, setIsShowCode] = useState(false)
  const [open, setOpen] = useState(false)

  const { update, isLoadingUpdate, data } = useUpdatePasswordMutation()

  const passwordForm = useForm<TypeChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema(t)),
    defaultValues: { oldPassword: '', password: '', passwordRepeat: '', code: '' }
  })

  const handleChangePassword = async (values: TypeChangePasswordSchema) => {
    setPasswordStatus('')
    try {
      await update(values)

      if (isTwoFactorEnabled && data?.messageTwo) {
        setIsShowCode(true)
        setPasswordStatus(t('profile.enterConfirmationCode'))
        return
      }

      setPasswordStatus(t('profile.passwordChanged'))
      passwordForm.reset()
      setIsShowCode(false)
      setOpen(false)
      // onSuccess?.()
    } catch {
      setPasswordStatus(t('profile.passwordChangeError'))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>{t('profile.changePassword')}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{t('profile.changePassword')}</DialogTitle>
        </DialogHeader>

        <FormProvider {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-3 mt-2">
            {!isShowCode && (
              <>
                <FormField
                  name="oldPassword"
                  control={passwordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder={t('profile.currentPassword')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={passwordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder={t('profile.newPassword')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="passwordRepeat"
                  control={passwordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder={t('profile.confirmNewPassword')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {isShowCode && (
              <FormField
                name="code"
                control={passwordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder={t('profile.confirmationCode')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={isLoadingUpdate}>
              {isLoadingUpdate
                ? t('profile.sending')
                : isShowCode
                ? t('profile.confirmCode')
                : t('profile.updatePassword')}
            </Button>

            {passwordStatus && <p className="text-sm text-muted-foreground">{passwordStatus}</p>}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
