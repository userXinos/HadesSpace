import type { RouteRecordRaw } from 'vue-router';
import pages from '@Regulation/pages.js';
import Index from '@/pages/Index.vue';
import NotFound from '@/pages/404.vue';

interface PagesChildren {
    text: { locKey: string }
    name? :string
    path?: string|{ externalLink: string }
    icon?: object
    component?: () => Promise<unknown>
    children?: PagesChildren[]
}

export function getRoutes(): RouteRecordRaw[] {
    return [
        { name: 'Index', path: '/', component: Index },
        ...pages.reduce(reduceFn, []),
        { name: 'NotFound', path: '/:pathMatch(.*)*', component: NotFound },
    ];

    function reduceFn(acc: RouteRecordRaw[], { name, path, component, children }: PagesChildren) {
        if (component) {
            acc.push({ name, path: path as string, component });
        }
        if (children) {
            acc.push(...children.reduce(reduceFn, []));
        }
        return acc;
    }
}

interface SectionsPage {
    text :string
    icon: object,
    children?: SectionsPage[]
    path: string
}
export function getSectionsPages(): SectionsPage[] {
    return pages
        .filter((p) => p.children)
        .map((children) => mapFn(children)) as SectionsPage[];

    function mapFn({ text, path, icon, children }: PagesChildren): object {
        return {
            text,
            icon,
            path,
            children: (children) ? children.map(mapFn) : undefined,
        };
    }
}
