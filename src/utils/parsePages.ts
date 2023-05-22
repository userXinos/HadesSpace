import type { RouteRecordRaw } from 'vue-router';
import pages from '@Regulation/pages.js';
import NotFound from '@/pages/404.vue';

const notFoundPage = {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
};

type ReduceElem = { name: string, path: string, component?: () => unknown, children?: ReduceElem[] }
type MapElem = {text: string, path: {externalLink: string}, icon: object, children: MapElem[]}

export function getRoutes(): RouteRecordRaw[] {
    return [
        ...(pages as ReduceElem[]).reduce(reduceFn, []),
        notFoundPage,
    ];

    function reduceFn(acc: RouteRecordRaw[], { name, path, component, children }: ReduceElem) {
        if (component) {
            acc.push({ name, path, component });
        }
        if (children) {
            acc.push(...children.filter(Boolean).reduce(reduceFn, []));
        }
        return acc;
    }
}

export function getSectionsPages() {
    return pages
        .filter((p) => p.children)
        .map((e: unknown) => mapFn(e as MapElem));

    function mapFn({ text, path, icon, children }: MapElem): object {
        return {
            text,
            icon,
            children: (children) ? children.filter(Boolean).map(mapFn) : undefined,
            link: {
                path: path?.externalLink || path,
                type: (path?.externalLink) ? 'external' : 'router',
            },
        };
    }
}
