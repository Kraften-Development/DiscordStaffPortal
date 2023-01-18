import * as React from 'react';
import { Notifications } from '@prisma/client';
import Paper from '@mui/material/Paper';
import Notification from './Notification';

import { Typography } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 12,
        border: `2.5px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

interface Props {
    notifications: Notifications[]
}


const NotificationList = (props: Props) => {
    const [notificationList, setNotifications] = React.useState(props.notifications);

    return (
        <div
            className="flex flex-col max-h-[600px]"
        >
            <div className="flex">
                <Typography variant="h5">Notifikationer</Typography>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={notificationList.length} color="secondary">
                        <MailIcon />
                    </StyledBadge>
                </IconButton>
            </div>
            <Typography variant="subtitle1">Her kan du se alle dine notifikationer</Typography>
            <Paper className="space-y-4" style={{ width: '100%', maxHeight: '800px', overflowY: 'scroll', padding: '20px' }}>
                {notificationList.length > 0 ? notificationList.map(notification => (
                    <Notification setNotifications={setNotifications} key={notification.id} {...notification} />
                )) : <p>Der er ingen notifikationer</p>}
            </Paper>
        </div>
    );
}

export default NotificationList;
