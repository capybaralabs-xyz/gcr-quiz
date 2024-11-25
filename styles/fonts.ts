import localFont from "next/font/local";

const engraversOldEnglish = localFont({
    src: '../src/app/fonts/OPTIEngraversOldEnglish.otf',
    display: 'swap',
    variable: '--font-old-english',
  })

const diatypeMonoRegular = localFont({
    src: '../src/app/fonts/ABCDiatypeMono-Regular-Trial.otf',
    display: 'swap',
    variable: '--font-diatype-mono-regular',
  })

  const diatypeMonoBold = localFont({
    src: '../src/app/fonts/ABCDiatypeMono-Bold-Trial.otf',
    display: 'swap',
    variable: '--font-diatype-mono-bold',
  })

  const OffbitTrialBold = localFont({
    src: '../src/app/fonts/OffBitTrial-101Bold.otf',
    display: 'swap',
    variable: '--font-offbit-trial-bold',
  })
export { engraversOldEnglish, diatypeMonoRegular, diatypeMonoBold, OffbitTrialBold };
