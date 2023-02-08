<template>
  <div class="restaurant">
    <div class="restaurant-top">
      <div class="time">
        <span>W {{ weed }}</span>
        <span>D {{ day }}</span>
        <span>H {{ Math.floor(time / 10000) % 24 }}</span>
      </div>
      <img
        class="setting"
        src="../../assets/images/restaurant/setting-icon.png"
        @click="setting"
      />
      <div class="money">
        {{ money }}
      </div>
    </div>
    <div class="restaurant-cook">
      <div class="cooks">
        <dl
          class="cook-box"
          v-for="(cook, cookIndex) in cookList"
          :key="`cook-${cookIndex}`"
          @click="cookClickHandler(cook, cookIndex)"
        >
          <div :class="`cook ${cook.status}`" v-if="cook.hasCook">
            <img src="../../assets/images/restaurant/cook-icon.png" alt="" />
            <img
              class="cook-finish"
              v-if="cook.status === 'finish'"
              src="../../assets/images/restaurant/get-icon.png"
              alt=""
            />
          </div>
          <div class="cook empty" v-else>
            <img src="../../assets/images/restaurant/cook-icon.png" alt="" />
          </div>
          <div
            v-if="cook.hasCook && cook.status !== 'default'"
            :key="`cook-dishes-${cookIndex}-${cook.dish.name}`"
            class="cook-dishes-progress"
            :style="{
              background:
                cook.status === 'work'
                  ? `linear-gradient(to right, #ff9122 0%, #ff9122 ${
                      (cook.dish.cookTime / cook.dish.maxCookTime) * 100
                    }%, #d96d00 ${
                      (cook.dish.cookTime / cook.dish.maxCookTime) * 100
                    }%, #d96d00 100%)`
                  : '#ac91ff',
            }"
          >
            {{ cook.dish.name }}
          </div>
          <div
            class="cook-delete"
            @click="fireCook(cook, cookIndex)"
            v-show="
              cook.hasCook && cook.status === 'default' && cookList.length > 2
            "
          ></div>
        </dl>
      </div>
    </div>
    <div class="restaurant-seat">
      <dl
        class="seat-box"
        v-for="(seat, seatIndex) in seatList"
        :key="`seat-${seatIndex}`"
        @click="seatClickHandler(seat)"
      >
        <div :class="`seat ${seat.status}`">
          <img v-if="seat.hasCustomer" :src="seat.customer.headImg" />
        </div>
        <div class="seat-dishes" v-if="seat.customer">
          <div
            v-for="dish in seat.customer.dishes"
            :key="`seat-dishes-${seat.customer.id}-${dish.name}`"
            class="seat-dishes-progress"
            :class="`seat-dishes-${dish.status}`"
            :style="{
              background:
                dish.status === 'wait'
                  ? `linear-gradient(to right, #ff2626 0%, #ff2626 ${
                      (dish.waitTime / dish.maxWaitTime) * 100
                    }%, #b20000 ${
                      (dish.waitTime / dish.maxWaitTime) * 100
                    }%, #b20000 100%)`
                  : dish.status === 'eat'
                  ? seat.status === 'pay'
                    ? '#00b200'
                    : `linear-gradient(to right, #ff9122 0%, #ff9122 ${
                        (dish.eatTime / dish.maxEatTime) * 100
                      }%, #d96d00 ${
                        (dish.eatTime / dish.maxEatTime) * 100
                      }%, #d96d00 100%)`
                  : '#535362',
            }"
          >
            {{ dish.name }}
            <div
              class="seat-wait-finish"
              v-if="dish.cookFinish && dish.status === 'wait'"
              @click="serveDish(seat, dish)"
            >
              <img src="../../assets/images/restaurant/get-icon.png" alt="" />
            </div>
          </div>
        </div>
        <img
          v-show="seat.status === 'cancel'"
          class="seat-appease"
          src="../../assets/images/restaurant/heart-icon.png"
        />
        <img
          v-show="seat.status === 'pay'"
          class="seat-pay-icon"
          src="../../assets/images/restaurant/money-icon.png"
        />
      </dl>
    </div>
    <div class="restaurant-queue">
      <dl
        class="queue-box"
        v-for="(queue, queueIndex) in queueList"
        :key="`queue-${queueIndex}`"
        :style="{ zIndex: queueList.length + 1 - queueIndex }"
        @click.stop="selectMenuHandle(queue)"
      >
        <div class="queue">
          <img :src="queue.img" />
        </div>
        <div
          class="wait-progress"
          :style="{
            background: `linear-gradient(to right, #2693ff 0%, #2693ff ${
              (queue.queueWaitTime / queueWaitTime) * 100
            }%, #006dd9 ${
              (queue.queueWaitTime / queueWaitTime) * 100
            }%, #006dd9 100%)`,
          }"
        >
          等位中
        </div>
      </dl>
    </div>
    <menu-select
      v-model="menuVisible"
      :customer="menuCustomer"
      @finish="menuFinish"
    />
    <setting
      v-model="settingVisible"
      :data="settingData"
      :game-rule-data="{
        maxWaitCustomerNum,
        dayTime,
        queueWaitTime,
        cookSalary,
      }"
      @save="settingSave"
      @cancel="settingCancel"
    />
  </div>
</template>

<script>
import MenuSelect from "./components/menuSelect.vue";
import Setting from "./components/setting/index.vue";
import RgConfirm from "./components/confirm";
import RgToast from "./components/toast";
export default {
  components: { MenuSelect, Setting },
  data() {
    const names = [
      "贾文乐",
      "罗嘉平",
      "庄翰海",
      "袁翔宇",
      "叶钧",
      "杨尚",
      "王振海",
    ];
    const allCustomers = names.map((name, index) => ({
      name: name,
      img: require(`../../assets/images/restaurant/customer-icon${index}.png`),
    }));
    return {
      id: 1,
      weed: 1,
      day: 1,
      money: 500,
      allCustomers,
      queueWaitTime: 60000,
      time: 0,
      dayTime: 240000,
      loopTime: 100,
      cookSalary: 140,
      maxWaitCustomerNum: 6,
      cookAccelerateTime: 500,
      cookList: [
        {
          hasCook: true,
          status: "default", // default work finish
          enterTime: 0,
        },
        {
          hasCook: false,
          status: "default",
        },
      ],
      seatList: [
        {
          hasCustomer: false,
          status: "empty", // empty wait eat pay
        },
        {
          hasCustomer: false,
          status: "empty",
        },
        {
          hasCustomer: false,
          status: "empty",
        },
        {
          hasCustomer: false,
          status: "empty",
        },
      ],
      queueList: [],
      sto: null,
      status: "stop",
      menuCustomer: {},
      menuVisible: false,
      dishesQueue: [],
      dayCustomerData: [],
      settingVisible: false,
      speed: 1,
    };
  },
  computed: {
    settingData() {
      return {
        speed: this.speed,
      };
    },
  },
  methods: {
    /** 设置 */
    setting() {
      this.stop();
      this.settingVisible = true;
    },
    settingSave(data) {
      this.speed = data.speed;
      this.start();
    },
    settingCancel() {
      this.start();
    },
    /** 开始点菜 */
    selectMenuHandle(customer) {
      const index = this.queueList.indexOf(customer);
      this.menuCustomer = customer;
      if (index > -1) {
        this.queueList.splice(index, 1);
      }
      this.menuVisible = true;
    },
    /** 点菜完成处理 */
    menuFinish(menuData) {
      for (let i = 0; i < this.seatList.length; i++) {
        const item = this.seatList[i];
        if (!item.hasCustomer) {
          const [customerDishes, cookDishes] = Object.keys(
            menuData.values
          ).reduce(
            (list, key) => {
              menuData.values[key].forEach((el) => {
                const d0 = {
                  ...el,
                  waitTime: 0,
                  eatTime: 0,
                  status: "wait",
                };
                const d1 = {
                  ...el,
                  cookTime: 0,
                  timeoutWait: 0,
                  timeout: false,
                  customerDish: d0,
                };
                d0.cookDish = d1;
                list[0].push(d0);
                list[1].push(d1);
              });
              return list;
            },
            [[], []]
          );
          Array.prototype.push.apply(this.dishesQueue, cookDishes);
          item.customer = {
            headImg: menuData.headImg,
            id: menuData.id,
            name: menuData.name,
            dishes: customerDishes,
            eatQueue: [],
          };
          item.hasCustomer = true;
          item.status = "wait";
          break;
        }
      }
      this.menuVisible = false;
      RgToast.success(
        `${menuData.name}完成点餐，等候用餐<br/><div style="width: 14em;">疯狂点击厨师头像可以加速做菜</div>`
      );
    },
    /** 上菜 */
    serveDish(seat, dish) {
      seat.status = "eat";
      seat.customer.eatQueue.push(dish);
      dish.status = "eat";
      dish.cookDish.status = "eat";
    },
    /** 创建顾客到来列表 */
    createComeTo() {
      const customerList = this.allCustomers.reduce((list, el) => {
        const comeFlag = Math.random() < 0.93356513215;
        if (comeFlag) {
          list.push({
            ...el,
            time: Math.floor(Math.random() * 180000),
          });
        }
        return list;
      }, []);
      const item =
        customerList[Math.floor(Math.random() * customerList.length)];
      item.time = Math.min(Math.floor(Math.random() * 10000), item.time);
      customerList.sort((a, b) => a.time - b.time);
      this.dayCustomerData = customerList;
    },
    /** 清空座位 */
    emptySeat(seat) {
      seat.hasCustomer = false;
      seat.status = "empty";
      delete seat.customer;
    },
    /** 厨师点击处理 */
    cookClickHandler(cook) {
      if (!cook.hasCook) {
        this.stop();
        RgConfirm({
          title: "招聘新厨师",
          content: `招聘一名新厨师可以为你更快地为顾客烹饪菜肴，增加餐厅收入。你最多可以拥有六名厨师。<br/>但每个厨师每周需要你支付工资￥${this.cookSalary}<br/>请问你确认新招聘一名厨师吗？`,
          confirmBtnText: "是的，确认招聘",
          cancelBtnText: "先不了",
        })
          .then(() => {
            cook.hasCook = true;
            cook.enterTime = this.time;
            RgToast.success(
              `招聘厨师成功，你已经有${this.cookList.length}名厨师了`
            );
            if (this.cookList.length < this.maxWaitCustomerNum) {
              this.cookList.push({
                hasCook: false,
                status: "default",
              });
            }
          })
          .catch(() => {})
          .finally(() => {
            this.start();
          });
      } else if (cook.status === "work") {
        cook.dish.cookTime += this.cookAccelerateTime;
        if (cook.dish.cookTime >= cook.dish.maxCookTime) {
          cook.status = "finish";
          if (cook.dish.customerDish) {
            cook.dish.customerDish.cookFinish = true;
          }
        }
      }
    },
    /** 解雇厨师 */
    fireCook(cook, cookIndex) {
      const price = Math.floor(
        this.cookSalary * (1 + (this.time % (this.dayTime * 7)) / this.dayTime)
      );
      this.stop();
      RgConfirm({
        title: "解雇厨师",
        content: `解雇当前闲置的厨师可以帮你节省成本。<br/>解雇时会按厨师本周已经工作的日子结算工资，并会赔偿一周工资作为解约金。<br/>解雇当前厨师结算工资及解约金需要付出￥${price}`,
        confirmBtnText: "是的，确认解雇",
        cancelBtnText: "先不了",
      })
        .then(() => {
          if (this.money >= price) {
            this.cookList.splice(cookIndex, 1);
            this.money -= price;
            RgToast.success(`解约厨师成功，解约支出￥${price}`);
          } else {
            RgToast.error("你的金额已经不足支付解约金");
          }
        })
        .catch(() => {})
        .finally(() => {
          this.start();
        });
    },
    customerPay(seat) {
      const price = seat.customer.dishes.reduce((total, el) => {
        return total + (el.status === "eat" ? el.price : 0);
      }, 0);
      this.money += price;
      RgToast.success(`${seat.customer.name}完成用餐，收获￥${price}`);
      this.emptySeat(seat);
    },
    appeaseCustomer(seat) {
      RgToast.error(`${seat.customer.name}失望而归，别再让客人挨饿了`);
      this.emptySeat(seat);
    },
    /** 座位点击处理 */
    seatClickHandler(seat) {
      switch (seat.status) {
        case "pay":
          this.customerPay(seat);
          break;
        case "cancel":
          this.appeaseCustomer(seat);
          break;
      }
    },
    /** 厨师循环处理 */
    loopCook() {
      for (let i = 0; i < this.cookList.length; i++) {
        const cookItem = this.cookList[i];
        if (cookItem.hasCook) {
          if (cookItem.status === "default") {
            let nextCookDish = null;
            while (this.dishesQueue.length && nextCookDish === null) {
              nextCookDish = this.dishesQueue.shift();
              if (nextCookDish.customerDish.status === "cancel") {
                nextCookDish = null;
              }
            }
            if (nextCookDish) {
              this.money -= nextCookDish.cost;
              cookItem.dish = nextCookDish;
              cookItem.status = "work";
            }
          } else if (cookItem.status === "work") {
            cookItem.dish.cookTime += this.loopTime;
            if (cookItem.dish.cookTime >= cookItem.dish.maxCookTime) {
              cookItem.status = "finish";
              if (cookItem.dish.customerDish) {
                cookItem.dish.customerDish.cookFinish = true;
              }
            }
          } else if (
            cookItem.status === "finish" &&
            cookItem.dish.customerDish
          ) {
            if (cookItem.dish.customerDish.timeout) {
              cookItem.dish.timeoutWait += this.loopTime;
              if (cookItem.dish.timeoutWait >= 5000) {
                cookItem.status = "default";
                delete cookItem.dish;
              }
            } else if (cookItem.dish.customerDish.status === "eat") {
              cookItem.status = "default";
              delete cookItem.dish;
            }
          }
        }
      }
    },
    /** 座位循环处理 */
    loopSeat(dayEndFlag = false) {
      for (let i = 0; i < this.seatList.length; i++) {
        const seatItem = this.seatList[i];
        if (seatItem.hasCustomer) {
          if (["eat", "wait"].includes(seatItem.status)) {
            let eatFinishNum = 0,
              cancelNum = 0;
            seatItem.customer.dishes.forEach((dish) => {
              if (dish.status === "wait") {
                dish.waitTime += this.loopTime;
                if (dish.waitTime >= dish.maxWaitTime) {
                  dish.status = "cancel";
                  dish.timeout = true;
                }
              }
              if (dish.status === "eat" && dish.eatTime >= dish.maxEatTime) {
                eatFinishNum++;
              }
              if (dish.status === "cancel") {
                cancelNum++;
              }
            });
            if (seatItem.customer.eatQueue.length) {
              seatItem.customer.eatQueue[0].eatTime += this.loopTime;
              if (
                seatItem.customer.eatQueue[0].eatTime >=
                seatItem.customer.eatQueue[0].maxEatTime
              ) {
                seatItem.customer.eatQueue.shift();
                eatFinishNum++;
              }
            }
            if (eatFinishNum + cancelNum === seatItem.customer.dishes.length) {
              if (cancelNum === seatItem.customer.dishes.length) {
                seatItem.status = "cancel";
              } else {
                seatItem.status = "pay";
              }
            }
          }
          if (dayEndFlag) {
            if (seatItem.status === "cancel") {
              this.appeaseCustomer(seatItem);
            } else if (seatItem.status === "pay") {
              this.customerPay(seatItem);
            }
          }
        }
      }
    },
    loop() {
      // console.time();
      const startDate = new Date();
      this.time += this.loopTime;
      const currDayTime = Math.floor(this.time) % this.dayTime;
      if (currDayTime === 0) {
        this.createComeTo();
        if (this.day === 7) {
          this.money -= this.cookList.reduce((total, el) => {
            if (el.hasCook) {
              return (
                total +
                Math.min(
                  Math.ceil(
                    ((this.time - el.enterTime) / this.dayTime / 7) *
                      this.cookSalary
                  ),
                  this.cookSalary
                )
              );
            }
            return total;
          }, 0);
          this.day = 1;
          this.weed++;
        } else {
          this.day++;
        }
      }
      for (let i = 0; i < this.queueList.length; ) {
        this.queueList[i].queueWaitTime += this.loopTime;
        if (
          !this.queueList[i].toastFlag &&
          this.queueList[i].queueWaitTime > this.queueWaitTime / 2 &&
          this.seatList.some((el) => !el.hasCustomer)
        ) {
          this.queueList[i].toastFlag = true;
          RgToast.error("餐厅目前有空位，赶紧点击等位客人头像让客人入座就餐吧");
        }
        if (this.queueList[i].queueWaitTime >= this.queueWaitTime) {
          this.queueList.splice(i, 1);
        } else {
          i++;
        }
      }
      this.loopCook();
      this.loopSeat(currDayTime === 0);
      while (
        this.dayCustomerData.length > 0 &&
        this.dayCustomerData[0].time <= currDayTime
      ) {
        const currCustomer = this.dayCustomerData.shift();
        if (this.queueList.length < 6) {
          this.queueList.push({
            ...currCustomer,
            id: this.id++,
            queueWaitTime: 0,
          });
        }
      }
      this.sto = setTimeout(
        this.loop,
        Math.max(0, this.loopTime / this.speed - (new Date() - startDate))
      );
      // console.timeEnd();
    },
    stop() {
      this.status = "stop";
      clearTimeout(this.sto);
    },
    start() {
      this.status = "start";
      this.loop();
    },
  },
  mounted() {
    this.start();
  },
  created() {
    this.createComeTo();
  },
  destroyed() {
    clearTimeout(this.sto);
  },
};
</script>

<style lang="scss" scoped>
.restaurant {
  max-width: 750px;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/restaurant/bg.jpg");
  background-size: 75rem;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #c6dcbf;
  position: relative;
  * {
    box-sizing: border-box;
  }
  @mixin linear-gradientTwo($color1, $color2, $direction: top) {
    background: linear-gradient(
      to $direction,
      $color1 0%,
      $color1 50%,
      $color2 50%,
      $color2 100%
    );
  }
  .restaurant-top {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    color: #8c6900;
    .top-box {
      border: 1.3rem solid #8c6900;
      height: 6.4rem;
      border-radius: 3.2rem;
      display: flex;
      align-items: center;
      line-height: 1em;
      font-size: 2.4rem;
      @include linear-gradientTwo(#ffe699, #ffd24d);
    }
    .time {
      @extend .top-box;
      width: 33rem;
      justify-content: space-evenly;
    }
    .setting {
      width: 6.4rem;
      width: 6.4rem;
    }
    .money {
      @extend .top-box;
      width: 31rem;
      padding-right: 3rem;
      justify-content: flex-end;
    }
  }
  .head-img {
    width: 13.4rem;
    height: 13.4rem;
    border-radius: 6.5rem;
    border: 1.3rem solid #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .restaurant-cook {
    height: 45rem;
    .cooks {
      margin: 0 auto;
      background-color: #ffd24d;
      border: 1.3rem solid #fff;
      border-radius: 4rem;
      width: 70rem;
      display: flex;
      flex-wrap: wrap;
      padding: 3.5rem 3.5rem 0;
      .cook-box {
        position: relative;
        margin-bottom: 3.5rem;
        &:not(:nth-child(3n)) {
          margin-right: 10.1rem;
        }
        .cook {
          @extend .head-img;
          &.default {
            @include linear-gradientTwo(#aaa, #ddd, left);
          }
          &.work {
            @include linear-gradientTwo(#ff9122, #d96d00, right);
          }
          &.finish {
            @include linear-gradientTwo(#ac91ff, #7a4dff, right);
            .cook-finish {
              position: absolute;
              left: -2rem;
              top: 3.5rem;
              width: 10rem;
              height: 10rem;
            }
          }
          &.empty {
            background-color: #ddd;
            position: relative;
            &::before {
              position: absolute;
              content: "";
              width: 6rem;
              height: 1rem;
              left: 2.4rem;
              top: 4.9rem;
              background-color: #cc9979;
              z-index: 1;
            }
            &::after {
              position: absolute;
              content: "";
              width: 1rem;
              height: 6rem;
              left: 4.9rem;
              top: 2.4rem;
              background-color: #cc9979;
              z-index: 1;
            }
            img {
              filter: brightness(0) invert(1);
            }
          }
        }
        .cook-dishes-progress {
          position: absolute;
          bottom: -2rem;
          width: 14rem;
          border-radius: 0.5rem;
          border: 0.5rem solid #fff;
          height: 4rem;
          font-size: 2.4rem;
          line-height: 3rem;
          color: #fff;
          text-align: center;
        }
        .cook-delete {
          position: absolute;
          transform: rotate(45deg);
          width: 6rem;
          height: 6rem;
          left: 10rem;
          top: -1rem;
          &::before {
            position: absolute;
            content: "";
            width: 6rem;
            height: 1rem;
            left: 0;
            top: 2.5rem;
            background-color: #cc9979;
            z-index: 1;
          }
          &::after {
            position: absolute;
            content: "";
            width: 1rem;
            height: 6rem;
            left: 2.5rem;
            top: 0;
            background-color: #cc9979;
            z-index: 1;
          }
        }
      }
    }
  }
  .restaurant-seat {
    height: 45rem;
    margin: 0 auto;
    background-color: #ffd24d;
    border: 1.3rem solid #fff;
    border-radius: 4rem;
    width: 70rem;
    display: flex;
    flex-wrap: wrap;
    padding: 3.5rem;
    .seat-box {
      width: 50%;
      padding-left: 5rem;
      margin-bottom: 1rem;
      position: relative;
      .seat {
        @extend .head-img;
        &.empty {
          @include linear-gradientTwo(#aaa, #ddd, left);
        }
        &.wait {
          @include linear-gradientTwo(#ff2626, #b20000, right);
        }
        &.eat {
          @include linear-gradientTwo(#ff9122, #d96d00, right);
        }
        &.pay {
          @include linear-gradientTwo(#80ff00, #00b200, right);
        }
        &.cancel {
          @include linear-gradientTwo(#661a00, #401000, right);
        }
      }
      .seat-dishes {
        position: absolute;
        top: 0;
        left: 15rem;
        .seat-dishes-progress {
          width: 14rem;
          border-radius: 0.5rem;
          border: 0.5rem solid #fff;
          height: 4rem;
          font-size: 2.4rem;
          line-height: 3rem;
          color: #fff;
          text-align: center;
          &.seat-dishes-wait {
            position: relative;
            z-index: 9;
            .seat-wait-finish {
              position: absolute;
              top: -0.5rem;
              right: -4.5rem;
              width: 4rem;
              height: 4rem;
              border-radius: 50%;
              border: 0.5rem solid #fff;
              @include linear-gradientTwo(#ff2626, #b20000, right);
              z-index: 10;
              img {
                width: 5rem;
                height: 5rem;
                transform: translate(-1rem, -1rem);
              }
            }
          }
          &.seat-dishes-cancel {
            text-decoration: line-through;
          }
          &:not(:last-child) {
            margin-bottom: 0.3rem;
          }
        }
      }
      .seat-appease,
      .seat-pay-icon {
        position: absolute;
        width: 8rem;
        height: 8rem;
        top: 7rem;
        left: 3rem;
      }
    }
  }
  .restaurant-queue {
    position: absolute;
    bottom: 4rem;
    right: 3rem;
    display: flex;
    justify-content: flex-end;
    .queue-box {
      position: relative;
      &:not(:first-child) {
        margin-left: -3rem;
      }
      .queue {
        @extend .head-img;
        @include linear-gradientTwo(#2693ff, #006dd9, right);
      }
      .wait-progress {
        position: absolute;
        left: 0;
        width: 100%;
        border-radius: 0.5rem;
        border: 0.5rem solid #fff;
        height: 4rem;
        bottom: -2rem;
        font-size: 2.4rem;
        line-height: 3rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
