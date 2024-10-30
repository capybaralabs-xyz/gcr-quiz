import CharacterAnswers from "../assets/JSON/CharacterAnswer.json";

type AnswerType = Record<string, string>;

type CharacterType = {
    Character: string;
    [key: string]: { id: string; text: string } | string;
  };


function getHighestScoringCharacter(userAnswers: AnswerType): string {
  let highestScore = 0;
  let highestScoringCharacters: string[] = [];

  CharacterAnswers.forEach((character: CharacterType) => {
    let score = 0;

    for (const [questionId, answerId] of Object.entries(userAnswers)) {
        const answer = character[questionId] as { id: string; text: string };
        if (answer.id === answerId) {
            score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      highestScoringCharacters = [character.Character];
    } else if (score === highestScore) {
      highestScoringCharacters.push(character.Character);
    }
  });

  if (highestScoringCharacters.length === 0) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * highestScoringCharacters.length);
  return highestScoringCharacters[randomIndex];
}

export default getHighestScoringCharacter;
