import React, { useState } from 'react';
import { Datagrid, List, TextField, TextInput } from 'react-admin';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useForm } from 'react-final-form';

export const AlbumInput = (props) => {
    const { dialogTitle, dialogContent, record } = props;
    const [showDialog, setShowDialog] = useState();
    const form = useForm();

    const handleClick = () => setShowDialog(true);
    const handleCloseClick = () => setShowDialog(false);
    const handleRowClick = (id, basePath, record) => {
        console.log('handleRowClick:record: ', record);
        setShowDialog(false);
        form.change('album', record);
    }

    console.log('albumInput:props: ', props);

    return (
        <>
            <TextInput label="album" source="album.title" disabled onClick={handleClick}/>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent><AlbumSelectList rowClick={handleRowClick} /></DialogContent>
            </Dialog>
        </>
    )
};

const AlbumSelectList = (props) => {
    const { rowClick } = props;
    return (
        <List basePath="/albums" resource='albums'>
            <Datagrid rowClick={rowClick}>
                <TextField source="title" label="제목" />
            </Datagrid>
        </List>
    );

}
