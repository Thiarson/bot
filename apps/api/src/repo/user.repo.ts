import pg from "src/database/pg";

import type { User } from "@bot/types";

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

async function insertUser(user: { name: string; email: string; password: string }): Promise<User> {
    const result = await pg.user.create({
        data: user,
    });

    const newUser: User = {
        id: String(result.id),
        name: result.name,
        email: result.email,
        password: result.password,
    };

    return newUser;
}

export {
    getUserByEmail,
    insertUser,
}
