"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[177],{67923:(e,r,t)=>{t.r(r),t.d(r,{default:()=>d});var a=t(66252);function o(e,r,t,o,l,n){const s=(0,a.up)("ModulePage");return(0,a.wg)(),(0,a.j4)(s,{type:"Drone",portrait:"portrait_AlphaDrone","post-filter":n.postFilter},null,8,["post-filter"])}var l=t(72398),n=t(20128),s=t(96535);const i={components:{ModulePage:l.ZP},methods:{postFilter(e){const r={...e.Salvage},t={...e.Repair};r.SalvageHullPercent&&(r.SalvageHullPercent={RS:r.SalvageHullPercent[0],WS:r.SalvageHullPercent[1]},e.Salvage=r);for(const[a,o]of Object.entries(e))if(o.Name.includes("Drone")){const r={...o};if(r?.drone?.modules){for(const e in r.drone.modules)e in r.drone.modules&&e in n.Z&&(r[e]={...n.Z[e]},delete r.drone.modules[e],delete r[e].FuelUseIncrease,delete r[e].BCCost);e[a]=r}}if(t.RepairHullPointsPerSecond&&(t.RepairHullPointsPerSecond=t.RepairHullPointsPerSecond.map((e=>e*t.EffectDurationx10/10)),t.RepairHullPointsPerSecond_BLS=t.RepairHullPointsPerSecond_BLS.map((e=>e*t.EffectDurationx10BS/10)),t.RepairHullPointsPerSecond_WS=t.RepairHullPointsPerSecond_WS.map((e=>e*t.EffectDurationx10WS/10/s.Z.WhiteStar.TimeSlowdownFactor)),e.Repair=t),e.LaserTurret){const r="LaserTurret",t={...e[r]},a=t.LaserTurret_Laser;["RampDPS","RampDPS_BLS","RampDPS_WS"].forEach((o=>{if(`${o}0`in a){if(Array.isArray(a[`${o}2`])){const e=Array(a[`${o}2`].length);Array.isArray(a[`${o}0`])||(a[`${o}0`]=[...e].fill(a[`${o}0`])),Array.isArray(a[`${o}1`])||(a[`${o}1`]=[...e].fill(a[`${o}1`]))}a[o]={"■":[...a[`${o}0`]],"■■":[...a[`${o}1`]],"■■■":[...a[`${o}2`]]},delete a[`${o}0`],delete a[`${o}1`],delete a[`${o}2`],e[r].drone=t.drone}}))}return e}}};var c=t(83744);const u=(0,c.Z)(i,[["render",o]]),d=u}}]);