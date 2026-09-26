export function useStore() {
    return {
        state: {
            userSettings: {
                compactModulesByArtTypeTable: false,
            },
        },
    };
}

export default { useStore };
