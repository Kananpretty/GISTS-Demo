import React, { useState } from "react";
import { Card, CardContent, IconButton, Link, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';

const FileList = (props) => {

    const [showGistContent, setShowGistContent] = useState(false)
    const [gistContent, setGistContent] = useState(null)

    const getGistsCode = async (gistAPIFileURL, filename) => {
        if (gistAPIFileURL !== "") {
            try {
                const res = await fetch(gistAPIFileURL);
                const data = await res.json();
                setGistContent(data.files[filename].content);
                setShowGistContent(true);
            } catch (e) {
                setShowGistContent(false);
            }
        }
    }

    const toggleContent = () => { setShowGistContent(false); }
    return (
        <>
            <ListItem secondaryAction={<IconButton edge="start">
                {(showGistContent) ? <CodeOffIcon onClick={() => toggleContent()} /> : <CodeIcon onClick={() => getGistsCode(props.gistAPIURL, props.fileName.filename)} />}
            </IconButton>}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText> <Link href={props.fileName.raw_url} target='_blank'>{props.fileName.filename}</Link>
                </ListItemText>
            </ListItem>
            {(showGistContent) ? <Card><CardContent style={{ whiteSpace: "pre-wrap" }}>{gistContent}</CardContent></Card> : null}
        </>
    )
}

export default FileList