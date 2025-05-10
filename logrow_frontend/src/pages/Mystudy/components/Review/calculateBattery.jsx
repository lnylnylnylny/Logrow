export function calculateBattery(answers) {
    const evalAnswers = Object.values(answers);
    const q1to4 = evalAnswers.slice(0, 4);
    const q5 = evalAnswers[4];
  
    let veryBad = 0;
    let normal = 0;
    let good = 0;
    let veryGood = 0;
  
    q1to4.forEach((ans) => {
      if (ans === "매우 별로다" || ans === "별로이다") veryBad++;
      else if (ans === "보통이다") normal++;
      else if (ans === "좋다") good++;
      else if (ans === "매우 좋다") veryGood++;
    });
  
    // case 0
    if (veryBad >= 3 && q5 === "어떠한 단계도 달성하지 못함") return 0;
  
    // case 1
    if (normal >= 3 && ["1단계 씨앗", "2단계 새싹"].includes(q5)) return 1;
  
    // case 2
    const goodOrVeryGood = good + veryGood;
    if (
      goodOrVeryGood >= 3 &&
      (goodOrVeryGood > 3 || normal >= 1) &&
      q5 === "3단계 나뭇가지"
    ) {
      return 2;
    }
  
    // case 3
    if (
      veryGood >= 2 &&
      q1to4.every((ans) => ["좋다", "매우 좋다"].includes(ans)) &&
      q5 === "4단계 나무"
    ) {
      return 3;
    }
  
    return 1;
  }
  