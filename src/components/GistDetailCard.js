import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, List, Typography } from "@mui/material";
import React, { useState } from "react";
import FileList from "./FileList";
import ForkDetails from "./ForkDetails";

const GistDetailCard = (gistData) => {
    const fileslist = gistData.gistData.files
    const gistAPIFile = gistData.gistData.url
    const fileArr = [];
    const languageArr = [];
    for (let file in fileslist) {
        let language = fileslist[file].language;
        let files = fileslist[file]
        if (languageArr.indexOf(language) === -1) {
            languageArr.push(language);
        }
        fileArr.push(files);
    }

    const numOfFiles = Object.keys(fileslist).length;

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [forkShow, setForkShow] = useState(true);

    const forksToggle = () => {
        setForkShow(!forkShow);
        setData([]);
        setShow(false);
    }

    const moreOpen = async (value) => {
        if (value !== "") {
            try {
                const URL = 'https://api.github.com/gists' + value;
                const res = await fetch(URL);
                const data = await res.json();
                setData(data);
                setShow(true);
                setForkShow(false)
            } catch (e) {
                setShow(false);
            }
        }
    };


    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="subtitle1">{gistData.gistData.description ? gistData.gistData.description : 'No Description'}</Typography>
                <Typography variant="subtitle2">{numOfFiles}  {(numOfFiles > 1) ? 'Files' : 'File'}</Typography>
                {languageArr.map((language, index) => {
                    return (<Chip label={language} key={index} size='small'></Chip>);
                })}
                <Box>
                    <List>
                        {fileArr.map((file, index) => {
                            return (
                                <FileList key={index} fileName={file} gistAPIURL={gistAPIFile}></FileList>
                            )
                        })}
                    </List>
                </Box>
                {forkShow ? <Button onClick={() => moreOpen(`/${gistData.gistData.id}`)} variant="outlined" endIcon={<KeyboardArrowDown />}> Forks </Button> :
                    <Button onClick={() => forksToggle()} variant="outlined" endIcon={<KeyboardArrowUp />}> Forks </Button>}

                {show && data !== [] ? <ForkDetails forks={data} /> : null}
            </CardContent>
        </Card >
    )
}

export default GistDetailCard