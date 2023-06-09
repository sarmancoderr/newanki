import {Button, TextField} from "@mui/material";
import { type NextPage } from "next";
import React, {useEffect, useState} from "react";
import {api} from "~/utils/api";
import {signIn, useSession} from "next-auth/react";


export const Home: NextPage = () => {
    const {data: session} = useSession()

    if (!session) {
        return (<Button variant={'contained'} onClick={() => {void signIn()}}>Es necesario iniciar sesión</Button>)
    }

    return (
        <HomeContent />
    )
}

const HomeContent: React.FC = () => {
    const utils = api.useContext()
    const {data, isLoading} = api.mallets.listMallets.useQuery()
    const {mutate} = api.mallets.createMallet.useMutation({
        onSuccess() {
            utils.mallets.invalidate()
        }
    })

    const createMallet: React.FormEventHandler = (e) => {
        e.preventDefault()
        mutate({
            name: 'Primer mallet'
        })
    }

    if (isLoading) {
        return (<p>Loading</p>)
    }

    console.log('renderizando la APPPPPPPPPPPPPP')

    return (
        <>
            <p>Listado de mazos</p>
            <ul>
                {data?.map(mazo => (
                    <li key={mazo.id}>{mazo.name}</li>
                ))}
            </ul>
            <form onSubmit={createMallet}>
                <Button type={'submit'} variant={'contained'}>Crear mazo</Button>
            </form>
        </>
    )
}

export default Home