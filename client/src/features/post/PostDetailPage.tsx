import { useTranslation } from 'react-i18next'

export function PostDetailsPage() {
  const { t } = useTranslation()

  return <h1>{t('pages.postDetail')} works!</h1>
}
