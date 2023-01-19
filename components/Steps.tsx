import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const steps = [
    {
        label: 'Fuldstændigt navn',
        id: 'name',
        isMultiline: false,
        description: 'Angiv dit fuldstændige navn, inklusiv for- og efternavn',
    },
    {
        label: 'Brugernavn i spillet',
        id: 'username',
        isMultiline: false,
        description: 'Angiv dit brugernavn i det pågældende spil',
    },
    {
        label: 'Alder',
        id: 'age',
        isMultiline: false,
        description: 'Angiv din alder',
    },
    {
        label: 'Selvbeskrivelse',
        id: 'description',
        isMultiline: true,
        description: 'Beskriv dig selv, herunder dine personlige kvaliteter og evner',
    },
    {
        label: 'Begrundelse for ansøgning',
        id: 'reason',
        isMultiline: true,
        description: 'Angiv din begrundelse for at ansøge om stillingen som staff på Kraften',
    },
    {
        label: 'Hvorfor skal vi vælge dig',
        id: 'whychooseyou',
        isMultiline: true,
        description: 'Angiv hvorfor vi skal vælge dig fremfor andre ansøgere. Her bør du fremhæve dine unikke færdigheder, erfaringer og kvalifikationer, der gør dig særligt egnet til stillingen. Du kan også nævne eventuelle relevante projekter eller erfaringer, du har haft i fortiden, og hvordan de har forberedt dig til denne rolle. Det er også vigtigt at beskrive din passion og engagement for emnet, og hvorfor du er interesseret i at arbejde som staff på Kraften.'
    },
    {
        label: 'Erfaring indenfor screenshare',
        id: 'screenshare',
        isMultiline: true,
        description: 'Angiv dine erfaringer med screenshare',
    },
    {
        label: 'Tidligere erfaring som staff',
        id: 'previousexperience',
        isMultiline: true,
        description: 'Angiv om du har tidligere erfaring som staff, samt hvilket rank du havde',
    }, {
        label: 'Tilgængelighed på voice chat',
        id: 'voicechat',
        isMultiline: true,
        description: 'Angiv om du har en velfungerende mikrofon, og om du kan være online på både teamspeak og discord',
    },
    {
        label: 'Tid til rådighed',
        id: 'availability',
        isMultiline: false,
        description: 'Angiv hvor mange timer om ugen du kan være online på vores Minecraft server og Discord server',
    },
    {
        label: 'Forpligtelse til at repræsentere Kraften',
        id: 'commitment',
        isMultiline: false,
        description: 'Angiv om du er indforstået i, at når du begår dig på andre servere, repræsenterer du Kraften og skal opføre dig ordentligt',
    },
    {
        label: 'Yderligere information',
        id: 'additionalinfo',
        isMultiline: true,
        description: 'Hvis du har noget på hjertet, som du gerne vil have delt med os, når vi læser din besked er det nu du har chancen.',
    }
];


type State = {
    name: string,
    username: string,
    age: number,
    description: string,
    reason: string,
    whychooseyou: string,
    screenshare: string,
    previousexperience: string,
    voicechat: string,
    availability: number,
    commitment: string,
    additionalinfo: string,
}


interface Props {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}


export default function VerticalLinearStepper({ state, setState }: Props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <form>
            <Box>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 11 ? (
                                        <Typography variant="caption">Sidst men ikke mindst</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <div className="my-5">

                                    <TextField onChange={(e) => {
                                        setState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
                                    }} multiline={step.isMultiline} id={step.id} label={step.label} variant="standard" placeholder="" />
                                </div>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="text-blue-500 hover:text-white"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Send ansøgning' : 'Næste'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Tilbage
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {
                    activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <h1 className="font-bold font-[Raleway]">Tak for din ansøgning!</h1>
                            <Typography variant="subtitle1">Vi her hos Kraften takker dig for din ansøgning. Den vil nu blive gennemgået af vores kompetente personale med det formål at undersøge den nøje indenfor den kommende uges tid. Vi vil give dig besked om videre procedurer hurtigst muligt. Det er vigtigt at du holder øje med dine notifikationer på din homepage, da det er her du vil modtage besked om din ansøgning er blevet accepteret eller ej. Hvis du er accepteret vil du modtage en dato hvor du skal møde op, og i tilfælde af udeblivelse fra denne dato vil du miste din chance. Tak for din interesse i at blive en del af vores team.</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                    )
                }

                {/*
                {errors.name && 'navn'}
                {errors.username && 'username'}
                {errors.age && 'age'}
                {errors.description && 'description'}
                {errors.reason && 'reason'}
                {errors.voicechat && 'voicechat'}
                {errors.screenshare && 'screenshare'}
                {errors.whychooseyou && 'hvorfor vælge dig'}
                {errors.previousexperience && 'erfaring'}
                {errors.availability && 'tilbøjelighed'}
                {errors.commitment && 'commitment'}
                {errors.additionalinfo && 'ekstra'}
                */}


            </Box >
        </form>
    );
}