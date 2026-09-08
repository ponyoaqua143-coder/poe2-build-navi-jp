// PoE2 Build Navi JP - shared site behavior
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Highlight current nav link
  var path = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".main-nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (href !== "/" && path.indexOf(href) === 0)) {
      a.classList.add("active");
    }
  });
});

// --- Class diagnosis quiz -------------------------------------------------
// Each answer awards points to one or more classes. Highest total wins.
var CLASS_INFO = {
  warrior: {
    name: "ウォリアー",
    tagline: "前線で殴り合う近接アタッカー",
    desc: "斧・メイス・スタッフを使った近接攻撃と地属性の力を扱うクラス。高い体力とアーマーで最前線に立ち、力押しでボスを削るプレイが好きな人向け。操作もシンプルで初心者に優しい。"
  },
  monk: {
    name: "モンク",
    tagline: "スピード重視のハイブリッド近接",
    desc: "クォータースタッフや徒手空拳、精霊(スピリット)を組み合わせて戦うテクニカルなクラス。回避と機動力を活かした立ち回りが得意で、操作に慣れてきた中級者にもおすすめ。"
  },
  ranger: {
    name: "レンジャー",
    tagline: "弓を使った遠距離アタッカー",
    desc: "弓を主軸に、罠やケガレ(ガル)などのユーティリティを組み合わせる遠距離職。被弾を避けながら安全に立ち回りたい人向け。移動しながら攻撃するプレイスタイルが特徴。"
  },
  mercenary: {
    name: "マーサリー",
    tagline: "クロスボウで弾幕を張る火力職",
    desc: "クロスボウと各種グレネードを使い分ける遠距離アタッカー。属性や状態異常を切り替えながら戦うため、装備やスキルの組み合わせを研究するのが好きな人に向いている。"
  },
  sorceress: {
    name: "ソーサレス",
    tagline: "元素魔法で敵を殲滅する魔法職",
    desc: "火・冷気・雷などの元素魔法を扱う遠距離アタッカー。防御力は低めだが範囲攻撃と火力が高く、敵を近づけずに倒す立ち回りが好きな人向け。序盤はやや操作難度が高め。"
  },
  witch: {
    name: "ウィッチ",
    tagline: "召喚・呪い・血の力を操る闇の魔法職",
    desc: "ミニオン召喚や呪い、血(ブラッド)を消費する呪術など、じわじわと相手を追い詰めるスタイルのクラス。自分の分身に戦わせる召喚プレイに興味がある人におすすめ。"
  },
  huntress: {
    name: "ハントレス",
    tagline: "槍と俊敏さで戦うスピードアタッカー",
    desc: "投げ槍とブレスレット(腕輪)を組み合わせた近~中距離アタッカー。素早い立ち回りとコンボ的なスキル連携が特徴で、動き回りながら戦うのが好きな人向け。"
  }
};

var QUIZ_QUESTIONS = [
  {
    q: "戦い方の好みは？",
    options: [
      { label: "接近して直接殴りたい", points: { warrior: 2, monk: 1, huntress: 1 } },
      { label: "距離を取って攻撃したい", points: { ranger: 2, mercenary: 1, sorceress: 1 } },
      { label: "魔法や特殊効果でじわじわ攻めたい", points: { witch: 2, sorceress: 1 } },
      { label: "スピード感のある立ち回りがしたい", points: { monk: 2, huntress: 2 } }
    ]
  },
  {
    q: "ARPG（Diablo系ゲーム）の経験は？",
    options: [
      { label: "初めてプレイする", points: { warrior: 2, ranger: 1 } },
      { label: "他のARPGは経験あり", points: { monk: 1, mercenary: 1, huntress: 1 } },
      { label: "PoE/PoE2をある程度触ったことがある", points: { sorceress: 1, witch: 1, mercenary: 1 } }
    ]
  },
  {
    q: "重視したいのは？",
    options: [
      { label: "生存力・安定感", points: { warrior: 2, ranger: 1 } },
      { label: "火力の高さ", points: { sorceress: 2, mercenary: 1 } },
      { label: "操作の奥深さ・やり込み要素", points: { monk: 2, witch: 1, huntress: 1 } },
      { label: "自分の代わりに戦ってもらいたい", points: { witch: 2 } }
    ]
  },
  {
    q: "使いたい武器のイメージは？",
    options: [
      { label: "斧・メイス・スタッフ", points: { warrior: 2, monk: 1 } },
      { label: "弓", points: { ranger: 2 } },
      { label: "クロスボウ・グレネード", points: { mercenary: 2 } },
      { label: "杖・魔導具", points: { sorceress: 2, witch: 1 } },
      { label: "槍", points: { huntress: 2 } }
    ]
  }
];

function renderQuiz() {
  var form = document.getElementById("class-quiz-form");
  if (!form) return;

  QUIZ_QUESTIONS.forEach(function (question, qi) {
    var wrap = document.createElement("div");
    wrap.className = "quiz-q";
    var title = document.createElement("p");
    title.className = "q-title";
    title.textContent = (qi + 1) + ". " + question.q;
    wrap.appendChild(title);

    question.options.forEach(function (opt, oi) {
      var label = document.createElement("label");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + qi;
      input.value = oi;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt.label));
      wrap.appendChild(label);
    });
    form.appendChild(wrap);
  });

  var submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "btn";
  submitBtn.textContent = "診断結果を見る";
  form.appendChild(submitBtn);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var scores = {};
    Object.keys(CLASS_INFO).forEach(function (k) { scores[k] = 0; });

    var answered = 0;
    QUIZ_QUESTIONS.forEach(function (question, qi) {
      var checked = form.querySelector('input[name="q' + qi + '"]:checked');
      if (!checked) return;
      answered++;
      var opt = question.options[parseInt(checked.value, 10)];
      Object.keys(opt.points).forEach(function (cls) {
        scores[cls] += opt.points[cls];
      });
    });

    var resultBox = document.getElementById("quiz-result");
    if (answered < QUIZ_QUESTIONS.length) {
      resultBox.className = "show";
      resultBox.innerHTML = "<p>すべての質問に回答してください。</p>";
      return;
    }

    var best = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; })[0];
    var info = CLASS_INFO[best];
    resultBox.className = "show";
    resultBox.innerHTML =
      "<h3>あなたにおすすめのクラスは「" + info.name + "」</h3>" +
      "<p><strong>" + info.tagline + "</strong></p>" +
      "<p>" + info.desc + "</p>" +
      '<p><a class="btn secondary" href="/guides/beginner.html">初心者ガイドを読む →</a></p>';
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

document.addEventListener("DOMContentLoaded", renderQuiz);
