import pg from "database/pg";

async function getSavedCv(userId: number) {
    const query = {
        where: {
            user_id: userId
        }
    }

    const result = await pg.cv.findFirst(query);
    return result;
}

async function upsertCV(userId: number, cvTitle: string) {
    const existing = await pg.cv.findFirst({
        where: { user_id: userId }
    });

    if (existing) {
        return await pg.cv.update({
            where: { id: existing.id },
            data: { title: cvTitle },
        });
    } else {
        return await pg.cv.create({
            data: {
                user_id: userId,
                title: cvTitle,
            }
        });
    }
}

export {
    getSavedCv,
    upsertCV,
};
