import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function CharacterListCard() {

    const GET_DATA = gql`
        {
            characters {
            results {
                id
                name
                status
                gender
                species
                image
            }
            }
        }`

    const navigate = useNavigate()
    const { loading, error, data } = useQuery(GET_DATA);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    function getID(id) {
        navigate(`/detailcharacter/${id}`);
    }

    return (
        <Container maxWidth='xl'>
            <Typography variant="h4" sx={{mt: 2, mb: 2}}>
                List of Character
            </Typography>
            <Grid container spacing={3}>
            {data && (
                <>
                {data.characters.results.map((character) => (
                <Grid container item xs={12} sm={6} md={4} sx={{justifyContent: 'center'}}>
                    <Card sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', boxShadow: 4}}
                        onClick={() => getID(character.id)}>
                        <CardMedia
                                sx={{ height: 165, width: 110, objectFit: 'cover'}}
                                image= {character.image}
                                component='img'
                                alt= {character.name}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center'}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {character.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Status : {character.status}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                ))}
                </>
            )}
            </Grid>
        </Container>
    );
}

export default CharacterListCard;