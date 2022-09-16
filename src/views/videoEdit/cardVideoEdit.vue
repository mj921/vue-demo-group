<template>
  <div class="video-edit">
    <div class="video-create-mask" v-show="creating"></div>
    <div class="video-edit-wrap" @click="showTipMask">
      <div class="video-edit-sync" @click.stop="syncCardData">
        <!-- <uni-icons type="loop" size="28px" color="#476DFF" /> -->
        <span>一键同步</span>
      </div>
      <div class="video-edit-content">
        <div
          class="video-prev"
          :style="{ visibility: pageIndex === 0 ? 'hidden' : 'visible' }"
          @click="prevPage"
        >
          <!-- <uni-icons type="back" size="32px" color="#BFBFBF" /> -->
        </div>
        <div class="video-currpage">
          <template
            v-for="(item, index) in tempVideo.pages[pageIndex].elements"
          >
            <template v-if="item.type === 'text'">
              <span
                :style="{
                  position: 'absolute',
                  width: item.width / 10 + 'rem',
                  height: item.height / 10 + 'rem',
                  lineHeight: (item.lineHeight || item.fontSize) / 10 + 'rem',
                  verticalAlign: 'top',
                  left: item.x / 10 + 'rem',
                  top: item.y / 10 + 'rem',
                  fontSize: item.fontSize / 10 + 'rem',
                  fontWeight: item.fontWeight,
                  textAlign: item.textAlign,
                  color: item.color,
                  whiteSpace: item.wrapFlag ? 'wrap' : 'nowrap',
                  overflow: 'hidden',
                }"
                :key="item.elKey"
                @click.stop="inputText(index)"
                >{{ item.value }}</span
              >
            </template>
            <div
              v-if="item.type === 'image'"
              :key="item.elKey"
              :style="{
                position: 'absolute',
                width: item.width / 10 + 'rem',
                height: item.height / 10 + 'rem',
                left: item.x / 10 + 'rem',
                top: item.y / 10 + 'rem',
                overflow: 'hidden',
              }"
              scale-area
              @click.stop
            >
              <div
                :x="item.moveX"
                :y="item.moveY"
                :animation="false"
                :style="{
                  width: item.imgWidht / 10 + 'rem',
                  height: item.imgHeight / 10 + 'rem',
                }"
                :scale-value="item.scale"
                scale
                out-of-bounds
                direction="all"
                @change="
                  imageMove($event, tempVideo.pages[pageIndex].elements[index])
                "
                @scale="
                  imageScale($event, tempVideo.pages[pageIndex].elements[index])
                "
              >
                <img
                  :src="item.value"
                  :style="{
                    width: item.imgWidht / 10 + 'rem',
                    height: item.imgHeight / 10 + 'rem',
                  }"
                  @click="
                    uploadImage(tempVideo.pages[pageIndex].elements[index])
                  "
                />
              </div>
            </div>
          </template>
          <div v-show="tipShow">
            <template
              v-for="(item, index) in tempVideo.pages[pageIndex].elements"
            >
              <div
                class="tip-mask"
                :style="{
                  position: 'absolute',
                  width: item.width / 10 + 'rem',
                  height: item.height / 10 + 'rem',
                  left: item.x / 10 + 'rem',
                  top: item.y / 10 + 'rem',
                }"
                :class="{
                  'tip-mask-animate': tipShow,
                }"
                :key="index"
              ></div>
            </template>
          </div>
          <div class="video-create-animate" v-show="creating">
            <div class="video-create-progress">
              {{ createProgress > 100 ? 100 : createProgress.toFixed(0) }}%
            </div>
            <div class="video-create-text">合成中，请勿退出或锁屏</div>
            <div class="video-create-cancel" @click="cancelCreate(false)">
              取消
            </div>
            <div
              class="video-create-top"
              :style="{
                width: `${
                  createProgress > 32 ? 100 : (createProgress / 32) * 100
                }%`,
              }"
            ></div>
            <div
              class="video-create-right"
              :style="{
                height: `${
                  createProgress > 50 ? 100 : ((createProgress - 32) / 18) * 100
                }%`,
              }"
            ></div>
            <div
              class="video-create-bottom"
              :style="{
                width: `${
                  createProgress > 82 ? 100 : ((createProgress - 50) / 32) * 100
                }%`,
              }"
            ></div>
            <div
              class="video-create-left"
              :style="{
                height: `${
                  createProgress > 100
                    ? 100
                    : ((createProgress - 82) / 18) * 100
                }%`,
              }"
            ></div>
          </div>
        </div>
        <div
          class="video-next"
          :style="{
            visibility:
              pageIndex < tempVideo.pages.length - 1 ? 'visible' : 'hidden',
          }"
        >
          <!-- <uni-icons
            type="forward"
            size="32px"
            @click="nextPage"
            color="#BFBFBF"
          /> -->
        </div>
      </div>
    </div>
    <div class="video-preview">
      <div class="video-preview-btn" @click="preview(false)">
        <div class="video-preview-btn-icon"></div>
        <div class="video-preview-btn-text">预览</div>
      </div>
      <div
        class="video-preview-scroll"
        scroll-x
        :scroll-into-view="scrollIntoViewId"
      >
        <div
          class="video-preview-pages"
          :style="{ width: `${16.4 * tempVideo.pages.length - 16}rem` }"
        >
          <div
            class="video-preview-page"
            :class="{ 'video-preview-page--active': pageIndex === pIndex }"
            v-for="(page, pIndex) in tempVideo.pages"
            :key="page.pageKey"
            :id="page.pageKey"
            @click="selectPage(pIndex)"
          >
            <div class="video-preview-page-box">
              <template v-for="item in page.elements">
                <span
                  v-if="item.type === 'text'"
                  :style="{
                    position: 'absolute',
                    width: item.width / 10 + 'rem',
                    height: item.height / 10 + 'rem',
                    lineHeight: (item.lineHeight || item.fontSize) / 10 + 'rem',
                    verticalAlign: 'top',
                    left: item.x / 10 + 'rem',
                    top: item.y / 10 + 'rem',
                    fontSize: item.fontSize / 10 + 'rem',
                    fontWeight: item.fontWeight,
                    textAlign: item.textAlign,
                    color: item.color,
                    whiteSpace: item.wrapFlag ? 'wrap' : 'nowrap',
                    overflow: 'hidden',
                  }"
                  :key="item.elKey"
                  >{{ item.value }}</span
                >
                <div
                  v-if="item.type === 'image'"
                  :key="item.elKey"
                  :style="{
                    position: 'absolute',
                    width: item.width / 10 + 'rem',
                    height: item.height / 10 + 'rem',
                    left: item.x / 10 + 'rem',
                    top: item.y / 10 + 'rem',
                    overflow: 'hidden',
                  }"
                  scale-area
                >
                  <div
                    :x="item.tempMoveX"
                    :y="item.tempMoveY"
                    :style="{
                      width: item.imgWidht / 10 + 'rem',
                      height: item.imgHeight / 10 + 'rem',
                    }"
                    :scale-value="item.tempScale"
                    scale
                    out-of-bounds
                    disabled
                    direction="all"
                    :animation="false"
                  >
                    <img
                      :id="`img${item.elKey}`"
                      :src="item.value"
                      :style="{
                        width: item.imgWidht / 10 + 'rem',
                        height: item.imgHeight / 10 + 'rem',
                      }"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="video-preview-page-time">
            <span>00:00</span>
            <div class="video-preview-page-time-line"></div>
            <span>00:{{ tempVideo.time }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="video-btns">
      <div class="text-btn" @click="bottomBack">返回</div>
      <div class="primary-btn" @click="save">保存</div>
    </div>
    <!-- <uni-popup ref="textInputPopup" type="bottom" :safe-area="false">
      <div class="text-input-popup">
        <div class="text-input-popup--header">
          <div class="text-input-popup--cancel" @click="inputTextCancel">
            取消
          </div>
          <div class="text-input-popup--title">编辑</div>
          <div class="text-input-popup--confirm" @click="inputTextConfirm">
            确定
          </div>
        </div>
        <div class="text-input-popup--body">
          <spanarea
            class="text-input-popup-textarea"
            v-model="currInputText"
            fixed
            :cursor-spacing="200"
            :show-confirm-bar="false"
          ></textarea>
        </div>
      </div>
    </uni-popup> -->
    <video
      v-if="creating || bgVideoLoaded"
      :src="tempVideo.bg"
      ref="bgVideo"
      class="video-edit-bg"
      @loadedmetadata="bgVideoLoadedmetadata"
    ></video>
    <video :src="videoUrl" controls></video>
    <canvas ref="bgCanvas"></canvas>
  </div>
</template>
<!-- eslint-disable no-unused-vars -->
<script>
// import { createScopedThreejs } from "threejs-miniprogram";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
// import ossUpload from "@/utils/ossUpload";
import config from "./cardVideoEditConfig";
// import { saveCard, cardDetails, getUserTempCard, editCard } from "@/apis";
let camera = null;
let scene = null;
let renderer = null;
let bgMesh = null;
let bgCanvas = null;
let videoData = [];
export default {
  name: "VideoEdit",
  data() {
    const tempVideo = JSON.parse(JSON.stringify(config));
    tempVideo.pages.forEach((page, pIndex) => {
      page.pageKey = `page-${pIndex}`;
      page.elements.forEach((el, index) => {
        el.elKey = `el-${pIndex}-${index}`;
        if (el.type === "image") {
          el.tempMoveX = el.moveX;
          el.tempMoveY = el.moveY;
          el.tempScale = el.scale;
        }
      });
    });
    return {
      scrollIntoViewId: "",
      tipShow: false,
      pageIndex: 0,
      tempVideo,
      sto: null,
      time: 0,
      currInputText: "",
      currInputTextIndex: -1,
      createProgress: 0,
      creating: false,
      bgVideoLoaded: false,
      tempFilePath: "",
      fps: 30,
      recorder: null,
      bgVideo: null,
      statusBarHeight: 25,
      videoInfo: null,
      videoScale: 1,
      loading: false,
      videoTime: 0,
      textureList: [],
      pageType: "add",
      cardId: null,
      cardData: {},
      recorderStart: false,
      createTemp: null,
      pixelRatio: 1,
      imgCache: {},
      bgCtx: null,
      videoUrl: "",
    };
  },
  onLoad({ pageType = "add", cardId = null }) {
    // const { statusBarHeight, pixelRatio } = uni.getSystemInfoSync();
    // this.statusBarHeight = statusBarHeight;
    // this.pixelRatio = pixelRatio;
    this.pageType = pageType;
    this.cardId = cardId;
    this.getCardData().then(() => {
      if (this.pageType === "add") {
        this.updateData();
      } else {
        if (!this.cardData.videoJson) {
          this.updateData();
        } else if (/^https?:\/\//.test(this.cardData.videoJson)) {
          // const fs = uni.getFileSystemManager();
          // uni.downloadFile({
          //   url: this.cardData.videoJson,
          //   success: ({ tempFilePath }) => {
          //     try {
          //       const arrayBuffer = fs.readFileSync(tempFilePath);
          //       const json = decodeURIComponent(
          //         escape(
          //           String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
          //         )
          //       );
          //       this.tempVideo = JSON.parse(json);
          //       this.initPages();
          //     } catch (error) {
          //       this.updateData();
          //     }
          //   },
          // });
        } else {
          try {
            this.tempVideo = JSON.parse(this.cardData.videoJson);
            this.initPages();
          } catch (error) {
            this.updateData();
          }
        }
      }
    });
  },
  mounted() {
    this.initPages().finally(() => {
      this.showTipMask();
    });
  },
  computed: {
    durationFmt() {
      if (!this.videoInfo) return "00 : 00";
      const duration = this.videoInfo.duration;
      return `${this.addZero(Math.floor(duration / 60))}:${this.addZero(
        duration % 60
      )}`;
    },
  },
  methods: {
    async getCardData() {
      // if (this.cardId) {
      //   const res = await cardDetails({
      //     cardId: this.cardId,
      //   });
      //   this.cardData = res.data || {};
      //   return this.cardData;
      // } else {
      //   const res = await getUserTempCard();
      //   this.cardData = res.data || {};
      //   return this.cardData;
      // }
    },
    /** 数据回填 */
    syncCardData() {
      this.getCardData().then(() => {
        this.updateData();
      });
    },
    updateData() {
      this.tempVideo.pages.forEach((page, pIndex) => {
        page.pageKey = `page-${pIndex}`;
        page.elements.forEach((el, index) => {
          if (el.dataKey && this.cardData[el.dataKey]) {
            el.value = this.cardData[el.dataKey];
          }
          if (el.getDataArr) {
            let str = "";
            el.getDataArr.forEach((item) => {
              if (this.cardData[item.checkKey]) {
                str += item.text.replace(/#\{([^}]+)\}/g, ($1, $2) => {
                  return this.cardData[$2] || "";
                });
              }
            });
            el.value = str;
          } else if (el.getData) {
            el.value = el.getData.replace(/#\{([^}]+)\}/g, ($1, $2) => {
              return this.cardData[$2] || "";
            });
          }
        });
        this.initPages();
      });
    },
    addZero(n) {
      return `0${n}`.slice(-2);
    },
    /** 初始化编辑页 */
    initPages() {
      const promises = [];
      this.tempVideo.pages.forEach((page) => {
        page.elements.forEach((el) => {
          if (el.type === "image") {
            promises.push(
              new Promise((resolve) => {
                // uni.downloadFile({
                //   url: el.value,
                //   success: (result) => {
                //     uni.getImageInfo({
                //       src: result.tempFilePath,
                //       success: (res) => {
                //         if (el.width / el.height > res.width / res.height) {
                //           el.imgWidht = el.width;
                //           el.imgHeight = (el.width * res.height) / res.width;
                //         } else {
                //           el.imgWidht = (res.width / res.height) * el.height;
                //           el.imgHeight = el.height;
                //         }
                //         el.imgInfo = res;
                //         resolve(res);
                //       },
                //     });
                //   },
                // });
              })
            );
          }
        });
      });
      return Promise.allSettled(promises);
    },
    /** 取消视频生成 */
    async cancelCreate(finish = false) {
      if (this.recorder && this.recorderStart) {
        this.recorderStart = false;
        if (finish !== true) {
          this.recorder.stop();
        }
        // this.recorder.destroy();
        this.recorder = null;
      }
      if (!finish) {
        this.saving = false;
      }
      if (this.sto) {
        clearTimeout(this.sto);
        this.sto = null;
      }
      this.allElements = [];
      scene = null;
      camera = null;
      renderer = null;
      this.creating = false;
      this.createProgress = 0;
    },
    /** 页面切换 */
    selectPage(index) {
      if (this.pageIndex === index) return;
      this.tempVideo.pages[this.pageIndex].elements.forEach((el) => {
        if (el.type === "image") {
          el.moveX = el.tempMoveX;
          el.moveY = el.tempMoveY;
          el.scale = el.tempScale;
        }
      });
      this.pageIndex = index;
      this.$nextTick(() => {
        this.showTipMask();
      });
    },
    /** 展示可编辑区域 */
    showTipMask() {
      if (this.creating) return;
      this.tipShow = true;
      setTimeout(() => {
        this.tipShow = false;
      }, 1000);
    },
    /** 上一页 */
    prevPage() {
      if (this.pageIndex > 0) {
        this.selectPage(this.pageIndex - 1);
      }
    },
    /** 下一页 */
    nextPage() {
      if (this.pageIndex < this.tempVideo.pages.length - 1) {
        this.selectPage(this.pageIndex + 1);
      }
    },
    /** 打开输入框 */
    inputText(index) {
      this.currInputTextIndex = index;
      this.currInputText = this.tempVideo.pages[this.pageIndex].elements[
        index
      ].value;
      this.$refs.textInputPopup.open();
    },
    /** 文字输入取消 */
    inputTextCancel() {
      this.currInputTextIndex = -1;
      this.currInputText = "";
      this.$refs.textInputPopup.close();
    },
    /** 文字输入确定 */
    inputTextConfirm() {
      this.$set(
        this.tempVideo.pages[this.pageIndex].elements[this.currInputTextIndex],
        "value",
        this.currInputText
      );
      this.currInputTextIndex = -1;
      this.currInputText = "";
      this.$refs.textInputPopup.close();
    },
    /** 监听图片移动事件 */
    imageMove(event, item) {
      const { x = 0, y = 0 } = event.detail || {};
      item.tempMoveX = x;
      item.tempMoveY = y;
    },
    /** 监听图片缩放事件 */
    imageScale(event, item) {
      const { scale = 1, x, y } = event.detail || {};
      item.tempScale = scale;
      item.tempMoveX = x;
      item.tempMoveY = y;
    },
    /** 上传图片 */
    uploadImage(item) {
      // uni.chooseMedia({
      //   mediaType: ["image"],
      //   success: (uploadRes) => {
      //     item.value = uploadRes.tempFiles[0].tempFilePath;
      //     uni.getImageInfo({
      //       src: uploadRes.tempFiles[0].tempFilePath,
      //       success: (res) => {
      //         if (item.width / item.height > res.width / res.height) {
      //           item.imgWidht = item.width;
      //           item.imgHeight = (item.width * res.height) / res.width;
      //         } else {
      //           item.imgWidht = (res.width / res.height) * item.height;
      //           item.imgHeight = item.height;
      //         }
      //         item.imgInfo = res;
      //       },
      //     });
      //     item.scale = 1;
      //     item.moveX = 0;
      //     item.moveY = 0;
      //   },
      // });
    },
    /** 预览 */
    async preview(saveFlag = false) {
      this.createTemp = JSON.parse(JSON.stringify(this.tempVideo));
      this.tempFilePath = "";
      this.creating = true;
      this.$nextTick(async () => {
        // const bgCanvas = document.createElement("canvas");
        const bgCanvas = this.$refs.bgCanvas;
        console.log("loadResource");
        await this.loadResource();
        console.log("loadResourceend");
        bgCanvas.width = this.tempVideo.width * this.videoScale;
        bgCanvas.height = this.tempVideo.height * this.videoScale;
        this.bgCtx = bgCanvas.getContext("2d");
        // this.bgCtx.drawImage(
        //   this.bgVideo,
        //   0,
        //   0,
        //   this.videoInfo.width,
        //   this.videoInfo.height,
        //   0,
        //   0,
        //   this.tempVideo.width * this.videoScale,
        //   this.tempVideo.height * this.videoScale
        // );
        // const canvasData = bgCanvas.toDataURL("image/jpeg");
        // const texture = await new Promise((resolve) => {
        //   new THREE.TextureLoader().load(canvasData, (texture) => {
        //     texture.minFilter = THREE.LinearFilter;
        //     resolve(texture);
        //   });
        // });
        // bgMesh = new THREE.Mesh(
        //   new THREE.PlaneGeometry(
        //     this.tempVideo.width * this.videoScale,
        //     this.tempVideo.height * this.videoScale
        //   ),
        //   new THREE.MeshBasicMaterial({ map: texture, transparent: true })
        // );
        // bgMesh.position.z = 0;
        // camera = new THREE.OrthographicCamera(
        //   this.tempVideo.width / -2,
        //   this.tempVideo.width / 2,
        //   this.tempVideo.height / 2,
        //   this.tempVideo.height / -2,
        //   0.1,
        //   1000
        // );
        // scene = new THREE.Scene();
        // scene.add(bgMesh);

        // camera.position.z = 999;
        // renderer = new THREE.WebGLRenderer({ alpha: true });
        // renderer.setSize(
        //   this.tempVideo.width * this.videoScale,
        //   this.tempVideo.height * this.videoScale
        // );
        // renderer.setPixelRatio(this.pixelRatio);
        // renderer.render(scene, camera);
        this.recorder = new MediaRecorder(bgCanvas.captureStream(), {
          mimetype: "video/webm",
        });
        await this.drawPageInit();
        if (!this.tempFilePath) {
          this.createProgress = 100;
          this.cancelCreate(true);
          return;
        }
        if (saveFlag) {
          this.saveData().finally(() => {
            this.createProgress = 100;
            this.cancelCreate(true);
            this.saving = false;
          });
        } else {
          this.createProgress = 100;
          this.cancelCreate(true);
          // uni.navigateTo({
          //   url: `/pageVideoEdit/cardVideoPreview/cardVideoPreview?videoPath=${this.tempFilePath}`,
          // });
        }
      });
    },
    /** 把文字生成 base64 图片 */
    createText({
      text,
      fontSize,
      color,
      width,
      height,
      lineHeight,
      textAlign = "left",
      fontWeight = 400,
      wrapFlag = false,
      backgroundColor,
      padding,
    }) {
      const offScreenCanvas = document.createElement("canvas");
      offScreenCanvas.width = width * this.videoScale;
      offScreenCanvas.height = height * this.videoScale;
      const ctx = offScreenCanvas.getContext("2d");
      ctx.clearRect(0, 0, width * this.videoScale, height * this.videoScale);
      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.font = `${fontWeight} ${fontSize * this.videoScale}px Arial`;
      ctx.lineWidth = 1;
      ctx.fillStyle = color;
      ctx.textAlign = textAlign;
      ctx.textBaseline = "middle";
      const fillText = (text, y) => {
        let textX = 0;
        let textY = y;
        switch (textAlign) {
          case "center":
            if (padding) {
              textX = (width - padding[1] - padding[3]) / 2 + padding[3];
              textY = y + padding[0];
            } else {
              textX = width / 2;
            }
            ctx.fillText(text, textX, textY);
            break;
          case "right":
            if (padding) {
              textX = width - padding[1] - padding[3] + padding[3];
              textY = y + padding[0];
            } else {
              textX = width;
            }
            ctx.fillText(text, textX, textY);
            break;
          default:
            if (padding) {
              textX = padding[3];
              textY = y + padding[0];
            } else {
              textX = 0;
            }
            ctx.fillText(text, textX, textY);
            break;
        }
      };
      if (wrapFlag) {
        if (typeof lineHeight !== "number") {
          lineHeight = fontSize * this.videoScale;
        }
        const num = Math.max(1, Math.floor(width / fontSize));
        const textList = text.split("\n");
        for (let j = 0, lineNum = 0; j < textList.length; j++) {
          let tempText = textList[j];
          for (let i = 0; i < tempText.length; i += num, lineNum++) {
            if (i + num < tempText.length - 1) {
              let j = 1;
              while (
                ctx.measureText(tempText.substr(i, num + j)).width <
                  width * this.videoScale &&
                i + num + j < tempText.length - 1
              ) {
                j++;
              }
              fillText(
                tempText.substr(i, num + j - 1),
                (lineNum * lineHeight + lineHeight / 2) * this.videoScale
              );
              i += j - 1;
            } else {
              fillText(
                tempText.substring(i, tempText.length),
                (lineNum * lineHeight + lineHeight / 2) * this.videoScale
              );
            }
          }
        }
      } else {
        fillText(text, (height / 2) * this.videoScale);
      }
      return offScreenCanvas;
    },
    /** 视频加载完成 */
    bgVideoLoadedmetadata(event) {
      this.videoInfo = event.detail || {};
      this.bgVideoLoaded = true;
      this.$emit("bgVideoLoadedmetadata");
    },
    /** 加载资源 */
    loadResource() {
      const promises = [
        new Promise((resolve) => {
          if (this.bgVideoLoaded) {
            resolve();
          } else {
            this.$on("bgVideoLoadedmetadata", resolve);
          }
        }),
      ];
      this.createTemp.pages.forEach((item) => {
        item.elements.forEach((el, index) => {
          if (el.type === "image") {
            const p = new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = el.value;
              el.img = img;
            });
            promises.push(p);
          } else if (el.type === "text") {
            promises.push(
              new Promise((resolve) => {
                const {
                  value: text,
                  fontSize,
                  color,
                  width,
                  height,
                  wrapFlag = false,
                  textAlign = "left",
                  fontWeight = 400,
                  padding,
                  backgroundColor,
                } = el;
                el.textImg = this.createText({
                  text,
                  fontSize,
                  color,
                  width,
                  height,
                  wrapFlag,
                  textAlign,
                  fontWeight,
                  padding,
                  backgroundColor,
                });
                resolve();
              })
            );
          }
        });
      });
      return Promise.all(promises).catch(console.log);
    },
    /** 加载一秒视频图片纹理 */
    async loadVideoTexture() {
      this.bgVideo.seek(this.videoTime);
      this.bgVideo.play();
      const ctx = bgCanvas.getContext("2d");
      ctx.clearRect(
        0,
        0,
        this.tempVideo.width * this.videoScale,
        this.tempVideo.height * this.videoScale
      );
      const textureList = [];
      const promises = [];
      let i = 0;
      const loadLoop = async () => {
        if (!this.creating) return;
        const now = new Date();
        ctx.drawImage(
          this.bgVideo,
          0,
          0,
          this.videoInfo.width,
          this.videoInfo.height,
          0,
          0,
          this.tempVideo.width * this.videoScale,
          this.tempVideo.height * this.videoScale
        );
        const canvasData = bgCanvas.toDataURL();
        promises.push(
          new Promise((resolve) => {
            let ii = i;
            const tu = new THREE.TextureLoader().load(
              canvasData,
              (texture) => {
                try {
                  texture.minFilter = THREE.LinearFilter;
                  textureList[ii] = texture;
                  resolve(texture);
                } catch (error) {
                  console.log(error);
                  resolve(texture);
                }
              },
              undefined,
              (err) => {
                console.log("texture err", err);
              }
            );
            // setTimeout(() => {
            //   tu.minFilter = THREE.LinearFilter;
            //   textureList[ii] = tu;
            //   resolve(tu)
            // }, 1000)
          })
        );
        this.createProgress =
          ((this.time + this.videoTime * 1000 + (i / this.fps) * 1000) /
            (this.tempVideo.time * 2000)) *
          99;
        if (++i < this.fps) {
          await new Promise((resolve) => {
            this.sto = setTimeout(() => {
              loadLoop().then(resolve);
            }, Math.max(0, 2000 / this.fps - (new Date() - now)));
          });
        } else {
          this.bgVideo.pause();
          await Promise.allSettled(promises);
          this.textureList = textureList;
        }
      };
      await loadLoop();
      console.log("loadVideoTextureend");
      this.videoTime++;
    },
    /** 绘制初始化 */
    async drawPageInit() {
      console.log("drawPageInit");
      this.time = 0;
      this.videoTime = 0;
      this.createProgress = 5;
      this.allElements = [];
      // this.createTemp.pages.forEach((item) => {
      //   item.elements.forEach((el, index) => {
      //     const obj = {
      //       ...el,
      //     };
      //     this.allElements.push(obj);
      //     if (obj.animateConfig) {
      //       obj.animateConfig = obj.animateConfig.map((config) => {
      //         return JSON.parse(JSON.stringify(config));
      //       });
      //     }
      //     if (el.type === "image") {
      //       const imgGeometry = new THREE.PlaneGeometry(el.width, el.height);
      //       const imgMaterial = new THREE.MeshBasicMaterial({
      //         map: el.img,
      //         transparent: true,
      //       });
      //       const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
      //       imgMesh.position.x = this.setX(el.x, el.width);
      //       imgMesh.position.y = this.setY(el.y, el.height);
      //       imgMesh.position.z = this.allElements.length;
      //       obj.mesh = imgMesh;
      //     } else if (el.type === "text") {
      //       const textGeometry = new THREE.PlaneGeometry(el.width, el.height);
      //       const textMaterial = new THREE.MeshBasicMaterial({
      //         map: el.textImg,
      //         transparent: true,
      //       });
      //       const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      //       textMesh.position.x = this.setX(el.x, el.width);
      //       textMesh.position.y = this.setY(el.y, el.height);
      //       textMesh.position.z = this.allElements.length;
      //       obj.mesh = textMesh;
      //     }
      //   });
      // });
      console.log("loadVideoTexture");
      // await this.loadVideoTexture();
      this.drawPage(true);
      console.log(this.recorder);
      this.recorder.onstart = () => {
        console.log("onstart");
      };
      this.recorder.start();
      this.recorderStart = true;
      // if (!this.creating) {
      //   this.recorderStart = false;
      //   this.recorder.stop();
      //   // this.recorder.destroy();
      //   this.recorder = null;
      // }
      // this.recorder.pause();
      this.$refs.bgVideo.play();
      await this.draw();
    },
    /** 设置元素x */
    setX(x, width) {
      return (-this.tempVideo.width / 2 + x + width / 2) * this.videoScale;
    },
    /** 设置元素y */
    setY(y, height) {
      return (this.tempVideo.height / 2 - y - height / 2) * this.videoScale;
    },
    /** 绘制页面 */
    drawPage(first) {
      console.log("drawPage");
      // const texture = this.textureList.shift();
      // if (texture) {
      //   bgMesh.material = new THREE.MeshBasicMaterial({
      //     map: texture,
      //     transparent: true,
      //   });
      // }
      TWEEN.update(this.time);
      this.bgCtx.drawImage(
        this.$refs.bgVideo,
        0,
        0,
        this.tempVideo.width,
        this.tempVideo.height
      );
      this.allElements.forEach((el, i) => {
        if (el.type === "image") {
          this.bgCtx.drawImage(el.img, el.x, el.y, el.width, el.height);
        } else {
          this.bgCtx.drawImage(el.textImg, el.x, el.y, el.width, el.height);
        }
        // if (
        //   !el.addFlag &&
        //   this.time >= el.startTime &&
        //   this.time < el.endTime
        // ) {
        //   scene.add(el.mesh);
        //   el.addFlag = true;
        // } else if (el.addFlag && this.time >= el.endTime) {
        //   scene.remove(el.mesh);
        //   el.addFlag = false;
        // }
        // (el.animateConfig || []).forEach((config) => {
        //   if (
        //     config.list.length === 0 ||
        //     (config.list[0].startTime > this.time && !first)
        //   )
        //     return;
        //   if (
        //     (config.tweenId === null || config.tweenId === undefined) &&
        //     config.list.length &&
        //     config.list[0].startTime <= this.time
        //   ) {
        //     const tween = new TWEEN.Tween(config.start)
        //       .to({ value: config.list[0].end }, config.list[0].time)
        //       .easing(
        //         config.list[0].easing
        //           ? TWEEN.Easing[config.list[0].easing[0]][
        //               config.list[0].easing[1]
        //             ]
        //           : TWEEN.Easing.Linear.None
        //       )
        //       .start(this.time)
        //       .onComplete(() => {
        //         config.list.shift();
        //         config.tweenId = null;
        //       });
        //     config.tweenId = tween.getId();
        //   }
        //   switch (config.type) {
        //     case "left":
        //       el.mesh.position.x = this.setX(
        //         el.x + config.start.value,
        //         el.width
        //       );
        //       break;
        //     case "top":
        //       el.mesh.position.y = this.setY(
        //         el.y + config.start.value,
        //         el.height
        //       );
        //       break;
        //     case "opacity":
        //       el.mesh.material.opacity = config.start.value;
        //       break;
        //     case "scaleX":
        //       if (config.start.value === 0) {
        //         el.mesh.visible = false;
        //         el.scaleHiddenX = true;
        //       } else {
        //         el.scaleHiddenX = false;
        //         if (el.scaleHiddenY !== true) {
        //           el.mesh.visible = true;
        //           el.mesh.scale.x = config.start.value;
        //         }
        //       }
        //       break;
        //     case "scaleY":
        //       if (config.start.value === 0) {
        //         el.mesh.visible = false;
        //         el.scaleHiddenY = true;
        //       } else {
        //         el.scaleHiddenY = false;
        //         if (el.scaleHiddenX !== true) {
        //           el.mesh.visible = true;
        //           el.mesh.scale.y = config.start.value;
        //         }
        //       }
        //       break;
        //     case "rotate":
        //       el.mesh.rotation.z = (config.start.value / 180) * Math.PI;
        //       break;
        //   }
        // });
      });
      // renderer.render(scene, camera);
    },
    /** 循环绘制 */
    async draw() {
      console.log("draw");
      this.recorder.resume();
      const p = new Promise((resolve) => {
        this.recorder.onstop = () => {
          console.log("stop");
          resolve();
        };
      });
      this.recorder.ondataavailable = (e) => {
        console.log(e, "ondataavailable");
        videoData.push(e.data);
      };
      while (this.time < this.tempVideo.time * 1000) {
        if (!this.recorderStart) return;
        await new Promise((resolve) => {
          setTimeout(resolve, 1000 / 16);
        });
        this.time += 1000 / this.fps;
        this.drawPage();
        this.createProgress =
          ((this.time + this.videoTime * 1000) / (this.tempVideo.time * 2000)) *
          99;
        // if (this.time >= this.videoTime * 1000) {
        //   await this.loadVideoTexture();
        // }
      }
      this.recorder.stop();
      await p;
      const blob = new Blob(videoData, { type: "video/webm" });
      console.log(videoData, blob);
      const url = URL.createObjectURL(blob);
      console.log(url);
      this.videoUrl = url;
      // const mc = uni.createMediaContainer();
      // const extractDataSource = (source) =>
      //   new Promise((resolve) => {
      //     mc.extractDataSource({
      //       source,
      //       success: resolve,
      //     });
      //   });
      // const result = await new Promise((resolve) => {
      //   uni.downloadFile({
      //     url: this.tempVideo.bgAudio,
      //     success: resolve,
      //   });
      // });
      // const audioRes = await extractDataSource(result.tempFilePath);
      // mc.addTrack(audioRes.tracks[0]);
      // const videoRes = await extractDataSource(tempFilePath);
      // mc.addTrack(videoRes.tracks[0]);
      // const expRes = await new Promise((resolve) => {
      //   mc.export({
      //     success: resolve,
      //   });
      // });
      // this.tempFilePath = expRes.tempFilePath;
    },
    /** 保存按钮 */
    save() {
      console.log(this.saving);
      if (this.saving) return;
      this.saving = true;
      this.preview(true);
    },
    /** 保存数据 */
    async saveData() {
      // const fs = uni.getFileSystemManager();
      // const jsonFilePath = `${
      //   wx.env.USER_DATA_PATH
      // }/${new Date().getTime()}_${Math.floor(Math.random() * 100)}.json`;
      // const promises = [];
      // this.tempVideo.pages.forEach((page) => {
      //   page.elements.forEach((el) => {
      //     if (
      //       el.type === "image" &&
      //       el.value &&
      //       !/^https?:\/\//.test(el.value)
      //     ) {
      //       promises.push(
      //         ossUpload(el.value).then(({ url }) => {
      //           el.value = url;
      //         })
      //       );
      //     }
      //   });
      // });
      // await Promise.all(promises);
      // fs.writeFileSync(jsonFilePath, JSON.stringify(this.tempVideo));
      // const { url: videoUrl } = await ossUpload(this.tempFilePath);
      // const { url: videoJson } = await ossUpload(jsonFilePath);
      // const data = {
      //   ...this.cardData,
      //   videoUrl,
      //   videoJson,
      // };
      // if (this.cardId) {
      //   data.cardId = this.cardId;
      // }
      // if (this.cardId) {
      //   await editCard(data).then(() => {
      //     uni.navigateTo({
      //       url: `/pages/details/index?type=edit&cardId=${this.cardId}`,
      //     });
      //   });
      // } else {
      //   await saveCard(data).then(() => {
      //     uni.switchTab({
      //       url: "/pages/index/index",
      //     });
      //   });
      // }
    },
    topBack() {
      // if (this.pageType === "add") {
      //   uni.switchTab({
      //     url: "/pages/index/index",
      //   });
      // } else {
      //   uni.navigateBack();
      // }
    },
    bottomBack() {
      // uni.navigateBack();
    },
  },
  beforeDestroy() {
    clearTimeout(this.sto);
    if (this.recorder) {
      // this.recorder.destroy();
    }
  },
};
</script>
<style scoped lang="scss" src="./cardVideoEdit.scss"></style>
