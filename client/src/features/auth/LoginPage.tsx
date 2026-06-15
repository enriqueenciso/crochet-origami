import { useTranslation } from 'react-i18next'

export function LoginPage() {
  const { t } = useTranslation()

  return <h1>{t('pages.login')} works!</h1>
}
