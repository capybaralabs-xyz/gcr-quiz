import React, {  useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NotificationType } from '../types'
import Image from 'next/image'


interface MessageNotificationProps {
  visible: boolean
  message?: string
  type?: NotificationType
  duration?: number
  onClose?: () => void
}

const iconMap = {
  // success: CheckCircle,
  // error: XCircle,
  // warning: AlertCircle,
  // copy: '/images/question.png',
  copy: '/images/icon-copy_notify.png',
}


export function MessageNotification({ visible, message, type = 'copy', duration = 3000, onClose }: MessageNotificationProps) {
  const Icon = iconMap[type as NotificationType]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose()
      }
    }, duration)
    // }, 10000000000000)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, top: 0, }}
          animate={{ opacity: 1, top: 20, }}
          exit={{ opacity: 0, top: 0, }}
          transition={{ ease: 'backOut' }}
          className={`fixed text-sm  right-4  z-50 bg-black text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2  tablet:text-base
           tablet:right-4 tablet:left-auto tablet:max-w-[400px]`}
        >
          <Image src={Icon} alt='copy' width={16} height={16}  className='tablet:w-[32px] tablet:h-[32px] laptop:w-[48px] laptop:h-[48px] desktop:w-[64px] desktop:h-[64px]'
            sizes="(max-width: 768px) 32px, (max-width: 1280px) 48px, 64px"
          />
          {/* <span className='break-words'>{message}</span> */}
          <span className='break-words font-offBit-trial tablet:text-[20px] laptop:text-[24px] desktop:text-[28px]'>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}