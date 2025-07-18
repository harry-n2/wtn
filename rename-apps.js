const fs = require('fs');
const filePath = 'index.html';

let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
  "Greeting": "あいさつ生成",
  "OtHello": "オセロ",
  "Analog Clock": "アナログ時計",
  "Currency Converter": "通貨変換ツール",
  "Unit Converter": "単位変換ツール",
  "Time Calculator": "時間計算ツール",
  "Mirror App": "ミラーツール",
  "QR Code Generator": "QRコード作成",
  "Memo Pad": "メモ帳",
  "Char Counter": "文字数カウンター",
  "Password Generator": "パスワード作成",
  "Color Picker": "カラーピッカー",
  "Markdown Previewer": "Markdownプレビュー",
  "Countdown Timer": "カウントダウン",
  "Stopwatch": "ストップウォッチ",
  "BMI Calculator": "BMI計算機",
  "Age Calculator": "年齢計算機",
  "Random Number Generator": "乱数生成",
  "Coin Flip": "コイン投げ",
  "Json Formatter": "JSON整形",
  "Base64 Encoder": "Base64エンコード",
  "Url Encoder": "URLエンコード",
  "Drawing Pad": "お絵かきパッド",
  "Pomodoro Timer": "ポモドーロタイマー",
  "Text To Speech": "テキスト読み上げ",
  "Speech To Text": "音声→テキスト",
  "Image Compressor": "画像圧縮",
  "Image Resizer": "画像リサイズ",
  "Lorem Ipsum Generator": "ダミーテキスト生成",
  "Case Converter": "大文字小文字変換",
  "Text Reverser": "文字列反転",
  "Line Sorter": "行ソート",
  "Duplicate Line Remover": "重複行削除",
  "Simple Poll": "簡易アンケート",
  "Digital Clock": "デジタル時計",
  "World Clock": "世界時計",
  "Period Tracker": "生理周期カレンダー",
  "Morse Code Translator": "モールス信号変換",
  "Simple Interest Calculator": "単利計算機",
  "Compound Interest Calculator": "複利計算機",
  "Loan Calculator": "ローン計算機",
  "Tip Calculator": "チップ計算機",
  "Color Gradient Generator": "グラデーション生成",
  "Todo List": "ToDoリスト",
  "Weather App": "天気アプリ",
  "Recipe Finder": "レシピ検索",
  "Random Quote Generator": "ランダム名言",
  "Github User Search": "GitHubユーザー検索",
  "IP Address Finder": "IPアドレス確認",
  "Keyboard Event Tester": "キー入力テスター",
  "Regex Tester": "正規表現チェッカー",
  "Decision Roulette": "ルーレット",
  "Metronome": "メトロノーム",
  "Tone Generator": "周波数発生器",
  "Screen Ruler": "画面定規",
  "Image to Base64": "画像→Base64",
  "File Hash Calculator": "ファイルハッシュ計算",
  "Simple Code Editor": "簡易コードエディタ",
  "Accordion UI": "アコーディオンUI",
  "Tab UI": "タブUI",
  "Modal UI": "モーダルウィンドウ",
  "Carousel UI": "カルーセルUI",
  "Drag And Drop List": "ドラッグ＆ドロップリスト",
  "Word Scrambler": "単語シャッフル"
};

for (const [en, jp] of Object.entries(replacements)) {
  const regex = new RegExp(`>${en}<`, 'g');
  content = content.replace(regex, `>${jp}<`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("✅ アプリ名を日本語に変換しました！");
