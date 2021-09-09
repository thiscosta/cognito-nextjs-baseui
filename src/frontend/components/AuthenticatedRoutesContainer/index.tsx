import React from "react";

import { useAppSelector } from "../../utils/hooks";
import { Dimmer, Loader } from "semantic-ui-react";

export default function AuthenticatedRoutesContainer({ children }) {

    const accessToken = useAppSelector(store => store.authorization.accessToken)

    return (
        <>
            {
                accessToken ? children : (
                    <Dimmer active inverted>
                        <Loader inverted />
                    </Dimmer>
                )
            }
        </>
    );
}