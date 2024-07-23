import { Box, Typography } from '@mui/material';
import * as React from 'react';

function DesainHome() {
    return (
        <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column',
            backgroundImage: 'url(https://liputan.co.id/wp-content/uploads/2019/09/Shutterstock.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: 800,
            width: '100%',
        }}>

            <Typography variant='h3' sx={{ color: 'black', m: 2, mb: 4}}>
                WELCOME TO REACT JS
            </Typography>

            <img 
                src='https://cdn.neurosys.com/wp-content/uploads/2021/10/react-js-1.svg' 
                alt='Decorative Image' 
                style={{width: 240, height: 240, marginTop: '20px'}}
            />
        </Box>


    );
}

export default DesainHome;
