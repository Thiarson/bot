import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { authConfig } from "@/auth.config";
import { createUser, getUser } from "@/repositories/user.model";

const nextAuthResult = NextAuth({
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

                    // if (passwordMatch) return user;
                    if (passwordMatch) {
                        // Return user object without password
                        const { password: _, ...userWithoutPassword } = user;
                        return userWithoutPassword;
                    }
                }
        
                return null;
            },
        }),
    ],
});

const signupSchema = z
    .object({
        firstName: z.string().min(3, "First name must be at least 3 characters"),
        lastName: z.string().min(3, "Last name must be at least 3 characters"),
        email: z.email("Invalid email address"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain an uppercase letter")
            .regex(/[0-9]/, "Password must contain a number")
            .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
        confirmPassword: z.string(),
        acceptTerms: z.preprocess(
            (val) => val === "true" || val === "on" || val === true,
            z.literal(true, { message: "You must accept the terms" })
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export async function signUp(formData: FormData) {
    const parsedData = signupSchema.safeParse(formDataToObject(formData));

    if (!parsedData.success) {
        const error = parsedData.error.issues[0];
        throw new Error(error.message);
    }

    const userInfo = parsedData.data
    const userAlreadyExists = await getUser(userInfo.email);

    if (userAlreadyExists) throw Error('Email address already used');

    const newUser = await createUser({
        name: `${userInfo.firstName} ${userInfo.lastName}`,
        email: userInfo.email,
        password: await bcrypt.hash(userInfo.password, 12),
    });

    if (!newUser) throw Error('Something went wrong. Please try again');

    await signIn('credentials', formData);
}

export const { auth, signIn, signOut, handlers } = nextAuthResult;
export const { GET, POST } = nextAuthResult.handlers;
