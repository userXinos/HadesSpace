import pages from '@Regulation/pages.js';
import NotFound from '@/pages/404.vue';

const notFoundPage = {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
};

export function getRoutes() {
    return [
        ...pages.reduce(reduceFn, []),
        notFoundPage,
    ];

    function reduceFn(acc, { name, path, component, children }) {
        if (component) {
            acc.push({ name, path, component });
        }
        if (children) {
            acc.push(...children.reduce(reduceFn, []));
        }
        return acc;
    }
}

export function getSectionsPages() {
    return pages
        .filter((p) => p.children)
        .map(mapFn);

    function mapFn({ text, path, icon, children }) {
        return {
            text,
            icon,
            children: (children) ? children.map(mapFn) : undefined,
            link: {
                path: path?.externalLink || path,
                type: (path?.externalLink) ? 'external' : 'router',
            },
        };
    }
}
