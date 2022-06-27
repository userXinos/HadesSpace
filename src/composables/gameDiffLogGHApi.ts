
const API_ENDPOINT = 'https://api.github.com/repos/userXinos/HadesSpace/';

const headers = new Headers();

if (process.env.NODE_ENV === 'development') {
    headers.set('Authorization', `Basic ${btoa(`${'userXinos'}:${process.env.GITHUB_ACCESS_TOKEN}`)}`);
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
        const commits = await fetchUrl<{sha: string, url: string}[]>(url.href);
        const childIndex = commits.findIndex((e) => e.sha == childCommit);
        const commit = await fetchUrl<{files: {filename: string, contents_url: string}[]}>(commits[childIndex + 1].url);
        const fileUrl = commit.files.find((e) => e.filename == file)!.contents_url;
        return fetchFile(fileUrl);
    }

    function fetchCommit(hash: string) {
        const url = new URL(`commits/${hash}`, API_ENDPOINT);
        return fetchUrl(url.href);
    }

    function fetchUrl<T>(url: string): Promise<T> {
        return fetch(url, { method: 'GET', headers })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<T>;
            });
    }

    async function fetchFile(contentsUrl: string) {
        const { content } = await fetchUrl(contentsUrl) as {content: string};
        const module = await import(/* webpackIgnore: true */ `data:text/javascript;base64,${content}`);
        return module.default;
    }
}
