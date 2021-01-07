import * as React from "react";
import { Datagrid, Edit, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput, UrlField } from "react-admin";

export const PhotoList = props => (
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

export const PhotoEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="albums">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="url" />
            <TextInput source="thumbnailUrl" />
        </SimpleForm>
    </Edit>
);