export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type UserCredentials = {
    user: User;
    token: string;
};
