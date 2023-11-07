const ENDPOINT = 'https://cdn.discordapp.com/';


export function getDiscordAvatarUrl(userId: string, avatarHash: string, size = 80): URL {
    const url = new URL(`avatars/${userId}/${avatarHash}.webp`, ENDPOINT);

    url.searchParams.set('size', String(size));
    return url;
}
export function getDiscordIconUrl(guildId: string, iconHash: string, size = 96): URL {
    const url = new URL(`icons/${guildId}/${iconHash}.webp`, ENDPOINT);

    url.searchParams.set('size', String(size));
    return url;
}
