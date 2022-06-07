import { Divider, IconButton, Paper, InputBase, CircularProgress } from "@mui/material";
import { Box, Container } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const [userName, setUserName] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const handleInputText = (event) => {
        setUserName(event.target.value.trim());
    }

    const onSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (userName && userName !== '') {
            try {
                const URL = 'https://api.github.com/users/' + userName + '/gists'
                const result = await fetch(URL);
                const data = await result.json()
                setData(data)
                setError(false)
                setLoading(false)
            } catch (e) {
                setError(false)
                console.log(e)
            }

        }
    }
    return (
        <Container>
            <Paper
                elevation={1}
                component="form"
                onSubmit={onSearch}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Gists"
                    onInput={e => setUserName(e.target.value)}
                    inputProps={{ 'aria-label': 'search gists' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton sx={{ p: '10px' }} aria-label="search" onClick={onSearch}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Paper>
                {loading ? <CircularProgress></CircularProgress> : null}
                {userName !== "" && data && !error ? (
                    <SearchResults data={data} userName={userName} />
                ) : null}
            </Paper>
        </Container>
    )

}

export default SearchBar