import styles from "./SignInForm.module.css";
import { auth, db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

import { useCallback, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function SignInForm() {
  const initialValues = { username: "", mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [fbAlert, setFbAlert] = useState("");

  //入力された値の見る
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //アカウントの値の関係上useCallbackを利用
  //submitされるとプリベントデフォルトし、アカウントのを作成する
  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      const errors = validate(formValues);
      setFormErrors(errors);
      //バリデーションチェックのエラーの有無
      if (Object.keys(errors).length === 0) {
        //アカウントの作成
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formValues.mailAddress,
          formValues.password
        ).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFbAlert(
            `アカウント作成に失敗しました。時間を空けて再度お試しください。`
          );
          console.error(
            "Firebase Authentication Error:",
            errorCode,
            errorMessage
          );
        });
        // ユーザーが作成された後の処理を追加

        //userオブジェクトをuserに格納
        const user = userCredential.user;
        //自動生成された固有のidをuidに格納
        const uid = user.uid;
        console.log("unique user id: ", uid);

        //cloud firestoreにいろいろデータを入れる
        //usersコレクションが無ければ、作成し、自動生成したドキュメント内に値を入れる
        const citiesRef = collection(db, "users");
        await setDoc(doc(citiesRef, uid), {
          //detaを追加
          name: formValues.username,
          AmatenPay: 0,
          eMail: formValues.mailAddress,
        });
        console.log("Document written with ID: ", citiesRef.id);
        location.href = "/";
      }

      setIsSubmit(true);
    },
    [formValues]
  );

  //バリデーションチェック
  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!values.username) {
      errors.username = "ユーザー名を入力してください";
    } else if (values.username.length < 4 || values.username.length > 10) {
      errors.username = "4文字以上 10文字以下のユーザー名を入力してください";
    }

    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }

    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 6 || values.password.length > 18) {
      errors.password = "6文字以上 18文字以下のパスワードを入力してください";
    }
    return errors;
  };
  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div
            className={styles.svg}
            onClick={() => {
              location.href = "/";
            }}
          >
            <img src="/Amaten150px.svg" alt="Amaten" />
          </div>
          <h1 className={styles.h1}>サインインフォーム</h1>

          <hr />
          <div className={styles.uiForm}>
            <div className={styles.formField}>
              <label className={styles.label}>ユーザー名</label>
              <input
                type="text"
                placeholder="ユーザー名"
                name="username"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
            </div>
            <p className={styles.errorMsg}>{formErrors.username}</p>
            <div className={styles.formField}>
              <label className={styles.label}>メールアドレス</label>
              <input
                type="text"
                placeholder="メールアドレス"
                name="mailAddress"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
            </div>
            <p className={styles.errorMsg}>{formErrors.mailAddress}</p>
            <div className={styles.formField}>
              <label className={styles.label}>パスワード</label>
              <input
                type="text"
                placeholder="パスワード"
                name="password"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                className={styles.input}
              />
            </div>
            <p className={styles.errorMsg}>{formErrors.password}</p>
            <button
              onClick={(e) => handleSignIn(e)}
              className={styles.submitButton}
            >
              SUBMIT
            </button>
            {fbAlert && <p className={styles.fbAlert}>{fbAlert}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
