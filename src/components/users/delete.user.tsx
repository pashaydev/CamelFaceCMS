import React from 'react';
import { Button } from 'payload/components';
import axios from 'axios';

export const DeleteRestoreUser: React.FC<any> = (args) => {

    async function deleteUser() {
        const secret = args.rowData.secret;
        const host = args.rowData.host;
        const url = `${host}/admin/users/${args.rowData.id}`;
        console.log('url',url)
        try {
            await axios.delete(url, {
                headers: {
                    Secret: secret,
                },
            });
            window.location.reload()
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return (
        <>
            <Button buttonStyle="primary" onClick={() => deleteUser()}>
                {!args.rowData.isDeleted ? 'Delete' : 'Restore'}
            </Button>
        </>
    );
};
