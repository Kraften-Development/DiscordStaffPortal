import { Typography } from '@mui/material'
import React, { useState } from 'react'
import Steps from '../components/Steps';


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

const Apply = () => {

    const [state, setState] = useState<State>({
        name: '',
        username: '',
        age: 0,
        description: '',
        reason: '',
        whychooseyou: '',
        screenshare: '',
        previousexperience: '',
        voicechat: '',
        availability: '',
        commitment: '',
        additionalinfo: '',
    });

    return (
        <main className="flex flex-col max-w-6xl mx-auto font-[Raleway]">
            <div className="p-10 m-10 mb-5">
                <h1 className="font-bold text-3xl">🙏Tak for du har valgt at ville være en del af KraftenDK personale</h1>
                <h1 className="text-gray-500 text-lg">Det er vigtigt, at man tager sig den nødvendige tid til at udarbejde en kvalitativ og omhyggelig ansøgning. Det er vigtigt at undgå at fremskynde processen, da det kan føre til en utilfredsstillende ansøgning samt afslag.</h1>
            </div>

            <div className="flex">
                <div className="flex-1 p-5 py-10">
                    <Steps state={state} setState={setState} />
                </div>

                <div className="hidden sticky top-0 sm:inline-block flex-1 ">
                    <div className="sticky py-10 top-0">
                        <h1 className="text-4xl font-bold">Ansøgningsformular</h1>
                        <Typography variant="subtitle1">⚠️ Ansøgninger bliver automatisk afvist efter 7 dage. Hvis din ansøgning bliver afvist. Så må du først ansøge igen efter 14 dage</Typography>
                        <h1 className="mt-5 text-1xl font-bold">Forhåndsvisning:</h1>
                        <div className="grid grid-cols-2">
                            <div>
                                <h1 className="font-bold">Dit navn</h1>
                                <p className="text-gray-600">{state.name || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Dit brugernavn</h1>

                                <p className="text-gray-600">{state.username || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Alder</h1>
                                <p className="text-gray-600">{state.age ? state.age + ' år' : 'Ikke givet'}</p>
                            </div>
                            <div className="inline-block break-words">
                                <h1 className="font-bold">Selvbeskrivelse</h1>
                                <p><span className="text-gray-600">{state.description + ' ' || 'Ikke givet'}</span></p>
                            </div>
                            <div className="">
                                <h1 className="font-bold">Grund</h1>
                                <p className="text-gray-600">{state.reason || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Hvorfor vælge dig?</h1>
                                <p className="text-gray-600">{state.whychooseyou || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Screenshare</h1>
                                <p className="text-gray-600">{state.screenshare || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Erfaring</h1>
                                <p className="text-gray-600">{state.previousexperience || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Voice chat</h1>
                                <p className="text-gray-600">{state.voicechat || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Rådighed</h1>
                                <p className="text-gray-600">{state.availability || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Forpligtelse</h1>
                                <p className="text-gray-600">{state.commitment || 'Ikke givet'}</p>
                            </div>
                            <div>
                                <h1 className="font-bold">Ekstra</h1>
                                <p className="text-gray-600">{state.additionalinfo || 'Ikke givet'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )
}

export default Apply