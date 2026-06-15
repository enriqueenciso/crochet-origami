import { useTranslation } from 'react-i18next'

export function RegisterPage() {
  const { t } = useTranslation()

  return <h1>{t('pages.register')} works!</h1>
}
