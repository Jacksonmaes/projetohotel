import dbConnect from "@/backend/controllers/config/dbConnect";
import User, {IUser} from "@/backend/controllers/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import  CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


type Credentials = {
    email: string
    password: string
}

async function auth ( req: NextApiRequest, res: NextApiResponse ){
    await dbConnect();

    return await NextAuth(req, res, {
        session: {
            strategy: 'jwt'
        },
        providers: [
           CredentialsProvider({
                //@ts-ignore
                authorize: async (credentials: Credentials) =>{
                    if (!credentials) {
                        throw new Error('Missing credentials');
                    }
                    //dbConnect()

                    const { email, password } = credentials;

                    const user = await  User.findOne({ email }).select('+password');

                    if(!user) {
                        throw new Error('Invalid email or password');
                    }

                    const isPasswordMatched = await bcrypt.compare
                    (password, user.password);

                    if (!isPasswordMatched) {
                        throw new Error("Invalid email or password");
                    }
                    return user;
                  },
            }),
        ],
        callbacks: {
            jwt: async ({ token, user}) => {
              
                user && (token.user = user);

                //TODO - update session when user is updated

                return token;
            },
            session: async ({ session, token }) => {
                session.user = token.user as IUser;

                return session;
            },
        },
        secret: process.env.NEXTAUTH_SECRET,
    });
}

export { auth as GET, auth as POST };