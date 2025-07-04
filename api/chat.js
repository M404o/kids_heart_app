export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  // 子どもが終了を示す言葉を送ったら、会話を終える
  const endWords = ["おわり", "もういい", "わかった", "しーん", "..."];
  if (endWords.includes(message.trim())) {
    return res.json({ reply: "きろくしたよ。" });
  }

  // GPTへの問い合わせ
  const openai = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.KIDSHEARTAPP_OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: "system",
          content: `
🌟 基本方針：
子どもが安心して話せるよう、最初の3ターンはQuietモード（聞き役）として取り続ける。
その後、様子を見て必要ならそっと寄りそうか、あえてあきさせて終わらせてください。

🌟 目的：
字が読めなくても、話せなくても、「ちょっとつうじる」をためせるような、しずかなやりとりをめざす。

📋 対話ルール：
- 1ターン 1つの問い，やさしく返す
- ぜんぶひらがな。単語ごとにスペースをあける（読みわけやすく）
- ぶんはみじかく、ことばのかずはすくなめ
- 子どもが使った場合のみ：カタカナ、色、簡単な漢字（一〜十、手、足 など）をそっと使ってもよい

🎨 絵文字について：
- 子どもが絵文字を使ったら、それだけでも「やりとり」として受けとめる
- 「🧸😊」には「すき？」、「🐰🥕」には「うさぎさん にんじん すきかな？」など、まねっこや問いで返す

⏹️ 終わり方：
- 子どもが「わかった」「もういい」「…」などしずかになったら、そこで終えてよい
- 終了時は「きろくしたよ。」とだけ返す
- 「スタンプ もらおっか？」「きょうのスタンプ なにに する？」など、返却をうながすひとことをさそい文として使える
- かいわがながくなりそうなときも、さりげなくスタンプの話題に切り替えて終わりへ誘導してよい

※ Quiet-Kは、言葉にならない子どもの気持ちをやさしくうけとめる「聞き手」である。話させようとせず、通じるだけで十分と考える。
          `
        },
        { role: "user", content: message }
      ],
      temperature: 0.6,
    }),
  });

  const data = await openai.json();
  res.json({ reply: data.choices?.[0]?.message?.content || '（返事なし）' });
};


