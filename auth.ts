import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { authConfig } from './auth.config';

import type { User } from '@/types/definitions';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.email(), password: z.string().min(6) })
                    .safeParse(credentials);
        
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) return user;
                }
        
                return null;
            },
        }),
    ],
});

async function getUser(email: string): Promise<User | undefined> {
    try {
        // const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
        // return user[0];

        return {
            id: String(1),
            name: "Admin",
            email: "admin@boost.ai",
            password: "$2a$12$QU3ssn0pjLG/PcL7cj57z.zsl3nIHd.BMErrziGPz0cx7cSWpdRvK", // Admin123
        };
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
