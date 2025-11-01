// ===== Password Checker =====
const input = document.getElementById("passwordInput");
const text = document.getElementById("strengthText");

input.addEventListener("input", () => {
  const password = input.value;
  const strength = getStrength(password);
  text.textContent = `Strength: ${strength}`;
  text.style.color = getColor(strength);
});

function getStrength(password) {
  if (password.length < 6) return "Weak";
  if (!/[A-Z]/.test(password)) return "Medium";
  if (!/[0-9]/.test(password)) return "Medium";
  if (password.length >= 10 && /[!@#$%^&*]/.test(password)) return "Strong";
  return "Good";
}

function getColor(strength) {
  switch (strength) {
    case "Weak": return "red";
    case "Medium": return "orange";
    case "Good": return "yellow";
    case "Strong": return "lime";
  }
}

// ===== Lessons + Quiz =====
const startLessonBtn = document.getElementById("startLessonBtn");
const lessonQuizContainer = document.getElementById("lessonQuizContainer");
const lessonTitle = document.getElementById("lessonTitle");
const lessonText = document.getElementById("lessonText");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const quizContainer = document.getElementById("quizContainer");
const quizQuestion = document.getElementById("quizQuestion");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");

let currentStep = 0;

// Lessons
const lessons = [
  { 
    title: "Lesson 1: Strong Passwords", 
    text: "A strong password is at least 12 characters long, includes uppercase, lowercase, numbers, and symbols." 
  },
  { 
    title: "Lesson 2: Avoid Reusing Passwords", 
    text: "Do not reuse passwords across sites. If one site is hacked, all accounts are at risk." 
  }
];

// Quizzes
const quizzes = [
  {
    question: "Which password is strongest?",
    options: ["123456", "Password1!", "abcdefg"],
    answer: 1
  },
  {
    question: "Should you reuse passwords across sites?",
    options: ["Yes", "No", "Sometimes"],
    answer: 1
  }
];

// ===== Functions =====
function showLesson(index) {
  lessonTitle.textContent = lessons[index].title;
  lessonText.textContent = lessons[index].text;
  quizContainer.style.display = "none";
  nextBtn.style.display = "inline-block";
}

function showQuiz(index) {
  quizQuestion.textContent = quizzes[index].question;
  option1.textContent = quizzes[index].options[0];
  option2.textContent = quizzes[index].options[1];
  option3.textContent = quizzes[index].options[2];
  quizContainer.style.display = "block";
  nextBtn.style.display = "none";
}

// ===== Event Listeners =====
startLessonBtn.addEventListener("click", () => {
  startLessonBtn.style.display = "none";
  lessonQuizContainer.style.display = "block";
  currentStep = 0;
  showLesson(currentStep);
});

nextBtn.addEventListener("click", () => {
  if(currentStep < lessons.length - 1) {
    currentStep++;
    showLesson(currentStep);
  } else {
    // all lessons done, go to quizzes
    showQuiz(0);
    currentStep = 0;
  }
});

backBtn.addEventListener("click", () => {
  lessonQuizContainer.style.display = "none";
  startLessonBtn.style.display = "inline-block";
});

// Quiz buttons
[option1, option2, option3].forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if(i === quizzes[currentStep].answer) alert("✅ Correct!");
    else alert("❌ Wrong!");

    currentStep++;
    if(currentStep < quizzes.length) {
      showQuiz(currentStep);
    } else {
      alert("🎉 You finished all lessons and quizzes!");
      lessonQuizContainer.style.display = "none";
      startLessonBtn.style.display = "inline-block";
    }
  });
});
