// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongo } from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email:{label:'Email', type:'text'}, password:{label:'Password', type:'password'} },
      async authorize(credentials){
        await connectMongo();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error('No user found');
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) throw new Error('Invalid credentials');
        return { id: user._id, email: user.email, name: user.name, role: user.role, verified: user.verified };
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }){
      if (user) { token.role = user.role; token.verified = user.verified; }
      return token;
    },
    async session({ session, token }){
      session.user.role = token.role; session.user.verified = token.verified; return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
