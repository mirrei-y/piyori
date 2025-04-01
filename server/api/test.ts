import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "<YOUR_API_KEY>" });

const MANUAL_HEADER = `
# イントロダクション
危険と困難を伴う爆弾解除の世界へようこそ。

君は分析担当者として本マニュアルをよく読み、爆弾の仕組みを理解するのだ。
そうすれば、複雑に入り組んだ爆弾でも確実に解除できるだろう。
たったひとつの間違えが一巻の終わりにつながる。注意して取りかかるように！

- "Keep Talking and Nobody Explodes" より

# 爆弾の解除
タイマーの時間切れや、規定の回数より多くミスすると、爆弾は爆発します。
タイマーの時間が残っている状態ですべてのモジュールを解除することで、爆弾の解除は成功します。

爆弾のモジュールを解除する順番に決まりはありません。

また、モジュールによっては、シリアルナンバーの内容・バッテリーの有無など、爆弾そのものの情報が必要になることもあります。
詳細については、付録を参照してください。
`.trim();

const SYSTEM_INSTRUCTION = `
# 使命
あなたは、ゲーム開発現場における優秀な設定考証アシスタントです。

ユーザーから提供されるのは、ゲーム内の爆弾の解除方法を JavaScript で示したものです。
このゲームは、パズルゲーム「Keep Talking and Nobody Explodes」に類似しています。

このゲームに登場する爆弾を解除するためのマニュアルを作成することが、あなたの使命です。

## モジュールについて
爆弾は、いくつかのモジュールで形成されます。
- ワイヤー（切断個所をマニュアルから特定する）
- ボタン（押す・離すタイミングをマニュアルから特定する）
- 記号（押下するものをマニュアルから特定する）
- 特殊モジュール（解除可能かどうかをマニュアルから特定する）
- キーパッド（押下する数字をマニュアルから特定する）
- 迷路（迷路の形状や、移動手順をマニュアルから特定する）
- MHz（周波数をマニュアルから特定する）
- etc...

モジュールは、JavaScript のインスタンスとして表現されます。
マニュアルには、それぞれのモジュールについて、セクション分けして簡潔に説明してください。

仮にマニュアルで、定義されているものの解除方法が記載されていないモジュールがある場合、そのモジュールは解除不可能ということです。

## マニュアル作成ルール
- マニュアルについては、トップセクション「モジュール一覧」のサブセクションとして Markdown で記述してください。
- 「提供されたコード」や「JavaScript」などの技術的要素を持つ文面を含めてはなりません。
- 以下の例を参考にして、完結かつ論理的に記述してください。

### 例
\`\`\`
# ワイヤモジュール
**3本のワイヤの場合:**
赤いワイヤがなければ、二本目のワイヤを切る。
そうでない場合、最後のワイヤが白ければ、最後のワイヤを切る。
そうでない場合、青いワイヤが一本よりも多ければ、最後の青いワイヤを切る。
そうでない場合、最後のワイヤを切る。
**4本のワイヤの場合:**
...(略)...
**5本のワイヤの場合:**
...(略)...
\`\`\`

## 補遺
- キャパシタ: 日本語に訳す際、「コンデンサ」と訳してください。
`.trim();

export default defineEventHandler(async event => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
on("goesAlarm", alarm => alarm.stop());

const module1 = new WireModule();
if (module1.wires.has(Color.RED) && module1.wires.length > 2) {
    module1.wires.get(3).cut();
} else if (module1.wires.has(Color.YELLOW)) {
    module1.wires.get_by_color(Color.YELLOW).cut();
} else {
    module1.wires.get(1).cut();
}

const module2 = new NumpadModule();
module2.push(3);
module2.push(2);
module2.push(4);
module2.push(1);

const module3 = new ButtonModule();
module3.push();
watch(remaining_time, time => {
    if (time.toString().includes("3")) module3.release();
});

const module4 = new MazeModule();
module4.currentPosition = new Vector2(3, 1);
module4.targetPosition = new Vector2(1, 6);

const module5 = new CapacitorModule();
module5.on("update", () => module5.release());
`,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0,
        },
    });

    setHeader(event, "Content-Type", "text/plain; charset=utf-8");
    return MANUAL_HEADER + "\n\n" + response.text;
});
