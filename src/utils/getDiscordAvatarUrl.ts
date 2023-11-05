const ENDPOINT = 'https://cdn.discordapp.com/avatars/';


export default function(userId: string, avatarHash: string, size = 80): URL {
    const url = new URL(`${userId}/${avatarHash}.webp`, ENDPOINT);

    url.searchParams.set('size', String(size));
    return url;
}
