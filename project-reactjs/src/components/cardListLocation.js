import * as React from 'react';
import { Card, CardContent, Container, Grid, Typography, Button } from '@mui/material';

function CardListLocation() {
    const [locations, setLocations] = React.useState([]);
    const [selectedLocation, setSelectedLocation] = React.useState(null);

    React.useEffect(() => {
        const savedLocations = JSON.parse(localStorage.getItem('characterLocations')) || [];
        setLocations(savedLocations);
    }, []);

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                List of Locations
            </Typography>
            <Grid container spacing={2}>
                {locations.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.location}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6">
                                    Location: {item.location}
                                </Typography>
                                <Button onClick={() => handleLocationClick(item)}>
                                    View Characters
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedLocation && (
                <Card sx={{ boxShadow: 3, mt: 4 }}>
                    <CardContent>
                        <Typography variant="h6">
                            Characters in {selectedLocation.location}:
                        </Typography>
                        <ul>
                            {selectedLocation.characterIds.map(characterId => (
                                <li key={characterId}>Character ID: {characterId}</li>
                            ))}
                        </ul>
                        <Button onClick={() => setSelectedLocation(null)}>
                            Close
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}

export default CardListLocation;
