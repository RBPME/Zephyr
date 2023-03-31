import type { RequestHandler } from "./$types";
import { db } from '$lib/server/database.js'

export const POST = (async ({ request }) => {
    const data = await request.formData();
    const val3 = data.get("value3") as string;

    if (val3 != null) {
        db.connect(function(err: any) {
            if (err) throw err;
            var sql = "Insert INTO Test (text) Values ('" + val3 + "')";
            db.query(sql, function (err: any, result: any) {
                if (err) throw err;
                return "Inserted value into database";
            });
        });
    }

    return "Error";
}) satisfies RequestHandler;





/*
export const POST: Action = async ({ request }) => {
    const data = await request.formData();
    const val3 = data.get("value3") as string;

    if (val3 != null) {
        db.connect(function(err: any) {
            if (err) throw err;
            var sql = "Insert INTO Test (text) Values ('" + val3 + "')";
            db.query(sql, function (err: any, result: any) {
                if (err) throw err;
            });
        });
    }
}
*/