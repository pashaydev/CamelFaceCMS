import { Access } from "payload/config";

export const onlyAdmins: Access = ({ req: { user } }) => {
    // Need to be logged in

    // If any other type of user, only provide access to themselves
    return {
        role: {
            equals: "admin",
        },
    };
};
