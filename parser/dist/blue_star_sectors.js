/**
 * @GeneratedBy StarSectors.js runner
 * @OriginalFile raw/blue_star_sectors.csv
 * @UsedFiles cerb_groups.csv, cerberus_stations.csv
 */

export default {
    Name: ["IncomingSG", "D1", "D2", "D3", "Center"],
    AsteroidsMin: [2, 5, 4, 5, null],
    AsteroidsMax: [3, 8, 6, 7, null],
    CerbGroup_VeryLow: [null, "BSR2_1", "BSR2_2", "BSR2_3", "BSR2_C"],
    CerbGroup_Low: [
        null,
        { Name: "BSR4_1", NumInterceptors: [0, 1] },
        { Name: "BSR4_2", NumSentinels: [0, 1], NumGuardians: [0, 1] },
        { Name: "BSR4_3" },
        [{ Name: "BSR4_C1" }, null, null],
    ],
    CerbGroup_Mid: [
        null,
        [{ Name: "BSR5_1_1", NumColossus: 1 }, { Name: "BSR5_1_2", NumGuardians: 1, NumInterceptors: [1, 2] }, null],
        [
            { Name: "BSR5_2_1", NumGuardians: [0, 1], NumInterceptors: [1, 2] },
            { Name: "BSR5_2_2", NumSentinels: 1, NumGuardians: [0, 1] },
            { Name: "BSR5_2_3", NumInterceptors: [0, 1] },
        ],
        { Name: "BSR5_3", NumSentinels: [1, 2] },
        [{ Name: "BSR5_C1", NumColossus: 1 }, { Name: "BSR5_C2" }, { Name: "BSR5_C3", NumColossus: 1 }],
    ],
    CerbGroup_High: [
        null,
        [
            { Name: "BSR7_1_1", NumBomber: 1 },
            { Name: "BSR7_1_2", NumColossus: [1, 2] },
            { Name: "BSR7_1_3", NumGuardians: 1, NumColossus: 1 },
        ],
        [
            { Name: "BSR7_2_1", NumColossus: [1, 2] },
            { Name: "BSR7_2_2", NumGuardians: [0, 1], NumColossus: [0, 1] },
            null,
        ],
        [
            { Name: "BSR7_3_1" },
            { Name: "BSR7_3_2", NumInterceptors: [1, 2] },
            { Name: "BSR7_3_3", NumInterceptors: [1, 2], WeightPerPlayers: 80 },
        ],
        [
            { Name: "BSR7_C1", NumStorm: 1 },
            { Name: "BSR7_C2", NumBomber: 1 },
            { Name: "BSR7_C3", NumPhoenix: [0, 1] },
        ],
    ],
};
