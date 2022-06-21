const express = require("express");
const fs = require("fs");
const pinyin = require("pinyin");

module.exports = {
  devServer: {
    port: 3008,
    before(app) {
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      // 分类查询
      app.get("/api/creation/category", (req, res) => {
        const category = require("./localData/creation/category.json");
        let data = req.query.search
          ? category.filter((item) => item.includes(req.query.search))
          : category;
        res.json({
          success: true,
          data,
        });
      });
      // 添加分类
      app.post("/api/creation/category", (req, res) => {
        const category = req.body.category;
        if (category) {
          const data = require("./localData/creation/category.json");
          if (data.includes(category)) {
            res.json({
              success: false,
              data: false,
              message: "分类已存在",
            });
          } else {
            data.push(category);
            fs.writeFileSync(
              "./localData/creation/category.json",
              JSON.stringify(data)
            );
            res.json({
              success: true,
              data: true,
              message: "添加成功",
            });
          }
        } else {
          res.json({
            success: false,
            data: false,
            message: "分类不能为空",
          });
        }
      });
      // 物品查询
      app.get("/api/creation/goods", (req, res) => {
        const goods = require("./localData/creation/goods.json");
        let data = req.query.search
          ? goods.filter((item) => item.name.includes(req.query.search))
          : goods;
        res.json({
          success: true,
          data,
        });
      });
      // 添加物品
      app.post("/api/creation/goods", (req, res) => {
        const { name, category, prop } = req.body;
        if (name) {
          const data = require("./localData/creation/goods.json");
          if (data.find((el) => el.name === name)) {
            res.json({
              success: false,
              data: false,
              message: "物品已存在",
            });
          } else {
            data.push({
              name,
              category,
              prop,
              py: pinyin(name, { style: pinyin.STYLE_NORMAL }).join(""),
            });
            fs.writeFileSync(
              "./localData/creation/goods.json",
              JSON.stringify(data)
            );
            res.json({
              success: true,
              data: true,
              message: "添加成功",
            });
          }
        } else {
          res.json({
            success: false,
            data: false,
            message: "物品不能为空",
          });
        }
      });
      // 查询物品与其他物品的组合状态
      app.get("/api/creation/goods/combinationStatus", (req, res) => {
        const goodsData = require("./localData/creation/goods.json");
        const combinationData = require("./localData/creation/combination.json");
        const combinationNullResultData = require("./localData/creation/combinationNotResult.json");
        let goods = req.query.goods;
        const combinationStatus = goodsData.reduce((map, el) => {
          if (el.prop === "最终") return map;
          map[el.name] = { status: "没记录", py: el.py };
          return map;
        }, {});
        combinationData.forEach((el) => {
          if (el.origin.includes(goods)) {
            let goodsName = el.origin
              .join(",")
              .replace(new RegExp(`(${goods},|,${goods})`), "");
            combinationStatus[goodsName].status = el.result;
          }
        });
        combinationNullResultData.forEach((el) => {
          if (el.origin.includes(goods)) {
            let goodsName = el.origin
              .join(",")
              .replace(new RegExp(`(${goods},|,${goods})`), "");
            combinationStatus[goodsName].status = "无产物";
          }
        });
        res.json({
          success: true,
          data: combinationStatus,
        });
      });
      // 查询物品与其他物品的组合状态
      app.get("/api/creation/goods/combination", (req, res) => {
        const combinationData = require("./localData/creation/combination.json");
        let goods = req.query.goods;
        const data = {
          originCombinationList: [],
          resultCombinationList: [],
        };
        combinationData.forEach((el) => {
          if (el.origin.includes(goods)) {
            data.originCombinationList.push(el);
          }
          if (el.result === goods) {
            data.resultCombinationList.push(el);
          }
        });
        res.json({
          success: true,
          data,
        });
      });
      // 添加组合
      app.post("/api/creation/combination", (req, res) => {
        const { origin1, origin2, result } = req.body;
        if (origin1 && origin2) {
          const hasResultData = require("./localData/creation/combination.json");
          const notResultData = require("./localData/creation/combinationNotResult.json");
          const data = [...hasResultData, ...notResultData];
          if (
            origin1 === origin2
              ? data.find(
                  (el) =>
                    el.origin.includes(origin1) && el.origin[0] === el.origin[1]
                )
              : data.find(
                  (el) =>
                    el.origin.includes(origin1) && el.origin.includes(origin2)
                )
          ) {
            res.json({
              success: false,
              data: false,
              message: "组合已存在",
            });
          } else {
            if (result) {
              hasResultData.push({
                origin: [origin1, origin2],
                result,
              });

              fs.writeFileSync(
                "./localData/creation/combination.json",
                JSON.stringify(hasResultData)
              );
            } else {
              notResultData.push({
                origin: [origin1, origin2],
                result,
              });
              fs.writeFileSync(
                "./localData/creation/combinationNotResult.json",
                JSON.stringify(notResultData)
              );
            }
            res.json({
              success: true,
              data: true,
              message: "添加成功",
            });
          }
        } else {
          res.json({
            success: false,
            data: false,
            message: "原料不能为空",
          });
        }
      });
    },
  },
};
