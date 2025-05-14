import { ChatAnthropic } from "@langchain/anthropic";

const llm = new ChatAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
  model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest",
  temperature: 0.7,
});

export interface ExcuseRequest {
  situation: string;
  audience: string;
  severity: string;
}

async function classifyAudience(audience: string): Promise<string> {
  const response = await llm.invoke([
    {
      role: "system",
      content: `Classify the audience for an excuse into one of these categories:
      - 'boss': if it's a manager, supervisor, or someone in authority
      - 'coworker': if it's a colleague, teammate, or peer
      - 'friend': if it's a personal friend or acquaintance
      - 'family': if it's a family member
      - 'client': if it's a client, customer, or business contact
      
      Respond with only one word: the classification.`
    },
    {
      role: "user",
      content: `The audience is: ${audience}`
    }
  ]);

  return response.content.toString().toLowerCase().trim();
}

async function generateBossExcuse(situation: string, severity: string): Promise<string> {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You are a professional excuse generator. Your task is to create a believable, professional excuse for an employee to give to their boss.
      
      Guidelines:
      - Be specific but not overly detailed
      - Make it sound authentic and professional
      - Tailor the excuse to the situation and severity
      - Focus on circumstances beyond the person's control
      - Include a solution or make-up plan when appropriate
      - Do not include any thinking process, planning, or meta-commentary
      - Start directly with the excuse text, nothing else
      - Write in first person as if you are the person giving the excuse
      
      Severity levels:
      - Mild: A simple, everyday excuse
      - Medium: Something more substantial that requires understanding
      - Severe: A significant issue that would justify major disruption`
    },
    {
      role: "user",
      content: `Generate a ${severity} excuse for ${situation} to tell to my boss.`
    }
  ]);

  return response.content.toString();
}

async function generateCoworkerExcuse(situation: string, severity: string): Promise<string> {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You are a casual excuse generator. Your task is to create a believable excuse for someone to give to their coworker.
      
      Guidelines:
      - Be conversational and relatively casual
      - Make it sound authentic but not overly formal
      - Tailor the excuse to the situation and severity
      - Balance professionalism with friendly tone
      - Include an offer to make it up if appropriate
      - Do not include any thinking process, planning, or meta-commentary
      - Start directly with the excuse text, nothing else
      - Write in first person as if you are the person giving the excuse
      
      Severity levels:
      - Mild: A simple, everyday excuse
      - Medium: Something more substantial that requires understanding
      - Severe: A significant issue that would justify major disruption`
    },
    {
      role: "user",
      content: `Generate a ${severity} excuse for ${situation} to tell to my coworker.`
    }
  ]);

  return response.content.toString();
}

async function generateFriendExcuse(situation: string, severity: string): Promise<string> {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You are a casual excuse generator. Your task is to create a believable excuse for someone to give to their friend.
      
      Guidelines:
      - Be casual and conversational
      - Make it sound authentic and relatable
      - Tailor the excuse to the situation and severity
      - Include some personal details to make it believable
      - Be apologetic if appropriate
      - Do not include any thinking process, planning, or meta-commentary
      - Start directly with the excuse text, nothing else
      - Write in first person as if you are the person giving the excuse
      
      Severity levels:
      - Mild: A simple, everyday excuse
      - Medium: Something more substantial that requires understanding
      - Severe: A significant issue that would justify major disruption`
    },
    {
      role: "user",
      content: `Generate a ${severity} excuse for ${situation} to tell to my friend.`
    }
  ]);

  return response.content.toString();
}

async function generateFamilyExcuse(situation: string, severity: string): Promise<string> {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You are a personal excuse generator. Your task is to create a believable excuse for someone to give to their family member.
      
      Guidelines:
      - Be personal and emotionally aware
      - Make it sound authentic and caring
      - Tailor the excuse to the situation and severity
      - Include family-specific context if appropriate
      - Be apologetic when needed
      - Do not include any thinking process, planning, or meta-commentary
      - Start directly with the excuse text, nothing else
      - Write in first person as if you are the person giving the excuse
      
      Severity levels:
      - Mild: A simple, everyday excuse
      - Medium: Something more substantial that requires understanding
      - Severe: A significant issue that would justify major disruption`
    },
    {
      role: "user",
      content: `Generate a ${severity} excuse for ${situation} to tell to my family.`
    }
  ]);

  return response.content.toString();
}

async function generateClientExcuse(situation: string, severity: string): Promise<string> {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You are a professional excuse generator. Your task is to create a believable, professional excuse for someone to give to their client or customer.
      
      Guidelines:
      - Be formal and professional
      - Make it sound authentic and respectful
      - Tailor the excuse to the situation and severity
      - Focus on solutions and next steps
      - Include an apology and make-up plan
      - Do not include any thinking process, planning, or meta-commentary
      - Start directly with the excuse text, nothing else
      - Write in first person as if you are the person giving the excuse
      
      Severity levels:
      - Mild: A simple, everyday excuse
      - Medium: Something more substantial that requires understanding
      - Severe: A significant issue that would justify major disruption`
    },
    {
      role: "user",
      content: `Generate a ${severity} excuse for ${situation} to tell to my client.`
    }
  ]);

  return response.content.toString();
}

async function generateGeneralExcuse(situation: string, audience: string, severity: string): Promise<string> {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You are a versatile excuse generator. Your task is to create a believable excuse for the given situation.
      
      Guidelines:
      - Be appropriate for the context
      - Make it sound authentic and believable
      - Tailor the excuse to the situation and severity
      - Include specific details to make it credible
      - Be apologetic if appropriate
      - Do not include any thinking process, planning, or meta-commentary
      - Start directly with the excuse text, nothing else
      - Write in first person as if you are the person giving the excuse
      
      Severity levels:
      - Mild: A simple, everyday excuse
      - Medium: Something more substantial that requires understanding
      - Severe: A significant issue that would justify major disruption`
    },
    {
      role: "user",
      content: `Generate a ${severity} excuse for ${situation} to tell to ${audience}.`
    }
  ]);

  return response.content.toString();
}

export async function generateExcuse(request: ExcuseRequest): Promise<string> {
  try {
    const audienceType = await classifyAudience(request.audience);
    
    let excuse: string;
    
    switch (audienceType) {
      case "boss":
        excuse = await generateBossExcuse(request.situation, request.severity);
        break;
      case "coworker":
        excuse = await generateCoworkerExcuse(request.situation, request.severity);
        break;
      case "friend":
        excuse = await generateFriendExcuse(request.situation, request.severity);
        break;
      case "family":
        excuse = await generateFamilyExcuse(request.situation, request.severity);
        break;
      case "client":
        excuse = await generateClientExcuse(request.situation, request.severity);
        break;
      default:
        excuse = await generateGeneralExcuse(request.situation, request.audience, request.severity);
    }
    
    return excuse;
  } catch (error) {
    console.error("Error generating excuse:", error);
    return "I'm sorry, I couldn't generate an excuse at this time. Please try again later.";
  }
} 