import jwt, { JwtPayload } from 'jsonwebtoken';

export const decodeAccessToken = (accessToken: string | null) => {
    if (accessToken) {
        const decodedToken = jwt.decode(accessToken);
        if (decodedToken && typeof decodedToken !== 'string') {
            const data: JwtPayload = decodedToken;
            const userData = {
                id_user: data.userId ?? '',
                name: data.name ?? '',
                surname: data.surname ?? '',
                street: data.street ?? '',
                city: data.city ?? '',
                postal_code: data.postal_code ?? '',
                phone: data.phone ?? '',
                mail: data.mail ?? '',
                role: data.role ?? ''
            };
            return userData;
        }
    }
    return null;
};

// export interface dicoCategoryMenu  {1: string, 2: string, 3: string}

export const dicoCategoryMenu = [
    {key :'1', value: "Plat + Boisson + Dessert"},
    {key: '2', value: "Plat + Boisson"},
    {key : '3', value: "Plat + Dessert"},]