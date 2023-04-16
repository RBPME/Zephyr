import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/database';

export const load = async ({ locals }) => {
    //autamtically log in the user, if there is cookie
    if (locals.auth) {
        throw redirect(302, '/Alarm');
    }
}


export const actions = {
    login: async ({ cookies, request }) => {
        //retrieve form data
        const form = await request.formData();
        
        //store form data in variables
        const mail = form.get('email');
        const pass = form.get('password');
        
        
        //Ceck if valid email and password was entered
        if (
            typeof mail !== 'string' ||
            typeof pass !== 'string' ||
            !mail ||
            !pass
        ) {
            return fail(400, { invalid: true });
        }
            
            
        //Find the user in database
        const user = await db.user.findUnique({ where: { email: mail } });
            
            
        //Check if user exists
        if (!user) {
            return fail(400, { credentials: true });
        }


        //Check if password is correct
        const UserPassword = await bcrypt.compare(pass, user.passwordHash);

        if (!UserPassword) {
            return fail(400, { credentials: true });
        }


        //generate new authentication token
        const AuthenticatedUser = await db.user.update({
            where: { username: user.username },
            data: { userAuthToken: crypto.randomUUID() },
        });


        //Create a cookie
        cookies.set('session', AuthenticatedUser.userAuthToken, {
            //Send cookie to every page
            path: '/',

            //Make cookie server side only, to avoid hackers editing the cookie
            httpOnly: true,

            //Make sure only this website can request the cookie, to avoid hackers editing the cookie
            //https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',

            //Set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30
        });


        //Redirect the user
        throw redirect(302, '/Alarm');
    },






    register: async ({ cookies, request }) => {
        //Get data from form
        const form = await request.formData();


        //Store data in variables
        const mail = form.get('email');
        const name = form.get('user');
        const pass = form.get('pass');
        const conf = form.get('confirm');


        //Check if valid username, password, and email was entered and that password matches with the confirm password input
        if (
            typeof name !== 'string' ||
            typeof pass !== 'string' ||
            typeof conf !== 'string' ||
            typeof mail !== 'string' ||
            !name ||
            !pass ||
            !conf ||
            !mail ||
            pass !== conf
        ) {
            return fail(400, { invalid: true })
        }



        //Check if username is available
        const user = await db.user.findUnique({
            where: { username: name }
        });

        if (user) {
            return fail(400, { user: true });
        }

        //Check if email is available
        const mailuser = await db.user.findUnique({
            where: { email: mail }
        });

        if (mailuser) {
            return fail(400, { usedmail: true});
        }


        //Create a user
        const createdUser = await db.user.create({
            data: {
                username: name,
                passwordHash: await bcrypt.hash(pass, 10),
                userAuthToken: crypto.randomUUID(),
                email: mail
            }
        });


        //Create a cookie
        cookies.set('session', createdUser.userAuthToken, {
            //Send cookie to every page
            path: '/',

            //Make cookie server side only, to avoid hackers editing the cookie
            httpOnly: true,

            //Make sure only this website can request the cookie, to avoid hackers editing the cookie
            //https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',

            //Set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30
        });



        //Redirect the user
        throw redirect(302, '/Alarm');
    }
};