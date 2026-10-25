<template>
  <div>
    <Page
      title-loc-key="TID_CORP_STAR"
      :content-args="{data: { qs }, iconDir: 'game/Stars', tableOpts: {lvlColKey: '№'} }"
      :portrait="{src: img, alt: 'quantumStars'}"
    />

    <v-data
      :data="QSMemberGate"
      :table-opts="{lvlColKey: 'TID_XBL_STAT_4'}"
    />

    <v-data
      :data="planetsQS"
      :table-opts="{lvlColKey: '№'}"
    />

  </div>
</template>

<script setup>
import Page from '@/components/Page.vue';
import VData from '@/components/Data.vue';

import stars from '@Data/stars.js';
import planets from '@Data/planets.js';
import globals from '@Data/globals';
import spacebuildings from '@Data/spacebuildings';
import compileOne from '@Utils/compileOne.ts';
import img from '@Img/game/portraits/portrait_QuantumStar.png';


const qs = stars.QuantumStar;
qs.TID = 'TID_CORP_STAR';
qs.TID_Description = 'TID_CORP_STAR_DESCR';
qs.DNExpeditionTime = globals.DNExpeditionTime;
qs.MinArtifactLevelForQuantum = globals.MinArtifactLevelForQuantum;
qs.QuantumArtifactBPCurrentRate = globals.QuantumArtifactBPCurrentRate;
qs.QSMinActiveMembersFor = globals.MinActiveMembersForQS; // for disable stat by star
for (const [k, v] of Object.entries(globals)) {
    if (k.startsWith('QS')) {
        qs[k] = v;
    } else if (k.endsWith('QS')) {
        qs[k] = v;
    }
}
delete qs.QSReplayMaxDuration;
delete qs.Lifetime;
delete qs.NumPlayersWithAccess;
delete qs.MinActiveMembersForQS;

const QSMemberGate = { ...spacebuildings.QSMemberGate };
const { RedStar } = stars;

const toJumpCosts = (value) => (
    Array.isArray(value) ? value.filter((item) => item != null) : [value]
);

QSMemberGate.NumArtifactsOnQSGate = globals.NumArtifactsOnQSGate;
QSMemberGate.FirePlanetShipmentVal = (RedStar.CroidAmt ?? []).slice(1);
if ('QSJumpCosts_T' in RedStar) {
    const jumpCosts = {
        JumpCostTransport: toJumpCosts(RedStar.QSJumpCosts_T),
        JumpCostMiner: toJumpCosts(RedStar.QSJumpCosts_M),
        JumpCostBattleship: toJumpCosts(RedStar.QSJumpCosts_B),
    };
    const levelCount = Math.max(...Object.values(jumpCosts).map((values) => values.length), 1);

    QSMemberGate.JumpShips = {};
    Object.entries(jumpCosts).forEach(([key, values]) => {
        QSMemberGate.JumpShips[key] = Array.from(
            { length: levelCount },
            (_, index) => values[index] ?? values[0] ?? '',
        );
    });
}

delete QSMemberGate.OverrideMinAsteroidDistSquared;


const planetsQS = compileOne(planets, { filterByType: { path: 'planets.quantumstar' } });

planetsQS.Name = planetsQS.TID;
planetsQS.TID = 'PLANETS';
[
    'CorpStar',
    'PlanetSize',
    'AppearanceModels',
].forEach((k) => delete planetsQS[k]);
</script>
<style scoped src="../style/page.scss"  lang="scss"></style>
