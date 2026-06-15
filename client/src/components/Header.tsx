import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()

  return (
    <header>
      <nav>
        <Link to="/">{t('nav.feed')}</Link>
        <Link to="/login">{t('nav.login')}</Link>
        <Link to="/register">{t('nav.register')}</Link>
        <Link to="/profile">{t('nav.profile')}</Link>
      </nav>
    </header>
  )
}
