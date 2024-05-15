// const ENDPOINT = 'https://cdn.discordapp.com/';


// export function getDiscordAvatarUrl(userId: string, avatarHash: string, size = 80): URL {
//     const url = new URL(`avatars/${userId}/${avatarHash}.webp`, ENDPOINT);
//
//     url.searchParams.set('size', String(size));
//     return url;
// }

export function getAvatarUrl(userAvatarUrl: string, size = 80): URL {
    if (userAvatarUrl === '') {
        userAvatarUrl = 'https://github.com/userXinos/HadesSpace/blob/master/src/img/icons/member.png';
    }
    userAvatarUrl = userAvatarUrl.replace(/\.png/g, '.webp');
    const url = new URL(`${userAvatarUrl}`);

    url.searchParams.set('size', String(size));
    return url;
}

// export function getDiscordIconUrl(guildId: string, iconHash: string, size = 96): URL {
//     const url = new URL(`icons/${guildId}/${iconHash}.webp`, ENDPOINT);
//
//     url.searchParams.set('size', String(size));
//     return url;
// }

export function getIconUrl(urlGuild: string, size = 96): URL {
    if (urlGuild === '') {
        urlGuild = 'https://github.com/userXinos/HadesSpace/blob/master/src/img/icons/member.png';
    }
    urlGuild = urlGuild.replace(/\.png/g, '.webp');
    const url = new URL(`${urlGuild}`);

    url.searchParams.set('size', String(size));
    return url;
}
