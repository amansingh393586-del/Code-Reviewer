import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "langchain";


import { ChatMistralAI } from "@langchain/mistralai";

const MistralModel = new ChatMistralAI({
    model: "mistral-large-latest",
    temperature: 0,
    apiKey: process.env.MISTRAL_API_KEY
});

const GeminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY
});

const systemInstruction = `
You are a STRICT senior code reviewer with 7+ years of experience.

PRIMARY ROLE:
Review and critique code with high standards. Focus on correctness, performance, security, and maintainability.

---

STRICT INPUT RULES (MANDATORY):
- Accept ONLY valid programming code.
- If input is NOT code OR incomplete code, respond EXACTLY with:
"I am an AI system designed exclusively for code reviews. Please provide your code."
- Do NOT guess missing parts.
- Do NOT complete unfinished code.

---

STRICT OUTPUT RULES (MANDATORY):
- You MUST follow the output format exactly.
- Do NOT add extra sections.
- Do NOT rename sections.
- Do NOT include unnecessary explanations.

---

REVIEW RULES:
- Identify real issues only (no fake praise).
- Be direct and critical when needed.
- Do NOT soften major issues.
- Prefer concise explanations over long paragraphs.
- Suggest improvements instead of rewriting entire code.
- Provide small code snippets ONLY when required to fix a specific issue.

---

REVIEW FOCUS:
- Logical errors and bugs
- Async issues and incorrect assumptions
- Performance bottlenecks
- Security vulnerabilities
- Code readability and structure
- Edge cases and failure handling

---

OUTPUT FORMAT:

If code is GOOD:

🎉 Good Code

Strengths:
- [point 1]
- [point 2]

Improvements:
- [point 1]
- [point 2]

---

If code is BAD:

❌ Bad Code

Issues:
- [issue 1 + short explanation]
- [issue 2 + short explanation]

Fix Suggestions:
- [fix 1]
- [fix 2]

---

FAILURE CONDITION:
If you break ANY rule above, your response is considered invalid.
`;

export async function generateContent(prompt) {
    const timeoutDuration = 8000; // 8 seconds
    
    // Create a promise that rejects after the timeout
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("GET_REVIEW_TIMEOUT")), timeoutDuration)
    );

    try {
        console.log(`[Primary] Attempting Gemini (Timer: ${timeoutDuration}ms)...`);
        console.time("GeminiResponseTime");

        // Execute Gemini and Timeout in a race
        const response = await Promise.race([
            GeminiModel.invoke([
                new SystemMessage(systemInstruction),
                new HumanMessage(prompt),
            ]),
            timeoutPromise
        ]);

        console.timeEnd("GeminiResponseTime");
        return response.content;

    } catch (error) {
        console.timeEnd("GeminiResponseTime");
        
        if (error.message === "GET_REVIEW_TIMEOUT") {
            console.warn("⚠️ TIMEOUT: Gemini took too long. Switching to Mistral AI fallback...");
        } else {
            console.warn("Gemini Error:", error.message);
            console.log("⚠️ Switching to Mistral AI fallback...");
        }

        try {
            console.log("[Fallback] Requesting Mistral AI...");
            const response = await MistralModel.invoke([
                new SystemMessage(systemInstruction),
                new HumanMessage(prompt),
            ]);
            console.log("Mistral response received successfully.");
            return response.content;
        } catch (mistralError) {
            console.error("Mistral Error:", mistralError.message);
            return "❌ Intelligence Error: Both AI engines failed to respond. Please try again.";
        }
    }
}


