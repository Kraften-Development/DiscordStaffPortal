import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import { ProSidebarProvider, Sidebar, Menu, MenuItem, useProSidebar, SubMenu, MenuItemStyles } from 'react-pro-sidebar';

import { DocumentIcon, CheckBadgeIcon, Cog8ToothIcon, HomeIcon, ChevronDoubleRightIcon, XCircleIcon, BoltIcon } from '@heroicons/react/24/solid'
import { Badge, Typography } from '@mui/material';
import Link from 'next/link';
import { SnackbarProvider } from '../components/Snackbar';



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ProSidebarProvider>
        <SidebarDrawer />
        <div className="md:ml-auto md:w-[calc(100%-80px)]">
          <SnackbarProvider>
            <Component {...pageProps} />
          </SnackbarProvider>
        </div>
      </ProSidebarProvider>
    </SessionProvider>
  )
}


const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: '13px',
    fontWeight: 400,
  },
  icon: {
    color: '#59d0ff'
  },
  SubMenuExpandIcon: {
    color: '#b6b7b9',
  },
  subMenuContent: {
    backgroundColor: '#082440',
  }
};


function SidebarDrawer() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { data: session } = useSession();

  return (
    <Sidebar
      breakPoint="md"
      backgroundColor='#0b2948'
      rootStyles={{
        position: 'fixed',
        top: 0,
        zIndex: 100,
        left: 0,
        height: '100%',
        color: '#8ba1b7',
      }}>

      <div className={`mx-auto mt-10 w-7 ${collapsed && 'mb-10'}`}>
        {
          collapsed ? <ChevronDoubleRightIcon className="fill-blue-500 hover:fill-green-500 cursor-pointer duration-200 transform hover:scale-110" onClick={() => collapseSidebar()} /> : <XCircleIcon className="cursor-pointer fill-blue-500 duration-200 transform hover:scale-110 hover:fill-red-500" onClick={() => collapseSidebar()} />
        }
      </div>
      <div className={`w-fit px-5 py-[32px] mx-auto ${collapsed && 'hidden'}`}>
        <Typography fontSize={30} style={{ letterSpacing: '8px' }} className="font-[Rancho]" variant="subtitle1" fontWeight={900} color="#0098e5" >
          Kraften.dk
        </Typography>
      </div>
      <Menu
        menuItemStyles={menuItemStyles}
      >
        <MenuItem icon={<HomeIcon className="h-5" />} routerLink={<Link href={'/'} />}> Hjem </MenuItem>
        <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
          <Typography
            variant="body2"
            fontWeight={600}
            style={{ color: '#8ba1b7', opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
          >
            General
          </Typography>
        </div>

        <SubMenu icon={<DocumentIcon className="h-5" />} label="Mine ansøgninger">

          <MenuItem> Se mine ansøgninger </MenuItem>
          <MenuItem> Opret en ansøgning </MenuItem>
        </SubMenu>
        <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
          <Typography
            variant="body2"
            fontWeight={600}
            style={{ color: '#8ba1b7', opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
          >
            Profil
          </Typography>
        </div>
        <MenuItem icon={<Cog8ToothIcon className="h-5" />}> Indstillinger </MenuItem>
        {
          session && session.user && session.user.rank && session.user.rank == 5 &&
          <>
            <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ color: '#8ba1b7', opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                Admin
              </Typography>
            </div>
            <MenuItem icon={<CheckBadgeIcon className="h-5" />} routerLink={<Link href={'/applications'} />} suffix={
              <Badge color="info" badgeContent={4} />
            }> Ansøgninger </MenuItem>
            <MenuItem icon={<BoltIcon className="h-5" />} routerLink={<Link href={'/'} />}> Send alert</MenuItem>
          </>
        }
      </Menu>
      <div className={`${collapsed && 'hidden'} absolute bottom-0 py-5`}>
        <div className="px-[24px] ">
          <Typography
            variant="body2"
            fontWeight={600}
            style={{ color: '#8ba1b7', opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
          >
            Udviklet af Simon Winther
          </Typography>
        </div>
      </div>
    </Sidebar >
  )
};


