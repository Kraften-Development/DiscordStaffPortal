import { Typography } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const apply = () => {
    return (
        <main className="max-w-4xl mx-auto text-4xl font-[Raleway]">
            <Typography variant="h2">Ansøgningsformular</Typography>
            <Typography variant="subtitle1">Ansøgninger bliver automatisk afvist efter 7 dage. Hvis din ansøgning bliver afvist. Så må du først ansøge igen efter 14 dage</Typography>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Test dsaiudha dsaiu
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </main>
    )
}

export default apply