import React, {PropsWithChildren} from "react";
import {Box} from "@mui/system";
import {AppBar, Toolbar, Typography} from "@mui/material";


export const MainLayout: React.FC<PropsWithChildren<any>> = ({children}) => {
    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Typography component={'h1'} variant={'h6'} sx={{flexGrow: 1}}>
                        New Anki App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box sx={{margin: '10px 20px'}}>
                {children}
            </Box>
        </Box>
    )
}