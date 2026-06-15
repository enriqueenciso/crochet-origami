import { useTranslation } from 'react-i18next'

export function ProfilePage() {
  const { t } = useTranslation()

  return <h1>{t('pages.profile')} works!</h1>
}
