import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import React, { useState } from 'react';

import Steps from '../../components/Steps';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FormControl from '@mui/material/FormControl';
import { useSnackbar } from '../../components/Snackbar';
import { ApplicationState } from '../../typings';
import { useSession } from 'next-auth/react';
import { createApplication } from '../../services/application';
import { ApplicationType } from '@prisma/client';

const errorInitialStates = {
  name: '',
  username: '',
  age: '',
  description: '',
  reason: '',
  whychooseyou: '',
  screenshare: '',
  previousexperience: '',
  voicechat: '',
  availability: '',
  //commitment ~ can't fail checkbox
  //additionalinfo ~ not required field
};

const initialState = {
  name: '',
  username: '',
  age: '',
  description: '',
  reason: '',
  whychooseyou: '',
  screenshare: '',
  previousexperience: '',
  voicechat: '',
  availability: '',
  commitment: false,
  additionalinfo: '',
};

type Errors = {
  name: string;
  username: string;
  age: string;
  description: string;
  reason: string;
  whychooseyou: string;
  screenshare: string;
  previousexperience: string;
  voicechat: string;
  availability: string;
};

const Apply = () => {
  const { data: session } = useSession();

  const { showMessage } = useSnackbar();
  const [errors, setErrors] = useState<Errors>(errorInitialStates);

  const [state, setState] = useState<ApplicationState>(initialState);

  const resetForm = () => {
    window?.scrollTo(0, 0);
    setState(initialState);
  };

  const hasErrors = () => {
    const noErrors = Object.values(errors).every((error) => error === '');
    return !noErrors;
  };

  const handleChange =
    (name: string, message?: string) =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (name in errors) {
        //Need this check or else it adds new keys, additionalinfo etc..
        let error = '';
        if (e.target.value && e.target.pattern && message) {
          const reg = new RegExp(e.target.pattern);
          if (!reg.test(e.target.value)) {
            error = message;
          }
        }
        if (e.target.value === '') {
          error = 'Feltet er påkrævet';
        }
        setErrors({
          ...errors,
          [name]: error,
        });
      }
      setState({
        ...state,
        [name]: e.target.value,
      });
    };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let applicationType: ApplicationType = ApplicationType.HELPER;

    const applications = {
      ...state,
      age: parseInt(state.age),
      availability: parseInt(state.availability),
      userId: session?.user?.id as string,
      applicationType,
    };

    const result = await createApplication(applications);

    if (result.isOk) {
      if (showMessage) showMessage(result.message);
      resetForm();
    } else {
      if (showMessage) showMessage(result.message, 'error');
    }
  };
  if (!session?.user) {
    return <h1>Du skal være logget ind!</h1>;
  }
  return (
    <main id='apply-main-section' className='flex flex-col'>
      <div className='h-[180px] bg-[#252F3E]'>
        <div className='p-[16px] max-w-5xl mx-auto'>
          <header>
            <Typography variant='h6' color='white'>
              <AutoAwesomeIcon fontSize='medium' className='fill-[#ffd700]' />
              <span className='ml-3 font-normal'>Opret Hjælper Ansøgning</span>
            </Typography>
          </header>
          <Card sx={{ marginTop: 5 }}>
            <CardContent>
              <FormControl>
                <form className='space-y-4' onSubmit={handleOnSubmit}>
                  <div className='flex items-center'>
                    <hr className='w-full h-[1px] mx-2 my-4 bg-[#dfdede] border-0 rounded md:my-10' />
                    <Typography variant='h5' className='whitespace-nowrap'>
                      Generelle informationer
                    </Typography>
                    <hr className='w-full h-[1px] mx-2 my-4 bg-[#dfdede] border-0 rounded md:my-10' />
                  </div>
                  <TextField
                    fullWidth
                    value={state.name}
                    onChange={handleChange('name')}
                    id='textfield-name'
                    label='Dit fornavn'
                    error={errors.name != ''}
                    helperText={errors.name == '' ? '' : errors.name}
                    required
                  />
                  <TextField
                    fullWidth
                    value={state.username}
                    onChange={handleChange('username')}
                    id='textfield-username'
                    label='Dit brugernavn'
                    error={errors.username != ''}
                    helperText={errors.username == '' ? '' : errors.username}
                    required
                  />
                  <TextField
                    fullWidth
                    value={state.age}
                    inputProps={{ pattern: '^[0-9]*$' }}
                    onChange={handleChange(
                      'age',
                      'Din alder må kun bestå af tal'
                    )}
                    id='textfield-username'
                    label='Din alder'
                    error={errors.age != ''}
                    helperText={errors.age == '' ? '' : errors.age}
                    required
                  />
                  <TextField
                    fullWidth
                    value={state.description}
                    onChange={handleChange('description')}
                    id='textfield-description'
                    label='En kort introduktion om dig selv'
                    error={errors.description != ''}
                    helperText={
                      errors.description == ''
                        ? 'Introducér dig selv hvad du laver i din fritid, studerer, eventuelle hobbyer.'
                        : errors.description
                    }
                    required
                    multiline
                    rows={4}
                  />
                  <div className='flex items-center'>
                    <hr className='w-full h-[1px] mx-2 my-4 bg-[#dfdede] border-0 rounded md:my-10' />
                    <Typography variant='h5' className='whitespace-nowrap'>
                      Uddybende spørgsmål
                    </Typography>
                    <hr className='w-full h-[1px] mx-2 my-4 bg-[#dfdede] border-0 rounded md:my-10' />
                  </div>
                  <TextField
                    fullWidth
                    value={state.reason}
                    onChange={handleChange('reason')}
                    id='textfield-reason'
                    label='Hvorfor vil du gerne være staff på Kraften?'
                    error={errors.reason != ''}
                    helperText={errors.reason == '' ? '' : errors.reason}
                    required
                    multiline
                    rows={4}
                  />
                  <TextField
                    fullWidth
                    value={state.whychooseyou}
                    onChange={handleChange('whychooseyou')}
                    id='textfield-whychooseyou'
                    label='Hvorfor skal vi vælge dig?'
                    error={errors.whychooseyou != ''}
                    helperText={
                      errors.whychooseyou == ''
                        ? 'Begrund hvorfor vi lige netop skal vælge dig fremfor alle andre, hvad gør dig til den rette til jobbet?'
                        : errors.whychooseyou
                    }
                    required
                    multiline
                    rows={4}
                  />
                  <TextField
                    fullWidth
                    value={state.screenshare}
                    onChange={handleChange('screenshare')}
                    id='textfield-screenshare'
                    label='Hvad er din erfaring med screenshare?'
                    error={errors.screenshare != ''}
                    helperText={
                      errors.screenshare == '' ? '' : errors.screenshare
                    }
                    required
                  />
                  <div className='flex items-center'>
                    <hr className='w-full h-[1px] mx-2 my-4 bg-[#dfdede] border-0 rounded md:my-10' />
                    <Typography variant='h5' className='whitespace-nowrap'>
                      Yderligere
                    </Typography>
                    <hr className='w-full h-[1px] mx-2 my-4 bg-[#dfdede] border-0 rounded md:my-10' />
                  </div>
                  <TextField
                    fullWidth
                    value={state.previousexperience}
                    onChange={handleChange('previousexperience')}
                    id='textfield-previousexperience'
                    label='Har du tidligere erfaring?'
                    error={errors.previousexperience != ''}
                    helperText={
                      errors.previousexperience == ''
                        ? 'Herunder hvilke servere du har været ansat på, samt hvilke rang'
                        : errors.previousexperience
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    value={state.voicechat}
                    onChange={handleChange('voicechat')}
                    id='textfield-voicechat'
                    label='Mikrofon, teamspeak samt discord'
                    error={errors.voicechat != ''}
                    helperText={
                      errors.voicechat == ''
                        ? 'Har du en velfungerende mikrofon og kan du være online på både teamspeak og discord?'
                        : errors.voicechat
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    value={state.availability}
                    inputProps={{ pattern: '^[0-9]*$' }}
                    onChange={handleChange(
                      'availability',
                      'Din tilgængelig må kun bestå af tal'
                    )}
                    id='textfield-availability'
                    label='Tilgængelighed'
                    error={errors.availability != ''}
                    helperText={
                      errors.availability == ''
                        ? 'Hvor mange timer om ugen kan du cirka være online på vores Minecraft server og Discord server?'
                        : errors.availability
                    }
                    required
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ marginRight: 1 }}
                        checked={state.commitment}
                        onChange={(e) =>
                          setState({
                            ...state,
                            commitment: e.target.checked,
                          })
                        }
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
                    }
                    label={
                      <Typography fontSize={14} variant='subtitle1'>
                        Er du bevidst om, at når man agerer som repræsentant for
                        Kraften på eksterne platforme, er det nødvendigt at
                        observere et højt niveau af professionel etikette og
                        adfærd.
                      </Typography>
                    }
                  />
                  <TextField
                    fullWidth
                    value={state.additionalinfo}
                    onChange={handleChange('additionalinfo')}
                    id='textfield-additionalinfo'
                    label='Andet vi burde vide om dig?'
                    helperText={
                      'Her er der mulighed for at tilføje andre ting du synes vi burde vide?'
                    }
                    multiline
                    rows={4}
                  />
                  <ButtonGroup
                    fullWidth
                    size='small'
                    aria-label='small button group'
                  >
                    <Button key='one'>Annuller</Button>
                    <Button
                      type='submit'
                      disabled={hasErrors() || !state.commitment}
                      key='two'
                    >
                      Opret
                    </Button>
                  </ButtonGroup>
                </form>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Apply;
