import { useTranslation } from 'react-i18next'

export function FeedPage() {
  const { t } = useTranslation()

  return <h1>{t('pages.feed')} works!</h1>
}
