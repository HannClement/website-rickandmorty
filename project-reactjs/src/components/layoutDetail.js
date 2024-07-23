import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, Container, Grid, Typography, CardMedia, Stack, TextField} from '@mui/material';
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
                name,
                status,
                gender,
                species,
                image
            }
        }
    `;

    const {id} = useParams();
    const [open, setOpen] = React.useState(false);
    const { loading, error, data } = useQuery(GET_CHARACTER_ID, {
        variables: {id}
    }) ;

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {data && (
                <Container maxWidth='xl'>
                    <Grid container>
                        <Grid container item md={12} sx={{justifyContent: 'center', mt: 2}}>
                            <Card sx={{boxShadow: 5}}>
                                <Stack direction='row' spacing={3} sx={{m: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography sx={{fontSize: 20, fontWeight: 600}}>
                                        Name : {data.character.name}
                                    </Typography>
                                    <AddCircleIcon onClick={handleClickOpen}/>
                                </Stack>
                                <CardMedia
                                    sx={{ height: 'auto', width: '100%', objectFit: 'cover'}}
                                    image= {data.character.image}
                                    component='img'
                                    alt= {data.character.name}
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
                        <TextField>
                            
                        </TextField>
                    <DialogContentText id="alert-dialog-description">
                        **You can only enter unique locations and can only enter characters once at the location 
                            you have specified
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}

export default LayoutDetail;