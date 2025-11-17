document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.game')) return;

  // Данные
  const cognitionQuestions = [
    { text: "Исследователь измерил скорость света с помощью интерферометра Майкельсона.", type: "empirical" },
    { text: "Эйнштейн предложил теорию относительности.", type: "theoretical" },
    { text: "Биолог наблюдал деление клетки под микроскопом.", type: "empirical" },
    { text: "Физик вывел уравнение Шрёдингера.", type: "theoretical" },
    { text: "Химик зафиксировал температуру кипения.", type: "empirical" }
  ];

  const funcQuestions = [
    { text: "Вакцина спасла миллионы жизней.", options: ["Познавательная", "Мировоззренческая", "Производственная", "Социальная"], answer: 2 },
    { text: "Социологи предложили меры по интеграции.", options: ["Познавательная", "Социальная", "Культурная", "Просветительская"], answer: 1 },
    { text: "Открытие ДНК → генная инженерия.", options: ["Познавательная", "Производственная", "Мировоззренческая", "Все вышеперечисленные"], answer: 3 },
    { text: "Лекции формируют критическое мышление.", options: ["Производственная", "Просветительская", "Идеологическая", "Воспитательная"], answer: 1 },
    { text: "Учёные создали модель климата Земли.", options: ["Познавательная", "Прогностическая", "Производственная", "Социальная"], answer: 1 }
  ];

  const eduQuestions = [
    { text: "Экскурсия в музей боевой славы.", options: ["Экономическая", "Культурная", "Воспитательная", "Идеологическая"], answer: 3 },
    { text: "Практика на заводе → диплом техника.", options: ["Социальная", "Экономическая", "Культурная", "Воспитательная"], answer: 1 },
    { text: "Дети играют в «семью».", options: ["Идеологическая", "Воспитательная", "Культурная", "Социальная"], answer: 1 },
    { text: "Летняя школа для одарённых.", options: ["Экономическая", "Культурная", "Социальная", "Идеологическая"], answer: 2 },
    { text: "Уроки ОБЖ — действия при ЧС.", options: ["Экономическая", "Социальная", "Воспитательная", "Идеологическая"], answer: 2 }
  ];

  // Состояния игр
  let game1 = { index: 0, score: 0, attempts: 0 };
  let game2 = { index: 0, score: 0, attempts: 0 };
  let game3 = { index: 0, score: 0, attempts: 0 };

  // Вспомогательные
  const showFeedback = (id, text, correct) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      el.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
    }
  };
  const showNext = (id) => document.getElementById(id)?.style.setProperty('display', 'inline-block');
  const hideNext = (id) => document.getElementById(id)?.style.setProperty('display', 'none');

  // === ИГРА 1 ===
  const loadGame1 = () => {
    const q = cognitionQuestions[game1.index];
    document.getElementById('statement').textContent = q.text;
    hideNext('next-btn');
    showFeedback('feedback', '', false);
  };

  document.getElementById('btn-empirical')?.addEventListener('click', () => {
    const q = cognitionQuestions[game1.index];
    const correct = 'empirical' === q.type;
    game1.attempts++; if (correct) game1.score++;
    showFeedback('feedback', correct ? "✅ Верно!" : `❌ Это — ${q.type === 'empirical' ? 'эмпирическое' : 'теоретическое'} знание.`, correct);
    showNext('next-btn');
  });

  document.getElementById('btn-theoretical')?.addEventListener('click', () => {
    const q = cognitionQuestions[game1.index];
    const correct = 'theoretical' === q.type;
    game1.attempts++; if (correct) game1.score++;
    showFeedback('feedback', correct ? "✅ Верно!" : `❌ Это — ${q.type === 'empirical' ? 'эмпирическое' : 'теоретическое'} знание.`, correct);
    showNext('next-btn');
  });

  document.getElementById('next-btn')?.addEventListener('click', () => {
    game1.index = (game1.index + 1) % cognitionQuestions.length;
    if (game1.attempts >= 5) showResult(1);
    else loadGame1();
  });

  // === ИГРА 2 ===
  const loadGame2 = () => {
    const q = funcQuestions[game2.index];
    document.getElementById('func-statement').textContent = q.text;
    const cont = document.getElementById('func-options');
    if (cont) {
      cont.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = opt;
        btn.onclick = () => {
          const correct = i === q.answer;
          game2.attempts++; if (correct) game2.score++;
          showFeedback('func-feedback', correct ? "✅ Отлично!" : `❌ Правильно: «${q.options[q.answer]}»`, correct);
          showNext('next-func-btn');
        };
        cont.appendChild(btn);
      });
    }
    hideNext('next-func-btn');
    showFeedback('func-feedback', '', false);
  };

  document.getElementById('next-func-btn')?.addEventListener('click', () => {
    game2.index = (game2.index + 1) % funcQuestions.length;
    if (game2.attempts >= 5) showResult(2);
    else loadGame2();
  });

  // === ИГРА 3 ===
  const loadGame3 = () => {
    const q = eduQuestions[game3.index];
    document.getElementById('edu-statement').textContent = q.text;
    const cont = document.getElementById('edu-options');
    if (cont) {
      cont.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = opt;
        btn.onclick = () => {
          const correct = i === q.answer;
          game3.attempts++; if (correct) game3.score++;
          showFeedback('edu-feedback', correct ? "✅ Точно!" : `❌ Правильно: «${q.options[q.answer]}»`, correct);
          showNext('next-edu-btn');
        };
        cont.appendChild(btn);
      });
    }
    hideNext('next-edu-btn');
    showFeedback('edu-feedback', '', false);
  };

  document.getElementById('next-edu-btn')?.addEventListener('click', () => {
    game3.index = (game3.index + 1) % eduQuestions.length;
    if (game3.attempts >= 5) showResult(3);
    else loadGame3();
  });

  // === ФИНАЛЬНЫЙ ОТЧЁТ ===
  const showResult = (gameNum) => {
    let score = 0, attempts = 0, name = '';
    if (gameNum === 1) { score = game1.score; attempts = game1.attempts; name = "Уровни познания"; }
    if (gameNum === 2) { score = game2.score; attempts = game2.attempts; name = "Функции науки"; }
    if (gameNum === 3) { score = game3.score; attempts = game3.attempts; name = "Функции образования"; }

    // Создаём модальное окно
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;">
        <div class="modal" style="background:var(--secondary);border-radius:16px;padding:2rem;max-width:500px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
          <h3 style="color:var(--accent);margin-bottom:1rem;">📊 Результаты: ${name}</h3>
          <p style="font-size:1.4rem;margin:1.5rem 0;">${score} из ${attempts}</p>
          <p style="margin-bottom:1.5rem;">
            ${score === 5 ? "🏆 Идеально! Вы — будущий нобелевский лауреат!" :
              score >= 4 ? "🎉 Отлично! Прочная база знаний." :
              score >= 3 ? "👍 Хорошо! Есть что повторить." :
              "📚 Советуем перечитать раздел и попробовать снова."}
          </p>
          <button class="btn" onclick="this.closest('.modal-overlay').remove()" style="margin:0 auto;">Закрыть</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Сброс игры
    if (gameNum === 1) { game1 = { index: 0, score: 0, attempts: 0 }; loadGame1(); }
    if (gameNum === 2) { game2 = { index: 0, score: 0, attempts: 0 }; loadGame2(); }
    if (gameNum === 3) { game3 = { index: 0, score: 0, attempts: 0 }; loadGame3(); }
  };

  // Запуск
  if (document.getElementById('statement')) loadGame1();
  if (document.getElementById('func-statement')) loadGame2();
  if (document.getElementById('edu-statement')) loadGame3();
});
