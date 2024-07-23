import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResponsiveAppBar() {

    const [showMore, setShowMore] = useState(false);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate()

    function handleClick() {
        setShowMore(!showMore);
    }

    function handleStatus() {
        setStatus(!status)
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Box sx={{display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center'}}
                    onClick={() => navigate('/')}>
                    <ConnectedTvIcon sx={{mr: 2}} />
                    <Typography variant='h6' sx={{fontWeight: 700}}>
                        Rick and Morty
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2} sx={{display: { xs: 'none', md: 'flex' }, alignItems: 'center'}}>
                    <Button variant="text" sx={{color: 'white'}} onClick={() => navigate('/characterlist')}>Character List</Button>
                    <Button variant="text" sx={{color: 'white'}} onClick={() => navigate('/characterbylocation')}>Character By Location</Button>
                    <Tooltip title={status ? 'You Wanna Sign Out ?' : 'You Wanna Sign In ?'}>
                        <Button variant="outlined" sx={{borderColor: 'white', 
                            color: 'white', 
                            backgroundColor: status ? 'green' : 'red'}} 
                            onClick={handleStatus}>
                            {status ? 'Sign In' : 'Sign Out'}
                        </Button>
                    </Tooltip>
                </Stack>

                <Box sx={{display: { xs: 'flex', md: 'none' }, position: 'absolute'}}>
                    <IconButton
                        size="large"
                        onClick={handleClick}
                        color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                </Box>
                <Box sx={{display: { xs: 'flex', md: 'none' }, justifyContent: 'center', flexGrow: 1, alignItems: 'center'}}
                    onClick={() => navigate('/')}>
                    <ConnectedTvIcon sx={{mr: 2}} />
                    <Typography variant='h6' sx={{fontWeight: 700}}>
                        Rick and Morty
                    </Typography>
                </Box>
            </Toolbar>
            
            {showMore && 
                <Stack direction='column' spacing={2} sx={{display: { xs: 'flex', md: 'none'}}}>
                    <Button variant="outlined" sx={{color: 'white'}} onClick={() => navigate('/characterList')}>
                        Character List
                    </Button>
                    <Button variant="text" sx={{color: 'white'}} onClick={() => navigate('/characterbylocation')}>
                        Character By Location
                    </Button>
                    <Button variant="text" sx={{color: 'white', backgroundColor: status ? 'green' : 'red'}} onClick={handleStatus}>
                        {status ? 'Sign In' : 'Sign Out'}
                    </Button>
                </Stack>
            }
        </AppBar>
    );
}
export default ResponsiveAppBar;

