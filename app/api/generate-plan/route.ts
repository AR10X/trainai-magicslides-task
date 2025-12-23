import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const user = await req.json();

  const prompt = `
You are an expert fitness coach.

Generate a personalized fitness plan strictly in valid JSON.

User details:
Name: ${user.name}
Age: ${user.age}
Gender: ${user.gender}
Height: ${user.height} cm
Weight: ${user.weight} kg
Goal: ${user.goal}
Fitness Level: ${user.level}
Workout Location: ${user.location}
Diet Preference: ${user.diet}

Rules:
- Beginner friendly if level is Beginner
- Safe and practical exercises
- No medical claims
- No markdown
- JSON only

JSON format:
{
  "workoutPlan": {
    "Day 1": {
      "focus": "",
      "exercises": [
        { "name": "", "sets": 0, "reps": 0 }
      ]
    }
  },
  "dietPlan": {
    "breakfast": "",
    "lunch": "",
    "dinner": ""
  },
  "motivation": "",
  "user": {
    "goal": "",
    "level": "",
    "diet": ""
  }
}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = completion.choices[0].message.content;

  const data = JSON.parse(text || "{}");

  return Response.json(data);
}
