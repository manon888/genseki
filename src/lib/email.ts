import { getPathwaysForGift } from "./pathways";
import { spawn } from "child_process";
import path from "path";

interface EmailTemplate {
  subject: string;
  body: string;
}

// Email templates
export const emailTemplates = {
  discoveryComplete: (name: string, giftProfile: string): EmailTemplate => {
    const pathways = getPathwaysForGift(giftProfile).slice(0, 2);
    
    const pathwaysList = pathways.map(p => 
      `${p.title} - ${p.description}`
    ).join("\n");

    return {
      subject: `✨ Your Genseki: ${name}, here are your gifts`,
      body: `
Hi ${name},

Your gift profile is ready! Here's what makes you unique:

${giftProfile}

---

Ways to use your gifts:
${pathwaysList}

Explore all pathways on your dashboard → genseki.com/dashboard

---

"The greatest gift you can give the world is to discover and use your gifts."

Best,
The Genseki Team
      `.trim(),
    };
  },

  welcome: (name: string): EmailTemplate => ({
    subject: `Welcome to Genseki, ${name}!`,
    body: `
Hi ${name},

Welcome to Genseki! 🎉

You've taken the first step on a journey of self-discovery. Your gifts are waiting to be found.

What to expect:
- A thoughtful 10-question journey
- AI-powered insights about your unique gifts
- Pathways to put your gifts into action

Start now → genseki.com/discovery

---

"The greatest gift you can give the world is to discover and use your gifts."

Best,
The Genseki Team
    `.trim(),
  }),

  reminder: (name: string): EmailTemplate => ({
    subject: `Hi ${name}, your gifts are waiting`,
    body: `
Hi ${name},

You started your Genseki journey but haven't finished yet. Your gifts are waiting for you!

Take 5 minutes to complete the discovery journey and learn what makes you unique.

Continue → genseki.com/discovery

---

"The greatest gift you can give the world is to discover and use your gifts."

Best,
The Genseki Team
    `.trim(),
  }),
};

// Send email via AgentMail using Python
export async function sendEmail(
  to: string,
  template: EmailTemplate
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // Always log first
  console.log(`[EMAIL] ========================================`);
  console.log(`[EMAIL] To: ${to}`);
  console.log(`[EMAIL] Subject: ${template.subject}`);
  console.log(`[EMAIL] Body:`);
  console.log(template.body);
  console.log(`[EMAIL] ========================================`);
  
  // Check if AgentMail API key is configured
  const apiKey = process.env.AGENTMAIL_API_KEY;
  
  if (!apiKey) {
    console.log(`[EMAIL] No AGENTMAIL_API_KEY - logged to console only`);
    return { success: true, messageId: "logged" };
  }

  console.log(`[EMAIL] Attempting AgentMail delivery...`);
  
  return new Promise((resolve) => {
    const pythonScript = `
from agentmail import AgentMail
import sys
import json

api_key = "${apiKey}"
inbox_id = "mia-8539@agentmail.to"

client = AgentMail(api_key=api_key)

try:
    sent = client.inboxes.messages.send(
        inbox_id=inbox_id,
        to="${to}",
        subject="${template.subject.replace(/"/g, '\\"')}",
        text="${template.body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"
    )
    print(f"MESSAGE_ID:{sent.message_id}")
except Exception as e:
    print(f"ERROR:{str(e)}", file=sys.stderr)
`;

    const python = spawn('python3', ['-c', pythonScript], {
      cwd: process.cwd(),
    });

    let output = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0 && output.includes('MESSAGE_ID:')) {
        const messageId = output.split('MESSAGE_ID:')[1].trim();
        console.log(`[EMAIL] ✅ Sent via AgentMail to ${to}`);
        resolve({ success: true, messageId });
      } else {
        console.error(`[EMAIL] AgentMail error:`, errorOutput || output);
        resolve({ success: false, error: errorOutput || output });
      }
    });
  });
}

// Trigger email on discovery completion
export async function onDiscoveryComplete(
  email: string,
  name: string,
  giftProfile: string
): Promise<void> {
  const template = emailTemplates.discoveryComplete(name, giftProfile);
  await sendEmail(email, template);
}

// Trigger email on signup
export async function onSignup(
  email: string,
  name: string
): Promise<void> {
  const template = emailTemplates.welcome(name);
  await sendEmail(email, template);
}