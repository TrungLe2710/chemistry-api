const express = require('express');

const { googlegenerativeai } = require("@google/generative-ai");

const app = express();

app.use(express.json());



// khởi tạo gemini với key của bạn

const genai = new googlegenerativeai("AIzaSyDlaNa98qeV5F-zNQQC7hZvAFqOjyuxNV4");



app.post('/ask-chemistry', async (req, res) => {

  const model = genai.getgenerativemodel({ model: "gemini-pro" });

  const prompt = "bạn là chuyên gia hóa học. hãy giải thích danh pháp và công thức của: " + req.body.question;

  

  const result = await model.generatecontent(prompt);

  const response = await result.response;

  res.send({ answer: response.text() });

});



app.listen(3000, () => console.log('api dang chay tai cong 3000'));