import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { connectToDb } from "./utils"
import { User } from "./models"
// import { CredentialsProvider } from 'next-auth/providers/credentials';
import  bcrypt  from 'bcryptjs';
import { authConfig } from "./auth.config"
import CredentialsProvider from "next-auth/providers/credentials"

export const { 
    handlers: {GET, POST}, 
    auth, signIn, signOut } = 
    NextAuth({ 
        ...authConfig,
    providers: [ 
        GitHub({
            clientId:process.env.GITHUB_ID, 
            clientSecret:process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
               
                try {
                    try {
                        connectToDb()
                        const user = await User.findOne({username: credentials.username})
                        if(!user){
                            throw new Error("Wrong credentials!")
                        }
    
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
    
                        if(!isPasswordCorrect){
                            throw new Error("Wrong credentials!")
                        }
    
                        if(user && isPasswordCorrect){
                            return user
                        }
    
    
                    } catch (error) {
                        console.log(error)
                        throw new Error("Failed to login!")
                    }
                } catch (error) {
                    return null
                }
            }
        }),
         ],
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) {
                if(account.provider === "github"){
                    connectToDb()
                    try {
                        const user = await User.findOne({email: profile.email})

                        if(!user){
                            const NewUser = new User({
                                username: profile.login,
                                email: profile.email,
                                image: profile.avatar_url,
                            })
                            await NewUser.save()
                        }
                    } catch (error) {
                        console.log(error)
                        return false
                    }
                }
                return true
            },
            ...authConfig.callbacks
        }})