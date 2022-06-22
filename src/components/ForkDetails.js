import { Avatar, Box, Container, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

const ForkDetails = (data) => {
    const forks = data.forks.forks || [];
    let filteredForks;

    if (forks.length > 10) {
        forks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        filteredForks = forks.slice(0, 10)
    }

    return (
        <Container >
            {filteredForks && filteredForks.length !== 0 ? filteredForks.map((filteredfork, i) => (
                <ListItem key={i}>
                    <ListItemAvatar>
                        <Avatar src={filteredfork.user.avatar_url} alt={filteredfork.user.login}></Avatar>
                    </ListItemAvatar>
                    <ListItemText><a
                        href={`https://gist.github.com/${filteredfork.id}`}
                        target="_blank"
                        rel="noreferrer"
                    >{filteredfork.user.login}</a></ListItemText>
                </ListItem>
            )) : (forks && forks.length !== 0 ? forks.map((fork, i) => (
                <ListItem key={i}>
                    <ListItemAvatar>
                        <Avatar src={fork.user.avatar_url} alt={fork.user.login}></Avatar>
                    </ListItemAvatar>
                    <ListItemText><a
                        href={`https://gist.github.com/${fork.id}`}
                        target="_blank"
                        rel="noreferrer"
                    >{fork.user.login}</a></ListItemText>
                </ListItem>
            )) : <p>No forks yet.</p>)}
        </Container>
    );
}

export default ForkDetails;