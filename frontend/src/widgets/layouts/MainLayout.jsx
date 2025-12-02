import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from './components/Header';
import Footer from './components/Footer';
import SidebarLayout from './SidebarLayout';
import FormLayout from './FormLayout';
import { routes } from '../../routes';
import Shell from '../components/shell/Shell';

export default function Layout() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  // Definir los elementos del sidebar usando traducciones y rutas dinámicas
  const sidebarElements = [
    { name: t('servers'), url: routes[lang].servers, icon: 'nav/servers.svg' },
    { name: t('imageRegistry'), url: routes[lang].images, icon: 'nav/images.svg' },
    { name: t('repositories'), url: routes[lang].repositories, icon: 'nav/repos.svg' },
    { name: t('apps'), url: routes[lang].apps, icon: 'nav/apps.svg' },
    { name: t('settings'), url: routes[lang].settings, icon: 'nav/settings.svg' },
  ];

  return (
    <>
      <SidebarLayout
        elements={sidebarElements}
        className=""
      />

      <div className='content-container'>
        <Shell/>

        <div className='page-content full-view'>
          <header>
            <Header />
          </header>
          
          <main className='full-w flex column'>
            <Outlet />
          </main>
        </div>


        {/* <footer>
          <Footer />
        </footer> */}

      </div>

      <FormLayout />

    </>
  );
}
