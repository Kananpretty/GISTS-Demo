import { Alert, AlertTitle, Container, List, ListItem, Paper } from "@mui/material";
import React from "react";
import GistDetailCard from "./GistDetailCard";

const SearchResults = (data) => {

    const userdata = data.data;
    const userName = data.userName


    return (
        <Paper >
            {userName !== null && userName !== undefined && userdata.length !== 0 ? (
                <>
                    <Alert severity="success"
                        sx={{ my: 2 }}>
                        <AlertTitle>{`${userName}'s Gists`}</AlertTitle>
                        {`${userdata.length} Gists found`}
                    </Alert>

                    <Container>
                        {userdata.map((gist, index) => {
                            return <GistDetailCard key={index} gistData={gist}></GistDetailCard>;
                        })}
                    </Container>
                </>
            ) : null}
        </Paper>
    )
}

export default SearchResults;