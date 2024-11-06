//画像を購入画面または、購入履歴に表示させたい。　させる前段階　動く

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//reqから商品のnameなどを受けっとっている　なんでこれで行けるかわからん
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      console.log(req.body);
      const { price, img, name, url } = req.body;

      //products id 作成　　// 回りくどいけど、この手法でなければエラーだった
      const product = await stripe.products.create({
        name: name,
        images: [img],
      });

      // price id 作成
      const priceData = await stripe.prices.create({
        currency: "jpy",
        unit_amount: price,
        product: product.id,
        metadata: {
          item: url,
          img: img,
        },
      });

      // チェックアウトセッションを作成。
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceData.id,
            quantity: 1,
          },
          //この黄色やつ増やせば　色々変える（カード機能）
        ],
        mode: "payment",
        //購入成功urlに　クエリ：CHECKOUT_SESSION_IDを渡す。　向こうでDBに購入履歴を追加
        //しかし CHECKOUT_SESSION_ID のパラメーターが微妙
        success_url: `${req.headers.origin}/successOne?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.referer}`,
      });

      //これで、購入画面が出るようになる
      res.redirect(303, session.url);
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
