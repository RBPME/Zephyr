import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export const handle: Handle = async ({ event, resolve }) => {
    //authenticate the user
    const authentication = async () => {
        //get cookie
        const session = event.cookies.get('session');

        //check if there is a valid token in cookie
        if (
            typeof session !== 'string' ||
            !session
        ) {
            return false;
        }

        //find user in database
        const user = await db.user.findUnique({
            where: { userAuthToken: session }
        });
        

        //check if the token corrosponds to a valid user
        if (!user) {
            console.log('test');
            return false;
        }

        //authenticate user
        return true;
    }

    event.locals.auth = await authentication();
    
    return resolve(event);
}