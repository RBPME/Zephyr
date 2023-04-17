import { db } from '$lib/server/database';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, cookies }) => {
    const { key } = await request.json();

    const connectDevice = db.user.update({
        where: {
            userAuthToken: cookies.get('session')
        },
        data: {
            devices: {
                connect: {
                    id: key
                }
            }
        }
    });

    return new Response(JSON.stringify({ message: "succes" }), { status: 200 });
}