// /api/chat.js   ― Vercel が自動でサーバーレス API に変換
export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
 if (message.trim() === "終わり") {
    return res.json({ reply: "きろくしたよ🙂" });
  }
  const openai = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
    messages: [
        {
          role: "system",
          content: "子どもに話す口調で、優しく、2行以内で答えて。最後に必ず🙂を付けて。",
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    }),
  });

  const data = await openai.json();
  res.json({ reply: data.choices?.[0]?.message?.content || '（返事なし）' });
};
  // 必要なら簡略化（オプション）
  const simplified = reply
    .split("\n").slice(0, 2).join(" ")
    .replace("リラックス", "やすんで")
    .replace("教えてください", "おしえてね🙂");

  res.json({ reply: simplified });
};
