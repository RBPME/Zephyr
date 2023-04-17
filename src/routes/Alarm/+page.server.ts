import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (!locals.auth) {
        throw redirect(303, '/');
    }

    let user = await db.user.findUnique({
        where: { userAuthToken: cookies.get('session') }
    });

    let alarms = await db.alarm.findMany({
        where: { userId: user?.id }
    });

    return {
        row: alarms
    };
}