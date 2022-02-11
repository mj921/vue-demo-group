<template>
  <div class="xiagu">
    <button @click="play" :disabled="autoFlag">点击</button>
    <button @click="playAuto">{{ autoFlag ? "关" : "开" }}自动</button>
    <button @click="playTimes(ipt)" :disabled="autoFlag">点击自定义</button>
    <input type="text" v-model="ipt" />
    <button @click="search">搜索</button>
    <button @click="searchRank">搜索排名</button>
    <el-switch v-model="scoreFlag" :disabled="autoFlag">
      匹配和分数是否有关
    </el-switch>
    {{ totalPlayNum / 10 }}
    <br />
    <el-tabs class="ranks" v-model="currTab">
      <el-tab-pane label="top10" name="top10">
        <el-table
          :data="top10"
          border
          stripe
          size="mini"
          @row-click="(row) => detail(row.id)"
        >
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="score" label="score"> </el-table-column>
          <el-table-column prop="playNum" label="total"> </el-table-column>
          <el-table-column label="win">
            <template v-slot="{ row }">
              {{
                row.playNum === 0
                  ? 0
                  : ((row.winNum / row.playNum) * 100).toFixed(2)
              }}%
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="top10 rw" name="top10 rw">
        <el-select v-model="currRw" size="mini">
          <el-option
            v-for="item in renwu"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <el-table
          :data="rwRank"
          border
          stripe
          size="mini"
          @row-click="(row) => detail(row.id)"
        >
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="sld" label="sld"> </el-table-column>
          <el-table-column prop="playNum" label="total"> </el-table-column>
          <el-table-column label="win">
            <template v-slot="{ row }">
              {{ (row.winRate * 100).toFixed(2) }}%
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="bottom10" name="bottom10">
        <el-table
          :data="bottom10"
          border
          stripe
          size="mini"
          @row-click="(row) => detail(row.id)"
        >
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="score" label="score"> </el-table-column>
          <el-table-column prop="playNum" label="total"> </el-table-column>
          <el-table-column label="win">
            <template v-slot="{ row }">
              {{
                row.playNum === 0
                  ? 0
                  : ((row.winNum / row.playNum) * 100).toFixed(2)
              }}%
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
      <el-tab-pane label="top10 allRw player" name="top10 allRw player">
        <el-table
          :data="allRwplayerRank"
          border
          stripe
          size="mini"
          @row-click="(row) => detail(row.id)"
        >
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="name" label="name"> </el-table-column>
          <el-table-column prop="sld" label="sld"> </el-table-column>
          <el-table-column prop="playNum" label="total"> </el-table-column>
          <el-table-column label="win">
            <template v-slot="{ row }">
              {{ (row.winRate * 100).toFixed(2) }}%
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="top10 allRw player win" name="top10 allRw player win">
        <el-table
          :data="winRatePlayerRank"
          border
          stripe
          size="mini"
          @row-click="(row) => detail(row.id)"
        >
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="name" label="name"> </el-table-column>
          <el-table-column prop="sld" label="sld"> </el-table-column>
          <el-table-column prop="playNum" label="total"> </el-table-column>
          <el-table-column label="win">
            <template v-slot="{ row }">
              {{ (row.winRate * 100).toFixed(2) }}%
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane
        v-for="tab in rwRankList"
        :label="tab.name"
        :name="tab.name"
        :key="tab.name"
      >
        <el-table :data="tab.data" border stripe size="mini">
          <el-table-column prop="name" label="name"> </el-table-column>
          <el-table-column prop="playNum" label="total"> </el-table-column>
          <el-table-column label="win">
            <template v-slot="{ row }">
              {{ (row.winRate * 100).toFixed(2) }}%
            </template>
          </el-table-column>
          <el-table-column label="showRate">
            <template v-slot="{ row }">
              {{
                totalPlayNum > 0
                  ? ((row.playNum / (totalPlayNum / 10)) * 100).toFixed(2)
                  : 0
              }}%
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import renwuData from "./xiagu";
export default {
  data() {
    let players = [];
    /**
     * a 1 2 3 4 5
     * f 1 2 3 4 5
     * g 1 2 3 4 5
     */
    const renwu = renwuData;
    const renwuMap = renwu.reduce((m, item) => {
      m[item.name] = item;
      return m;
    }, {});
    const playersData = localStorage.getItem("xiaguPlayers");
    const initPlayers = () => {
      for (let i = 0; i < 120; i++) {
        const list = [1, 2, 3, 4, 5];
        const i1 = Math.floor(i / 24);
        const a1 = list[i1];
        list.splice(i1, 1);
        const i2 = Math.floor((i % 24) / 6);
        const a2 = list[i2];
        list.splice(i2, 1);
        const i3 = Math.floor(((i % 24) % 6) / 2);
        const a3 = list[i3];
        list.splice(i3, 1);
        const i4 = Math.floor(((i % 24) % 6) % 2);
        const a4 = list[i4];
        list.splice(i4, 1);
        players.push({
          id: i + 1,
          score: 0,
          playNum: 0,
          winNum: 0,
          loseNum: 0,
          renwu: {},
          k: 0,
          d: 0,
          a: 0,
          kda: 0,
          weizhi: [a1, a2, a3, a4, list[0]],
        });
      }
    };
    try {
      if (playersData) {
        players = JSON.parse(playersData);
      } else {
        initPlayers();
      }
    } catch (e) {
      initPlayers();
    }
    return {
      renwu,
      renwuMap,
      players,
      weizhiMap: {
        1: "dr",
        2: "dy",
        3: "zl",
        4: "ss",
        5: "fz",
      },
      ipt: "",
      currRw: "",
      autoFlag: false,
      sto: null,
      currTab: "top10",
      scoreFlag: false, // 匹配和分数是否有关
    };
  },
  computed: {
    rank() {
      const players = JSON.parse(JSON.stringify(this.players));
      players.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        if (a.winNum / a.playNum !== b.winNum / b.playNum)
          return b.winNum / b.playNum - a.winNum / a.playNum;
        if (a.playNum !== b.playNum) return a.playNum - b.playNum;
        return a.id - b.id;
      });
      return players;
    },
    top10() {
      return this.rank.slice(0, 10);
    },
    bottom10() {
      return this.rank.slice(-10);
    },
    rwRank() {
      if (!this.currRw) return [];
      const rank = this.players
        .filter((el) => el.renwu && el.renwu[this.currRw])
        .map((el) => ({
          id: el.id,
          ...el.renwu[this.currRw],
          winRate: el.renwu[this.currRw].winNum / el.renwu[this.currRw].playNum,
        }));
      rank.sort((a, b) => {
        if (a.sld !== b.sld) return b.sld - a.sld;
        if (a.winRate !== b.winRate) return b.winRate - a.winRate;
        if (a.playNum !== b.playNum) return a.playNum - b.playNum;
        return a.id - b.id;
      });
      return rank.slice(0, 10);
    },
    allRwplayerRank() {
      const rank = this.renwu.reduce((arr, item) => {
        return arr.concat(
          this.players
            .filter((el) => el.renwu && el.renwu[item.name])
            .map((el) => ({
              id: el.id,
              ...el.renwu[item.name],
              name: item.name,
              winRate: el.renwu[item.name].winNum / el.renwu[item.name].playNum,
            }))
        );
      }, []);
      rank.sort((a, b) => {
        if (a.sld !== b.sld) return b.sld - a.sld;
        if (a.winRate !== b.winRate) return b.winRate - a.winRate;
        if (a.playNum !== b.playNum) return a.playNum - b.playNum;
        return a.id - b.id;
      });
      return rank.slice(0, 10);
    },
    winRatePlayerRank() {
      const rank = this.renwu.reduce((arr, item) => {
        return arr.concat(
          this.players
            .filter(
              (el) =>
                el.renwu &&
                el.renwu[item.name] &&
                el.renwu[item.name].playNum >
                  this.totalPlayNum / this.renwu.length / 50
            )
            .map((el) => ({
              id: el.id,
              ...el.renwu[item.name],
              name: item.name,
              winRate: el.renwu[item.name].winNum / el.renwu[item.name].playNum,
            }))
        );
      }, []);
      rank.sort((a, b) => {
        if (a.winRate !== b.winRate) return b.winRate - a.winRate;
        if (a.sld !== b.sld) return b.sld - a.sld;
        if (a.playNum !== b.playNum) return a.playNum - b.playNum;
        return a.id - b.id;
      });
      return rank.slice(0, 10);
    },
    allRwData() {
      const rank = this.renwu.map((item) => {
        const obj = {
          name: item.name,
          winNum: 0,
          playNum: 0,
        };
        this.players.forEach((el) => {
          if (el.renwu[item.name]) {
            obj.winNum += el.renwu[item.name].winNum;
            obj.playNum += el.renwu[item.name].playNum;
          }
        });
        obj.winRate = obj.playNum > 0 ? obj.winNum / obj.playNum : 0;
        return obj;
      });
      return rank;
    },
    totalPlayNum() {
      return this.allRwData.reduce((t, el) => t + el.playNum, 0);
    },
    winRwRateRank() {
      const rank = JSON.parse(JSON.stringify(this.allRwData));
      rank.sort((a, b) => {
        if (a.winRate !== b.winRate) return b.winRate - a.winRate;
        if (a.playNum !== b.playNum) return b.playNum - a.playNum;
        return -1;
      });
      return rank.slice(0, 10);
    },
    winRwRateRankBottom() {
      const rank = JSON.parse(JSON.stringify(this.allRwData));
      rank.sort((a, b) => {
        if (a.winRate !== b.winRate) return a.winRate - b.winRate;
        if (a.playNum !== b.playNum) return a.playNum - b.playNum;
        return 1;
      });
      return rank.slice(0, 10);
    },
    playRwRateRank() {
      const rank = JSON.parse(JSON.stringify(this.allRwData));
      rank.sort((a, b) => {
        if (a.playNum !== b.playNum) return b.playNum - a.playNum;
        if (a.winRate !== b.winRate) return b.winRate - a.winRate;
        return -1;
      });
      return rank.slice(0, 10);
    },
    playRwRateRankBottom() {
      const rank = JSON.parse(JSON.stringify(this.allRwData));
      rank.sort((a, b) => {
        if (a.playNum !== b.playNum) return a.playNum - b.playNum;
        if (a.winRate !== b.winRate) return a.winRate - b.winRate;
        return 1;
      });
      return rank.slice(0, 10);
    },
    rwRankList() {
      return [
        { data: this.winRwRateRank, name: "top10_rw_win" },
        { data: this.playRwRateRank, name: "top10_rw_play" },
        { data: this.winRwRateRankBottom, name: "bottom10_rw_win" },
        { data: this.playRwRateRankBottom, name: "bottom10_rw_play" },
      ];
    },
  },
  methods: {
    detail(id) {
      const index = this.rank.findIndex((el) => el.id === id);
      if (index > -1) {
        this.showPlayer(index);
      }
    },
    searchRank() {
      if (!/^\d+$/.test(this.ipt)) return;
      const index = +this.ipt - 1;
      if (index > -1 && index < 120) {
        this.showPlayer(index);
      }
    },
    search() {
      const index = this.rank.findIndex((el) => `${el.id}` === this.ipt);
      if (index > -1) {
        this.showPlayer(index);
      }
    },
    showPlayer(index) {
      const p = this.rank[index];
      console.log(p);
      console.log(
        Object.keys(p.renwu).reduce((o, key) => {
          o[key] = {
            ...p.renwu[key],
            winRate:
              p.renwu[key].playNum === 0
                ? 0
                : ((p.renwu[key].winNum / p.renwu[key].playNum) * 100).toFixed(
                    2
                  ) + "%",
          };
          return o;
        }, {})
      );
      console.log(
        `${p.id} score ${p.score} total ${p.playNum} win ${
          p.playNum === 0 ? 0 : ((p.winNum / p.playNum) * 100).toFixed(2)
        }% ${index + 1}`
      );
      console.log(
        `k-d-a ${p.k > 0 ? +(p.k / p.playNum).toFixed(2) : 0}-${
          p.d > 0 ? +(p.d / p.playNum).toFixed(2) : 0
        }-${p.a > 0 ? +(p.a / p.playNum).toFixed(2) : 0} kda ${p.kda}`
      );
    },
    getTeam() {
      const team1 = [];
      const team2 = [];
      const playerIndexs = this.players.map((el, i) => i);
      let score1 = 0,
        score2 = 0;
      for (let i = 0; i < 10; i++) {
        let index = Math.floor(playerIndexs.length * Math.random()),
          n = 0;
        if (i % 2 === 0) {
          while (
            this.scoreFlag &&
            score1 !== 0 &&
            score1 / team1.length <
              Math.random() * this.players[playerIndexs[index]].score &&
            n < 5
          ) {
            index = Math.floor(playerIndexs.length * Math.random());
            n++;
          }
          team1.push({
            player: this.players[playerIndexs[index]],
          });
        } else {
          while (
            this.scoreFlag &&
            score2 !== 0 &&
            score2 / team2.length <
              Math.random() * this.players[playerIndexs[index]].score &&
            n < 5
          ) {
            index = Math.floor(playerIndexs.length * Math.random());
            n++;
          }
          team2.push({
            player: this.players[playerIndexs[index]],
          });
        }
        playerIndexs.splice(index, 1);
      }
      return [this.getWeizhi(team1), this.getWeizhi(team2)];
    },
    getWeizhi(team) {
      let arr = [{}];
      let weizhis = {};
      let selectedPlayer = [];
      let index = 0;
      let loops = 0;
      while (Object.keys(weizhis).length < 5 && index < 5) {
        team.forEach((item) => {
          const { weizhi, id } = item.player;
          if (!selectedPlayer.includes(id) && !weizhis[weizhi[index]]) {
            if (arr[index][weizhi[index]]) {
              arr[index][weizhi[index]].push(item);
            } else {
              arr[index][weizhi[index]] = [item];
            }
          }
        });
        for (let wz in arr[index]) {
          if (arr[index][wz].length === 1) {
            weizhis[wz] = arr[index][wz][0];
            weizhis[wz].weizhi = +wz;
            selectedPlayer.push(arr[index][wz][0].player.id);
          }
        }
        index++;
        if (index === 5 && loops < 2) {
          index = 0;
          loops++;
          arr = [{}];
        } else {
          arr.push({});
        }
      }
      if (Object.keys(weizhis).length < 5) {
        const other = team.filter(
          (el) => !selectedPlayer.includes(el.player.id)
        );
        [1, 2, 3, 4, 5].filter((el) => {
          if (!weizhis[el]) {
            const index = Math.floor(Math.random() * other.length);
            weizhis[el] = other[index];
            other[index].weizhi = el;
            other.splice(index, 1);
          }
        });
      }
      team.teamMap = team.reduce((m, el) => {
        m[this.weizhiMap[el.weizhi]] = el;
        return m;
      }, {});
      return team;
    },
    getRenwu(teams) {
      const renwu = JSON.parse(JSON.stringify(this.renwu));
      for (let i = 0; i < 5; i++) {
        teams.forEach((item) => {
          const { player, weizhi } = item[i];
          let weightTotal = 0;
          const renwuCopy = renwu.map((rw) => {
            const weight =
              (100 +
                ((player.renwu[rw.name] && player.renwu[rw.name].sld) || 0)) *
              (rw.type.includes(this.weizhiMap[weizhi]) ? 5 : 1);
            weightTotal += weight;
            return {
              ...rw,
              weight,
            };
          });
          let randonWeight = Math.random() * weightTotal;
          for (let j = 0; j < renwuCopy.length; j++) {
            const rw = renwuCopy[j];
            randonWeight -= rw.weight;
            if (randonWeight <= 0) {
              const { atk, alv, f, flv, g, name, type } = rw;
              const rate =
                ((100 +
                  ((player.renwu[rw.name] && player.renwu[rw.name].sld) || 0)) *
                  (rw.type.includes(this.weizhiMap[weizhi]) ? 1.2 : 1)) /
                100;
              item[i].renwu = {
                id: player.id,
                name,
                type,
                atk: atk * rate,
                alv: alv * rate,
                f: f * rate,
                flv: flv * rate,
                g: g * rate,
                sld:
                  player.renwu[rw.name] && player.renwu[rw.name].sld > 1
                    ? player.renwu[rw.name].sld
                    : 1,
                killNum: 0,
                deathNum: 0,
                assistNum: 0,
              };
              renwu.splice(j, 1);
              break;
            }
          }
        });
      }
    },
    getIsAct(renwus1, renwus2) {
      const total1 = renwus1.reduce((t, el) => t + el.atk + el.f, 0);
      const total2 = renwus2.reduce((t, el) => t + el.atk + el.f, 0);
      return Math.random() < total1 / (total1 + total2);
    },
    renwuUp(renwu, lv) {
      renwu.atk += renwu.alv * lv;
      renwu.f += renwu.flv * lv;
    },
    getResult(val1, val2) {
      return Math.random() < val1 / (val1 + val2);
    },
    fight(renwus1, renwus2, hasJC = false, isFinally = false) {
      const jc1 = renwus1.reduce((t, el) => t + el.g, 10) / 10;
      const jc2 = renwus2.reduce((t, el) => t + el.g, 10) / 10;
      const renwusCopy1 = JSON.parse(JSON.stringify(renwus1)).map(
        (el, index) => ({
          ...el,
          index,
          currF: el.f * 10 * jc1,
          currA: el.atk * jc1,
        })
      );
      const renwusCopy2 = JSON.parse(JSON.stringify(renwus2)).map(
        (el, index) => ({
          ...el,
          index,
          currF: el.f * 10 * (jc2 + hasJC ? 0.1 : 0),
          currA: el.atk * (jc2 + hasJC ? 0.1 : 0),
        })
      );
      let ti1, ti2;
      ti1 = Math.floor(Math.random() * renwusCopy1.length);
      ti2 = Math.floor(Math.random() * renwusCopy2.length);
      let target1 = renwusCopy1[ti1];
      let target2 = renwusCopy2[ti2];
      let i1 = 0,
        i2 = 0,
        r = 0;
      while (
        renwusCopy1.length > 0 &&
        renwusCopy2.length > 0 &&
        (r < 11 || (isFinally && r < 1000))
      ) {
        for (
          i1 = 0, i2 = 0;
          i1 < renwusCopy1.length || i2 < renwusCopy2.length;
          i1++, i2++
        ) {
          if (
            i1 < renwusCopy1.length &&
            target2 &&
            this.getResult(renwusCopy1[i1].sld, target2.sld)
          ) {
            target2.currF -= renwusCopy1[i1].currA;
            if (target2.currF <= 0) {
              const di = renwusCopy2.findIndex(
                (el) => el.index === target2.index
              );
              renwus2[target2.index].deathNum++;
              renwus1[renwusCopy1[i1].index].killNum++;
              if (i2 > di) {
                i2--;
              }
              this.renwuUp(renwus1[renwusCopy1[i1].index], 1);
              renwusCopy1.forEach((el) => {
                if (el.index !== renwusCopy1[i1].index) {
                  renwus1[el.index].assistNum++;
                  renwusCopy1.length > 1 &&
                    this.renwuUp(
                      renwus1[el.index],
                      1 / (renwusCopy1.length - 1)
                    );
                }
              });
              renwusCopy2.splice(ti2, 1);
              ti2 = Math.floor(Math.random() * renwusCopy2.length);
              target2 = renwusCopy2[ti2];
            }
          }
          if (
            i2 < renwusCopy2.length &&
            target1 &&
            this.getResult(renwusCopy2[i2].sld, target1.sld)
          ) {
            target1.currF -= renwusCopy2[i2].currA;
            if (target1.currF <= 0) {
              const di = renwusCopy1.findIndex(
                (el) => el.index === target1.index
              );
              renwus1[target1.index].deathNum++;
              renwus2[renwusCopy2[i2].index].killNum++;
              if (i1 > di) {
                i1--;
              }
              this.renwuUp(renwus2[renwusCopy2[i2].index], 1);
              renwusCopy2.forEach((el) => {
                if (el.index !== renwusCopy2[i2].index) {
                  renwus2[el.index].assistNum++;
                  renwusCopy2.length > 1 &&
                    this.renwuUp(
                      renwus2[el.index],
                      1 / (renwusCopy2.length - 1)
                    );
                }
              });
              renwusCopy1.splice(ti1, 1);
              ti1 = Math.floor(Math.random() * renwusCopy1.length);
              target1 = renwusCopy1[ti1];
            }
          }
        }
        r++;
      }
      if (isFinally) return renwusCopy1.length > 0 ? 1 : 0;
    },
    round(team1, team2, round = 1) {
      const teamMap1 = team1.teamMap;
      const teamMap2 = team2.teamMap;
      let group = [];
      if (round < 4) {
        group = [
          [[teamMap1.dr.renwu], [teamMap2.dr.renwu]],
          [[teamMap1.dy.renwu], [teamMap2.dy.renwu]],
          [[teamMap1.zl.renwu], [teamMap2.zl.renwu]],
          [
            [teamMap1.ss.renwu, teamMap1.fz.renwu],
            [teamMap2.ss.renwu, teamMap2.fz.renwu],
          ],
        ];
      } else if (round === 4) {
        group = [
          [
            [teamMap1.dr.renwu, teamMap1.dy.renwu, teamMap1.zl.renwu],
            [teamMap2.dr.renwu, teamMap2.dy.renwu, teamMap2.zl.renwu],
          ],
          [
            [teamMap1.ss.renwu, teamMap1.fz.renwu],
            [teamMap2.ss.renwu, teamMap2.fz.renwu],
          ],
        ];
      } else if (round === 5) {
        group = [
          [
            [
              teamMap1.dr.renwu,
              teamMap1.dy.renwu,
              teamMap1.zl.renwu,
              teamMap1.ss.renwu,
              teamMap1.fz.renwu,
            ],
            [
              teamMap2.dr.renwu,
              teamMap2.dy.renwu,
              teamMap2.zl.renwu,
              teamMap2.ss.renwu,
              teamMap2.fz.renwu,
            ],
          ],
        ];
      } else if (round < 10) {
        group = [
          [[teamMap1.dr.renwu], [teamMap2.dr.renwu]],
          [[teamMap1.dy.renwu], [teamMap2.dy.renwu]],
          [[teamMap1.zl.renwu], [teamMap2.zl.renwu]],
          [
            [teamMap1.ss.renwu, teamMap1.fz.renwu],
            [teamMap2.ss.renwu, teamMap2.fz.renwu],
          ],
        ];
      } else if (round < 20) {
        group = [
          [
            [
              teamMap1.dr.renwu,
              teamMap1.dy.renwu,
              teamMap1.zl.renwu,
              teamMap1.ss.renwu,
              teamMap1.fz.renwu,
            ],
            [
              teamMap2.dr.renwu,
              teamMap2.dy.renwu,
              teamMap2.zl.renwu,
              teamMap2.ss.renwu,
              teamMap2.fz.renwu,
            ],
          ],
        ];
      } else {
        group = [
          [
            teamMap1.dr.renwu,
            teamMap1.dy.renwu,
            teamMap1.zl.renwu,
            teamMap1.ss.renwu,
            teamMap1.fz.renwu,
          ],
          [
            teamMap2.dr.renwu,
            teamMap2.dy.renwu,
            teamMap2.zl.renwu,
            teamMap2.ss.renwu,
            teamMap2.fz.renwu,
          ],
        ];
      }
      if (round < 20) {
        group.forEach((g) => {
          const [arr1, arr2] = g;
          let act1 = this.getIsAct(arr1, arr2);
          let act2 = this.getIsAct(arr2, arr1);
          if (!act1 && !act2) {
            arr1.forEach((el) => this.renwuUp(el, 0.5));
            arr2.forEach((el) => this.renwuUp(el, 0.5));
          } else if (act1 && act2) {
            arr1.forEach((el) => this.renwuUp(el, 1));
            arr2.forEach((el) => this.renwuUp(el, 1));
            const temp = this.getResult(
              arr1.reduce((t, el) => t + el.sld, 0),
              arr2.reduce((t, el) => t + el.sld, 0)
            )
              ? [arr1, arr2]
              : [arr2, arr1];
            this.fight(temp[0], temp[1]);
          } else if (act1) {
            this.fight(arr1, arr2, true);
          } else {
            this.fight(arr2, arr1, true);
          }
        });
      } else {
        const [arr1, arr2] = group;
        const tempSldFlag = this.getResult(
          arr1.reduce((t, el) => t + el.sld, 0),
          arr2.reduce((t, el) => t + el.sld, 0)
        );
        const temp = tempSldFlag ? [arr1, arr2] : [arr2, arr1];
        let result = this.fight(temp[0], temp[1], true, true);
        if (typeof result === "number") {
          if (tempSldFlag) result = 1 - result;
          (result === 0 ? team1 : team2).win = true;
        }
      }
      // console.log(
      //   `round ${round}：${team1.reduce(
      //     (t, el) => t + el.renwu.killNum,
      //     0
      //   )}-${team2.reduce((t, el) => t + el.renwu.killNum, 0)}`
      // )
      if (round < 20) {
        this.round(team1, team2, round + 1);
      }
    },
    getKDA(k, d, a) {
      return +((k + a * (d === 0 ? 1 : 0.7)) / (d || 1)).toFixed(2);
    },
    teamAchievement(team1, team2) {
      const teamMap1 = team1.teamMap;
      const teamMap2 = team2.teamMap;
      team1.k = team1.d = team1.a = team2.k = team2.d = team2.a = 0;
      for (let i in this.weizhiMap) {
        const key = this.weizhiMap[i];
        team1.k += teamMap1[key].k = teamMap1[key].renwu.killNum;
        team1.d += teamMap1[key].d = teamMap1[key].renwu.deathNum;
        team1.a += teamMap1[key].a = teamMap1[key].renwu.assistNum;
        teamMap1[key].player.k += teamMap1[key].k;
        teamMap1[key].player.d += teamMap1[key].d;
        teamMap1[key].player.a += teamMap1[key].a;
        teamMap1[key].player.kda = this.getKDA(
          teamMap1[key].player.k,
          teamMap1[key].player.d,
          teamMap1[key].player.a
        );
        teamMap1[key].kda = this.getKDA(
          teamMap1[key].k,
          teamMap1[key].d,
          teamMap1[key].a
        );
        team2.k += teamMap2[key].k = teamMap2[key].renwu.killNum;
        team2.d += teamMap2[key].d = teamMap2[key].renwu.deathNum;
        team2.a += teamMap2[key].a = teamMap2[key].renwu.assistNum;
        teamMap2[key].player.k += teamMap2[key].k;
        teamMap2[key].player.d += teamMap2[key].d;
        teamMap2[key].player.a += teamMap2[key].a;
        teamMap2[key].player.kda = this.getKDA(
          teamMap2[key].player.k,
          teamMap2[key].player.d,
          teamMap2[key].player.a
        );
        teamMap2[key].kda = this.getKDA(
          teamMap2[key].k,
          teamMap2[key].d,
          teamMap2[key].a
        );
      }
      team1.kda = this.getKDA(team1.k, team1.d, team1.a);
      team2.kda = this.getKDA(team2.k, team2.d, team2.a);
      let winTeam, loseTeam;
      if (team1.win) {
        winTeam = team1;
        loseTeam = team2;
      } else if (team2.win) {
        winTeam = team2;
        loseTeam = team1;
      } else {
        if (team1.kda > team2.kda) {
          winTeam = team1;
          loseTeam = team2;
        } else if (team2.kda > team1.kda) {
          winTeam = team2;
          loseTeam = team1;
        }
      }
      if (winTeam) {
        for (let i in this.weizhiMap) {
          const key = this.weizhiMap[i];
          const { player, renwu, kda } = winTeam.teamMap[key];
          if (!player.renwu[renwu.name])
            player.renwu[renwu.name] = {
              sld: 0,
              playNum: 0,
              winNum: 0,
              loseNum: 0,
            };
          player.renwu[renwu.name].sld = +(
            player.renwu[renwu.name].sld + kda
          ).toFixed(2);
          player.renwu[renwu.name].playNum++;
          player.renwu[renwu.name].winNum++;
          player.score++;
          player.playNum++;
          player.winNum++;
        }
      }
      if (loseTeam) {
        for (let i in this.weizhiMap) {
          const key = this.weizhiMap[i];
          const { player, renwu, kda } = loseTeam.teamMap[key];
          if (!player.renwu[renwu.name])
            player.renwu[renwu.name] = {
              sld: 0,
              playNum: 0,
              winNum: 0,
              loseNum: 0,
            };
          player.renwu[renwu.name].sld = +(
            player.renwu[renwu.name].sld -
            (loseTeam.kda * 2 - kda > 0 ? loseTeam.kda * 2 - kda : 0)
          ).toFixed(2);
          player.renwu[renwu.name].playNum++;
          player.renwu[renwu.name].loseNum++;
          player.score--;
          player.playNum++;
          player.loseNum++;
          if (player.renwu[renwu.name].sld < 0)
            player.renwu[renwu.name].sld = 0;
          if (player.score < 0) player.score = 0;
        }
      }
    },
    play() {
      const teams = this.getTeam();
      this.getRenwu(teams);
      this.round(teams[0], teams[1]);
      this.teamAchievement(teams[0], teams[1]);
      localStorage.setItem("xiaguPlayers", JSON.stringify(this.players));
    },
    playTimes(num) {
      if (!num) return;
      num = +num;
      console.time();
      for (let i = 0; i < num; i++) {
        this.play();
      }
      console.timeEnd();
    },
    playAuto() {
      if (this.autoFlag) {
        clearTimeout(this.sto);
        this.sto = null;
      } else {
        const _loop = () => {
          this.play();
          this.sto = setTimeout(_loop, 1000 / 16);
        };
        _loop();
      }
      this.autoFlag = !this.autoFlag;
    },
  },
};
</script>

<style lang="scss" scoped>
.xiagu {
  padding: 20px;
  .ranks {
    li {
      span {
        display: inline-block;
      }
    }
  }
}
</style>
