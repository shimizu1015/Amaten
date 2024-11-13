const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { history } = req.body;
    const carts = JSON.parse(history);
    const priceId = [];

    //forEachの中ではasyncを利用しても同期処理にならない　forで同期処理に変えることが出来る
    //trueのループが最後とは限らない
    for (const element of carts) {
      // Product ID作成
      const product = await stripe.products.create({
        name: element.name,
        images: [element.img],
      });

      // Price ID作成
      const priceData = await stripe.prices.create({
        currency: "jpy",
        unit_amount: element.price,
        product: product.id,
        metadata: {
          item: element.url,
          img: element.img,
        },
      });

      priceId.push(priceData);
    }

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
