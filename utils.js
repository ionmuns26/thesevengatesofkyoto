// Each gate has a pool of challenges. One is picked randomly per session.
// Types: "riddle" (text answer), "runner" (dodge game), "investigation" (deduction multi-step), "cipher" (decode), "sequence" (pattern), "choice" (multiple choice logic)

export const GATE_POOLS = [
  // GATE I — Wisdom
  {
    number: "I",
    title: "Wisdom",
    clue: "N",
    clueLabel: "Clue of Silence",
    clueHint: "What is spoken last shall be written first.",
    challenges: [
      {
        type: "sequence",
        question: "A monk writes a sequence on a temple wall. What is the next number?",
        sequence: ["1", "11", "21", "1211", "111221", "312211", "?"],
        hint: "Do not calculate. Describe what you see in each line.",
        checkAnswer: (ans) => ans.replace(/\s+/g, "") === "13112221",
      },
      {
        type: "riddle",
        question: "I have cities, but no houses live there. I have mountains, but no trees grow. I have water, but no fish swim. I have roads, but no cars travel. What am I?",
        hint: "A samurai always studies his terrain before battle.",
        checkAnswer: (ans) => ans.toLowerCase().includes("map"),
      },
      {
        type: "riddle",
        question: "The more you take from me, the larger I become. What am I?",
        hint: "A warrior's meditation reveals what grows through subtraction.",
        checkAnswer: (ans) => ans.toLowerCase().includes("hole"),
      },
      {
        type: "choice",
        question: "A samurai master asks: Which weighs more — a kilogram of iron or a kilogram of silk?",
        choices: ["Iron", "Silk", "They weigh the same", "Impossible to know"],
        correctIndex: 2,
        hint: "The master tests not strength, but stillness of mind.",
      },
    ],
  },

  // GATE II — Honor
  {
    number: "II",
    title: "Honor",
    clue: "I",
    clueLabel: "Clue of Deception",
    clueHint: "Truth hides behind the liar's mask.",
    challenges: [
      {
        type: "riddle",
        question: "Three samurai stand in a duel circle: Kenji, Ryu, and Hana.\n\nKenji always tells the truth. Ryu always lies. Hana randomly does either.\n\nOne says: I am Kenji. Another says: I am Ryu. The last says: I am Hana.\n\nWho said 'I am Ryu'?",
        hint: "Ryu cannot truthfully say he is Ryu. Kenji cannot lie about being Kenji.",
        checkAnswer: (ans) => ["hana", "hana did", "hana said"].includes(ans.toLowerCase().trim()),
      },
      {
        type: "investigation",
        title: "The Stolen Blade",
        story: "A priceless katana was stolen from the dojo at dawn. Three apprentices were present.",
        clues: [
          "Apprentice Kato says: I was meditating in the garden from sunrise until the bell rang.",
          "Apprentice Mira says: I saw Kato leave the garden before sunrise.",
          "Apprentice Taro says: I was sharpening blades in the forge. The forge fire was lit at sunrise.",
        ],
        question: "Mira's statement contradicts Kato's alibi. Who is the most likely suspect?",
        hint: "One person's alibi is directly challenged by another witness.",
        checkAnswer: (ans) => ans.toLowerCase().includes("kato"),
      },
      {
        type: "choice",
        question: "A lord has two sons. The older is honest and the younger always lies. The lord asks both: 'Is the gate to the north safe?' The older says YES. The younger says NO. What does the lord know?",
        choices: ["The gate is safe", "The gate is dangerous", "He cannot know", "Both sons are lying"],
        correctIndex: 0,
        hint: "One cannot lie and one cannot deceive. What does their agreement mean?",
      },
    ],
  },

  // GATE III — Dragon
  {
    number: "III",
    title: "Dragon",
    clue: "M",
    clueLabel: "Clue of the Dragon's Breath",
    clueHint: "Even the mightiest fire begins with a single spark.",
    challenges: [
      {
        type: "sequence",
        question: "The dragon guards a locked chest. Find the missing value.",
        sequence: ["8 -> 3", "27 -> 5", "64 -> ?", "125 -> 9"],
        hint: "Think about the cube root of each number, then the digit sum of the root.",
        checkAnswer: (ans) => ans.trim() === "7",
      },
      {
        type: "runner",
        question: "The dragon charges. Dodge the fire blasts to reach the gate.",
        hint: "Use arrow keys or swipe to dodge. Survive for 15 seconds.",
      },
      {
        type: "riddle",
        question: "I breathe fire yet I am not alive. I guard treasure yet I own nothing. I am feared by all yet I serve one master. What am I?",
        hint: "Found at the entrance of every ancient story.",
        checkAnswer: (ans) => ans.toLowerCase().includes("dragon"),
      },
      {
        type: "sequence",
        question: "A dragon's scales form a pattern. What is the missing number?\n\n2, 6, 12, 20, 30, ?",
        sequence: ["2", "6", "12", "20", "30", "?"],
        hint: "Look at the differences between consecutive numbers.",
        checkAnswer: (ans) => ans.trim() === "42",
      },
    ],
  },

  // GATE IV — Sakura
  {
    number: "IV",
    title: "Sakura",
    clue: "O",
    clueLabel: "Clue of the Fallen Petal",
    clueHint: "Beauty fades, but what it spells remains forever.",
    challenges: [
      {
        type: "cipher",
        question: "A poet hides a word in her verse. Read the first letter of each line:\n\n  Oceans part yet never weep,\n  Nations rise in endless sleep,\n  Under mountains, secrets keep,\n  Maps unfold where shadows leap.",
        hint: "Take only the very first letter of each line, top to bottom.",
        checkAnswer: (ans) => ans.toLowerCase().replace(/[^a-z]/g, "") === "onum",
      },
      {
        type: "riddle",
        question: "I fall every year without being pushed. I am beautiful but last only a week. Emperors have stopped wars to watch me. Poets write centuries of verse about me. What am I?",
        hint: "The symbol of Japan's most celebrated season.",
        checkAnswer: (ans) => ans.toLowerCase().includes("sakura") || ans.toLowerCase().includes("cherry blossom") || ans.toLowerCase().includes("blossom"),
      },
      {
        type: "cipher",
        question: "A geisha encodes her message. Each letter shifts by 3 positions forward in the alphabet (A->D, B->E...). Decode this:\n\n  ZDWHU",
        hint: "Reverse the shift: each letter moves 3 positions backward.",
        checkAnswer: (ans) => ans.toLowerCase().trim() === "water",
      },
    ],
  },

  // GATE V — Lantern
  {
    number: "V",
    title: "Lantern",
    clue: "U",
    clueLabel: "Clue of the Lantern's Glow",
    clueHint: "Light reveals what darkness cannot name.",
    challenges: [
      {
        type: "riddle",
        question: "The lantern master hides a two-letter word.\n\n  A=1, B=2, C=3 ... Z=26\n\n  The letters sum to exactly 21.\n  The first letter is the 20th in the alphabet.\n\nWhat is the word?",
        hint: "T is the 20th letter (value 20). What single letter has value 1?",
        checkAnswer: (ans) => ans.toLowerCase().trim() === "ta",
      },
      {
        type: "investigation",
        title: "The Lantern Festival Murder",
        story: "During the lantern festival, a merchant was found dead. Three suspects were near the river bridge at the time.",
        clues: [
          "Suspect Ren: I was lighting lanterns with the children on the east bank from dusk until midnight.",
          "Suspect Yuki: I saw Ren arguing with the merchant near the bridge at the 9th hour.",
          "Suspect Dao: I was across the river and saw no one on the bridge after the 8th hour.",
        ],
        question: "Yuki places Ren at the scene contradicting his alibi. Who is the primary suspect?",
        hint: "Two witnesses conflict. Which alibi collapses under scrutiny?",
        checkAnswer: (ans) => ans.toLowerCase().includes("ren"),
      },
      {
        type: "riddle",
        question: "I can travel around the world without moving from my place. What am I?",
        hint: "A lantern illuminates the room it is in — but something else travels further.",
        checkAnswer: (ans) => ans.toLowerCase().includes("light") || ans.toLowerCase().includes("sun"),
      },
    ],
  },

  // GATE VI — Oni
  {
    number: "VI",
    title: "Oni",
    clue: "N",
    clueLabel: "Clue of the Oni's Bargain",
    clueHint: "To defeat deception, turn it upon itself.",
    challenges: [
      {
        type: "riddle",
        question: "A traveler faces two doors. One leads to Kyoto, one to the void. Two guards stand watch — one always lies, one always tells the truth. You may ask ONE guard ONE question.\n\nWhat do you ask? (describe the question)",
        hint: "You need a question that gives the correct answer regardless of which guard you address.",
        checkAnswer: (ans) => {
          const a = ans.toLowerCase();
          return a.includes("other guard") || a.includes("other door") || a.includes("would the other") || a.includes("other one") || a.includes("other guard say");
        },
      },
      {
        type: "runner",
        question: "The Oni's demons chase you through the gate. Survive to prove your worth.",
        hint: "Dodge the demon strikes. Survive for 15 seconds to pass.",
      },
      {
        type: "choice",
        question: "The Oni offers you a deal: Take this chest now, or return tomorrow for a chest worth double. But there is a 50% chance the Oni will be gone tomorrow.\n\nA samurai always chooses the path of certainty over greed. What should you take?",
        choices: ["Return tomorrow for double", "Take the chest now", "Refuse both and walk away", "Ask the Oni a question first"],
        correctIndex: 1,
        hint: "A samurai values the present moment above all speculation.",
      },
      {
        type: "investigation",
        title: "The Oni's Test",
        story: "Three scholars each claim to have solved the Oni's ancient riddle. Only one tells the truth.",
        clues: [
          "Scholar A says: The answer is the number of petals on a cherry blossom times the number of fingers on both hands.",
          "Scholar B says: Scholar A is wrong. I counted 250 petals on one blossom.",
          "Scholar C says: The answer to the Oni's riddle is always zero — it is a trick.",
        ],
        question: "Cherry blossoms have 5 petals. Multiplied by 10 fingers equals 50. Who is correct?",
        hint: "Calculate Scholar A's answer and verify the logic.",
        checkAnswer: (ans) => ans.toLowerCase().includes("scholar a") || ans.toLowerCase().includes("a is correct") || ans.toLowerCase().includes("fifty") || ans.trim() === "50",
      },
    ],
  },
];

export const FINAL_CODE = "ionmun26";