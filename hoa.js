const express = require('express');
const cors = require('cors'); // thêm dòng này
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors()); // thêm dòng này để mở khóa kết nối
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyDlaNa98qeV5F-zNQQC7hZvAFqOjyuxNV4");

app.get('/', (req, res) => {
  res.send('api đang hoạt động!');
});

app.post('/ask-chemistry', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "bạn là chuyên gia hóa học lớp 11. trả lời ngắn gọn về: " + req.body.question;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.send({ answer: response.text() });
  } catch (error) {
    res.status(500).send({ answer: "lỗi xử lý dữ liệu ai." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server running on port ' + port));
