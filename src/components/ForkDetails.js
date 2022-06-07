import { List } from "@mui/icons-material";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

const ForkDetails = (data) => {
    const forks = data.forks.forks || [];
    console.log(forks);

    return (
        <Box >
            <Typography>Forks:</Typography>
            {forks && forks.length !== 0 ? forks.map((fork, i) => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={fork.user.avatar_url} alt={fork.user.login}></Avatar>
                    </ListItemAvatar>
                    <ListItemText><a
                        href={`https://gist.github.com/${fork.id}`}
                        target="_blank"
                        rel="noreferrer"
                    >{fork.user.login}</a></ListItemText>
                </ListItem>
            )) : <p>No forks yet.</p>
            }
        </Box>
    );
}

export default ForkDetails;