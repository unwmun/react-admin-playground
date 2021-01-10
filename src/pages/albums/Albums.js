import React, { cloneElement, useState } from 'react';
import { BulkActionsToolbar, Datagrid, List, ListBase, ListContextProvider, ListToolbar, Pagination, TextField, TextInput } from 'react-admin';
import { Dialog, DialogTitle, DialogContent, Card } from '@material-ui/core';
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
                maxWidth="md"
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent><AlbumSelectList2 rowClick={handleRowClick} /></DialogContent>
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

// ListBase 를 사용한 방법, 동일하게 링크가 생성된다. 
const MyList = ({children, ...props}) => {
    return (
        <ListBase {...props}>
            <h1>{props.title}</h1>
            <ListToolbar
                filters={props.filters}
                actions={props.actions}
            />
            <Card>
                <BulkActionsToolbar>
                    {props.BulkActionsToolbar}
                </BulkActionsToolbar>
                {cloneElement(children, {
                    hasBulkActions: props.bulkActionsButton != false 
                })}
                <Pagination />
            </Card>
        </ListBase>
    )
}

const AlbumSelectList2 = (props) => {
    const { rowClick } = props;
    return (
        <MyList basePath="/albums" resource='albums'>
            <Datagrid rowClick={rowClick}>
                <TextField source="title" label="제목" />
            </Datagrid>
        </MyList>
    );

}