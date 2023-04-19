import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';
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

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        if (request.headers.get('headermessage') === 'delete') {
            const body = await request.json();

            const delAlarm = await db.alarm.delete({
                where: { id: body.e}
            });
            return new Response(JSON.stringify({ message: 'succes' }), {status: 200});
        }

        const form = await request.formData();

        const time = form.get('tid');

        if (
            typeof time !== 'string' ||
            !time ||
            time.length !== 5
        ) {
            return fail(400, { format: true });
        }

        const timer = time.slice(0,2);
        const miner = time.slice(3,5);

        const hrs: number = +timer;
        const min: number = +miner;

        if (
            typeof hrs !== 'number' ||
            typeof min !== 'number' ||
            !hrs ||
            !min ||
            hrs < 0 ||
            hrs > 24 ||
            min < 0 ||
            min > 60
        ) {
            return fail(400, { format: true });
        }
        
        let alarm = new Date()

        if (form.get('datepick')) {
            // @ts-ignore
            alarm.setDate(+form.get('datepick')?.slice(0,2));
            // @ts-ignore
            alarm.setMonth(+form.get('datepick')?.slice(3,5) - 1);
            // @ts-ignore
            alarm.setFullYear(+form.get('datepick')?.slice(6,10));
        } else {
            //alarm.setDate(alarm.getDate() + 1);
        }

        alarm.setHours(hrs);
        alarm.setMinutes(min);

        const userId = cookies.get('session');
        
        const weekDays = [
            form.get('sun') === '', 
            form.get('mon') === '',
            form.get('tue') === '',
            form.get('wed') === '',
            form.get('thu') === '',
            form.get('fri') === '',
            form.get('sat') === ''
        ];

        let recur = false;
        let days = '';

        weekDays.forEach(e => {
            if (e) {
                recur = true;
                days = days.concat('1');
            } else {
                days = days.concat('0');
            }
        });


        const newAlarm = await db.alarm.create({
            data: {
                time: alarm,
                recurring: recur,
                days: recur ? days : null,
                User: {
                    connect:{
                        userAuthToken: userId
                    }
                }
            }
        });
    }
};