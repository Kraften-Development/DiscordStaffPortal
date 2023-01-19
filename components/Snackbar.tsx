import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';


interface SnackbarContextType {
    showMessage: (message: string, severity?: string, duration?: number) => void;
    handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext)
    return {
        showMessage: context?.showMessage,
        handleClose: context?.handleClose
    }
};

export const SnackbarProvider = ({ children }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("I'm a custom snackbar");
    const [duration, setDuration] = useState<number>(2000);
    const [severity, setSeverity] = useState<string>(
        "success"
    ); /** error | warning | info */

    const showMessage = (message: string, severity = "success", duration = 2000) => {
        setMessage(message);
        setSeverity(severity);
        setDuration(duration);
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <SnackbarContext.Provider value={{
        showMessage,
        handleClose
    }}>
        {children}
        <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }} open={open} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity={severity as AlertColor} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar >
    </SnackbarContext.Provider >

}
