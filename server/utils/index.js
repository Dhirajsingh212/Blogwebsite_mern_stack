const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);

function convertLinesToArray(inputString) {
  const stringToRemove =
    "Tags Cannot Be Found For The Given Content. Here Are Some Random Tags:";

  const arrayOfStrings = inputString
    .split("\n")
    .map((line) => line.replace(/-/g, "").trim())
    .filter((line) => line !== "");
  const filteredArray = arrayOfStrings.filter(
    (item) => item !== stringToRemove
  );
  return filteredArray || [];
}

async function generateTags(content) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `suggest min of two and max of six tags based on the below content if tags cannot be found then provide tags related to the topic or random tags please provide me only text without any symbol and i want only plain text not any symbols not any numbers
    ${content}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().toString();
  let arr = convertLinesToArray(text);
  return arr;
}
module.exports = generateTags;

// function generateTags(content) {
//   // List of common English stop words
//   const stopWords = [
//     "undefined",
//     ".",
//     "%",
//     "came",
//     "come",
//     "a",
//     "about",
//     "above",
//     "after",
//     "again",
//     "against",
//     "all",
//     "am",
//     "an",
//     "and",
//     "any",
//     "are",
//     "aren't",
//     "as",
//     "at",
//     "be",
//     "because",
//     "been",
//     "before",
//     "being",
//     "below",
//     "between",
//     "both",
//     "but",
//     "by",
//     "can't",
//     "cannot",
//     "could",
//     "couldn't",
//     "did",
//     "didn't",
//     "do",
//     "does",
//     "doesn't",
//     "doing",
//     "don't",
//     "down",
//     "during",
//     "each",
//     "few",
//     "for",
//     "from",
//     "further",
//     "had",
//     "hadn't",
//     "has",
//     "hasn't",
//     "have",
//     "haven't",
//     "having",
//     "he",
//     "he'd",
//     "he'll",
//     "he's",
//     "her",
//     "here",
//     "here's",
//     "hers",
//     "herself",
//     "him",
//     "himself",
//     "his",
//     "how",
//     "how's",
//     "i",
//     "i'd",
//     "i'll",
//     "i'm",
//     "i've",
//     "if",
//     "in",
//     "into",
//     "is",
//     "isn't",
//     "it",
//     "it's",
//     "its",
//     "itself",
//     "let's",
//     "me",
//     "more",
//     "most",
//     "mustn't",
//     "my",
//     "myself",
//     "no",
//     "nor",
//     "not",
//     "of",
//     "off",
//     "on",
//     "once",
//     "only",
//     "or",
//     "other",
//     "ought",
//     "our",
//     "ours",
//     "ourselves",
//     "out",
//     "over",
//     "own",
//     "same",
//     "shan't",
//     "she",
//     "she'd",
//     "she'll",
//     "she's",
//     "should",
//     "shouldn't",
//     "so",
//     "some",
//     "such",
//     "than",
//     "that",
//     "that's",
//     "the",
//     "their",
//     "theirs",
//     "them",
//     "themselves",
//     "then",
//     "there",
//     "there's",
//     "these",
//     "they",
//     "they'd",
//     "they'll",
//     "they're",
//     "they've",
//     "this",
//     "those",
//     "through",
//     "to",
//     "too",
//     "under",
//     "until",
//     "up",
//     "very",
//     "was",
//     "wasn't",
//     "we",
//     "we'd",
//     "we'll",
//     "we're",
//     "we've",
//     "were",
//     "weren't",
//     "what",
//     "what's",
//     "when",
//     "when's",
//     "where",
//     "where's",
//     "which",
//     "while",
//     "who",
//     "who's",
//     "whom",
//     "why",
//     "why's",
//     "with",
//     "won't",
//     "would",
//     "wouldn't",
//     "you",
//     "you'd",
//     "you'll",
//     "you're",
//     "you've",
//     "your",
//     "yours",
//     "yourself",
//     "yourselves",
//   ];

//   // Clean the content by removing punctuation and converting to lowercase
//   let cleanedContent = content
//     .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()%.]/g, "")
//     .toLowerCase();
//   cleanedContent = cleanedContent.replace(/undefined/g, "");
//   // Split the content into an array of words
//   const words = cleanedContent.split(/\s+/);

//   // Filter out stop words
//   const filteredWords = words.filter((word) => !stopWords.includes(word));

//   // Create a frequency map for each word
//   const wordFrequency = {};
//   filteredWords.forEach((word) => {
//     if (word in wordFrequency) {
//       wordFrequency[word]++;
//     } else {
//       wordFrequency[word] = 1;
//     }
//   });

//   // Sort the words by frequency in descending order
//   const sortedWords = Object.keys(wordFrequency).sort(
//     (a, b) => wordFrequency[b] - wordFrequency[a]
//   );

//   // Return the top 5-6 words
//   const topWords = sortedWords.slice(0, 6).filter(Boolean);

//   return topWords;
// }
