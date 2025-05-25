const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;
const SECRET_KEY = "secret_key";

let users = []; // 임시 유저 저장소

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // 쿠키 허용
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// 회원가입
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
  }
  users.push({ username, password });
  res.json({ message: "회원가입 성공" });
});

// 로그인
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "사용자 정보가 올바르지 않습니다." });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // production 환경에서는 true + HTTPS
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // 1시간
  });

  res.json({ message: "로그인 성공" });
});

// 인증 확인
app.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "인증되지 않음" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ username: decoded.username });
  } catch (err) {
    res.status(403).json({ message: "토큰이 유효하지 않음" });
  }
});

// 로그아웃
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "로그아웃 성공" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
