import { getBotReply } from "./chatbot";
import { askGemini } from "../ai/gemini";

export async function getAIReply(message: string): Promise<string> {

  const localReply = getBotReply(message);

  // If chatbot understands it,
  // use chatbot

  if (
    !localReply.includes("I need a little more information")
  ) {
    return localReply;
  }

  // Otherwise ask Gemini

  return await askGemini(message);

}