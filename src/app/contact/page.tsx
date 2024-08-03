"use client";
import React, { useState, FormEvent } from "react";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    message: "",
  }); //エラーを管理
  const [submitting, setSubmitting] = useState<boolean>(false); //送信中かどうか管理
  const validate = () => {
    const newErrors: Errors = {};

    if (!name) {
      newErrors.name = "お名前は必須です";
    } else if (name.length >= 30) {
      newErrors.name = "30文字以内で入力してください。";
    }

    if (!email) {
      newErrors.email = "メールアドレスは必須です。";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "有効なメールアドレスを入力してください。";
    }

    if (!message) {
      newErrors.message = "本文は必須です。";
    } else if (message.length >= 500) {
      newErrors.message = "本文は500文字以内で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    //↑エラーが存在しない場合trueを返し、エラーが存在する場合にはfalseを返す。これにより、バリデーションが成功したかどうかを判定。この二つはセット
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (res.ok) {
        alert("送信しました！");
        handleClear();
      } else {
        alert("送信中に失敗しました。");
      }
    } catch (error) {
      alert("送信中にエラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  };
  const handleClear = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <h2>お問合せフォーム</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">お名前</label>
          <div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="message">本文</label>
          <div>
            <input
              id="message"
              type="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
            />
            {errors.message && <p>{errors.message}</p>}
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            送信
          </button>
          <button onClick={handleClear} disabled={submitting}>
            クリア
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
