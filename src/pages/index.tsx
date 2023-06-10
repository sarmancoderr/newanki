import {Button, Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import { type NextPage } from "next";
import React, {useEffect, useState} from "react";
import {api} from "~/utils/api";
import {signIn, useSession} from "next-auth/react";
import {Box} from "@mui/system";
import MalletEditor from "~/components/mallets/MalletEditor";
import MainLayout, {MainAuthLayout} from "~/components/MainAuthLayout";

const HomeContent: React.FC = () => {
    const utils = api.useContext()
    const {data, isLoading} = api.mallets.listMallets.useQuery()
    const {mutate} = api.mallets.createMallet.useMutation({
        onSuccess() {
            utils.mallets.invalidate()
        }
    })

    console.log('HOME PAGE')

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
            <Box>
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

export default MainAuthLayout(HomeContent)