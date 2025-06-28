// 初期表示
document.addEventListener("DOMContentLoaded", () => {
  showMessage("やあ、どうしたの？");
  document.getElementById("cards").style.display = "none";
});

function showMessage(msg) {
  const messageBox = document.getElementById("message");
  messageBox.innerText = msg;
}
// 表示する場合
document.querySelector(".kana-slide").classList.remove("hidden");

// 非表示に戻す場合
document.querySelector(".kana-slide").classList.add("hidden");
.kana-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.3rem;
  max-width: 300px;         /* 横幅を絞る */
  margin: 1rem auto;
}

.kana-grid .kana-btn {
  width: 60px;              /* 真四角に */
  height: 60px;
  font-size: 1.6rem;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: #fff;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
}

.kana-nav {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  gap: 1.2rem;
}
sendBtn.addEventListener('click', () => {
  if (!buffer) return;

  fetch("https://your-api-endpoint.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: buffer
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("GPTからの応答:", data);  // 必要に応じてUIに反映
  })
  .catch(err => {
    console.error("送信エラー:", err);
  });

  buffer = '';
});
// 送信ボタンが押されたとき
document.getElementById("submit-button").addEventListener("click", async () => {
  const input = document.getElementById("input-field").value;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-あなたのAPIキー"
    },
    body: JSON.stringify({
      model: "gpt-4",  // または gpt-3.5-turbo
      messages: [
        { role: "system", content: "あなたは静かな子どもの感情を読み取る役割です。" },
        { role: "user", content: input }
      ]
    })
  });

  const result = await response.json();
  document.getElementById("output").innerText = result.choices[0].message.content;
});
sendBtn.addEventListener("click", () => {
  const msg = document.getElementById("txt").value;
  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  })
  .then(r => r.json())
  .then(d => {
    // 画面に出す場所（例 #output）があればそこに書く
    document.getElementById("output").textContent = d.reply;
  });
});
