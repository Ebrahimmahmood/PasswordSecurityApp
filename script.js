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
