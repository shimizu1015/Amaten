import styles from "./SignInForm.module.css";
import { auth } from "./firebase";
import Link from "next/link";
import { useCallback, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export function LoginForm() {
  const initialValues = { mailAddress: "", password: "" };
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
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validate(formValues);
      setFormErrors(errors);
      //バリデーションチェックのエラーの有無

      if (Object.keys(errors).length === 0) {
        //ログイン認証
        signInWithEmailAndPassword(
          auth,
          formValues.mailAddress,
          formValues.password
        )
          // ログイン認証された後の処理を追加
          .then((userCredential) => {
            const user = userCredential.user;
            // setFbAlert("ログインに成功しました。");
            //ページ遷移
            location.href = "/";
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setFbAlert("ログインに失敗しました", errorMessage);
            console.error(
              "Firebase Authentication Error:",
              errorCode,
              errorMessage
            );
          });
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

    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }

    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 6) {
      errors.password = "6文字以上のパスワードを入力してください";
    }
    return errors;
  };
  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <Link className={styles.svg} href="/">
            <img src="/Amaten150px.svg" alt="Amaten" />
          </Link>
          <h1 className={styles.h1}>ログインフォーム</h1>

          <hr />
          <div className={styles.uiForm}>
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
              onClick={(e) => handleLogin(e)}
              className={styles.submitButton}
            >
              LOGIN
            </button>
            <a href="/SignUp">
              <p className={styles.pAccount}>新規アカウントはこちら</p>
            </a>
            {fbAlert && <p className={styles.fbAlert}>{fbAlert}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
