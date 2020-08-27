<template>
  <div class="container">
    <nav class="nav">
      <ul class="list" v-click-outside="hideAll">
        <li v-for="(heading, key) of nav" :key="key"
            @click="swith(heading)"
        >
          <div>
            <h2 class="name"
                :style="{color:(heading.isShow) ? '#5fdba7' : ''}"
            >
              {{ $t(heading.text.locKey) }}
            </h2>
            <ul class="sublist"
                v-if="heading.isShow"
            >
              <li v-for="(child, key1) of heading.childrens" :key="key1">
                <template v-if="child.link.router">
                  <router-link :to="child.link.router">
                    <h2 class="name">
                      {{ $t(child.text.locKey) }}
                      {{ child.text.after }}
                    </h2>
                  </router-link>
                </template>
                <template v-else>
                  <a :href="child.link" target="_blank">
                    <h2 class="name">
                      {{ $t(child.text.locKey) }}
                      {{ child.text.after }}
                    </h2>
                  </a>
                </template>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
const nav = [
  {
    isShow: false,
    text: {locKey: 'TID_SHIP_UPGRADE_DLG_TITLE'},
    childrens: [
      {
        text: {locKey: 'typeModTrade'},
        link: {router: '/trade'},
      },
      {
        text: {locKey: 'typeModMining'},
        link: {router: '/mining'},
      },
      {
        text: {locKey: 'typeModWeapon'},
        link: {router: '/weapon'},
      },
      {
        text: {locKey: 'typeModShield'},
        link: {router: '/shield'},
      },
      {
        text: {locKey: 'typeModSupport'},
        link: {router: '/support'},
      },
    ],
  },
  {
    isShow: false,
    text: {locKey: 'sections'},
    childrens: [
      {
        text: {locKey: 'planets'},
        link: {router: '/yellowstar#Planets'},
      },
      {
        text: {locKey: 'TID_PRODUCTION_DLG_SHIPS'},
        link: {router: '/ships'},
      },
      {
        text: {locKey: 'cerberus'},
        link: {router: '/cerberus'},
      },
      {
        text: {locKey: 'stars'},
        link: {router: '/stars'},
      },
      {
        text: {locKey: 'TID_PRODUCTION_DLG_STATIONS'},
        link: {router: '/spacebuildings'},
      },
      {
        text: {locKey: 'TID_OBJECT_ACTION_ARTIFACTS'},
        link: {router: '/redstar#Artifacts'},
      },
      {
        text: {locKey: 'TID_CORP_LEVELS_LABEL'},
        link: {router: '/alliancelevels'},
      },
      {
        text: {locKey: 'TID_EMPIRE_OBJECTIVES'},
        link: {router: '/playergoals'},
      },
      {
        text: {locKey: 'TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS'},
        link: {router: '/achievements'},
      },
    ],
  },
  {
    isShow: false,
    text: {locKey: 'other'},
    childrens: [
      {
        text: {locKey: 'planetscalc'},
        link: {router: '/planetscalc'},
      },
      {
        text: {
          locKey: 'switchAccs',
          after: '(by Raerten)',
        },
        link: 'https://github.com/Raerten/HSAccs',
      },
    ],
  },
];

export default {
  name: 'Nav',
  data() {
    return {
      nav: nav,
    };
  },
  methods: {
    hideAll() {
      this.nav.forEach((e) => {
        e.isShow = false;
      });
    },
    swith(obj) {
      const result = !obj.isShow;
      this.hideAll();
      obj.isShow = result;
    },
  },
};
</script>

<style scoped>
.nav {
  --header-height: 80px;
  --bnt-color: #101415;
  --btn-hover-color: #242e2f;

  position: absolute;
  left: 10px;
  height: var(--header-height);
}
.nav ul, .nav ul li {
  list-style-type: none;
  cursor: pointer;
}
.list > li {
  display: inline-block;
  margin: 0 10px;
}
.nav a {
  display: block;
  transition: .5s linear;
  text-decoration: none;
}
.name {
  color: white;
  padding-top: 25%;
}
.sublist {
  position: absolute;
  top: var(--header-height);
  min-width: 250px;
  transition: 0.5s ease-in-out;
  font-size: 10px;
}
.sublist .name {
  padding: 5% 0;
}
.nav .sublist li {
  background-color: var(--bnt-color);
}
.nav >>> .sublist li:hover {
  background-color: var(--btn-hover-color);
}

@media screen and (max-width: 960px) {
  .nav{
    position: revert;
    padding-top: var(--header-height);
    width: 100%;
    display: inline-block;
  }
  .nav .list .name {
    padding: 15px 0 15px 6%;
  }
  .list li {
    display: block;
    margin: 0;
  }
  .list li div .name {
    text-align: left;
  }
  .sublist {
    position: inherit;
    padding-top: 5%;
  }
  .name {
    padding-top: 0
  }
  .sublist .name {
    padding: 0;
  }
}
</style>
