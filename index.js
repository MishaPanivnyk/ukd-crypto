const fs = require("fs");
const pidCrypt = require("pidcrypt");

// Хешування пароля та збереження в файл
function hashAndSavePassword(password, filename) {
  const hashedPassword = pidCrypt.hash(password);
  fs.writeFileSync(filename, hashedPassword);
}

// Порівняння рядка пароля з зашифрованим значенням з файлу
function comparePasswordWithFile(password, filename) {
  const hashedPassword = fs.readFileSync(filename, "utf8");
  return hashedPassword === pidCrypt.hash(password);
}

// Отримання аргументів з командного рядка та виклик функцій
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Usage: node index.js <password> <filename>");
  process.exit(1);
}

const password = args[0];
const filename = args[1];

// Хешування та збереження пароля в файл
hashAndSavePassword(password, filename);
console.log(`Password hashed and saved to file: ${filename}`);

// Порівняння рядка пароля з зашифрованим значенням з файлу
const isMatch = comparePasswordWithFile(password, filename);
console.log(`Password matches: ${isMatch}`);
