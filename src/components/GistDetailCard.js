import { Box, Button, Card, CardContent, Chip, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
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
        languageArr.push(language);
        fileArr.push(files);
    }
    const numOfFiles = Object.keys(fileslist).length;


    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const moreOpen = async (value) => {
        if (value !== "") {
            try {
                const URL = 'https://api.github.com/gists' + value;
                const res = await fetch(URL);
                const data = await res.json();
                console.log(data)
                setData(data);
                setShow(true);
            } catch (e) {
                console.log(e);
                setShow(false);
            }
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography>{gistData.gistData.description ? gistData.gistData.description : 'No Description'}</Typography>
                <Typography>{numOfFiles}  {(numOfFiles > 1) ? 'Files' : 'File'}</Typography>
                {languageArr.map((language, index) => {
                    return (<Chip label={language} id={index} size='small'></Chip>);
                })}
                <Box>
                    <List>
                        {fileArr.map((file, index) => {
                            return (
                                <FileList fileName={file} gistAPIURL={gistAPIFile}></FileList>
                            )
                        })}
                    </List>
                </Box>
                <Button onClick={() => moreOpen(`/${gistData.gistData.id}`)}> More </Button>
                {show && data !== [] ? <ForkDetails forks={data} /> : null}
            </CardContent>
        </Card >
    )
}

export default GistDetailCard