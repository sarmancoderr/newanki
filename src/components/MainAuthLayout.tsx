import {DataType} from "csstype";
import {Button, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {useSession} from "next-auth/react";
import {MainLayout} from "~/components/MainLayout";

export const MainAuthLayout = (PageContent: React.FC) => function MainAuthLayout () {
    const {data: session} = useSession()

    if (!session) {
        return (
            <MainLayout>
                <Button>Es necesario iniciar sessión</Button>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <PageContent />
        </MainLayout>
    )
}

export default MainAuthLayout