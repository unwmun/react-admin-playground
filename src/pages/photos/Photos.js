import * as React from "react";
import { Datagrid, Edit, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput, UrlField, useNotify } from "react-admin";
import { Modal } from '@material-ui/core';
import { AlbumInput } from "../albums/Albums";

export const PhotoList = props => {
    console.log('PhotoList:props: ', props);
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <ReferenceField source="albumId" reference="albums"><TextField source="id" /></ReferenceField>
                <TextField source="id" />
                <TextField source="title" />
                <UrlField source="url" />
                <TextField source="thumbnailUrl" />
            </Datagrid>
        </List>
    );
}

export const PhotoEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="albums">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <AlbumInput />
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="url" />
            <TextInput source="thumbnailUrl" />
        </SimpleForm>
    </Edit>
);
