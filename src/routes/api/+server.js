import { db } from '$lib/server/database';


export const GET = async ({ request }) => {
    if (request.headers.get('register') === 'true') {
        //create new api key
        const now = new Date().getTime();

        //add device in database
        // @ts-ignore
        const device = db.device.create({ data: {} });

        //return api key
        return await new Response(JSON.stringify({message: (await device).id}), {status: 200});
    }


    //recieve api key from HTTP request
    const authHeader =  request.headers.get('api-key');

    if (!authHeader) {
        return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
    }

    //find device with api key in database
    const device = await db.device.findUnique({ where: { id: authHeader }});

    //check if api key is valid
    if (!device) {
        return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
    }

    //check if a user is connected to the device
    if (!device.userId) {
        return new Response(JSON.stringify({message: ''}), {status: 200});
    }

    //find user alarms
    const alarms = await db.alarm.findMany({ 
        where: {
            // @ts-ignore
            userId: (await device).userId
        },
        orderBy: {
            time: 'desc'
        }
    });

    //check if there is a date
    // @ts-ignore
    if (alarms[0] === undefined || alarms[0] === null) {
        return new Response(JSON.stringify({message: ''}), {status: 200});
    }

    //get the current time
    const now = new Date();

    //check if the the device needs to ring now
    // @ts-ignore
    if (now.getDay() === alarms[0].time.getDay() && now.getHours() === alarms[0].time.getHours() && now.getMinutes() === alarms[0].time.getMinutes()) {
        //check if alarm is recurring
        // @ts-ignore
        if (alarms[0].recurring) {
            //user.alarms[0].days is stored as string of bools (as 0 or 1)
            //i.e "0000000" would be all false, "1111111" would be all true, 
            //and "1010001" would be true for sunday, tuesday, and saturday.
            //Notice that the ordering of the days is Sunday Monday Thuesday Wednessday Thursday Friday Saturday

            //get the next day to ring
            let day;

            for (let i = now.getDay(); i < 7 + now.getDay(); i++ ) {
                // @ts-ignore
                if (alarms[0].days[i] == "1") {
                    day = i;
                    break;
                }
            }

            //finding new date
            // @ts-ignore
            let newdate = i == alarms[0].time.getDay() ? alarms[0].time.setDate(alarms[0].time.getDate() + 7) : alarms[0].time.setDate(alarms[0].time.getDate() + ((i - alarms[0].time.getDay()) % 7));

            //update date in database
            const updateAlarm = await db.alarm.update({
                // @ts-ignore
                where: { id: alarms[0].id },
                // @ts-ignore
                data: { time: newdate }
            });
        } else {
            //delete alarm in database
            const deleteAlarm = await db.alarm.delete({
                // @ts-ignore
                where: { id: alarms[0].id }
            });
        }

        return new Response(JSON.stringify({message: 'nu'}), {status: 202});
    }

    //return a response if it is not time to ring
    return new Response(JSON.stringify({Message: ''}), {status: 200});
}