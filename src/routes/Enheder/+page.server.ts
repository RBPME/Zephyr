import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.auth) {
        throw redirect(303, '/');
    }

    let data = await db.device.findMany({
        where: { userId: null }
    });
    return {
        row: data
    };
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();

        const key = form.get('key');

        if (
            typeof key !== 'string' ||
            !key
        ) {
            return fail(400, { invalid: true });
        }

        const connectDevice = await db.user.update({
            where: { userAuthToken: cookies.get('session') },
            data: {
                devices: {
                    connect: {
                        id: key
                    }
                }
            }
        });
    }
};