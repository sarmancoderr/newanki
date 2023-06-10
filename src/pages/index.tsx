import {Button, Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import { type NextPage } from "next";
import React, {useEffect, useState} from "react";
import {api} from "~/utils/api";
import {signIn, useSession} from "next-auth/react";
import {Box} from "@mui/system";
import MalletEditor from "~/components/mallets/MalletEditor";


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

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '0px 10px'}}>
                <Typography component={'h2'} variant={'h4'}>Listado de mazos</Typography>
                <MalletEditor />
            </Box>
            <Box sx={{margin: '5px 10px'}}>
                <Grid container spacing={5}>
                    {data?.map(mazo => (
                        <Grid key={mazo.id} item>
                            <Card>
                                <CardContent>
                                    <Typography component={'h3'} variant={'h5'}>{mazo.name}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button>Ver mazo</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Home