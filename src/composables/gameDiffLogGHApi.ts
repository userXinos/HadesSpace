const API_ENDPOINT = 'https://api.github.com/repos/userXinos/HadesSpace/';
const headers = new Headers();
const CACHE_NAME = 'github-api-v1';

if (process.env.VUE_APP_GITHUB_ACCESS_TOKEN) {
    headers.set('Authorization', `Basic ${btoa(`${process.env.VUE_APP_GITHUB_USERNAME}:${process.env.VUE_APP_GITHUB_ACCESS_TOKEN}`)}`);
}

export declare interface Commit {
    sha: string,
    files: { filename: string, status: string, raw_url: string, contents_url: string }[]
}

export default function gameDiffLogGHApi() {
    return {
        fetchUrl,
        fetchParentByName,
        fetchCommit,
        fetchFile,
    };

    async function fetchParentByName(file: string, childCommit: string) {
        const url = new URL('commits', API_ENDPOINT);
        url.searchParams.set('path', file);
        const commits = await fetchUrl<{sha: string, url: string}[]>(url.href, { noCache: true });
        const childIndex = commits.findIndex((e) => e.sha == childCommit);
        const commit = await fetchUrl<{files: {filename: string, contents_url: string}[]}>(commits[childIndex + 1].url);
        const fileUrl = commit.files.find((e) => e.filename == file)!.contents_url;
        return fetchFile(fileUrl);
    }

    function fetchCommit(hash: string): Promise<Commit> {
        const url = new URL(`commits/${hash}`, API_ENDPOINT);
        return fetchUrl(url.href);
    }

    function fetchUrl<T>(url: string, opts = { noCache: false }): Promise<T> {
        return caches.open(CACHE_NAME)
            .then(async (cache) => {
                const getJson = () => cache.match(url).then(async (r) => (r == undefined) ? undefined : r.json());
                const json = await getJson();

                if (!json || opts.noCache) {
                    const response = await fetch(url, { method: 'GET', headers });

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    await cache.put(url, response);
                    const json = await getJson();

                    if (opts.noCache) {
                        await cache.delete(url);
                    }

                    return json;
                }

                return json;
            }) as Promise<T>;
    }

    async function fetchFile(contentsUrl: string) {
        const { content, encoding } = await fetchUrl(contentsUrl) as {content: string, encoding: string};
        const module = await import(/* webpackIgnore: true */ `data:text/javascript;${encoding},${content}`);
        return module.default;
    }
}
