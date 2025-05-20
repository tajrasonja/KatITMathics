let gameOver = false;
let coins = parseInt(localStorage.getItem("kat_coins")) || 0;
let quizCooldown = false;

let hunger = parseInt(localStorage.getItem("kat_hunger")) || 100;
let fun = parseInt(localStorage.getItem("kat_fun")) || 100;
let cleanliness = parseInt(localStorage.getItem("kat_cleanliness")) || 100;

function showExerciseTab(tabId) {
  document.getElementById("lessons-tab").style.display = "none";
  document.getElementById("quizzes-tab").style.display = "none";

  const tab = document.getElementById(`${tabId}-tab`);
  if (tab) tab.style.display = "block";
}

function startQuizTab() {
  showExerciseTab('quizzes');
  setTimeout(() => {
    showTopic('quiz-section');
    startQuiz();
  }, 0);
}

function goTo(section) {
    document.getElementById("home").style.display = "none";
    document.getElementById("exercises").style.display = "none";
    document.getElementById("pet").style.display = "none";
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("logic-quiz-section").style.display = "none";
  
    document.getElementById(section).style.display = "block";
  }

function updateStats() {
  document.getElementById("hunger").textContent = hunger;
  document.getElementById("fun").textContent = fun;
  document.getElementById("cleanliness").textContent = cleanliness;

  const img = document.getElementById("pou");

  if (hunger === 0 || fun === 0 || cleanliness === 0) {
    img.src = "ripkat.png";
    gameOver = true;
    disableButtons();
    clearInterval(statIntervalId);
    document.getElementById("game-over").style.display = "block";
  } else if (hunger < 20 || fun < 20 || cleanliness < 20) {
    img.src = "sadkat.png";
  } else if (hunger < 50 || fun < 50 || cleanliness < 50) {
    img.src = "midkat.png";
  } else {
    img.src = "happykat.png";
  }

  localStorage.setItem("kat_hunger", hunger);
  localStorage.setItem("kat_fun", fun);
  localStorage.setItem("kat_cleanliness", cleanliness);
}

function updateCoins() {
  document.getElementById("coin-count").textContent = coins;
  localStorage.setItem("kat_coins", coins);
}

function feed() {
    if (coins >= 5) {
      coins -= 5;
      hunger = Math.min(100, hunger + 10);
      updateCoins();
      updateStats();
    } else {
      shakeCoinBox();
    }
  }
  
  function play() {
    if (coins >= 5) {
      coins -= 5;
      fun = Math.min(100, fun + 10);
      updateCoins();
      updateStats();
    } else {
      shakeCoinBox();
    }
  }
  
  function clean() {
    if (coins >= 5) {
      coins -= 5;
      cleanliness = Math.min(100, cleanliness + 10);
      updateCoins();
      updateStats();
    } else {
      shakeCoinBox();
    }
  }

  function shakeCoinBox() {
    const box = document.getElementById("coin-display");
    box.classList.add("shake");
    setTimeout(() => {
      box.classList.remove("shake");
    }, 500);
  }

function disableButtons() {
  document.querySelectorAll("#buttons button").forEach(btn => {
    btn.disabled = true;
  });
}

setInterval(() => {
    if (!gameOver) {
      hunger = Math.max(0, hunger - 1);
      updateStats();
    }
  }, 90000);


function resetGame() {
  hunger = 100;
  fun = 100;
  cleanliness = 100;
  coins = 0;
  gameOver = false;

  localStorage.removeItem("kat_hunger");
  localStorage.removeItem("kat_fun");
  localStorage.removeItem("kat_cleanliness");
  localStorage.removeItem("kat_coins");

  document.querySelectorAll("#buttons button").forEach(btn => {
    btn.disabled = false;
  });

  document.getElementById("game-over").style.display = "none";

  updateStats();
  updateCoins();

  statIntervalId = setInterval(() => {
    if (!gameOver) {
      cleanliness = Math.max(0, cleanliness - 1);
      updateStats();
    }
  }, 120000);
}

setInterval(() => {
    if (!gameOver) {
      fun = Math.max(0, fun - 1);
      updateStats();
    }
  }, 70000);

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('clock').textContent = time;
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (query === 'pet' || query === 'my pet') goTo('pet');
  else if (query === 'exercises' || query === 'tests') goTo('exercises');
  else if (query === 'home') goTo('home');
  else alert("No matching section found.");
});

function showTopic(topicId) {
  const topics = document.querySelectorAll(".exercise-topic");
  topics.forEach(t => t.style.display = "none");

  const target = document.getElementById(topicId);
  if (target) {
    target.style.display = "block";
  }

  if (topicId === "quiz-section") {
    startQuiz();
  }
}

const quizPool = [
  { question: "What is the hexadecimal equivalent of decimal 94?", options: ["5F", "5E", "5D"], answer: "5E" },
  { question: "What is the hexadecimal equivalent of decimal 127?", options: ["7F", "7E", "80"], answer: "7F" },
  { question: "What is the hexadecimal equivalent of decimal 247?", options: ["F7", "F6", "F8"], answer: "F7" },
  { question: "What is the hexadecimal equivalent of decimal 124?", options: ["7B", "7D", "7C"], answer: "7C" },
  { question: "What is the octal equivalent of decimal 43?", options: ["54", "53", "52"], answer: "53" },
  { question: "What is the binary equivalent of decimal 18?", options: ["10010", "10011", "10100"], answer: "10010" },
  { question: "What is the decimal equivalent of binary 1111?", options: ["15", "14", "16"], answer: "15" },
  { question: "What is the hexadecimal equivalent of binary 11001110?", options: ["CE", "CF", "CD"], answer: "CE" },
  { question: "What is the octal equivalent of binary 101101?", options: ["55", "54", "56"], answer: "55" },
  { question: "What is the decimal equivalent of hexadecimal 2A?", options: ["42", "41", "43"], answer: "42" },
  { question: "What is the hexadecimal equivalent of decimal 255?", options: ["FF", "FE", "F0"], answer: "FF" },
  { question: "What is the octal equivalent of decimal 100?", options: ["144", "100", "110"], answer: "144" },
  { question: "What is the binary equivalent of hexadecimal A3?", options: ["10100011", "10110011", "10100111"], answer: "10100011" },
  { question: "What is the decimal equivalent of octal 77?", options: ["63", "64", "63"], answer: "63" },
  { question: "What is the binary equivalent of octal 25?", options: ["010101", "0010101", "10101"], answer: "010101" },
  { question: "What is the octal equivalent of decimal 78?", options: ["116", "115", "117"], answer: "116" },
  { question: "What is the binary equivalent of decimal 31?", options: ["11111", "11110", "11101"], answer: "11111" },
  { question: "What is the hexadecimal equivalent of decimal 200?", options: ["C8", "C9", "CB"], answer: "C8" },
  { question: "What is the decimal equivalent of octal 25?", options: ["21", "20", "22"], answer: "21" },
  { question: "What is the binary equivalent of hexadecimal 1F?", options: ["11111", "11110", "10111"], answer: "11111" },
  { question: "What is the octal equivalent of binary 11010?", options: ["32", "33", "34"], answer: "32" },
  { question: "What is the decimal equivalent of hexadecimal 3E?", options: ["62", "63", "61"], answer: "62" },
  { question: "What is the hexadecimal equivalent of octal 77?", options: ["3F", "1F", "FF"], answer: "3F" },
  { question: "What is the octal equivalent of decimal 59?", options: ["73", "71", "72"], answer: "73" },
  { question: "What is the binary equivalent of decimal 64?", options: ["1000000", "111111", "1000001"], answer: "1000000" }
];

const logicQuizPool = [
    { question: "What is the result of TRUE AND FALSE?", options: ["TRUE", "FALSE"], answer: "FALSE" },
    { question: "What is the result of NOT TRUE?", options: ["FALSE", "TRUE"], answer: "FALSE" },
    { question: "TRUE OR FALSE gives?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "What is the result of TRUE AND TRUE?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "What is the result of FALSE OR FALSE?", options: ["FALSE", "TRUE"], answer: "FALSE" },
    { question: "NOT FALSE is?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "According to the identity law, TRUE AND TRUE equals?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "According to the identity law, FALSE OR TRUE equals?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "According to the domination law, TRUE OR anything is?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "According to the domination law, FALSE AND anything is?", options: ["FALSE", "TRUE"], answer: "FALSE" },
    { question: "What does the idempotent law say about TRUE OR TRUE?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "According to the inverse law, A OR NOT A is always?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "According to the inverse law, A AND NOT A is always?", options: ["FALSE", "TRUE"], answer: "FALSE" },
    { question: "What is the result of NOT(NOT(TRUE))?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "Is AND commutative? (A AND B = B AND A)", options: ["Yes", "No"], answer: "Yes" },
    { question: "Is OR associative? ((A OR B) OR C = A OR (B OR C))", options: ["Yes", "No"], answer: "Yes" },
    { question: "What is the result of TRUE AND (FALSE OR TRUE)?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "What is the result of (TRUE AND FALSE) OR TRUE?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "TRUE AND NOT FALSE is?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "FALSE OR NOT FALSE is?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "NOT(TRUE AND TRUE) is?", options: ["FALSE", "TRUE"], answer: "FALSE" },
    { question: "NOT(FALSE OR FALSE) is?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "TRUE AND TRUE AND TRUE is?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "FALSE OR FALSE OR TRUE is?", options: ["TRUE", "FALSE"], answer: "TRUE" },
    { question: "According to distributive law: A AND (B OR C) = ?", options: ["(A AND B) OR (A AND C)", "(A OR B) AND (A OR C)"], answer: "(A AND B) OR (A AND C)" },
    { question: "According to distributive law: A OR (B AND C) = ?", options: ["(A OR B) AND (A OR C)", "(A AND B) OR (A AND C)"], answer: "(A OR B) AND (A OR C)" },
    { question: "NOT(NOT(FALSE)) is?", options: ["FALSE", "TRUE"], answer: "FALSE" },
    { question: "TRUE OR TRUE AND FALSE is?", options: ["TRUE", "FALSE"], answer: "TRUE" }
  ];

  const scratchQuizPool = [
    { question: "What block starts a Scratch program?", options: ["when green flag clicked", "forever", "if"], answer: "when green flag clicked" },
    { question: "Which block lets a sprite move 10 steps?", options: ["go to", "move 10 steps", "turn 15 degrees"], answer: "move 10 steps" },
    { question: "Which block is used for repetition?", options: ["repeat", "say", "go to"], answer: "repeat" },
    { question: "How do you make a sprite say something?", options: ["say Hello!", "move 10 steps", "wait 1 sec"], answer: "say Hello!" },
    { question: "Which block creates decisions?", options: ["if then", "wait", "turn"], answer: "if then" }
  ];
  
  let scratchCurrentQuestion = 0;
  let scratchScore = 0;
  let scratchSelectedQuestions = [];
  let scratchTimer = 60;
  let scratchCountdown;
  
  function startScratchQuizTab() {
    showExerciseTab('quizzes');
    setTimeout(() => {
      showTopic('scratch-quiz-section');
      startScratchQuiz();
    }, 0);
  }
  
  function startScratchQuiz() {
    scratchCurrentQuestion = 0;
    scratchScore = 0;
    scratchSelectedQuestions = scratchQuizPool.sort(() => 0.5 - Math.random()).slice(0, 5);
    showScratchQuestion(scratchCurrentQuestion);
  }
  
  function showScratchQuestion(index) {
    const q = scratchSelectedQuestions[index];
    const box = document.getElementById("scratch-quiz-question-box");
    box.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;
    q.options.forEach(opt => {
      box.innerHTML += `<label><input type="radio" name="scratch-option" value="${opt}"> ${opt}</label><br>`;
    });
  
    document.getElementById("scratch-quiz-result").textContent = "";
    document.getElementById("scratch-next-button").style.display = "inline-block";
    document.getElementById("scratch-replay-button").style.display = "none";
  
    scratchTimer = 60;
    updateScratchTimerDisplay();
    clearInterval(scratchCountdown);
    scratchCountdown = setInterval(() => {
      scratchTimer--;
      updateScratchTimerDisplay();
      if (scratchTimer <= 0) nextScratchQuestion();
    }, 1000);
  }
  
  function updateScratchTimerDisplay() {
    document.getElementById("scratch-quiz-timer").textContent = `Time left: ${scratchTimer}s`;
  }
  
  function nextScratchQuestion() {
    clearInterval(scratchCountdown);
    const selected = document.querySelector("input[name='scratch-option']:checked");
    if (selected && selected.value === scratchSelectedQuestions[scratchCurrentQuestion].answer) {
      scratchScore++;
      coins++;
      updateCoins();
      saveUserData();
    }
  
    scratchCurrentQuestion++;
    if (scratchCurrentQuestion < scratchSelectedQuestions.length) {
      showScratchQuestion(scratchCurrentQuestion);
    } else {
      finishScratchQuiz();
    }
  }
  
  function finishScratchQuiz() {
    document.getElementById("scratch-quiz-question-box").innerHTML = "";
    document.getElementById("scratch-quiz-timer").textContent = "";
    document.getElementById("scratch-next-button").style.display = "none";
    document.getElementById("scratch-quiz-result").textContent = `You scored ${scratchScore} out of ${scratchSelectedQuestions.length}`;
    
    const replayBtn = document.getElementById("scratch-replay-button");
    replayBtn.style.display = "none";
  
    const timerBox = document.getElementById("scratch-quiz-retry-timer");
    let retryTime = 30;
    timerBox.textContent = `Retry in ${retryTime}s`;
    timerBox.style.display = "block";
  
    const retryInterval = setInterval(() => {
      retryTime--;
      timerBox.textContent = `Retry in ${retryTime}s`;
      if (retryTime <= 0) {
        clearInterval(retryInterval);
        timerBox.style.display = "none";
        replayBtn.style.display = "inline-block";
      }
    }, 1000);
  }

let currentQuestion = 0;
let score = 0;
let timer = 60;
let countdown;
let selectedQuestions = [];

function getRandomQuestions(count) {
  const shuffled = quizPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function showQuestion(index) {
  const q = selectedQuestions[index];
  const box = document.getElementById("quiz-question-box");
  box.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;
  q.options.forEach(opt => {
    box.innerHTML += `<label><input type="radio" name="option" value="${opt}"> ${opt}</label><br>`;
  });

  document.getElementById("quiz-result").textContent = "";
  document.getElementById("next-button").style.display = "inline-block";
  document.getElementById("replay-button").style.display = "none";

  timer = 60;
  updateTimerDisplay();
  clearInterval(countdown);
  countdown = setInterval(() => {
    timer--;
    updateTimerDisplay();
    if (timer <= 0) {
      nextQuestion();
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById("quiz-timer").textContent = `Time left: ${timer}s`;
}

function nextQuestion() {
  clearInterval(countdown);
  const selected = document.querySelector("input[name='option']:checked");
  if (selected && selected.value === selectedQuestions[currentQuestion].answer) {
    score++;
    coins += 1;
    updateCoins();
  }

  currentQuestion++;
  if (currentQuestion < selectedQuestions.length) {
    showQuestion(currentQuestion);
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById("quiz-question-box").innerHTML = "";
  document.getElementById("quiz-timer").textContent = "";
  document.getElementById("next-button").style.display = "none";
  document.getElementById("quiz-result").textContent = `You scored ${score} out of ${selectedQuestions.length}`;
  const replayBtn = document.getElementById("replay-button");
replayBtn.style.display = "none";

const timerBox = document.getElementById("quiz-retry-timer");
let retryTime = 30;
timerBox.textContent = `Retry in ${retryTime}s`;
timerBox.style.display = "block";

const retryInterval = setInterval(() => {
  retryTime--;
  timerBox.textContent = `Retry in ${retryTime}s`;

  if (retryTime <= 0) {
    clearInterval(retryInterval);
    timerBox.style.display = "none";
    replayBtn.style.display = "inline-block";
  }
}, 1000);
}


  
    currentQuestion = 0;
    score = 0;
    selectedQuestions = getRandomQuestions(5);
    showQuestion(currentQuestion);

  function startLogicQuizTab() {
    showExerciseTab('quizzes');
    setTimeout(() => {
      showTopic('logic-quiz-section');
      startLogicQuiz();
    }, 0);
  }
  
  let logicCurrentQuestion = 0;
  let logicScore = 0;
  let logicSelectedQuestions = [];
  let logicTimer = 60;
  let logicCountdown;
  
  function startLogicQuiz() {
    logicCurrentQuestion = 0;
    logicScore = 0;
    logicSelectedQuestions = getRandomLogicQuestions(5);
    showLogicQuestion(logicCurrentQuestion);
  }
  
  function getRandomLogicQuestions(count) {
    const shuffled = logicQuizPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  function showLogicQuestion(index) {
    const q = logicSelectedQuestions[index];
    const box = document.getElementById("logic-quiz-question-box");
    box.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;
    q.options.forEach(opt => {
      box.innerHTML += `<label><input type="radio" name="logic-option" value="${opt}"> ${opt}</label><br>`;
    });
  
    document.getElementById("logic-quiz-result").textContent = "";
    document.getElementById("logic-next-button").style.display = "inline-block";
    document.getElementById("logic-replay-button").style.display = "none";
  
    logicTimer = 60;
    updateLogicTimerDisplay();
    clearInterval(logicCountdown);
    logicCountdown = setInterval(() => {
      logicTimer--;
      updateLogicTimerDisplay();
      if (logicTimer <= 0) {
        nextLogicQuestion();
      }
    }, 1000);
  }
  
  function updateLogicTimerDisplay() {
    document.getElementById("logic-quiz-timer").textContent = `Time left: ${logicTimer}s`;
  }
  
  function nextLogicQuestion() {
    clearInterval(logicCountdown);
    const selected = document.querySelector("input[name='logic-option']:checked");
    if (selected && selected.value === logicSelectedQuestions[logicCurrentQuestion].answer) {
      logicScore++;
      coins += 1;
      updateCoins();
      saveUserData();
    }
  
    logicCurrentQuestion++;
    if (logicCurrentQuestion < logicSelectedQuestions.length) {
      showLogicQuestion(logicCurrentQuestion);
    } else {
      finishLogicQuiz();
    }
  }
  
  function finishLogicQuiz() {
    document.getElementById("logic-quiz-question-box").innerHTML = "";
    document.getElementById("logic-quiz-timer").textContent = "";
    document.getElementById("logic-next-button").style.display = "none";
    document.getElementById("logic-quiz-result").textContent = `You scored ${logicScore} out of ${logicSelectedQuestions.length}`;
    const replayBtn = document.getElementById("logic-replay-button");
    replayBtn.style.display = "none";
  
    const timerBox = document.getElementById("logic-quiz-retry-timer");
    let retryTime = 30;
    timerBox.textContent = `Retry in ${retryTime}s`;
    timerBox.style.display = "block";
  
    const retryInterval = setInterval(() => {
      retryTime--;
      timerBox.textContent = `Retry in ${retryTime}s`;
  
      if (retryTime <= 0) {
        clearInterval(retryInterval);
        timerBox.style.display = "none";
        replayBtn.style.display = "inline-block";
      }
    }, 1000);
  }
  
  let currentUser = null;

function getUsers() {
  return JSON.parse(localStorage.getItem("kath_users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("kath_users", JSON.stringify(users));
}

function login() {
  const username = document.getElementById("auth-username").value.trim();
  const password = document.getElementById("auth-password").value;

  const users = getUsers();

  if (users[username] && users[username].password === password) {
    currentUser = username;
    localStorage.setItem("kath_currentUser", username);
    document.getElementById("auth-screen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
    loadUserData();
  } else {
    document.getElementById("auth-msg").textContent = "Invalid username or password.";
  }
}

function register() {
  const username = document.getElementById("auth-username").value.trim();
  const password = document.getElementById("auth-password").value;

  const users = getUsers();

  if (users[username]) {
    document.getElementById("auth-msg").textContent = "Username already exists.";
    return;
  }

  if (username.length === 0 || password.length === 0) {
    document.getElementById("auth-msg").textContent = "Username and password required.";
    return;
  }

  users[username] = {
    password,
    coins: 0,
    hunger: 100,
    fun: 100,
    cleanliness: 100
  };

  saveUsers(users);
  document.getElementById("auth-msg").textContent = "Account created! You can now log in.";
}

window.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("kath_currentUser");
    if (user) {
      currentUser = user;
      document.getElementById("auth-screen").style.display = "none";
      document.getElementById("home-screen").style.display = "block";
      loadUserData();
    }
  });

function loadUserData() {
  const users = getUsers();
  if (!users[currentUser]) return;

  const data = users[currentUser];
  coins = data.coins;
  hunger = data.hunger;
  fun = data.fun;
  cleanliness = data.cleanliness;

  updateCoins();
  updateStats();
}

function saveUserData() {
  const users = getUsers();
  if (!users[currentUser]) return;

  users[currentUser] = {
    ...users[currentUser],
    coins,
    hunger,
    fun,
    cleanliness
  };

  saveUsers(users);
}


updateStats();
updateCoins();


