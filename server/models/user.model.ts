import pg from "../database/pg";

import type { User } from "../../client/types/definitions";

async function getUserByEmail(email: string): Promise<User | null> {
    const query = {
        where: {
            email: email,
        }
    };

    const result = await pg.user.findUnique(query);
    if (!result) return null;

    const user: User = {
        id: String(result.id),
        name: result.name,
        email: result.email,
        password: result.password,
    };
    
    return user;
}

export {
    getUserByEmail,
}
