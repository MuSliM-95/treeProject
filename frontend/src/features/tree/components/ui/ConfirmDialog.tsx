import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { toggleTab } from '../../hooks'
import { useAppDispatch } from '../../hooks/useHooks'

interface Props {
  className?: string
  setShowDialog: Dispatch<SetStateAction<boolean>>
  showDialog: boolean
  patch: string
}

export const ConfirmDialog: React.FC<Props> = ({ setShowDialog, showDialog, patch }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation("tree")

  const handleConfirmLeave = () => {
    setShowDialog(false)
    router.push(patch)
  }

  const handleCancelLeave = () => {
    setShowDialog(false)
    dispatch(toggleTab({ tab: 'node' }))
  }
  
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <p>{t("message")}</p>
        <DialogFooter className="mt-4 flex justify-end">
          <Button variant="outline" onClick={handleCancelLeave}>
            {t("cancel")}
          </Button>
          <Button onClick={handleConfirmLeave}>
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
