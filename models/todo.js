const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  value: String, //할 일이 어떤 것인지 확인
  doneAt: Date, // 할 일이 언제 완료되었는가
  order: Number, // 몇 번째 할일인가
});

TodoSchema.virtual("todoId").get(() => {
  return this._id.toHexString();
});
// 데이터 조회시 가상의 column 생성 -> 데이터 가공 편리, 데이터 사용

TodoSchema.set("toJSON", {
  virtuals: true,
});
// todoId 를 json 타입으로 변경했을 때 보여준다.
// 실제 DB 에는 Virtual Id 가 보여지지 않습니다.

module.exports = mongoose.model("Todo", TodoSchema);
