import React, { useState } from "react";
import { Box, Card, CardContent, Chip, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';

const FileList = (props) => {
    const [fileDetails, setFileContent] = useState({ filename: '', filecontent: '' })
    const [fileError, setFileError] = useState(false)
    const [showGistContent, setShowGistContent] = useState(false)

    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText> <Link href={props.fileName.raw_url} target='_blank'>{props.fileName.filename}</Link>
                </ListItemText>
            </ListItem>
        </>
    )
}

export default FileList