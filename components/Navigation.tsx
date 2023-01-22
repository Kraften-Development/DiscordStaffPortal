import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ApprovalIcon from '@mui/icons-material/Approval';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CampaignIcon from '@mui/icons-material/Campaign';

import Image from 'next/image';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useSession, signIn, signOut } from 'next-auth/react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Role } from '@prisma/client';

const Navigation = () => {
  const { data: session } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isApplicationNestedIsOpen, setIsApplicationNestedIsOpen] =
    useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ background: '#252F3E' }}
          enableColorOnDark
          position='static'
        >
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              sx={{ position: 'sticky' }}
              color='inherit'
              aria-label='logo'
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='subtitle1'
              component='div'
              sx={{ flexGrow: 1 }}
            >
              <div className='flex items-center'>
                <div className='flex h-3 w-3 relative mr-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                </div>
                <Typography variant='body1' className='text-gray-200'>
                  25 online <span className='sm:inline hidden'>på Kraften</span>
                </Typography>
              </div>
            </Typography>

            {session?.user ? (
              <div className='flex items-center space-x-3'>
                <Tooltip title='Bruger indstillinger'>
                  <Button
                    className='flex'
                    onClick={handleClick}
                    aria-haspopup='true'
                    aria-controls={menuOpen ? 'account-menu' : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined}
                  >
                    <div className='flex flex-col text-end mr-4'>
                      <Typography
                        className='font-bold text-white'
                        fontSize={13}
                        variant='body1'
                      >
                        {session?.user?.name}
                      </Typography>
                      <Typography
                        className='text-gray-300'
                        fontSize={11}
                        variant='body1'
                      >
                        {session?.user?.rank}
                      </Typography>
                    </div>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt={session?.user?.name as string}
                      src={session?.user?.image as string}
                    />
                  </Button>
                </Tooltip>
                <Menu
                  id='account-menu' //d
                  PaperProps={{
                    style: {
                      minWidth: 180,
                    },
                  }}
                  elevation={5}
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    <div className='flex items-center space-x-3'>
                      <AccountBoxIcon className='fill-gray-500 w-[20px] h-[20px]' />
                      <Typography
                        className='text-[12px] font-sans text-gray-600'
                        variant='body1'
                      >
                        Min profil
                      </Typography>
                    </div>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => signOut()}
                    className='flex items-center space-x-3'
                  >
                    <LogoutIcon className='fill-red-500 w-[22px] h-[22px]' />
                    <Typography
                      className='text-[12px] font-sans text-gray-600'
                      variant='body1'
                    >
                      Log ud
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                onClick={() =>
                  signIn()
                    .then((test) => {
                      console.log(':');
                      console.log(test);
                      console.log(':');
                    })
                    .catch((error) => {
                      console.log(':2');
                      console.log(error);
                      console.log(':2');
                    })
                }
                color='inherit'
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <PerfectScrollbar>
          <div className='h-full flex flex-col'>
            <div className='w-[300px] px-5 relative bg-[#252F3E] pt-[55px] pb-[90px] mb-[32px] text-center inline-block break-words'>
              <Typography
                variant='body1'
                className='text-white font-semibold mx-auto'
              >
                {session?.user?.name}
              </Typography>
              <Typography
                variant='body1'
                className='text-gray-200 text-sm mx-auto'
              >
                {session?.user?.name}#1610
              </Typography>
              <div className='flex items-center justify-center absolute right-0 left-0 bottom-0'>
                {/* h-20/2 - p-[0.6rem] */}
                <div className='bg-white p-[0.6rem] -mb-[calc(2.5rem+0.6rem)] rounded-full'>
                  <Avatar
                    className='h-20 w-20'
                    alt={session?.user?.name as string}
                    src={session?.user?.image as string}
                  />
                </div>
              </div>
            </div>
            <Box p={2} width='300px' textAlign='center' role='presentation'>
              <h1 className='font-[Rajdhani] text-3xl'>Kraften</h1>
              <Divider />
              <List>
                <Link href='/'>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ borderRadius: '7px' }}>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary='Forside' />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
              <List
                component='nav'
                aria-labelledby='nested-list-subheader'
                subheader={
                  <ListSubheader
                    className='text-start font-[Rajdhani] uppercase text-green-600 font-bold tracking-widest'
                    component='div'
                    id='nested-list-subheader'
                  >
                    Ansøgninger
                  </ListSubheader>
                }
              >
                <ListItemButton
                  onClick={() =>
                    setIsApplicationNestedIsOpen(!isApplicationNestedIsOpen)
                  }
                  sx={{ borderRadius: '7px' }}
                >
                  <ListItemIcon>
                    <ApprovalIcon />
                  </ListItemIcon>
                  <ListItemText primary='Hjælper ansøgning' />
                  {isApplicationNestedIsOpen ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItemButton>
                <Collapse
                  in={isApplicationNestedIsOpen}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    <Link href='/hjaelper/opret'>
                      <ListItem disablePadding>
                        <ListItemButton sx={{ pl: 4, borderRadius: '7px' }}>
                          <ListItemIcon>
                            <AddIcon />
                          </ListItemIcon>
                          <ListItemText primary='Opret ansøgning' />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link href='/hjaelper/afventer'>
                      <ListItem disablePadding>
                        <ListItemButton sx={{ pl: 4, borderRadius: '7px' }}>
                          <ListItemIcon>
                            <ReceiptLongIcon />
                          </ListItemIcon>
                          <ListItemText primary='Ansøgninger' />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </List>
              {session?.user?.rank &&
                (session?.user?.rank == Role.ADMIN ||
                  session?.user?.rank == Role.GOAT) && (
                  <List
                    component='nav'
                    aria-labelledby='nested-list-subheader'
                    subheader={
                      <ListSubheader
                        className='text-start font-[Rajdhani] uppercase text-green-600 font-bold tracking-widest'
                        component='div'
                        id='nested-list-subheader'
                      >
                        Admin
                      </ListSubheader>
                    }
                  >
                    <ListItemButton sx={{ borderRadius: '7px' }}>
                      <ListItemIcon>
                        <CampaignIcon />
                      </ListItemIcon>
                      <ListItemText primary='Send notifikation' />
                    </ListItemButton>
                  </List>
                )}
            </Box>
            <Image
              src='/logo.jpg'
              alt=''
              width={100}
              height={100}
              className='mt-auto mb-7 mx-auto rounded-full shadow-lg shadow-green-400 object-center object-contain'
            />
          </div>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Navigation;
