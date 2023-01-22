import React from 'react';
import { FormControl, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card className='rounded-tl-none'>
          <Typography>{children}</Typography>
        </Card>
      )}
    </div>
  );
}

const AwaitingApplications = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <main className='flex flex-col h-full'>
      <div className='h-[180px] bg-[#252F3E]'>
        <div className='p-[16px] max-w-5xl mx-auto'>
          <header>
            <Typography variant='h6' color='white'>
              <AutoFixHighIcon fontSize='medium' className='fill-[#ffd700]' />
              <span className='ml-3 font-normal'>Se ansøgninger</span>
            </Typography>
          </header>
          <Box sx={{ marginTop: 5, padding: 0 }} className='w-full'>
            <Box>
              <Tabs
                className='w-fit bg-white rounded-tr-xl rounded-tl-xl'
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
              >
                <Tab sx={{ padding: 0 }} label='Item One' id='simple-tab-1' />
                <Tab sx={{ padding: 0 }} label='Item Two' id='simple-tab-2' />
                <Tab sx={{ padding: 0 }} label='Item Three' id='simple-tab-3' />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </div>
      </div>
    </main>
  );
};

export default AwaitingApplications;
