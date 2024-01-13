type rule = [ string[], (v: unknown) => string, string[]? ];

declare module '@Regulation/byTypes.js' {
    export default Record<string, Record<string, string[]>>;
}
declare module '@Regulation/formatKeyRules.js' {
    const rules: rule[];
    export default rules;
}
declare module '@Regulation/formatValueRules.js' {
    const rules: rule[];
    export default rules;
}
declare module '@Regulation/locKeys.mjs' {
    export default Record<string, string>;
}
declare module '@Regulation/statsStyle.js' {
    const rules: Record<string, string[]>;
    export default rules;
}
declare module '@Regulation/thirdPartyTools.js' {
    const items: { name: string, href: string, authors: string[], tags: 'Android'|'Discord' }[];
    export default items;
}
