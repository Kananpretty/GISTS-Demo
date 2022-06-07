import { Alert, AlertTitle, Container } from "@mui/material";
import React from "react";
import GistDetailCard from "./GistDetailCard";

const SearchResults = (data) => {

    const userdata = data.data;
    const userName = data.userName


    return (
        <Container>
            {userName !== null && userName !== undefined && userdata.length !== 0 ? (
                <>
                    <Alert severity="success"
                        style={{ marginTop: 10, marginBottom: 10 }}>
                        <AlertTitle>{`${userName}'s Gists`}</AlertTitle>
                        {`${userdata.length} Gists found`}
                    </Alert>

                    <ul>
                        {userdata.map((gist, index) => {
                            return <GistDetailCard id={index} gistData={gist}></GistDetailCard>;
                        })}
                    </ul>
                </>
            ) : null}
        </Container>
    )
}

export default SearchResults;