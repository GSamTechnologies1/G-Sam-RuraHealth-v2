export async function askGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();

    return data.reply;

  } catch (error) {

    console.error(error);

    return "Sorry, I couldn't reach the AI server.";

  }
}