// ゆらもふ オンラインガイド — 本文データ（ja / en / zh-Hant / ko）
// build.mjs がこのデータから index.html / en.html / zh.html / ko.html を生成します。
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
  version: '1.5.3',
  updated: '2026-11-11',
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
  'ui_ear_separate.png': [810, 290],
  'tail_chains.gif': [810, 378],
  'ui_tail_chains.png': [704, 372],
  'ui_ear_listen.png': [676, 190],
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
      badge: '製品版 v1.5.3 に対応',
      imageAlt: 'ゆらもふのメイン画像',
    },
    pad: {
      ear: { up: '前', down: '後ろ', left: '閉', right: '開', dial: '向き', dialIn: '内向き', dialOut: '外向き' },
      tail: { up: '上', down: '下', left: '左', right: '右' },
      earCap: '耳：パッドで倒す向き、ダイヤルで向き（内／外）', tailCap: '尻尾：パッドで倒す向き',
    },
    sections: {
      new: { id: 'new', nav: 'v1.5.3 の新機能', title: 'v1.5.3 の新機能', blocks: [
        ['lead', '尻尾に 2 本目以降のボーンを追加できるようになりました。ツインテールやエプロンのリボンなど、尻尾以外の揺れものもまとめて動かせます。'],
        ['img', 'tail_chains.gif', 'エプロンの左右のリボンを 1 組の尻尾として動かした例（そろえる／左右対称／別々）'],
        ['cards', [
          ['尻尾のボーンを追加', '「ボーン・詳細調整」の「+ チェーン追加」で 2 本目以降を追加します。強さ・速さなどの設定はすべてのチェーンで共通です。2 本以上あるときは「複数チェーンの動き」で、<strong>そろえる</strong>（同じ向きに揺れる）／<strong>左右対称</strong>（1 本目と鏡写し）／<strong>別々</strong>（それぞれのタイミング）を選びます。', 'ui_tail_chains.png'],
          ['耳の「聞き耳」', 'たまに耳をすっと立て、少し止まってから戻します。向き変え・ぶるっと振ると同じく、行頭のチェックと「頻度 (%)」で設定します。ON にした動きの合計は 100% までで、残りが「ぴくっ」になります。', 'ui_ear_listen.png'],
        ]],
        ['list', [
          'スタイルを選んだあとに値を手で変えると、スタイルの横に「調整済み」と表示されます。「スタイルに戻す」でスタイルの値に戻せます。別のスタイルを選ぶときは、調整した内容を上書きしてよいか確認します。',
          '各スタイル本来のリズムが常に使われるようになりました。「活発さ」はスタイルのリズムを基準に速く・遅くします。「そわそわ」は、耳を立てて左右交互に外を見る動きになりました。',
          'アバターを指定すると、自動でボーンを検出するようになりました。',
          '生成・更新前の確認画面にも、FaceEmo の WriteDefaults についての注意を表示します。',
          'アンインストール前に、削除する内容の一覧を確認できるようになりました。尻尾速度のダイヤル（FX パラメーター・メニュー項目）と、ジェスチャー中に待機を止めるための Animation Clip もあわせて削除します。',
          'ツール画面（日本語）の「手勢」を「ジェスチャー」に統一しました。',
        ]],
        ['note', '既存の出力に反映するには、ツールを更新したあと「更新」を実行してください。', 'warn'],
        ['h3', 'v1.5.2 の新機能'],
        ['p', 'FaceEmo と併用したときの注意表示と、尻尾の動きの改善を追加しました。'],
        ['list', [
          'FaceEmo を「WriteDefaults オフ（表情優先）」で適用していると、ツール画面に警告が出るようになりました。耳・尻尾が埋まったり、ねじれたりする原因になります。警告が出たら、FaceEmo で「WriteDefaults 統一（ギミック優先）」を選び、「アバターに適用」をやり直してください。',
          'FX に WriteDefaults オフのステートがあり、FaceEmo の設定だけでは直らない場合も、その旨を表示します。',
          '尻尾の動きが「たまに」のとき、揺れの終わりでぴたっと止まらず、だんだん小さくなって自然に収まるようになりました。',
          'Expressions Menu・Parameters を設定していない（VRChat 標準のままの）アバターに速度ダイヤルを追加すると、VRCEmote や表情用のパラメータが消えてしまう問題を修正しました。',
        ]],
        ['note', '尻尾の動きと速度ダイヤルの修正は、ツールを更新したあと「更新」を実行すると既存の出力に反映されます。', 'warn'],
      ]},
      start: { id: 'start', nav: 'はじめに', title: 'はじめに', blocks: [
        ['note', '動作環境：Unity 2022.3 LTS 以降（Windows 版 Unity Editor）。FX への自動追加・ジェスチャー連動・尻尾速度のダイヤルには VRChat SDK3 Avatars が必要です。SDK がなくても基本の Animation Clip は生成できます。'],
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
        ['p', '強さは「弱め／ふつう／強め」。スタイルを選ぶと、耳・尻尾の細かな設定がそのスタイルの値になります。値を手で変えると「調整済み」と表示され、「スタイルに戻す」で元に戻せます。<strong>きまぐれ</strong>は、長い静止の合間に片耳だけの短いぴくっと、中心が片側に寄った緩急のある尻尾の揺れが入るスタイルです。'],
        ['img', 'kimagure.jpg', 'きまぐれ'],
        ['h3', '耳'],
        ['dl', [
          ['耳の左右', 'おまかせ／同期／非同期。同期のときは「片耳だけ動く割合」で、片方だけぴくっと動く確率を設定できます。'],
          ['動きの種類', '通常はぴくっと動くだけですが、「耳の向き変え」（ゆっくり外へ向けて止まる）、「耳をぶるっと振る」（水を払うように振る）、「聞き耳」（すっと立てて少し止まる）を追加できます。行頭のチェックで ON/OFF、「頻度 (%)」で割合を決めます。ON にした動きの合計は 100% までで、残りが「ぴくっ」になります。'],
        ]],
        ['h3', '尻尾'],
        ['dl', [
          ['ボーン', '「+ チェーン追加」で 2 本目以降のボーン（ツインテール・リボンなど）を追加できます。「複数チェーンの動き」で、そろえる／左右対称／別々を選びます。'],
          ['動き', '連続振り子／間欠振り。'],
          ['振幅・基本速度', '1 倍は 1 周期 1.5 秒です。'],
          ['しなやかさ (%)', '上げるほど根元が落ち着き、揺れが波のように先へ伝わります。0 で従来どおり。'],
          ['振れの中心・揺れの緩急', '左右どちらかに寄せて揺らす／1 回ごとの速さにばらつきを付ける（詳細調整）。'],
          ['尻尾速度のダイヤル', '「尻尾速度のダイヤルを生成」を ON にすると、VRChat 内のダイヤルで待機中の尻尾の速さを変えられます。0% にすると尻尾は元の位置に戻って止まります。耳やジェスチャー連動の速さは変わりません。'],
        ]],
        ['h3', '生成方式'],
        ['dl', [
          ['ボーンごと（推奨）', 'チェーン全体のボーンにキーを書き込みます。PhysBone が入っていない耳・尻尾向け。'],
          ['物理まかせ（代替）', '根元だけを動かし、残りの揺れは PhysBone に任せます。キーが少なく柔らかい動きになります。'],
        ]],
        ['note', '動く方向がおかしいときは「ボーン・詳細調整」の方向補正で軸を直します。通常は初期設定のままで問題ありません。'],
      ]},
      gesture: { id: 'gesture', nav: 'ジェスチャー連動', title: 'ジェスチャー連動（Gesture Link・製品版）', blocks: [
        ['lead', '手（GestureLeft / GestureRight）→ F2～F8 → リアクションタイプ → 耳・尻尾の順に設定します。'],
        ['img', 'ui_gesture.png', '「ジェスチャー連動」タブ（F3 / Open）'],
        ['h3', 'リアクションタイプ'],
        ['dl', [
          ['なし', 'そのジェスチャーでは耳・尻尾を動かしません。'],
          ['ポーズ', 'パッドで決めた向きへ耳・尻尾を倒します。Fist はトリガーの押し具合で 0～100% に変化し、他のジェスチャーは押した瞬間に 100% になります。'],
          ['連続モーション', 'そのジェスチャーの間、選んだスタイルの耳・尻尾の動きを繰り返します。'],
          ['部位別', '耳と尻尾それぞれに「なし／ポーズ／モーション」を割り当てます。'],
        ]],
        ['h3', 'パッドで向きを決める'],
        ['pad', 'ear'], ['pad', 'tail'],
        ['list', [
          'パッドの中心から離すほど大きく倒れます。左右はアバター本人から見た向きです。',
          'パッドやダイヤルはドラッグで調整、<strong>ダブルクリックで中央（0）</strong>に戻ります。',
          '耳の「同方向」は両耳が左右対称に同じ動き、「反対方向」はもう片方の耳が逆の動きになります。「左耳だけ」「右耳だけ」は片方の耳だけが動き、「左右別々」は耳ごとにパッドで向きを決めます。',
          'XYZ で直接入力したいときは「方向の調整」を開きます。XYZ を入力すると、パッドを動かすまでは XYZ の値が使われます。',
          'Fist を選択中は「ポーズのプレビュー (%)」で押し具合ごとの見え方を確認できます。',
        ]],
        ['h3', 'ジェスチャー中は待機を止める'],
        ['p', '「FX 設定」にある設定です（初期値 ON）。ジェスチャーで動かしている部位の待機モーションを、その間だけ止めます。OFF にすると、ジェスチャーのポーズ・モーションが待機モーションの上に重なります。待機・ジェスチャー連動のどちらを先に生成しても、FX 内のレイヤーから自動で設定されます。'],
        ['img', 'ui_fx.png', 'FX 設定（F2 / Fist）'],
        ['note', '「他のジェスチャーへコピー」で、選択中のジェスチャーの設定を別のジェスチャー（またはすべてのジェスチャー）へコピーできます。表示名はコピーされません。'],
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
          ['FX に自動追加', 'アバターの FX Controller に、生成した動きを再生するレイヤーを追加します。待機・ジェスチャー連動のレイヤーは Additive（Write Defaults ON 固定）で、アバター本来の揺れの上に加算されます。'],
          ['保存先・更新通知', '「挙動・揺れ」→「FX・保存先」で設定します。'],
        ]],
        ['note', 'Unity の Undo では Animator Controller のレイヤーを完全には戻せません。生成前に表示される確認一覧を見てから実行し、必要ならバックアップを取ってください。', 'warn'],
        ['p', 'アンインストール：<code>黒猫Dev → YuraMofu (ゆらもふ) → Uninstall from Active Avatar</code> を実行すると、削除する内容の一覧が表示されます。確認後、ゆらもふが追加したレイヤー・パラメーター・メニュー項目を削除します。'],
      ]},
      faq: { id: 'faq', nav: 'よくある質問', title: 'よくある質問', blocks: [
        ['faq', [
          ['PhysBone が入った耳・尻尾でも使えますか？', '使えます。状態欄の「互換性を確認」で PhysBone の Is Animated などを確認できます。揺れを PhysBone に任せたいときは生成方式を「物理まかせ」にしてください。'],
          ['FaceEmo と一緒に使えますか？', 'FaceEmo → ゆらもふの順で生成してください。FaceEmo を再生成すると FX が作り直されるので、新しい FX を指定してゆらもふも再生成してください。'],
          ['ツールを更新したあと、何をすればいいですか？', 'インポート後に「更新」を実行すると、既存の出力に修正が反映されます。必要な出力がない場合は「生成」を実行してください。'],
          ['動く方向がおかしいです', '待機モーションは「ボーン・詳細調整」の方向補正、ジェスチャー連動のポーズはパッドで向きを直してください。'],
          ['Play Mode や VRChat で、耳が頭に埋まる・尻尾がねじれる・動きが固まります', 'FX の中で Write Defaults の ON / OFF が混ざっていると起こります。FaceEmo やフェイストラッキングの表情無効化機能（Triturbo の拡張など）が原因になることが多く、ゆらもふの待機モーション（Write Defaults ON が必要）の姿勢が崩れます。ボーンや方向の設定を変えても直りません。原因になっていそうなギミックを一時的に外して Play Mode で確認し、FX の Write Defaults を統一してください。FaceEmo を使う場合は、統一したうえで FaceEmo → ゆらもふの順で生成してください。直らない場合は <code>黒猫Dev → YuraMofu (ゆらもふ) → Copy Diagnostics</code> の結果を添えて BOOTH のメッセージでご連絡ください。'],
          ['インターネットに接続しますか？', '1 日 1 回、最新バージョンの確認だけを行います。プロジェクトやアバターの情報は送信しません。「FX・保存先」から無効にでき、オフラインでも使えます。'],
          ['設定はどこに保存されますか？', 'ウィンドウの設定は、プロジェクトごとに最後の 1 組を保存します。「設定をクリア」で初期値に戻せます（生成済みのアニメーションやレイヤーは削除しません）。'],
        ]],
        ['p', 'うまくいかないときは、BOOTH のメッセージからお問い合わせください。'],
      ]},
      log: { id: 'log', nav: '更新履歴', title: '更新履歴', blocks: [
        ['log', [
          ['1.5.3', '2026-11-11', [
            '尻尾に 2 本目以降のボーンを追加（そろえる／左右対称／別々）',
            '耳の動きに「聞き耳」を追加',
            'スタイルの「調整済み」表示と「スタイルに戻す」を追加、「そわそわ」の耳の動きを変更',
            'アバターを指定したときにボーンを自動検出',
            '生成・更新前の確認画面に FaceEmo の注意を表示',
            'アンインストール前に削除内容を確認し、速度ダイヤルの項目も削除',
          ]],
          ['1.5.2', '2026-11-09', [
            'FaceEmo を「WriteDefaults オフ（表情優先）」で適用しているときに警告を表示',
            '尻尾の動き「たまに」で、揺れが小さくなりながら自然に収まるように',
            '速度ダイヤルの追加で VRCEmote などの標準パラメータが消える問題を修正',
          ]],
          ['1.5.1', '2026-11-06', [
            'ジェスチャー連動のポーズで、左右の耳を別々に設定できる「左右別々」を追加',
            '「左耳だけ」「右耳だけ」を追加',
            '尻尾速度のダイヤルが 0% のとき、尻尾が元の位置に戻って止まるように',
            'ツール画面の韓国語（한국어）に対応',
          ]],
          ['1.5.0', '', [
            'ジェスチャー連動のポーズを XYZ からパッド操作に変更（耳は「向き」ダイヤル付き）',
            '「ジェスチャー中は待機を止める」を追加（初期値 ON）',
            'ジェスチャー連動レイヤーを Additive に変更し、アバター本来の揺れ・AFK モーションを止めないように',
            '押し具合（GestureWeight）で変化するのを Fist だけに変更',
          ]],
          ['1.4.0', '2026-11-02', [
            '尻尾に「しなやかさ (%)」を追加',
            '間欠振りの尻尾が片側に一度振るだけで戻りきらなかった問題を修正',
          ]],
          ['1.3.1', '2026-10-28', [
            '表情無効化機能（Triturbo など）との併用時に、耳・尻尾の位置が固定される問題を修正',
            'ジェスチャー連動の耳「同方向／反対方向」が一部のアバターで逆になっていた問題を修正',
            '軸・方向の選択肢に、アバターでの実際の動きを表示',
          ]],
          ['1.3.0', '2026-10-22', [
            '新スタイル「きまぐれ」を追加',
            '左右同期時に、片耳だけ動く割合を設定可能に',
            '尻尾の「振れの中心」と「揺れの緩急」を追加',
            '耳の向き変え・ぶるっと振るの頻度を調整可能に',
          ]],
          ['1.2.2', '2026-10-22', [
            '2組目の切り替えを各タブの上部に移動',
            'F2〜F8 のボタンに各スロットの反応を表示',
            '状態欄をタブごとの表示に整理',
          ]],
          ['1.2.1', '2026-10-01', [
            'プレビューの負荷を軽減',
            '任意の2組目の耳・尻尾に対応',
          ]],
          ['1.2.0', '2026-09-27', [
            '待機／ジェスチャー連動の UI を整理',
            '待機尻尾の速度ダイヤルを追加',
          ]],
          ['1.1.4', '', [
            'プレビューが動かないとき、その理由を表示',
            '診断情報をクリップボードへコピーする機能を追加',
            '更新のお知らせ機能を追加（1 日 1 回、最新バージョン番号のみ確認）',
          ]],
          ['1.1.3', '', [
            '生成方式に「物理まかせ」を追加',
            '耳の「向き変え」「ぶるっと振る」を追加',
            'ジェスチャー連動に「他のジェスチャーへコピー」を追加',
            '生成前に書き出すファイルと FX レイヤーを一覧で確認',
            'パラメータの型違い・PhysBone 制御下の警告を追加',
          ]],
          ['1.1.2', '', [
            '画面構成を整理し、詳細設定と出力設定を折りたたみ式に',
            '生成状態や設定不足を確認できるステータス表示を追加',
            'Gesture Link の「Mix」を「部位別」に変更',
          ]],
          ['1.1.1', '', [
            '生成済みデータを更新する「更新」ボタンを追加',
            '0～100% ポーズのプレビュー操作を改善',
            '耳の左右設定に「同期 / ミラー」を追加',
          ]],
          ['1.1.0', '', [
            '表情連動 UI を F2～F8 スロット形式に整理',
            'アンインストール時に生成 Animation Clip の削除確認を追加',
          ]],
          ['1.0.x', '', [
            '耳・尻尾の Idle Animation 生成',
            'リアルタイムプレビュー',
            'FX Controller への自動追加',
            'VRC Gesture 連動',
            'Uninstall from Active Avatar',
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
      badge: 'Covers product version v1.5.3',
      imageAlt: 'YuraMofu main image',
    },
    pad: {
      ear: { up: 'Fwd', down: 'Back', left: 'In', right: 'Out', dial: 'Turn', dialIn: 'In', dialOut: 'Out' },
      tail: { up: 'Up', down: 'Down', left: 'L', right: 'R' },
      earCap: 'Ears: the pad sets the tilt, the dial turns them in or out', tailCap: 'Tail: the pad sets the tilt',
    },
    sections: {
      new: { id: 'new', nav: 'New in v1.5.3', title: 'New in v1.5.3', blocks: [
        ['lead', 'The tail can now take more than one bone chain, so twin tails, apron ribbons and other swaying parts can move together.'],
        ['img', 'tail_chains.gif', 'Both apron ribbons driven as one tail (Together / Mirrored L/R / Separate)'],
        ['cards', [
          ['More tail chains', 'Add chains with + Add Chain under Bones & Details. Strength, speed and the other settings are shared by every chain. With two or more, Multiple Chains chooses how they move: <strong>Together</strong> (same direction), <strong>Mirrored L/R</strong> (mirror image of the first) or <strong>Separate</strong> (own timing).', 'ui_tail_chains.png'],
          ['Listen', 'Now and then the ears draw up, hold for a moment and settle, as if listening for something. Set it like Swivel and Shake, with the checkbox and Frequency (%). The enabled moves share up to 100%; the rest are twitches.', 'ui_ear_listen.png'],
        ]],
        ['list', [
          'If you change values after choosing a style, the style row shows "adjusted". Restore style brings back the style\'s values, and choosing another style asks before overwriting your adjustments.',
          'Each style now always uses its own rhythm, and Activity speeds it up or slows it down relative to that. Nervous now perks the ears up and has them take turns looking outward.',
          'Bones are detected automatically when you assign an avatar.',
          'The confirmation before Generate and Update also shows the FaceEmo Write Defaults warning.',
          'Uninstall now lists what it will remove and asks first. It also removes the tail speed dial (FX parameters and menu item) and the clips used to pause idle motion during gestures.',
        ]],
        ['note', 'After updating the tool, run Update to apply the changes to existing output.', 'warn'],
        ['h3', 'New in v1.5.2'],
        ['p', 'A warning for FaceEmo setups and a more natural tail motion.'],
        ['list', [
          'If FaceEmo is applied with "Disable WD (Expression Priority)", the tool now shows a warning. This can make the ears and tail sink in or twist. In FaceEmo, choose "Unify WD (Gimmick Priority)" and apply it to the avatar again.',
          'If the FX itself has Write Defaults OFF states, so changing FaceEmo alone will not help, the tool says so as well.',
          'With the tail set to Sometimes, each swing now dies down gradually instead of stopping dead.',
          'Fixed: adding the speed dial to an avatar that still uses VRChat\'s default Expressions Menu and Parameters removed VRCEmote and the face blend parameters.',
        ]],
        ['note', 'The tail motion and speed dial fixes reach existing output when you run Update after updating the tool.', 'warn'],
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
        ['p', 'Strength is Soft, Normal or Strong. Choosing a style sets the ear and tail details to that style\'s values. If you change values by hand, the style row shows "adjusted"; Restore style brings the style\'s values back. <strong>Whimsical</strong> adds long stillness broken by single, mostly one-ear twitches, and an off-centre tail swaying at an uneven tempo.'],
        ['img', 'kimagure.jpg', 'Whimsical (きまぐれ)'],
        ['h3', 'Ears'],
        ['dl', [
          ['Ear L/R', 'Auto, Sync or Async. In Sync, Single-Ear Share sets how often only one ear twitches.'],
          ['Motion types', 'By default the ears only twitch. Add Ear Swivel (turns slowly outward and holds), Ear Shake (flings the ear like shaking off water) and Listen (draws the ears up and holds for a moment). Each has a checkbox and a Frequency (%); the enabled moves share up to 100% and the rest are twitches.'],
        ]],
        ['h3', 'Tail'],
        ['dl', [
          ['Bones', 'Use + Add Chain to add more chains (twin tails, ribbons and so on). Multiple Chains chooses Together, Mirrored L/R or Separate.'],
          ['Motion', 'Continuous or Intermittent.'],
          ['Amplitude and base speed', '1x is a 1.5-second cycle.'],
          ['Suppleness (%)', 'Higher values calm the base and send the swing to the tip as a wave. 0 keeps the previous motion.'],
          ['Swing Center and Tempo Variation', 'Swing around an off-centre point / vary the speed of each swing (Detailed Settings).'],
          ['Tail speed dial', 'Turn on Generate Tail Speed Dial to change the idle tail speed with a dial in VRChat. At 0% the tail returns to its rest position and stops. Ear and Gesture Link speeds are unaffected.'],
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
          'For the ears, Same mirrors the motion on both ears, Opposite makes the other ear do the reverse. Left ear only / Right ear only move just that ear, and Separate L/R gives each ear its own pad.',
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
        ['p', 'Uninstall: <code>黒猫Dev → YuraMofu (ゆらもふ) → Uninstall from Active Avatar</code> lists what will be removed and, after you confirm, removes the layers, parameters and menu item YuraMofu added.'],
      ]},
      faq: { id: 'faq', nav: 'FAQ', title: 'FAQ', blocks: [
        ['faq', [
          ['Does it work with PhysBone ears and tails?', 'Yes. Use Check compatibility in the status bar to check Is Animated and more. To leave the sway to PhysBone, use the Physics-Friendly output mode.'],
          ['Can I use it with FaceEmo?', 'Generate FaceEmo first, then YuraMofu. Regenerating FaceEmo rebuilds the FX, so point YuraMofu at the new FX and regenerate it too.'],
          ['What should I do after updating the tool?', 'Run Update after importing to apply fixes to existing output. If some output is missing, run Generate.'],
          ['The motion goes the wrong way', 'For idle motion, use Axis Correction in Bones & Details. For gesture poses, set the direction on the pad.'],
          ['In Play Mode or VRChat, the ears sink into the head, the tail twists, or the motion freezes', 'This happens when the FX mixes Write Defaults ON and OFF. It is often caused by FaceEmo or a face tracking expression-disable feature (such as Triturbo add-ons), and it breaks the idle motion, which needs Write Defaults ON. Changing bones or directions will not fix it. Temporarily remove the likely gimmick, check in Play Mode, and make Write Defaults consistent across the FX. With FaceEmo, do this first, then generate FaceEmo and then YuraMofu. If it still does not work, please send the result of <code>黒猫Dev → YuraMofu (ゆらもふ) → Copy Diagnostics</code> through BOOTH messages.'],
          ['Does it connect to the internet?', 'Once a day it checks for the latest version only. No project or avatar information is sent. You can turn it off under FX & Save Location, and it works offline.'],
          ['Where are settings saved?', 'The window keeps the last set of settings per project. Clear Settings resets them (generated animations and layers are not deleted).'],
        ]],
        ['p', 'If something does not work, please contact me through BOOTH messages.'],
      ]},
      log: { id: 'log', nav: 'Changelog', title: 'Changelog', blocks: [
        ['log', [
          ['1.5.3', '2026-11-11', [
            'More than one tail chain (Together / Mirrored L/R / Separate)',
            'Added Listen to the ear motions',
            'Styles show "adjusted" with Restore style; new ear motion for Nervous',
            'Bones are detected when an avatar is assigned',
            'FaceEmo warning in the confirmation before Generate and Update',
            'Uninstall confirms first and also removes the speed dial items',
          ]],
          ['1.5.2', '2026-11-09', [
            'Warns when FaceEmo is applied with "Disable WD (Expression Priority)"',
            'Tail set to Sometimes: swings now die down naturally',
            'Fixed the speed dial removing VRCEmote and other default parameters',
          ]],
          ['1.5.1', '2026-11-06', [
            'Added Separate L/R for Gesture Link poses: set the left and right ears on their own pads',
            'Added Left ear only and Right ear only',
            'With the tail speed dial at 0%, the tail returns to rest and stops',
            'Korean UI (한국어)',
          ]],
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
          ['1.3.0', '2026-10-22', [
            'Added the Whimsical style',
            'Single-ear share for synced ears',
            'Added Swing Center and Tempo Variation for the tail',
            'Adjustable frequency for ear swivel and shake',
          ]],
          ['1.2.2', '2026-10-22', [
            'The second-set switch moved to the top of each tab',
            'F2-F8 buttons show each slot\'s reaction',
            'The status bar shows each tab\'s own items',
          ]],
          ['1.2.1', '2026-10-01', [
            'Lighter preview',
            'Optional second ear/tail set',
          ]],
          ['1.2.0', '2026-09-27', [
            'Reorganised the Idle Motion / Gesture Link UI',
            'Added the idle tail speed dial',
          ]],
          ['1.1.4', '', [
            'Shows why the preview is not running',
            'Added Copy Diagnostics to the clipboard',
            'Added the update notice (checks only the latest version number once a day)',
          ]],
          ['1.1.3', '', [
            'Added the Physics-Friendly output mode',
            'Added Ear Swivel and Ear Shake',
            'Added Copy To... for gestures',
            'A list of files and FX layers is shown before generating',
            'Warnings for mismatched parameter types and PhysBone-driven bones',
          ]],
          ['1.1.2', '', [
            'Reorganised the window with collapsible detail and output settings',
            'Added a status display for output state and missing settings',
            'Gesture Link \'Mix\' renamed to \'Per Part\'',
          ]],
          ['1.1.1', '', [
            'Added the Update button for existing output',
            'Improved the 0-100% pose preview',
            'Added Sync / Mirror for the ears',
          ]],
          ['1.1.0', '', [
            'Expression UI organised into F2-F8 slots',
            'Uninstall asks before deleting generated Animation Clips',
          ]],
          ['1.0.x', '', [
            'Ear and tail idle animation generation',
            'Real-time preview',
            'Automatic FX Controller setup',
            'VRC Gesture link',
            'Uninstall from Active Avatar',
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
      badge: '對應產品版 v1.5.3',
      imageAlt: 'ゆらもふ 主視覺',
    },
    pad: {
      ear: { up: '前', down: '後', left: '收', right: '開', dial: '轉向', dialIn: '朝內', dialOut: '朝外' },
      tail: { up: '上', down: '下', left: '左', right: '右' },
      earCap: '耳朵：2D 盤決定倒的方向，轉盤決定朝內／朝外', tailCap: '尾巴：2D 盤決定倒的方向',
    },
    sections: {
      new: { id: 'new', nav: 'v1.5.3 新功能', title: 'v1.5.3 新功能', blocks: [
        ['lead', '尾巴現在可以加上第 2 條以後的骨鏈，雙馬尾、圍裙緞帶等尾巴以外會擺動的部位也能一起動。'],
        ['img', 'tail_chains.gif', '把圍裙左右兩條緞帶當成一組尾巴來動的例子（一致／左右對稱／各自擺動，畫面為日文介面）'],
        ['cards', [
          ['新增尾巴骨鏈', '在「骨骼與詳細調整」按「+ 新增骨鏈」加入第 2 條以後的骨鏈。強度、速度等設定所有骨鏈共用。有 2 條以上時，用「多條骨鏈的動作」選擇<strong>一致</strong>（往同一個方向擺）／<strong>左右對稱</strong>（和第 1 條鏡像）／<strong>各自擺動</strong>（各自的節奏）。', 'ui_tail_chains.png'],
          ['耳朵「傾聽」', '偶爾把耳朵豎起，停一下再放鬆，像在專心聽某個聲音。和轉向、甩耳一樣，用行首的勾選框和「傾聽頻率（%）」設定。開啟的動作合計最多 100%，其餘為抖動。', 'ui_ear_listen.png'],
        ]],
        ['list', [
          '選好風格後手動改了數值，風格旁會顯示「已調整」，按「恢復風格」可以回到風格的數值。改選其他風格時，會先確認是否覆蓋調整過的內容。',
          '每種風格現在都會使用自己的節奏，「活躍度」以風格的節奏為基準調快或調慢。「緊張」改成耳朵豎起、左右輪流往外看的動作。',
          '指定角色時會自動偵測骨骼。',
          '生成、更新前的確認畫面也會顯示 FaceEmo 的 WriteDefaults 提醒。',
          '解除安裝前會先列出要移除的內容並確認，也會一併移除尾巴速度轉盤（FX 參數、選單項目）和手勢中暫停待機用的 Animation Clip。',
        ]],
        ['note', '要套用到既有的輸出，請在更新工具後按「更新」。', 'warn'],
        ['h3', 'v1.5.2 新功能'],
        ['p', '新增和 FaceEmo 併用時的提醒，並讓尾巴的動作更自然。'],
        ['list', [
          'FaceEmo 以「WriteDefaults オフ（表情優先）」套用時，工具畫面會顯示警告。這會讓耳朵和尾巴陷進去或扭轉。看到警告時，請在 FaceEmo 改選「WriteDefaults 統一（ギミック優先）」，再按一次「アバターに適用」。',
          '如果 FX 本身有 WriteDefaults 關閉的狀態、只改 FaceEmo 的設定也無法解決，也會顯示說明。',
          '尾巴動作設為「偶爾」時，擺動結束不會突然停住，而是越擺越小、自然停下。',
          '修正在沒有設定 Expressions Menu・Parameters（維持 VRChat 預設）的角色加上速度轉盤時，VRCEmote 和表情用參數會消失的問題。',
        ]],
        ['note', '尾巴動作和速度轉盤的修正，更新工具後按「更新」就會套用到既有的輸出。', 'warn'],
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
        ['p', '強度有「弱／普通／強」。選擇風格時，耳朵和尾巴的細部設定會套用該風格的數值。手動改了數值時會顯示「已調整」，按「恢復風格」可以回到風格的數值。<strong>隨性</strong>是在長時間靜止之間，夾雜單耳短促的抖動，以及中心偏向一側、快慢不一的尾巴擺動。'],
        ['img', 'kimagure.jpg', '隨性（きまぐれ）'],
        ['h3', '耳朵'],
        ['dl', [
          ['左右耳', '自動／同步／非同步。同步時可用「單耳動作比例」設定只有一邊耳朵抖動的機率。'],
          ['動作種類', '預設只有抖動，可以再加上「耳朵轉向」（慢慢朝外轉後停住）、「甩耳」（像甩掉水一樣甩動）和「傾聽」（豎起耳朵停一下）。用行首的勾選框開關，「頻率（%）」決定比例。開啟的動作合計最多 100%，其餘為抖動。'],
        ]],
        ['h3', '尾巴'],
        ['dl', [
          ['骨骼', '用「+ 新增骨鏈」加入第 2 條以後的骨鏈（雙馬尾、緞帶等），在「多條骨鏈的動作」選擇一致／左右對稱／各自擺動。'],
          ['動作', '連續擺動／間歇擺動。'],
          ['幅度與基本速度', '1 倍是一個週期 1.5 秒。'],
          ['柔軟度（%）', '數值越高，根部越穩，擺動像波一樣傳到尾端。0 為原本的動作。'],
          ['擺動中心與擺動快慢變化', '往某一側偏著擺／讓每一次擺動的速度有變化（詳細調整）。'],
          ['尾巴速度轉盤', '開啟「生成尾巴速度轉盤」後，可以在 VRChat 裡用轉盤調整待機尾巴的速度，轉到 0% 時尾巴會回到原位停下。耳朵和手勢連動的速度不受影響。'],
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
          '耳朵選「同方向」時兩耳左右對稱做同樣動作，「反方向」則另一隻耳朵做相反動作；「只有左耳」「只有右耳」只動一隻耳朵，「左右分開」則每隻耳朵各用一個 2D 盤決定方向。',
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
        ['p', '解除安裝：執行 <code>黒猫Dev → YuraMofu (ゆらもふ) → Uninstall from Active Avatar</code> 會先列出要移除的內容，確認後移除ゆらもふ加入的圖層、參數和選單項目。'],
      ]},
      faq: { id: 'faq', nav: '常見問題', title: '常見問題', blocks: [
        ['faq', [
          ['有 PhysBone 的耳朵和尾巴也能用嗎？', '可以。用狀態列的「檢查相容性」確認 PhysBone 的 Is Animated 等設定。想把擺動交給 PhysBone 時，生成方式請選「交給物理」。'],
          ['可以和 FaceEmo 一起用嗎？', '請依 FaceEmo → ゆらもふ的順序生成。FaceEmo 重新生成時會重建 FX，請指定新的 FX 後再重新生成ゆらもふ。'],
          ['更新工具後要做什麼？', '匯入後按「更新」，修正就會套用到既有的輸出；缺少的輸出請按「生成」。'],
          ['動作方向不對', '待機動作請用「骨骼與詳細調整」的方向修正；手勢連動的姿勢直接用 2D 盤調整方向。'],
          ['在 Play Mode 或 VRChat 裡，耳朵陷進頭裡、尾巴扭轉，或動作卡住', 'FX 裡 Write Defaults 的 ON / OFF 混用時會發生。常見原因是 FaceEmo，或臉部追蹤的表情停用功能（Triturbo 擴充等），會讓ゆらもふ的待機動作（需要 Write Defaults ON）的姿勢跑掉。改骨骼或方向設定無法解決。請暫時拿掉可能有關的機關，在 Play Mode 確認，並把 FX 的 Write Defaults 統一。使用 FaceEmo 時，請先統一，再依 FaceEmo → ゆらもふ的順序生成。還是無法解決時，請附上 <code>黒猫Dev → YuraMofu (ゆらもふ) → Copy Diagnostics</code> 的結果，透過 BOOTH 訊息聯絡。'],
          ['會連上網路嗎？', '每天只檢查一次最新版本，不會傳送專案或角色的任何資訊。可在「FX 與儲存位置」關閉，離線也能使用。'],
          ['設定存在哪裡？', '視窗設定以專案為單位，保存最後一組。「清空設定」可以回到預設值（不會刪除已生成的動畫和圖層）。'],
        ]],
        ['p', '遇到問題時，請透過 BOOTH 的訊息聯絡。'],
      ]},
      log: { id: 'log', nav: '更新紀錄', title: '更新紀錄', blocks: [
        ['log', [
          ['1.5.3', '2026-11-11', [
            '尾巴可以加入第 2 條以後的骨鏈（一致／左右對稱／各自擺動）',
            '耳朵動作新增「傾聽」',
            '風格顯示「已調整」並可「恢復風格」；「緊張」的耳朵動作改變',
            '指定角色時自動偵測骨骼',
            '生成、更新前的確認畫面顯示 FaceEmo 提醒',
            '解除安裝前先確認，並一併移除速度轉盤相關項目',
          ]],
          ['1.5.2', '2026-11-09', [
            'FaceEmo 以「WriteDefaults オフ（表情優先）」套用時顯示警告',
            '尾巴動作「偶爾」的擺動會越來越小、自然停下',
            '修正加上速度轉盤時，VRCEmote 等預設參數會消失的問題',
          ]],
          ['1.5.1', '2026-11-06', [
            '手勢連動姿勢新增「左右分開」，左右耳朵可以各自設定',
            '新增「只有左耳」「只有右耳」',
            '尾巴速度轉盤為 0% 時，尾巴會回到原位停下',
            '工具介面支援韓文（한국어）',
          ]],
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
          ['1.3.0', '2026-10-22', [
            '新增「隨性」風格',
            '左右同步時可設定單耳動作比例',
            '尾巴新增「擺動中心」與「擺動快慢變化」',
            '耳朵轉向與甩耳的頻率可調整',
          ]],
          ['1.2.2', '2026-10-22', [
            '第二組的切換移到各分頁上方',
            'F2～F8 按鈕會顯示各槽的反應',
            '狀態列改為依分頁顯示',
          ]],
          ['1.2.1', '2026-10-01', [
            '減輕預覽負載',
            '支援可選的第二組耳朵與尾巴',
          ]],
          ['1.2.0', '2026-09-27', [
            '整理待機／手勢連動介面',
            '新增待機尾巴速度轉盤',
          ]],
          ['1.1.4', '', [
            '預覽無法執行時會顯示原因',
            '新增複製診斷資訊到剪貼簿',
            '新增更新通知（每天一次，只確認最新版本號）',
          ]],
          ['1.1.3', '', [
            '生成方式新增「交給物理」',
            '新增耳朵「轉向」與「甩耳」',
            '手勢連動新增「複製到其他手勢」',
            '生成前會列出要寫入的檔案與 FX 圖層',
            '新增參數型別不符、PhysBone 控制中的警告',
          ]],
          ['1.1.2', '', [
            '整理畫面，詳細設定與輸出設定改為可折疊',
            '新增顯示生成狀態與設定不足的狀態列',
            'Gesture Link 的「Mix」改名為「部位分配」',
          ]],
          ['1.1.1', '', [
            '新增更新已生成資料的「更新」按鈕',
            '改善 0～100% 姿勢的預覽操作',
            '耳朵左右新增「同步／鏡像」',
          ]],
          ['1.1.0', '', [
            '表情連動介面整理為 F2～F8 槽位',
            '卸載時會確認是否刪除生成的 Animation Clip',
          ]],
          ['1.0.x', '', [
            '耳朵／尾巴待機動畫生成',
            '即時預覽',
            '自動加入 FX Controller',
            'VRC 手勢連動',
            'Uninstall from Active Avatar',
          ]],
        ]],
      ]},
    },
  },

  // ───────────────────────────── 한국어 ─────────────────────────────
  ko: {
    langName: '한국어',
    title: '유라모후(ゆらもふ) 사용 가이드',
    description: 'VRChat 아바타용 귀・꼬리 애니메이션 생성 툴 「ゆらもふ(유라모후)」의 사용 가이드입니다.',
    skip: '본문으로 이동', toc: '목차', top: '맨 위로', close: '닫기', enlarge: '이미지 확대',
    updatedLabel: '최종 업데이트', footer: '이 페이지에는 툴 본체가 포함되어 있지 않습니다. 제품은 BOOTH에서 배포하고 있습니다.',
    hero: {
      eyebrow: 'YURAMOFU · USER GUIDE',
      headline: '귀는 쫑긋,<br>꼬리는 살랑.',
      lead: '유라모후는 아바타의 귀・꼬리 본으로 대기 모션과 제스처 연동 애니메이션을 만드는 Unity 에디터 확장입니다. 프리뷰로 확인한 뒤 생성하며, FX Controller에 레이어를 추가하는 작업까지 자동으로 할 수 있습니다.',
      start: '처음 설정하기', booth: 'BOOTH 상품 페이지',
      badge: '풀 버전 v1.5.3 기준',
      imageAlt: '유라모후 메인 이미지',
    },
    pad: {
      ear: { up: '앞', down: '뒤', left: '닫힘', right: '열림', dial: '방향', dialIn: '안쪽', dialOut: '바깥쪽' },
      tail: { up: '위', down: '아래', left: '좌', right: '우' },
      earCap: '귀: 패드로 기울일 방향, 다이얼로 안쪽/바깥쪽 방향', tailCap: '꼬리: 패드로 기울일 방향',
    },
    sections: {
      new: { id: 'new', nav: 'v1.5.3 새 기능', title: 'v1.5.3 새 기능', blocks: [
        ['lead', '꼬리에 두 번째 이후의 본 체인을 추가할 수 있게 되었습니다. 트윈테일이나 앞치마 리본 등 꼬리가 아닌 흔들리는 부분도 함께 움직일 수 있습니다.'],
        ['img', 'tail_chains.gif', '앞치마 좌우 리본을 꼬리 한 세트로 움직인 예(함께 / 좌우 대칭 / 따로, 화면은 일본어)'],
        ['cards', [
          ['꼬리 본 추가', '「본・세부 조정」의 「+ 체인 추가」로 두 번째 이후의 체인을 추가합니다. 강도・속도 등의 설정은 모든 체인이 공유합니다. 두 개 이상일 때는 「여러 체인의 움직임」에서 <strong>함께</strong>(같은 방향으로 흔들림) / <strong>좌우 대칭</strong>(첫 번째 체인과 거울처럼) / <strong>따로</strong>(각자의 타이밍)를 고릅니다.', 'ui_tail_chains.png'],
          ['귀 기울이기', '가끔 귀를 세우고 잠시 멈췄다가 돌아옵니다. 무언가에 귀를 기울이는 듯한 움직임입니다. 방향 바꾸기・털기와 마찬가지로 앞의 체크와 「귀 기울이기 빈도 (%)」로 설정합니다. 켠 움직임의 합계는 100%까지이며, 나머지는 쫑긋하는 움직임이 됩니다.', 'ui_ear_listen.png'],
        ]],
        ['list', [
          '스타일을 고른 뒤 값을 직접 바꾸면 스타일 옆에 「조정됨」이 표시되고, 「스타일로 복원」으로 스타일 값으로 되돌릴 수 있습니다. 다른 스타일을 고를 때는 조정한 내용을 덮어써도 되는지 확인합니다.',
          '각 스타일 고유의 리듬이 항상 적용되며, 「활발함」은 그 리듬을 기준으로 빠르게 또는 느리게 합니다. 「안절부절」은 귀를 세우고 좌우 번갈아 바깥쪽을 보는 움직임이 되었습니다.',
          '아바타를 지정하면 본을 자동으로 감지합니다.',
          '생성・업데이트 전 확인 화면에도 FaceEmo의 WriteDefaults 주의 사항을 표시합니다.',
          '제거하기 전에 삭제할 항목 목록을 확인할 수 있습니다. 꼬리 속도 다이얼(FX 파라미터・메뉴 항목)과 제스처 중 대기 모션 정지용 Animation Clip도 함께 삭제합니다.',
        ]],
        ['note', '기존 출력에 반영하려면 툴을 업데이트한 뒤 「업데이트」를 실행해 주세요.', 'warn'],
        ['h3', 'v1.5.2 새 기능'],
        ['p', 'FaceEmo와 함께 쓸 때의 경고를 추가하고, 꼬리 움직임을 더 자연스럽게 했습니다.'],
        ['list', [
          'FaceEmo가 「WriteDefaults オフ（表情優先）」로 적용되어 있으면 툴 화면에 경고가 표시됩니다. 귀・꼬리가 파묻히거나 뒤틀리는 원인이 됩니다. 경고가 나오면 FaceEmo에서 「WriteDefaults 統一（ギミック優先）」을 선택하고 「アバターに適用」을 다시 실행해 주세요.',
          'FX 자체에 WriteDefaults가 꺼진 스테이트가 있어서 FaceEmo 설정만으로는 고쳐지지 않는 경우에도 안내를 표시합니다.',
          '꼬리 움직임이 「가끔」일 때, 흔들림이 끝날 때 뚝 멈추지 않고 점점 작아지며 자연스럽게 멈춥니다.',
          'Expressions Menu・Parameters를 설정하지 않은(VRChat 기본 그대로인) 아바타에 속도 다이얼을 추가하면 VRCEmote와 표정용 파라미터가 사라지는 문제를 수정했습니다.',
        ]],
        ['note', '꼬리 움직임과 속도 다이얼 수정은 툴을 업데이트한 뒤 「업데이트」를 실행하면 기존 출력에 반영됩니다.', 'warn'],
      ]},
      start: { id: 'start', nav: '시작하기', title: '시작하기', blocks: [
        ['note', '툴 화면은 오른쪽 위의 「KO」로 한국어로 바꿀 수 있습니다(v1.5.1 이후). 이 가이드의 스크린샷은 일본어 화면입니다.'],
        ['note', '동작 환경: Unity 2022.3 LTS 이상(Windows판 Unity Editor). FX 자동 추가, 제스처 연동, 꼬리 속도 다이얼에는 VRChat SDK3 Avatars가 필요합니다. SDK가 없어도 기본 Animation Clip은 생성할 수 있습니다.'],
        ['steps', [
          ['임포트해서 열기', 'unitypackage를 프로젝트에 임포트하고 메뉴의 <code>黒猫Dev → YuraMofu (ゆらもふ) → Open Window</code>를 엽니다. 작업 전에 프로젝트를 백업하는 것을 권장합니다.'],
          ['아바타를 지정하고 「자동 감지」', 'Scene에 있는 아바타를 「아바타」 칸에 넣고 「자동 감지」를 누릅니다. 상태 표시줄의 귀・꼬리・FX가 ✓가 되면 준비 완료입니다. 검출 결과는 꼭 확인하고, 다르면 「본・세부 조정」에서 다시 지정하세요.'],
          ['스타일과 강도 고르기', '「대기 모션」 탭에서 모션 스타일과 강도를 고르고, 귀와 꼬리를 각각 조정합니다.'],
          ['프리뷰로 확인', '「미리보기」로 Scene에서 움직임을 확인합니다. 프리뷰 중에 바꾼 내용은 생성하기 전까지 에셋이나 FX에 기록되지 않습니다.'],
          ['생성 / 업데이트', '처음에는 「생성」, 이미 생성한 움직임을 바꿀 때는 「업데이트」를 누릅니다. 내보낼 파일과 추가・교체될 레이어 목록을 확인한 뒤 실행됩니다.'],
        ]],
        ['img', 'ui_idle.png', '「대기 모션」 탭(화면은 일본어)'],
      ]},
      idle: { id: 'idle', nav: '대기 모션', title: '대기 모션', blocks: [
        ['h3', '모션 스타일과 강도'],
        ['chips', ['얌전하게', '자연스럽게', '활발하게', '졸린 듯', '안절부절', '장난스럽게', '변덕스럽게']],
        ['p', '강도는 「약하게 / 보통 / 강하게」 중에서 고릅니다. 스타일을 고르면 귀・꼬리의 세부 설정이 그 스타일의 값으로 바뀝니다. 값을 직접 바꾸면 「조정됨」이 표시되며, 「스타일로 복원」으로 되돌릴 수 있습니다. <strong>변덕스럽게</strong>은 오래 가만히 있다가 가끔 한쪽 귀만 짧게 쫑긋하고, 꼬리는 한쪽으로 치우친 채 완급을 주며 흔들리는 스타일입니다.'],
        ['img', 'kimagure.jpg', '변덕스럽게 (きまぐれ)'],
        ['h3', '귀'],
        ['dl', [
          ['귀 좌우', '자동 / 동기 / 비동기. 동기일 때는 「한쪽 귀만 움직이는 비율」로 한쪽 귀만 쫑긋할 확률을 정할 수 있습니다.'],
          ['움직임 종류', '기본은 쫑긋하는 움직임뿐이지만, 「귀 방향 바꾸기」(천천히 바깥쪽으로 돌아가서 멈춤), 「귀 털기」(물기를 털듯이 흔듦), 「귀 기울이기」(귀를 세우고 잠시 멈춤)를 추가할 수 있습니다. 앞의 체크로 ON/OFF, 「빈도 (%)」로 비율을 정합니다. 켠 움직임의 합계는 100%까지이며, 나머지는 쫑긋하는 움직임이 됩니다.'],
        ]],
        ['h3', '꼬리'],
        ['dl', [
          ['본', '「+ 체인 추가」로 두 번째 이후의 본 체인(트윈테일・리본 등)을 추가할 수 있습니다. 「여러 체인의 움직임」에서 함께 / 좌우 대칭 / 따로를 고릅니다.'],
          ['움직임 모드', '연속 진자 / 간헐 흔들기.'],
          ['진폭・기본 속도', '1배는 한 주기 1.5초입니다.'],
          ['유연함 (%)', '올릴수록 뿌리 쪽은 차분해지고, 흔들림이 물결처럼 끝으로 전해집니다. 0이면 기존과 같습니다.'],
          ['흔들림 중심・흔들림 완급', '좌우 한쪽으로 치우쳐 흔들기 / 한 번 흔들 때마다 속도에 변화를 주기(세부 조정).'],
          ['꼬리 속도 다이얼', '「꼬리 속도 다이얼 생성」을 ON으로 하면 VRChat 안에서 다이얼로 대기 중인 꼬리 속도를 바꿀 수 있습니다. 0%로 하면 꼬리가 원래 위치로 돌아가서 멈춥니다. 귀와 제스처 연동의 속도는 바뀌지 않습니다.'],
        ]],
        ['h3', '생성 방식'],
        ['dl', [
          ['본마다 (권장)', '체인 전체의 본에 키를 기록합니다. PhysBone이 없는 귀・꼬리용입니다.'],
          ['물리에 맡기기 (대체)', '뿌리만 움직이고 나머지 흔들림은 PhysBone에 맡깁니다. 키가 적고 부드러운 움직임이 됩니다.'],
        ]],
        ['note', '움직이는 방향이 이상할 때는 「본・세부 조정」의 「방향 보정」으로 축을 고치세요. 보통은 기본 설정 그대로도 문제없습니다.'],
      ]},
      gesture: { id: 'gesture', nav: '제스처 연동', title: '제스처 연동(풀 버전)', blocks: [
        ['lead', '손(GestureLeft / GestureRight) → F2~F8 → 리액션 타입 → 귀・꼬리 순서로 설정합니다.'],
        ['img', 'ui_gesture.png', '「제스처 연동」 탭(F3 / Open, 화면은 일본어)'],
        ['h3', '리액션 타입'],
        ['dl', [
          ['없음', '그 제스처에서는 귀・꼬리를 움직이지 않습니다.'],
          ['포즈', '패드로 정한 방향으로 귀・꼬리를 기울입니다. Fist는 트리거를 누르는 정도에 따라 0~100%로 변하고, 다른 제스처는 누르는 순간 100%가 됩니다.'],
          ['연속 모션', '그 제스처를 하는 동안 고른 스타일의 귀・꼬리 움직임을 반복합니다.'],
          ['부위별', '귀와 꼬리에 각각 「없음 / 포즈 / 모션」을 지정합니다.'],
        ]],
        ['h3', '패드로 방향 정하기'],
        ['pad', 'ear'], ['pad', 'tail'],
        ['list', [
          '패드 중심에서 멀어질수록 크게 기울어집니다. 좌우는 아바타 본인이 본 방향입니다.',
          '패드와 다이얼은 드래그로 조정하고, <strong>더블클릭하면 중앙(0)</strong>으로 돌아갑니다.',
          '귀의 「같은 방향」은 양쪽 귀가 좌우 대칭으로 같은 움직임, 「반대 방향」은 다른 쪽 귀가 반대로 움직입니다. 「왼쪽 귀만」「오른쪽 귀만」은 한쪽 귀만 움직이고, 「좌우 따로」는 귀마다 패드로 방향을 정합니다.',
          'XYZ로 직접 입력하고 싶을 때는 「방향 조정」을 엽니다. XYZ를 입력하면 패드를 다시 움직이기 전까지 XYZ 값이 사용됩니다.',
          'Fist를 선택 중일 때는 「포즈 미리보기 (%)」로 누르는 정도별 모습을 확인할 수 있습니다.',
        ]],
        ['h3', '제스처 중에는 대기 모션 정지'],
        ['p', '「FX 설정」에 있는 설정입니다(기본값 ON). 제스처로 움직이는 부위의 대기 모션을 그동안만 멈춥니다. OFF로 하면 제스처의 포즈・모션이 대기 모션 위에 겹쳐집니다. 대기와 제스처 연동 중 어느 쪽을 먼저 생성해도 FX 안의 레이어를 보고 자동으로 설정됩니다.'],
        ['img', 'ui_fx.png', '「FX 설정」(F2 / Fist, 화면은 일본어)'],
        ['note', '「다른 제스처로 복사」로 선택 중인 제스처의 설정을 다른 제스처(또는 모든 제스처)에 복사할 수 있습니다. 표시 이름은 복사되지 않습니다.'],
      ]},
      set2: { id: 'set2', nav: '두 번째 귀・꼬리', title: '두 번째 귀・꼬리', blocks: [
        ['p', '각 탭 위쪽의 「두 번째 세트 사용」을 ON으로 하면 첫 번째/두 번째 세트를 전환하며 편집할 수 있습니다. 움직임과 속도는 공통이고, 축 보정만 세트별로 조정합니다. 생성・업데이트 시에는 활성화된 세트를 모두 출력합니다.'],
        ['img', 'set2.jpg', '두 번째 귀・꼬리'],
        ['note', '두 번째 세트의 본은 직접 지정해 주세요(「자동 감지」는 첫 번째 세트만 대상입니다). 두 세트를 각각 다른 움직임・속도로 움직이는 기능은 아닙니다.'],
      ]},
      output: { id: 'output', nav: '생성・FX', title: '생성・업데이트와 FX Controller', blocks: [
        ['dl', [
          ['미리보기', 'Unity Editor에서 움직임을 확인합니다. 프리뷰 중에 바꾼 내용은 생성・업데이트하기 전까지 에셋이나 FX에 반영되지 않습니다.'],
          ['생성', 'Animation Clip과 유라모후용 FX 레이어를 새로 만듭니다.'],
          ['업데이트', '이미 생성한 데이터에 현재 설정을 반영합니다.'],
          ['FX 자동 추가', '아바타의 FX Controller에 생성한 움직임을 재생하는 레이어를 추가합니다. 대기・제스처 연동 레이어는 Additive(Write Defaults ON 고정)이며, 아바타 본래의 움직임 위에 더해집니다.'],
          ['저장 위치・업데이트 알림', '「대기 모션」 → 「FX・저장 위치」에서 설정합니다.'],
        ]],
        ['note', 'Unity의 Undo로는 Animator Controller의 레이어를 완전히 되돌릴 수 없습니다. 생성 전에 표시되는 확인 목록을 보고 실행하고, 필요하면 백업해 두세요.', 'warn'],
        ['p', '제거: <code>黒猫Dev → YuraMofu (ゆらもふ) → Uninstall from Active Avatar</code>를 실행하면 삭제할 항목 목록이 표시되고, 확인 후 유라모후가 추가한 레이어・파라미터・메뉴 항목을 삭제합니다.'],
      ]},
      faq: { id: 'faq', nav: '자주 묻는 질문', title: '자주 묻는 질문', blocks: [
        ['faq', [
          ['PhysBone이 들어간 귀・꼬리에도 쓸 수 있나요?', '쓸 수 있습니다. 상태 표시줄의 「호환성 확인」로 PhysBone의 Is Animated 등을 확인할 수 있습니다. 흔들림을 PhysBone에 맡기고 싶을 때는 생성 방식을 「물리에 맡기기」로 해 주세요.'],
          ['FaceEmo와 함께 쓸 수 있나요?', 'FaceEmo → 유라모후 순서로 생성해 주세요. FaceEmo를 다시 생성하면 FX가 새로 만들어지므로, 새 FX를 지정해서 유라모후도 다시 생성해 주세요.'],
          ['툴을 업데이트한 뒤에는 무엇을 하면 되나요?', '임포트 후 「업데이트」를 실행하면 기존 출력에 수정 사항이 반영됩니다. 필요한 출력이 없으면 「생성」를 실행해 주세요.'],
          ['움직이는 방향이 이상해요', '대기 모션은 「본・세부 조정」의 「방향 보정」으로, 제스처 연동 포즈는 패드로 방향을 고쳐 주세요.'],
          ['Play Mode나 VRChat에서 귀가 머리에 파묻히거나, 꼬리가 비틀리거나, 움직임이 굳어요', 'FX 안에서 Write Defaults ON / OFF가 섞여 있으면 생깁니다. FaceEmo나 페이스 트래킹의 표정 비활성화 기능(Triturbo 확장 등)이 원인인 경우가 많으며, 유라모후의 대기 모션(Write Defaults ON 필요)의 자세가 무너집니다. 본이나 방향 설정을 바꿔도 고쳐지지 않습니다. 원인으로 보이는 기믹을 잠시 빼고 Play Mode에서 확인한 뒤, FX의 Write Defaults를 통일해 주세요. FaceEmo를 쓰는 경우에는 통일한 다음 FaceEmo → 유라모후 순서로 생성해 주세요. 그래도 고쳐지지 않으면 <code>黒猫Dev → YuraMofu (ゆらもふ) → Copy Diagnostics</code> 결과를 첨부해 BOOTH 메시지로 연락해 주세요.'],
          ['인터넷에 연결하나요?', '하루 한 번 최신 버전만 확인합니다. 프로젝트나 아바타 정보는 보내지 않습니다. 「FX・저장 위치」에서 끌 수 있으며, 오프라인에서도 사용할 수 있습니다.'],
          ['설정은 어디에 저장되나요?', '창의 설정은 프로젝트마다 마지막 한 세트를 저장합니다. 「설정 초기화」로 초기값으로 되돌릴 수 있습니다(생성한 애니메이션과 레이어는 삭제하지 않습니다).'],
        ]],
        ['p', '잘 되지 않을 때는 BOOTH 메시지로 문의해 주세요.'],
      ]},
      log: { id: 'log', nav: '업데이트 기록', title: '업데이트 기록', blocks: [
        ['log', [
          ['1.5.3', '2026-11-11', [
            '꼬리에 두 번째 이후의 본 체인 추가(함께 / 좌우 대칭 / 따로)',
            '귀 움직임에 「귀 기울이기」 추가',
            '스타일 「조정됨」 표시와 「스타일로 복원」 추가, 「안절부절」의 귀 움직임 변경',
            '아바타 지정 시 본 자동 감지',
            '생성・업데이트 전 확인 화면에 FaceEmo 주의 사항 표시',
            '제거 전에 확인하고, 속도 다이얼 항목도 함께 삭제',
          ]],
          ['1.5.2', '2026-11-09', [
            'FaceEmo가 「WriteDefaults オフ（表情優先）」로 적용되어 있을 때 경고 표시',
            '꼬리 움직임 「가끔」의 흔들림이 점점 작아지며 자연스럽게 멈추도록',
            '속도 다이얼을 추가하면 VRCEmote 등 기본 파라미터가 사라지는 문제 수정',
          ]],
          ['1.5.1', '2026-11-06', [
            '제스처 연동 포즈에 「좌우 따로」 추가: 왼쪽 귀와 오른쪽 귀를 각각 설정',
            '「왼쪽 귀만」「오른쪽 귀만」 추가',
            '꼬리 속도 다이얼이 0%일 때 꼬리가 원래 위치로 돌아가서 멈추도록 변경',
            '툴 화면 한국어 지원',
          ]],
          ['1.5.0', '', [
            '제스처 연동 포즈를 XYZ에서 패드 조작으로 변경(귀는 「방향」 다이얼 포함)',
            '「제스처 중에는 대기 모션 정지」 추가(기본값 ON)',
            '제스처 연동 레이어를 Additive로 바꿔 아바타 본래의 흔들림・AFK 모션을 멈추지 않도록 변경',
            '누르는 정도(GestureWeight)에 따라 변하는 것을 Fist만으로 변경',
          ]],
          ['1.4.0', '2026-11-02', [
            '꼬리에 「유연함 (%)」 추가',
            '간헐적 흔들기 꼬리가 한쪽으로 한 번만 흔들리고 완전히 돌아오지 않던 문제 수정',
          ]],
          ['1.3.1', '2026-10-28', [
            '표정 무효화 기능(Triturbo 등)과 함께 쓸 때 귀・꼬리 위치가 고정되던 문제 수정',
            '제스처 연동 귀의 「같은 방향 / 반대 방향」가 일부 아바타에서 반대로 되던 문제 수정',
            '축・방향 선택지에 아바타에서의 실제 움직임 표시',
          ]],
          ['1.3.0', '2026-10-22', [
            '새 스타일 「변덕스럽게」 추가',
            '좌우 동기일 때 한쪽 귀만 움직이는 비율을 설정 가능',
            '꼬리의 「흔들림 중심」과 「완급」 추가',
            '귀 방향 바꾸기・털기의 빈도 조정 가능',
          ]],
          ['1.2.2', '2026-10-22', [
            '두 번째 세트 전환을 각 탭 위쪽으로 이동',
            'F2~F8 버튼에 각 슬롯의 반응 표시',
            '상태 표시줄을 탭별 표시로 정리',
          ]],
          ['1.2.1', '2026-10-01', [
            '프리뷰 부하 감소',
            '선택 사항인 두 번째 귀・꼬리 지원',
          ]],
          ['1.2.0', '2026-09-27', [
            '대기 / 제스처 연동 UI 정리',
            '대기 꼬리 속도 다이얼 추가',
          ]],
          ['1.1.4', '', [
            '프리뷰가 움직이지 않을 때 그 이유를 표시',
            '진단 정보를 클립보드에 복사하는 기능 추가',
            '업데이트 알림 기능 추가(하루 한 번 최신 버전 번호만 확인)',
          ]],
          ['1.1.3', '', [
            '생성 방식에 「물리에 맡기기(Physics-Friendly)」 추가',
            '귀의 「방향 바꾸기」「털기」 추가',
            '제스처 연동에 「다른 제스처로 복사」 추가',
            '생성 전에 내보낼 파일과 FX 레이어를 목록으로 확인',
            '파라미터 타입 불일치・PhysBone 제어 중 경고 추가',
          ]],
          ['1.1.2', '', [
            '화면 구성을 정리하고 세부 설정과 출력 설정을 접을 수 있게 변경',
            '생성 상태와 부족한 설정을 확인할 수 있는 상태 표시 추가',
            '제스처 연동의 「Mix」를 「부위별」로 변경',
          ]],
          ['1.1.1', '', [
            '생성한 데이터를 갱신하는 「업데이트」 버튼 추가',
            '0~100% 포즈의 프리뷰 조작 개선',
            '귀 좌우 설정에 「동기 / 미러」 추가',
          ]],
          ['1.1.0', '', [
            '표정 연동 UI를 F2~F8 슬롯 형식으로 정리',
            '제거 시 생성한 Animation Clip 삭제 확인 추가',
          ]],
          ['1.0.x', '', [
            '귀・꼬리 대기 애니메이션 생성',
            '실시간 프리뷰',
            'FX Controller 자동 추가',
            'VRC 제스처 연동',
            'Uninstall from Active Avatar',
          ]],
        ]],
      ]},
    },
  },
};
