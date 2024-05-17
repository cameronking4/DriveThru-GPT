import { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const event = req.body;

    switch (event.message.type) {
      case 'status-update':
        console.log('Status update:', event);
        // Store status update in Redis
        await kv.set(`status:${event.message.call.id}`, event.message.status);
        break;
      case 'transcript':
        console.log('Transcript:', event);
        // Store transcript in Redis
        await kv.set(`transcript:${event.message.call.id}`, event.message.transcript);
        break;
      case 'function-call':
        console.log('Function call:', event);
        // Handle function call and respond with the result
        const functionName = event.message.functionCall.name;
        const parameters = JSON.parse(event.message.functionCall.parameters);   
        await kv.set(`function-call:${event.message.call.id}`, {
            functionName: functionName,
            parameters: parameters
          });
        return;
      case 'end-of-call-report':
        console.log('End of call report:', event);
        // Store end of call report in Redis
        await kv.set(`end-of-call:${event.message.call.id}`, {
          endedReason: event.message.endedReason,
          recordingUrl: event.message.recordingUrl,
          summary: event.message.summary,
          transcript: event.message.transcript,
        });
        break;
      case 'hang':
        console.log('Hang notification:', event);
        // Store hang notification in Redis
        await kv.set(`hang:${event.message.call.id}`, event.message.call);
        break;
      default:
        console.log('Unknown event type:', event);
    }

    res.status(200).json({ received: true });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
