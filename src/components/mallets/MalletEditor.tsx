import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import {FormEventHandler, useState} from "react";
import {api} from "~/utils/api";
import {Box} from "@mui/system";

export default function MalletEditor() {
    const utils = api.useContext();
    const malletMutation = api.mallets.createMallet.useMutation({
        onSuccess() {
            utils.invalidate()
            setNewMalletName('')
            setActive(false)
        }
    })
    const [active, setActive] = useState(false)
    const [newMalletName, setNewMalletName] = useState('')

    const createMallet: FormEventHandler = (e) => {
        e.preventDefault()
        malletMutation.mutate({
            name: newMalletName
        })
    }

    return (
        <>
            <Button onClick={() => setActive(true)} variant={'contained'}>Añadir mallet</Button>
            <Dialog open={active} onClose={() => setActive(false)}>
                <DialogTitle>Editor de mallets</DialogTitle>
                <DialogContent>
                    <Box sx={{margin: '10px'}}>
                        <form onSubmit={createMallet}>
                            <Grid spacing={4} container>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={(e) => setNewMalletName(e.target.value)}
                                        value={newMalletName}  fullWidth={true} label={'Nombre del mallet'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type={'submit'}>
                                        Crear mallet
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}