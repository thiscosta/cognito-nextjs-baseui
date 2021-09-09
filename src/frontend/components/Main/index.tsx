import React, { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { refreshToken } from "../../store/thunks/authorization";
import { useRouter } from "next/router";
import { Dimmer, Loader } from "semantic-ui-react";

export default function Main({ children }) {

    const dispatch = useAppDispatch()
    const router = useRouter();
    const refreshed = useAppSelector(store => store.authorization.refreshed)
    const refreshing = useAppSelector(store => store.authorization.refreshing)

    const tokenTriedToBeRefreshed = useMemo(
        () => (refreshed === true || refreshed === false) && !refreshing,
        [refreshed, refreshing]
    )


    useEffect(() => {
        function checkTokenOnLocalStorage() {
            dispatch(refreshToken())
        }
        checkTokenOnLocalStorage()
        return () => { }
    }, [])

    useEffect(() => {
        function goToNextRoute() {
            if (tokenTriedToBeRefreshed === true) {
                router.push(refreshed === true ? '/app' : '/login')
            }
        }
        goToNextRoute()
        return () => { }
    }, [tokenTriedToBeRefreshed])

    return (
        <>
            {
                tokenTriedToBeRefreshed ? children : (
                    <Dimmer active inverted>
                        <Loader inverted />
                    </Dimmer>
                )
            }
        </>
    );
}