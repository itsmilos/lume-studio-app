import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: "email" },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials: any) {
                const admin = { id: "313", name: "Admin", email: 'admin@admin.com', password: 'adminadminadmin' }

                if (admin.email === credentials.email && admin.password === credentials.password) {
                    return admin
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/admin/login"
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
