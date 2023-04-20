import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (!locals.auth) {
        throw redirect(303, '/');
    }

    //get user
    let user = await db.user.findUnique({
        where: { userAuthToken: cookies.get('session') }
    });

    let available = await db.device.findMany({
        where: { userId: null }
    });

    let conncected = await db.device.findMany({
        where: {userId: user?.id }
    });

    return {
        available: available ? available : null,
        connected: conncected ? conncected : null
    };

}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        //get device id
        const key = await request.json();

        //check if the user wants to connect to device
        if (request.headers.get('headerMessage') == '0') {
            //validate the http body
            if (
                typeof key.e !== 'string' ||
                !key.e
            ) {
                return fail(400, { invalid: true });
            }
            
            //connect the user to device
            const connectDevice = await db.user.update({
                where: { userAuthToken: cookies.get('session') },
                data: {
                    devices: {
                        connect: {
                            id: key.e
                        }
                    }
                }
            });
        } else if (request.headers.get('headerMessage') == '1') {
            //validate the http body
            if (
                typeof key.e !== 'string' ||
                !key.e
            ) {
                return fail(400, {invalid: true});
            }

            //dicsonnect the user from device
            const disconnectDevice = await db.user.update({
                where: { userAuthToken: cookies.get('session') },
                data: {
                    devices: {
                        disconnect: {
                            id: key.e
                        }
                    }
                }
            });
        }

    }
};