import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, Container, Grid, Typography, CardMedia, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function LayoutDetail() {

    const GET_CHARACTER_ID = gql`
        query getId($id: ID!) {
            character(id: $id) {
                name
                status
                gender
                species
                image
            }
        }
    `;

    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = React.useState('');
    const { loading, error, data } = useQuery(GET_CHARACTER_ID, {
        variables: { id }
    });

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveLocation = (characterId, location) => {
        let data = JSON.parse(localStorage.getItem('characterLocations')) || [];
    
        const locationIndex = data.findIndex(item => item.location === location);
    
        if (locationIndex !== -1) {
            const locationData = data[locationIndex];
            if (!locationData.characterIds) {
                locationData.characterIds = [];
            }
            if (!locationData.characterIds.includes(characterId)) {
                locationData.characterIds.push(characterId);
                data[locationIndex] = locationData;
                localStorage.setItem('characterLocations', JSON.stringify(data));
                alert('Character added to location successfully!');
            } else {
                alert('Character already assigned to this location.');
            }
        } else {
            const newLocation = {
                location: location,
                characterIds: [characterId]
            };
            data.push(newLocation);
            localStorage.setItem('characterLocations', JSON.stringify(data));
            alert('Location saved successfully!');
        }
    };
    
    const locationAdded = () => {
        if (!location) {
            alert("Location cannot be empty");
            return;
        }
    
        saveLocation(id, location);
    };
    

    return (
        <div>
            {data && (
                <Container maxWidth='xl'>
                    <Typography variant="h4" sx={{mt: 2}}>
                        Detail Character
                    </Typography>
                    <Grid container>
                        <Grid container item md={12} sx={{ justifyContent: 'center', mt: 2 }}>
                            <Card sx={{ boxShadow: 5 }}>
                                <Stack direction='row' spacing={3} sx={{ m: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                                        Name : {data.character.name}
                                    </Typography>
                                    <AddCircleIcon onClick={handleClickOpen} />
                                </Stack>
                                <CardMedia
                                    sx={{ height: 'auto', width: '100%', objectFit: 'cover' }}
                                    image={data.character.image}
                                    component='img'
                                    alt={data.character.name}
                                />
                                <CardContent>
                                    <Typography>
                                        Status : {data.character.status}
                                    </Typography>
                                    <Typography>
                                        Gender : {data.character.gender}
                                    </Typography>
                                    <Typography>
                                        Species : {data.character.species}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Input Location "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
                        **You can only enter unique locations and can only enter characters once at the location 
                        you have specified
                    </DialogContentText>
                    <TextField
                        variant='outlined'
                        label='Location'
                        fullWidth
                        sx={{ mb: 2 }}
                        placeholder='Add Location'
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <Button color='success' variant='contained' fullWidth onClick={locationAdded}>
                        Save
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LayoutDetail;
