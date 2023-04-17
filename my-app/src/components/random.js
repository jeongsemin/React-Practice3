export default function generateRandoNumber() {
  // 1~9까지 숫자를 이용 랜덤하게 섞어서 4자리 숫자만 이용할 예정
  const candiates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const pickedNumbers = shuffle(candiates).splice(0, 4);

  return pickedNumbers;
}

function shuffle(array) {
  return array.sort(() => {
    return Math.random() - 0.5;
  });
}
