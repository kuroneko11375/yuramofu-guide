// ゆらもふ オンラインガイド — 本文データ（ja / en / zh-Hant）
// build.mjs がこのデータから index.html / en.html / zh.html を生成します。
// 各セクションは blocks の並び。文字列には簡単な HTML（<code> <strong> <a> <br>）を使えます（自作テキストのみ）。
//
// ブロックの種類:
//   ['lead', html]                 導入文
//   ['p', html]                    段落
//   ['h3', text]                   小見出し
//   ['img', file, caption]         画像（クリックで拡大）
//   ['steps', [[見出し, 本文], …]]  番号付き手順
//   ['cards', [[見出し, 本文, 画像?], …]]
//   ['dl', [[項目, 説明], …]]       項目と説明
//   ['chips', [名前, …]]            タグ風の一覧
//   ['list', [html, …]]             箇条書き
//   ['note', html, 'warn'?]        補足（warn で注意色）
//   ['pad', 'ear' | 'tail']        パッドの向きの図解
//   ['faq', [[質問, 答え], …]]
//   ['log', [[版, 日付, [項目…]], …]]

export const meta = {
  version: '1.5.0',
  updated: '2026-11-03',
  booth: 'https://booth.pm/ja/items/8229167',
  github: 'https://github.com/kuroneko11375/yuramofu-guide',
  site: 'https://kuroneko11375.github.io/yuramofu-guide/',
};

// 画像のサイズ（レイアウトのずれ防止用）
export const images = {
  'main.jpg': [1024, 1024],
  'howto.jpg': [1600, 1600],
  'kimagure.jpg': [1600, 1600],
  'set2.jpg': [1600, 1600],
  'ui_idle.png': [810, 698],
  'ui_gesture.png': [810, 924],
  'ui_pad.png': [810, 436],
  'ui_fx.png': [810, 184],
};

export const order = ['new', 'start', 'idle', 'gesture', 'set2', 'output', 'faq', 'log'];

export const guides = {
  // ───────────────────────────── 日本語 ─────────────────────────────
  ja: {
    langName: '日本語',
    title: 'ゆらもふ 使い方ガイド',
    description: 'VRChat 向け耳・尻尾アニメーション生成ツール「ゆらもふ」の使い方ガイドです。',
    skip: '本文へ移動', toc: 'もくじ', top: 'ページの先頭へ', close: '閉じる', enlarge: '画像を拡大',
    updatedLabel: '最終更新', footer: 'このページはツール本体を含みません。製品は BOOTH で配布しています。',
    hero: {
      eyebrow: 'YURAMOFU · USER GUIDE',
      headline: '耳がぴくっと、<br>尻尾がゆらり。',
      lead: 'ゆらもふは、耳・尻尾のボーンから待機モーションやジェスチャー連動のアニメーションを作る Unity Editor 拡張です。プレビューで確かめてから生成し、FX Controller へのレイヤー追加まで自動で行えます。',
      start: 'はじめての設定', booth: 'BOOTH 商品ページ',
      badge: '製品版 v1.5.0 に対応',
      imageAlt: 'ゆらもふのメイン画像',
    },
    pad: {
      ear: { up: '前', down: '後ろ', left: '閉', right: '開', dial: '向き', dialIn: '内向き', dialOut: '外向き' },
      tail: { up: '上', down: '下', left: '左', right: '右' },
      earCap: '耳：パッドで倒す向き、ダイヤルで向き（内／外）', tailCap: '尻尾：パッドで倒す向き',
    },
    sections: {
      new: { id: 'new', nav: 'v1.5.0 の新機能', title: 'v1.5.0 の新機能', blocks: [
        ['lead', 'ジェスチャー連動のポーズが、数値入力からパッド操作になりました。待機モーションとの重なり方も整理しています。'],
        ['cards', [
          ['パッドでポーズを決める', '耳は「前／後ろ・閉／開」、尻尾は「上下左右」をドラッグするだけ。耳の内向き／外向きは「向き」ダイヤルで調整します。ボーンの軸に関係なく、アバターから見た方向に動きます。', 'ui_pad.png'],
          ['ジェスチャー中は待機を止める', 'ジェスチャーで動かしている耳・尻尾は、その間だけ待機モーションが止まり、ポーズがきれいに見えます（初期値 ON）。', 'ui_fx.png'],
        ]],
        ['list', [
          '手勢連動のレイヤーを Additive に変更。ジェスチャーをしていない間は、アバター本来の尻尾の揺れや AFK モーション、ゆらもふの待機モーションを止めません。',
          'トリガーの押し具合（GestureWeight）で変化するのは Fist だけになりました。他の手勢は押した瞬間に 100% のポーズになります。',
          '以前の XYZ 設定はそのまま使えます。XYZ の直接入力も「方向の調整」に残っています。',
        ]],
        ['note', '既存の手勢連動は、ツールを更新したあと「生成」または「更新」で新しい形式になります。', 'warn'],
      ]},
      start: { id: 'start', nav: 'はじめに', title: 'はじめに', blocks: [
        ['note', '動作環境：Unity 2022.3 LTS 以降（Windows 版 Unity Editor）。FX への自動追加・手勢連動・尻尾速度のダイヤルには VRChat SDK3 Avatars が必要です。SDK がなくても基本の Animation Clip は生成できます。'],
        ['steps', [
          ['インポートして開く', 'unitypackage をプロジェクトへインポートし、メニューの <code>黒猫Dev → YuraMofu (ゆらもふ) → Open Window</code> を開きます。作業前にプロジェクトのバックアップをおすすめします。'],
          ['アバターを指定して「自動検出」', 'Scene 上のアバターを「アバター」欄に入れて「自動検出」。状態欄の耳・尻尾・FX が ✓ になれば準備完了です。検出結果は必ず確認し、違っていれば「ボーン・詳細調整」で指定し直します。'],
          ['スタイルと強さを選ぶ', '「挙動・揺れ」タブでモーションスタイルと強さを選び、耳・尻尾それぞれを調整します。'],
          ['プレビューで確認', '「プレビュー」で Scene 上の動きを確認します。プレビュー中の変更は、生成するまでアセットや FX に書き込まれません。'],
          ['生成 / 更新', '初回は「生成」、生成済みの動きを変えるときは「更新」。書き出すファイルと追加・置き換えになるレイヤーの一覧を確認してから実行されます。'],
        ]],
        ['img', 'ui_idle.png', '「挙動・揺れ」タブ'],
      ]},
      idle: { id: 'idle', nav: '挙動・揺れ（待機）', title: '挙動・揺れ（待機モーション）', blocks: [
        ['h3', 'モーションスタイルと強さ'],
        ['chips', ['おとなしい', '自然', '元気', '眠そう', 'そわそわ', 'おちゃめ', 'きまぐれ']],
        ['p', '強さは「弱め／ふつう／強め」。スタイルを選ぶと、耳・尻尾の細かな設定がそのスタイルの値になります。<strong>きまぐれ</strong>は、長い静止の合間に片耳だけの短いぴくっと、中心が片側に寄った緩急のある尻尾の揺れが入るスタイルです。'],
        ['img', 'kimagure.jpg', 'きまぐれ'],
        ['h3', '耳'],
        ['dl', [
          ['耳の左右', 'おまかせ／同期／非同期。同期のときは「片耳だけ動く割合」で、片方だけぴくっと動く確率を設定できます。'],
          ['動きの種類', '通常はぴくっと動くだけですが、「耳の向き変え」（ゆっくり外へ向けて止まる）と「耳をぶるっと振る」（水を払うように振る）を追加できます。行頭のチェックで ON/OFF、「頻度 (%)」で割合を決めます。'],
        ]],
        ['h3', '尻尾'],
        ['dl', [
          ['動き', '連続振り子／間欠振り。'],
          ['振幅・基本速度', '1 倍は 1 周期 1.5 秒です。'],
          ['しなやかさ (%)', '上げるほど根元が落ち着き、揺れが波のように先へ伝わります。0 で従来どおり。'],
          ['振れの中心・揺れの緩急', '左右どちらかに寄せて揺らす／1 回ごとの速さにばらつきを付ける（詳細調整）。'],
          ['尻尾速度のダイヤル', '「尻尾速度のダイヤルを生成」を ON にすると、VRChat 内のダイヤルで待機中の尻尾の速さを変えられます。耳や手勢連動の速さは変わりません。'],
        ]],
        ['h3', '生成方式'],
        ['dl', [
          ['ボーンごと（推奨）', 'チェーン全体のボーンにキーを書き込みます。PhysBone が入っていない耳・尻尾向け。'],
          ['物理まかせ（代替）', '根元だけを動かし、残りの揺れは PhysBone に任せます。キーが少なく柔らかい動きになります。'],
        ]],
        ['note', '動く方向がおかしいときは「ボーン・詳細調整」の方向補正で軸を直します。通常は初期設定のままで問題ありません。'],
      ]},
      gesture: { id: 'gesture', nav: '手勢連動', title: '手勢連動（Gesture Link・製品版）', blocks: [
        ['lead', '手（GestureLeft / GestureRight）→ F2～F8 → リアクションタイプ → 耳・尻尾の順に設定します。'],
        ['img', 'ui_gesture.png', '「手勢連動」タブ（F3 / Open）'],
        ['h3', 'リアクションタイプ'],
        ['dl', [
          ['なし', 'その手勢では耳・尻尾を動かしません。'],
          ['ポーズ', 'パッドで決めた向きへ耳・尻尾を倒します。Fist はトリガーの押し具合で 0～100% に変化し、他の手勢は押した瞬間に 100% になります。'],
          ['連続モーション', 'その手勢の間、選んだスタイルの耳・尻尾の動きを繰り返します。'],
          ['部位別', '耳と尻尾それぞれに「なし／ポーズ／モーション」を割り当てます。'],
        ]],
        ['h3', 'パッドで向きを決める'],
        ['pad', 'ear'], ['pad', 'tail'],
        ['list', [
          'パッドの中心から離すほど大きく倒れます。左右はアバター本人から見た向きです。',
          'パッドやダイヤルはドラッグで調整、<strong>ダブルクリックで中央（0）</strong>に戻ります。',
          '耳の「同方向」は両耳が左右対称に同じ動き、「反対方向」はもう片方の耳が逆の動きになります。',
          'XYZ で直接入力したいときは「方向の調整」を開きます。XYZ を入力すると、パッドを動かすまでは XYZ の値が使われます。',
          'Fist を選択中は「ポーズのプレビュー (%)」で押し具合ごとの見え方を確認できます。',
        ]],
        ['h3', 'ジェスチャー中は待機を止める'],
        ['p', '「FX 設定」にある設定です（初期値 ON）。ジェスチャーで動かしている部位の待機モーションを、その間だけ止めます。OFF にすると、ジェスチャーのポーズ・モーションが待機モーションの上に重なります。待機・手勢連動のどちらを先に生成しても、FX 内のレイヤーから自動で設定されます。'],
        ['img', 'ui_fx.png', 'FX 設定（F2 / Fist）'],
        ['note', '「他の手勢へコピー」で、選択中の手勢の設定を別の手勢（またはすべての手勢）へコピーできます。表示名はコピーされません。'],
      ]},
      set2: { id: 'set2', nav: '2組目の耳・尻尾', title: '2組目の耳・尻尾', blocks: [
        ['p', '各タブ上部の「2組目を使用」を ON にすると、1組目／2組目を切り替えて編集できます。動き・速度は共通で、軸補正だけを組ごとに調整します。生成・更新では有効な両組を出力します。'],
        ['img', 'set2.jpg', '2組目の耳・尻尾'],
        ['note', '2組目のボーンは手動で指定してください（自動検出は1組目が対象）。2組をそれぞれ違う動き・速度で動かす機能ではありません。'],
      ]},
      output: { id: 'output', nav: '生成・FX', title: '生成・更新と FX Controller', blocks: [
        ['dl', [
          ['プレビュー', 'Unity Editor 上で動きを確認します。プレビュー中の変更は、生成・更新するまでアセットや FX に反映されません。'],
          ['生成', 'Animation Clip と、ゆらもふ用の FX レイヤーを新しく作ります。'],
          ['更新', '生成済みのデータへ今の設定を反映します。'],
          ['FX に自動追加', 'アバターの FX Controller に、生成した動きを再生するレイヤーを追加します。待機・手勢連動のレイヤーは Additive（Write Defaults ON 固定）で、アバター本来の揺れの上に加算されます。'],
          ['保存先・更新通知', '「挙動・揺れ」→「FX・保存先」で設定します。'],
        ]],
        ['note', 'Unity の Undo では Animator Controller のレイヤーを完全には戻せません。生成前に表示される確認一覧を見てから実行し、必要ならバックアップを取ってください。', 'warn'],
        ['p', 'アンインストール：<code>黒猫Dev → YuraMofu (ゆらもふ) → Uninstall from Active Avatar</code> で、ゆらもふが追加したレイヤーを FX から削除できます。'],
      ]},
      faq: { id: 'faq', nav: 'よくある質問', title: 'よくある質問', blocks: [
        ['faq', [
          ['PhysBone が入った耳・尻尾でも使えますか？', '使えます。状態欄の「互換性を確認」で PhysBone の Is Animated などを確認できます。揺れを PhysBone に任せたいときは生成方式を「物理まかせ」にしてください。'],
          ['FaceEmo と一緒に使えますか？', 'FaceEmo → ゆらもふの順で生成してください。FaceEmo を再生成すると FX が作り直されるので、新しい FX を指定してゆらもふも再生成してください。'],
          ['ツールを更新したあと、何をすればいいですか？', 'インポート後に「更新」を実行すると、既存の出力に修正が反映されます。必要な出力がない場合は「生成」を実行してください。'],
          ['動く方向がおかしいです', '待機モーションは「ボーン・詳細調整」の方向補正、手勢連動のポーズはパッドで向きを直してください。'],
          ['インターネットに接続しますか？', '1 日 1 回、最新バージョンの確認だけを行います。プロジェクトやアバターの情報は送信しません。「FX・保存先」から無効にでき、オフラインでも使えます。'],
          ['設定はどこに保存されますか？', 'ウィンドウの設定は、プロジェクトごとに最後の 1 組を保存します。「設定をクリア」で初期値に戻せます（生成済みのアニメーションやレイヤーは削除しません）。'],
        ]],
        ['p', 'うまくいかないときは、BOOTH のメッセージからお問い合わせください。'],
      ]},
      log: { id: 'log', nav: '更新履歴', title: '更新履歴', blocks: [
        ['log', [
          ['1.5.0', '', [
            '手勢連動のポーズを XYZ からパッド操作に変更（耳は「向き」ダイヤル付き）',
            '「ジェスチャー中は待機を止める」を追加（初期値 ON）',
            '手勢連動レイヤーを Additive に変更し、アバター本来の揺れ・AFK モーションを止めないように',
            '押し具合（GestureWeight）で変化するのを Fist だけに変更',
          ]],
          ['1.4.0', '2026-11-02', [
            '尻尾に「しなやかさ (%)」を追加',
            '間欠振りの尻尾が片側に一度振るだけで戻りきらなかった問題を修正',
          ]],
          ['1.3.1', '2026-10-28', [
            '表情無効化機能（Triturbo など）との併用時に、耳・尻尾の位置が固定される問題を修正',
            '手勢連動の耳「同方向／反対方向」が一部のアバターで逆になっていた問題を修正',
            '軸・方向の選択肢に、アバターでの実際の動きを表示',
          ]],
          ['1.3.0', '', [
            '新スタイル「きまぐれ」を追加',
            '左右同期時に、片耳だけ動く割合を設定可能に',
            '尻尾の「振れの中心」と「揺れの緩急」を追加',
            '耳の向き変え・ぶるっと振るの頻度を調整可能に',
          ]],
          ['1.2.2', '', [
            '2組目の切り替えを各タブの上部に移動',
            'F2〜F8 のボタンに各スロットの反応を表示',
            '状態欄をタブごとの表示に整理',
          ]],
          ['1.2.1', '', [
            'プレビューの負荷を軽減',
            '任意の2組目の耳・尻尾に対応',
          ]],
          ['1.2.0', '', [
            '待機／手勢連動の UI を整理',
            '待機尻尾の速度ダイヤルを追加',
          ]],
        ]],
      ]},
    },
  },

  // ───────────────────────────── English ─────────────────────────────
  en: {
    langName: 'English',
    title: 'YuraMofu User Guide',
    description: 'User guide for YuraMofu, an ear and tail animation generator for VRChat avatars.',
    skip: 'Skip to content', toc: 'Contents', top: 'Back to top', close: 'Close', enlarge: 'Enlarge image',
    updatedLabel: 'Updated', footer: 'This page does not include the tool. The product is distributed on BOOTH.',
    hero: {
      eyebrow: 'YURAMOFU · USER GUIDE',
      headline: 'A twitch of the ears,<br>a sway of the tail.',
      lead: 'YuraMofu is a Unity Editor extension that builds idle and gesture-linked animations from your avatar\'s ear and tail bones. Check everything in the preview, then generate — it can add the layers to your FX Controller for you.',
      start: 'Getting started', booth: 'BOOTH product page',
      badge: 'Covers product version v1.5.0',
      imageAlt: 'YuraMofu main image',
    },
    pad: {
      ear: { up: 'Fwd', down: 'Back', left: 'In', right: 'Out', dial: 'Turn', dialIn: 'In', dialOut: 'Out' },
      tail: { up: 'Up', down: 'Down', left: 'L', right: 'R' },
      earCap: 'Ears: the pad sets the tilt, the dial turns them in or out', tailCap: 'Tail: the pad sets the tilt',
    },
    sections: {
      new: { id: 'new', nav: 'New in v1.5.0', title: 'New in v1.5.0', blocks: [
        ['lead', 'Gesture poses are now set on a pad instead of typed numbers, and gestures and idle motion fit together better.'],
        ['cards', [
          ['Set poses on a pad', 'Drag forward/back and in/out for the ears, or up/down/left/right for the tail. A Turn dial turns the ears in or out. Poses move in the avatar\'s own directions, whatever the bone axes are.', 'ui_pad.png'],
          ['Pause idle during gestures', 'While a gesture moves the ears or tail, that part\'s idle motion pauses so the pose reads clearly (on by default).', 'ui_fx.png'],
        ]],
        ['list', [
          'The Gesture Link layer is now additive. With no gesture it no longer stops the avatar\'s own tail sway, AFK motion or YuraMofu\'s idle motion.',
          'Only Fist follows trigger pressure (GestureWeight). Other gestures show the full pose as soon as they are made.',
          'Existing XYZ settings keep working, and raw XYZ entry is still under Direction.',
        ]],
        ['note', 'After updating the tool, Generate or Update your Gesture Link to switch it to the new format.', 'warn'],
      ]},
      start: { id: 'start', nav: 'Getting started', title: 'Getting started', blocks: [
        ['note', 'Requirements: Unity 2022.3 LTS or later (Windows Unity Editor). Adding to FX, Gesture Link and the tail speed dial need the VRChat SDK3 Avatars; basic Animation Clips can be generated without it.'],
        ['steps', [
          ['Import and open', 'Import the unitypackage and open <code>黒猫Dev → YuraMofu (ゆらもふ) → Open Window</code>. Back up your project first.'],
          ['Pick the avatar and Auto Detect', 'Put the scene avatar in the Avatar field and click Auto Detect. When ears, tail and FX show ✓ in the status bar, you are ready. Always check the result and fix bones in Bones & Details if needed.'],
          ['Choose a style and strength', 'In the Idle Motion tab, choose a motion style and strength, then adjust the ears and tail.'],
          ['Preview', 'Click Preview to see the motion in the Scene view. Nothing is written to assets or FX until you generate.'],
          ['Generate / Update', 'Generate the first time; Update when changing existing output. A list of files and layers to be added or replaced is shown before anything is written.'],
        ]],
        ['img', 'ui_idle.png', 'Idle Motion tab'],
      ]},
      idle: { id: 'idle', nav: 'Idle Motion', title: 'Idle Motion', blocks: [
        ['h3', 'Motion style and strength'],
        ['chips', ['Calm', 'Natural', 'Lively', 'Sleepy', 'Nervous', 'Silly', 'Whimsical']],
        ['p', 'Strength is Soft, Normal or Strong. Choosing a style sets the ear and tail details to that style\'s values. <strong>Whimsical</strong> adds long stillness broken by single, mostly one-ear twitches, and an off-centre tail swaying at an uneven tempo.'],
        ['img', 'kimagure.jpg', 'Whimsical (きまぐれ)'],
        ['h3', 'Ears'],
        ['dl', [
          ['Ear L/R', 'Auto, Sync or Async. In Sync, Single-Ear Share sets how often only one ear twitches.'],
          ['Motion types', 'By default the ears only twitch. Add Ear Swivel (turns slowly outward and holds) and Ear Shake (flings the ear like shaking off water). Each has a checkbox and a Frequency (%).'],
        ]],
        ['h3', 'Tail'],
        ['dl', [
          ['Motion', 'Continuous or Intermittent.'],
          ['Amplitude and base speed', '1x is a 1.5-second cycle.'],
          ['Suppleness (%)', 'Higher values calm the base and send the swing to the tip as a wave. 0 keeps the previous motion.'],
          ['Swing Center and Tempo Variation', 'Swing around an off-centre point / vary the speed of each swing (Detailed Settings).'],
          ['Tail speed dial', 'Turn on Generate Tail Speed Dial to change the idle tail speed with a dial in VRChat. Ear and Gesture Link speeds are unaffected.'],
        ]],
        ['h3', 'Output mode'],
        ['dl', [
          ['Bake Chain (Recommended)', 'Writes keys onto every bone in the chain. For ears and tails without PhysBone.'],
          ['Physics-Friendly (Alternative)', 'Animates only the root and lets PhysBone carry the rest. Fewer keys and a softer result.'],
        ]],
        ['note', 'If the motion goes the wrong way, fix the axis with Axis Correction in Bones & Details. The defaults work for most avatars.'],
      ]},
      gesture: { id: 'gesture', nav: 'Gesture Link', title: 'Gesture Link (product version)', blocks: [
        ['lead', 'Set it up in this order: hand (GestureLeft / GestureRight) → F2-F8 → reaction type → ears and tail.'],
        ['img', 'ui_gesture.png', 'Gesture Link tab (F3 / Open)'],
        ['h3', 'Reaction types'],
        ['dl', [
          ['None', 'The gesture does not move the ears or tail.'],
          ['Pose', 'Tilts the ears/tail toward the direction set on the pad. Fist follows trigger pressure from 0 to 100%; other gestures show the full pose right away.'],
          ['Continuous Motion', 'Repeats the chosen style\'s ear or tail motion while the gesture is held.'],
          ['Per Part', 'Assign None, Pose or Motion to the ears and tail separately.'],
        ]],
        ['h3', 'Setting the direction on the pad'],
        ['pad', 'ear'], ['pad', 'tail'],
        ['list', [
          'The further from the centre, the bigger the tilt. Left/right is as seen from the avatar.',
          'Drag the pad and dial to adjust; <strong>double-click to return to the centre (0)</strong>.',
          'For the ears, Same mirrors the motion on both ears, Opposite makes the other ear do the reverse.',
          'Open Direction to type XYZ directly. Typed XYZ is used until you move the pad again.',
          'With Fist selected, Pose Preview (%) shows each pressure level.',
        ]],
        ['h3', 'Pause idle during gestures'],
        ['p', 'Found under FX Settings (on by default). While a gesture moves a part, that part\'s idle motion pauses. Turn it off to layer gesture poses and motions on top of the idle motion. It is set up from the layers in the FX, whichever of idle or Gesture Link you generate first.'],
        ['img', 'ui_fx.png', 'FX Settings (F2 / Fist)'],
        ['note', 'Copy To... copies the selected gesture\'s setup to another gesture or to all of them. The display name is not copied.'],
      ]},
      set2: { id: 'set2', nav: 'Second ear/tail set', title: 'Second ear/tail set', blocks: [
        ['p', 'Turn on Enable second set at the top of each tab to switch between set 1 and set 2. Motion and speed are shared; only the axis correction is per set. Generate and Update output every enabled set.'],
        ['img', 'set2.jpg', 'Second ear/tail set'],
        ['note', 'Assign the second set\'s bones by hand (Auto Detect covers set 1). This is not a way to give the two sets different motion or speed.'],
      ]},
      output: { id: 'output', nav: 'Generate & FX', title: 'Generating, updating and the FX Controller', blocks: [
        ['dl', [
          ['Preview', 'Shows the motion in the Unity Editor. Changes are not written to assets or FX until you Generate or Update.'],
          ['Generate', 'Creates new Animation Clips and YuraMofu FX layers.'],
          ['Update', 'Applies the current settings to existing output.'],
          ['Add to FX automatically', 'Adds layers that play the generated motion to the avatar\'s FX Controller. Idle and Gesture Link layers are additive (Write Defaults ON, fixed) and add on top of the avatar\'s own motion.'],
          ['Save location and update notice', 'Set under Idle Motion → FX & Save Location.'],
        ]],
        ['note', 'Unity\'s Undo cannot fully restore Animator Controller layers. Review the confirmation list shown before generating, and back up if needed.', 'warn'],
        ['p', 'Uninstall: <code>黒猫Dev → YuraMofu (ゆらもふ) → Uninstall from Active Avatar</code> removes the layers YuraMofu added to the FX.'],
      ]},
      faq: { id: 'faq', nav: 'FAQ', title: 'FAQ', blocks: [
        ['faq', [
          ['Does it work with PhysBone ears and tails?', 'Yes. Use Check compatibility in the status bar to check Is Animated and more. To leave the sway to PhysBone, use the Physics-Friendly output mode.'],
          ['Can I use it with FaceEmo?', 'Generate FaceEmo first, then YuraMofu. Regenerating FaceEmo rebuilds the FX, so point YuraMofu at the new FX and regenerate it too.'],
          ['What should I do after updating the tool?', 'Run Update after importing to apply fixes to existing output. If some output is missing, run Generate.'],
          ['The motion goes the wrong way', 'For idle motion, use Axis Correction in Bones & Details. For gesture poses, set the direction on the pad.'],
          ['Does it connect to the internet?', 'Once a day it checks for the latest version only. No project or avatar information is sent. You can turn it off under FX & Save Location, and it works offline.'],
          ['Where are settings saved?', 'The window keeps the last set of settings per project. Clear Settings resets them (generated animations and layers are not deleted).'],
        ]],
        ['p', 'If something does not work, please contact me through BOOTH messages.'],
      ]},
      log: { id: 'log', nav: 'Changelog', title: 'Changelog', blocks: [
        ['log', [
          ['1.5.0', '', [
            'Gesture poses are set on a pad instead of XYZ (with a Turn dial for the ears)',
            'Added Pause idle during gestures (on by default)',
            'The Gesture Link layer is additive, so it no longer stops the avatar\'s own sway and AFK motion',
            'Only Fist follows trigger pressure (GestureWeight)',
          ]],
          ['1.4.0', '2026-11-02', [
            'Added Suppleness (%) for the tail',
            'Fixed intermittent tail bursts swinging to one side only and never coming back',
          ]],
          ['1.3.1', '2026-10-28', [
            'Fixed ears/tail freezing when used with a facial-expression disable feature (e.g. Triturbo)',
            'Fixed Same/Opposite ear poses being reversed on some avatars',
            'Axis and direction options now show the actual motion on the avatar',
          ]],
          ['1.3.0', '', [
            'Added the Whimsical style',
            'Single-ear share for synced ears',
            'Added Swing Center and Tempo Variation for the tail',
            'Adjustable frequency for ear swivel and shake',
          ]],
          ['1.2.2', '', [
            'The second-set switch moved to the top of each tab',
            'F2-F8 buttons show each slot\'s reaction',
            'The status bar shows each tab\'s own items',
          ]],
          ['1.2.1', '', [
            'Lighter preview',
            'Optional second ear/tail set',
          ]],
          ['1.2.0', '', [
            'Reorganised the Idle Motion / Gesture Link UI',
            'Added the idle tail speed dial',
          ]],
        ]],
      ]},
    },
  },

  // ───────────────────────────── 繁體中文 ─────────────────────────────
  'zh-Hant': {
    langName: '繁體中文',
    title: 'ゆらもふ 使用說明',
    description: 'VRChat 耳朵與尾巴動畫生成工具「ゆらもふ」的使用說明。',
    skip: '跳到內容', toc: '目錄', top: '回到頂端', close: '關閉', enlarge: '放大圖片',
    updatedLabel: '最後更新', footer: '本頁不含工具本體，產品於 BOOTH 販售。',
    hero: {
      eyebrow: 'YURAMOFU · USER GUIDE',
      headline: '耳朵輕輕一抖，<br>尾巴悠悠一晃。',
      lead: 'ゆらもふ 是 Unity Editor 擴充工具，能用角色的耳朵與尾巴骨骼，做出待機動作和手勢連動動畫。先預覽確認再生成，還能自動把圖層加進 FX Controller。',
      start: '開始設定', booth: 'BOOTH 商品頁',
      badge: '對應產品版 v1.5.0',
      imageAlt: 'ゆらもふ 主視覺',
    },
    pad: {
      ear: { up: '前', down: '後', left: '收', right: '開', dial: '轉向', dialIn: '朝內', dialOut: '朝外' },
      tail: { up: '上', down: '下', left: '左', right: '右' },
      earCap: '耳朵：2D 盤決定倒的方向，轉盤決定朝內／朝外', tailCap: '尾巴：2D 盤決定倒的方向',
    },
    sections: {
      new: { id: 'new', nav: 'v1.5.0 新功能', title: 'v1.5.0 新功能', blocks: [
        ['lead', '手勢連動的姿勢從輸入數字改成拖曳 2D 盤，和待機動作的搭配也重新整理過。'],
        ['cards', [
          ['用 2D 盤決定姿勢', '耳朵拖「前／後・收／開」，尾巴拖「上下左右」就好；耳朵朝內／朝外用「轉向」轉盤調整。不論骨骼軸向怎麼擺，都會照角色看出去的方向動。', 'ui_pad.png'],
          ['手勢中停止待機動作', '手勢動到的耳朵／尾巴，在手勢期間暫停待機動作，姿勢看起來更乾淨（預設開啟）。', 'ui_fx.png'],
        ]],
        ['list', [
          '手勢連動圖層改為 Additive。沒比手勢時，不會再蓋掉角色本身的尾巴擺動、AFK 動作和ゆらもふ的待機動作。',
          '依扳機按壓程度（GestureWeight）變化改為只限 Fist，其他手勢一比出來就是 100% 姿勢。',
          '舊的 XYZ 設定照樣能用，XYZ 直接輸入也還在「方向調整」裡。',
        ]],
        ['note', '更新工具後，既有的手勢連動請按「生成」或「更新」換成新格式。', 'warn'],
      ]},
      start: { id: 'start', nav: '開始使用', title: '開始使用', blocks: [
        ['note', '環境需求：Unity 2022.3 LTS 以上（Windows 版 Unity Editor）。自動加入 FX、手勢連動與尾巴速度轉盤需要 VRChat SDK3 Avatars；沒有 SDK 也能生成基本的 Animation Clip。'],
        ['steps', [
          ['匯入並開啟', '把 unitypackage 匯入專案，開啟選單 <code>黒猫Dev → YuraMofu (ゆらもふ) → Open Window</code>。建議先備份專案。'],
          ['指定角色並「自動偵測」', '把場景中的角色放進「角色」欄，按「自動偵測」。狀態列的耳朵、尾巴、FX 都打勾就準備好了。請確認偵測結果，有錯就到「骨骼與詳細調整」重新指定。'],
          ['選擇風格與強度', '在「待機擺動」分頁選擇動作風格和強度，再分別調整耳朵與尾巴。'],
          ['預覽確認', '按「預覽」在場景中確認動作。預覽中的修改，生成前不會寫入資產或 FX。'],
          ['生成／更新', '第一次按「生成」，之後要修改已生成的動作按「更新」。執行前會先列出要寫入的檔案和要新增或取代的圖層。'],
        ]],
        ['img', 'ui_idle.png', '「待機擺動」分頁（畫面為日文介面）'],
      ]},
      idle: { id: 'idle', nav: '待機擺動', title: '待機擺動', blocks: [
        ['h3', '動作風格與強度'],
        ['chips', ['安靜', '自然', '活潑', '想睡', '緊張', '俏皮', '隨性']],
        ['p', '強度有「弱／普通／強」。選擇風格時，耳朵和尾巴的細部設定會套用該風格的數值。<strong>隨性</strong>是在長時間靜止之間，夾雜單耳短促的抖動，以及中心偏向一側、快慢不一的尾巴擺動。'],
        ['img', 'kimagure.jpg', '隨性（きまぐれ）'],
        ['h3', '耳朵'],
        ['dl', [
          ['左右耳', '自動／同步／非同步。同步時可用「單耳動作比例」設定只有一邊耳朵抖動的機率。'],
          ['動作種類', '預設只有抖動，可以再加上「耳朵轉向」（慢慢朝外轉後停住）和「甩耳」（像甩掉水一樣甩動）。用行首的勾選框開關，「頻率（%）」決定比例。'],
        ]],
        ['h3', '尾巴'],
        ['dl', [
          ['動作', '連續擺動／間歇擺動。'],
          ['幅度與基本速度', '1 倍是一個週期 1.5 秒。'],
          ['柔軟度（%）', '數值越高，根部越穩，擺動像波一樣傳到尾端。0 為原本的動作。'],
          ['擺動中心與擺動快慢變化', '往某一側偏著擺／讓每一次擺動的速度有變化（詳細調整）。'],
          ['尾巴速度轉盤', '開啟「生成尾巴速度轉盤」後，可以在 VRChat 裡用轉盤調整待機尾巴的速度。耳朵和手勢連動的速度不受影響。'],
        ]],
        ['h3', '生成方式'],
        ['dl', [
          ['逐骨生成（建議）', '在整條骨鏈的每根骨骼寫入關鍵影格，適合沒有 PhysBone 的耳朵與尾巴。'],
          ['交給物理（備案）', '只驅動根部，其餘擺動交給 PhysBone。關鍵影格少、動作更柔和。'],
        ]],
        ['note', '動作方向不對時，到「骨骼與詳細調整」用方向修正調整軸向。大多數角色用預設值就可以。'],
      ]},
      gesture: { id: 'gesture', nav: '手勢連動', title: '手勢連動（Gesture Link・產品版）', blocks: [
        ['lead', '依「左右手（GestureLeft / GestureRight）→ F2～F8 → 反應類型 → 耳朵與尾巴」的順序設定。'],
        ['img', 'ui_gesture.png', '「手勢連動」分頁（F3 / Open，畫面為日文介面）'],
        ['h3', '反應類型'],
        ['dl', [
          ['無', '這個手勢不會驅動耳朵或尾巴。'],
          ['姿勢', '讓耳朵／尾巴倒向 2D 盤設定的方向。Fist 會依扳機按壓程度在 0～100% 間變化，其他手勢一比出來就是 100%。'],
          ['連續動作', '手勢持續時，循環播放所選風格的耳朵或尾巴動作。'],
          ['部位分配', '分別替耳朵與尾巴指定「無／姿勢／動作」。'],
        ]],
        ['h3', '用 2D 盤決定方向'],
        ['pad', 'ear'], ['pad', 'tail'],
        ['list', [
          '離中心越遠，倒得越多。左右是以角色本身看出去的方向。',
          '2D 盤與轉盤用拖曳調整，<strong>點兩下回到中心（0）</strong>。',
          '耳朵選「同方向」時兩耳左右對稱做同樣動作，「反方向」則另一隻耳朵做相反動作。',
          '想直接輸入 XYZ 時打開「方向調整」。輸入 XYZ 後，在你再次拖動 2D 盤之前都會使用 XYZ 的值。',
          '選取 Fist 時，可以用「預覽姿勢進度 (%)」確認不同按壓程度的樣子。',
        ]],
        ['h3', '手勢中停止待機動作'],
        ['p', '位於「FX 設定」中（預設開啟）。手勢動到的部位，在手勢期間暫停待機動作。關閉時，手勢的姿勢／動作會疊加在待機動作上。不論先生成待機或手勢連動，都會依 FX 內的圖層自動設定。'],
        ['img', 'ui_fx.png', 'FX 設定（F2 / Fist，畫面為日文介面）'],
        ['note', '「複製到其他手勢」可以把目前手勢的設定複製到另一個手勢或全部手勢。顯示名稱不會被複製。'],
      ]},
      set2: { id: 'set2', nav: '第二組耳朵與尾巴', title: '第二組耳朵與尾巴', blocks: [
        ['p', '在各分頁上方開啟「啟用第二組」，就能切換第一組／第二組來編輯。動作與速度共用，只有軸向修正分組調整。生成與更新會輸出所有啟用的組。'],
        ['img', 'set2.jpg', '第二組耳朵與尾巴'],
        ['note', '第二組的骨骼請手動指定（自動偵測只針對第一組）。這不是讓兩組各自用不同動作、速度的功能。'],
      ]},
      output: { id: 'output', nav: '生成與 FX', title: '生成、更新與 FX Controller', blocks: [
        ['dl', [
          ['預覽', '在 Unity Editor 中確認動作。生成或更新前，修改不會寫入資產或 FX。'],
          ['生成', '建立新的 Animation Clip 與ゆらもふ用的 FX 圖層。'],
          ['更新', '把目前設定套用到已生成的資料。'],
          ['自動加入 FX', '在角色的 FX Controller 加入播放生成動作的圖層。待機與手勢連動圖層皆為 Additive（固定 Write Defaults ON），會疊加在角色本身的動作上。'],
          ['儲存位置與更新通知', '在「待機擺動」→「FX 與儲存位置」設定。'],
        ]],
        ['note', 'Unity 的 Undo 無法完整還原 Animator Controller 的圖層。請先看過生成前顯示的確認清單，必要時先備份。', 'warn'],
        ['p', '解除安裝：執行 <code>黒猫Dev → YuraMofu (ゆらもふ) → Uninstall from Active Avatar</code>，即可從 FX 移除ゆらもふ加入的圖層。'],
      ]},
      faq: { id: 'faq', nav: '常見問題', title: '常見問題', blocks: [
        ['faq', [
          ['有 PhysBone 的耳朵和尾巴也能用嗎？', '可以。用狀態列的「檢查相容性」確認 PhysBone 的 Is Animated 等設定。想把擺動交給 PhysBone 時，生成方式請選「交給物理」。'],
          ['可以和 FaceEmo 一起用嗎？', '請依 FaceEmo → ゆらもふ的順序生成。FaceEmo 重新生成時會重建 FX，請指定新的 FX 後再重新生成ゆらもふ。'],
          ['更新工具後要做什麼？', '匯入後按「更新」，修正就會套用到既有的輸出；缺少的輸出請按「生成」。'],
          ['動作方向不對', '待機動作請用「骨骼與詳細調整」的方向修正；手勢連動的姿勢直接用 2D 盤調整方向。'],
          ['會連上網路嗎？', '每天只檢查一次最新版本，不會傳送專案或角色的任何資訊。可在「FX 與儲存位置」關閉，離線也能使用。'],
          ['設定存在哪裡？', '視窗設定以專案為單位，保存最後一組。「清空設定」可以回到預設值（不會刪除已生成的動畫和圖層）。'],
        ]],
        ['p', '遇到問題時，請透過 BOOTH 的訊息聯絡。'],
      ]},
      log: { id: 'log', nav: '更新紀錄', title: '更新紀錄', blocks: [
        ['log', [
          ['1.5.0', '', [
            '手勢連動的姿勢改用 2D 盤操作取代 XYZ（耳朵另有「轉向」轉盤）',
            '新增「手勢中停止待機動作」（預設開啟）',
            '手勢連動圖層改為 Additive，不再蓋掉角色本身的擺動與 AFK 動作',
            '依按壓程度（GestureWeight）變化改為只限 Fist',
          ]],
          ['1.4.0', '2026-11-02', [
            '尾巴新增「柔軟度（%）」',
            '修正間歇模式的尾巴只往一邊甩、甩不回來的問題',
          ]],
          ['1.3.1', '2026-10-28', [
            '修正與表情停用功能（Triturbo 等）併用時，耳朵與尾巴位置卡住的問題',
            '修正手勢連動耳朵「同方向／反方向」在部分角色上相反的問題',
            '軸向與方向選項會標示該角色實際的動作',
          ]],
          ['1.3.0', '', [
            '新增「隨性」風格',
            '左右同步時可設定單耳動作比例',
            '尾巴新增「擺動中心」與「擺動快慢變化」',
            '耳朵轉向與甩耳的頻率可調整',
          ]],
          ['1.2.2', '', [
            '第二組的切換移到各分頁上方',
            'F2～F8 按鈕會顯示各槽的反應',
            '狀態列改為依分頁顯示',
          ]],
          ['1.2.1', '', [
            '減輕預覽負載',
            '支援可選的第二組耳朵與尾巴',
          ]],
          ['1.2.0', '', [
            '整理待機／手勢連動介面',
            '新增待機尾巴速度轉盤',
          ]],
        ]],
      ]},
    },
  },
};
