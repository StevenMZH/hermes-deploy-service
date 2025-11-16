import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from './components/Header';
// import Footer from './components/Footer';
// import SidebarLayout from './SidebarLayout';
// import FormLayout from './FormLayout';
import { routes } from '../../routes';

export default function Layout() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      <div className='authPage-container'>
        {/* <header>
          <Header />
        </header>
         */}
        <main className='full-w flex column'>
          <Outlet />
        </main>

        {/* <footer>
          <Footer />
        </footer>

        <FormLayout /> */}
      </div>
    </>
  );
}
