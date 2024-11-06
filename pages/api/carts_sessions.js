import { useEffect, useState, useCallback } from "react";
import { db } from "../../components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    // console.log(req.body);
    const { history } = req.body;
    // const products = [];
    const priceId = [];

    // console.log(JSON.parse(history)[0]);
    const carts = JSON.parse(history);
    const objectCount = Object.keys(carts).length;
    console.log("1");

    carts.forEach(async (element, index) => {
      //products id 作成　　// 回りくどいけど、この手法でなければエラーだった
      const product = await stripe.products.create({
        name: element.name,
        images: [element.img],
      });

      // price id 作成
      const priceData = await stripe.prices.create({
        currency: "jpy",
        unit_amount: element.price,
        product: product.id,
        metadata: {
          item: element.url,
          img: element.img,
        },
      });
      await priceId.push(priceData);
      console.log(priceId);

      //forEachの中ではasyncを利用しても同期処理にならない　forで同期処理に変えることが出来る
      //trueのループが最後とは限らない

      if (index === objectCount - 1) {
        setTimeout(async () => {
          //一秒待機　笑　priceId.pushに　await　付けてるけど相当な確率でカートの商品が少なく決済画面に行ってします
          console.log("1秒待機後");
          // チェックアウトセッションを作成。
          const session = await stripe.checkout.sessions.create({
            line_items: priceId.map((item) => ({
              price: item.id,
              quantity: 1,
            })),

            mode: "payment",
            //購入成功urlに　クエリ：CHECKOUT_SESSION_IDを渡す。　向こうでDBに購入履歴を追加
            //しかし CHECKOUT_SESSION_ID のパラメーターが微妙
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.referer}`,
          });

          //これで、購入画面が出るようになる

          res.redirect(303, session.url);
        }, 1000);
      }
    });
    console.log("最後に俺が出ろ");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
