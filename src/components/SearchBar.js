import { Divider, IconButton, Paper, InputBase, CircularProgress, Alert, AlertTitle, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from "react";
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const [userName, setUserName] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [searchEntered, setSearchEntered] = useState(false)
    const userInput = React.useRef(null);
    const onSearch = async (event) => {
        setSearchEntered(true)
        event.preventDefault();
        setLoading(true);
        if (userName && userName !== '') {
            try {
                const URL = 'https://api.github.com/users/' + userName + '/gists'
                const result = await fetch(URL);
                const data = await result.json()
                setData(data)
                setErrorStatus(false)
                setLoading(false)
            } catch (e) {
                setErrorStatus(true)
                setLoading(false)
            }

        }
        else if (userName === "") {
            setLoading(false);
            setErrorStatus(true);
        }
        setLoading(false);
    }

    return (
        <Container>
            <Paper
                elevation={3}
                component="form"
                onSubmit={onSearch}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Gists"
                    inputRef={userInput}
                    onInput={e => setUserName(e.target.value.trim())}
                    inputProps={{ 'aria-label': 'search gists' }}
                />
                {userName ? (<IconButton sx={{ p: '10px' }} aria-label="search" onClick={() => {
                    userInput.current.value = "";
                    setUserName('')
                    setData([])
                }}>
                    <ClearIcon />
                </IconButton>) : null}

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton sx={{ p: '10px' }} aria-label="search" onClick={onSearch}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Paper elevation={1}>
                {searchEntered ? (loading ?
                    <CircularProgress></CircularProgress> :
                    (
                        userName !== "" && data.length !== 0 && !errorStatus ?
                            (
                                <SearchResults data={data} userName={userName} />
                            ) :
                            (userName && data.length === 0 && !errorStatus ?
                                (
                                    <Alert severity="info"
                                        sx={{ my: 2 }}>
                                        <AlertTitle>No results found</AlertTitle>
                                    </Alert>

                                ) :
                                (userName && data.length === 0 && errorStatus ?
                                    <Alert severity="error"
                                        sx={{ my: 2 }}>
                                        <AlertTitle>Error in Fetching</AlertTitle>
                                    </Alert> : null
                                )
                            ))) : null
                }
            </Paper>
        </Container>
    )

}

export default SearchBar