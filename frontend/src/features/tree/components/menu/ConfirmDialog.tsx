import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  className?: string
  setShowDialog: Dispatch<SetStateAction<boolean>>
  showDialog: boolean
  patch: string
}

export const ConfirmDialog: React.FC<Props> = ({ setShowDialog, showDialog, patch }) => {
  const router = useRouter()
  const { t } = useTranslation("tree")

  const handleConfirmLeave = () => {
    setShowDialog(false)
    router.push(patch)
  }

  const handleCancelLeave = () => {
    setShowDialog(false)
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
