import { createClient } from '@/utils/supabase/client';

export class LoggingService {
  private supabase = createClient();
  private sessionId: string | null = null;
  private eventSequence = 0;

  async startSession(userId: string, projectId: string) {
    this.eventSequence = 0;
    const { data, error } = await this.supabase
      .from('sessions')
      .insert({ user_id: userId, project_id: projectId })
      .select('id')
      .single();
    
    if (error) {
        console.error("Failed to start logging session:", error);
        this.sessionId = null;
    } else {
        this.sessionId = data.id;
        this.logEvent('SESSION_START', {});
    }
  }

  logEvent(eventType: string, eventData: object) {
    if (!this.sessionId) return;

    this.eventSequence++;
    const payload = {
      session_id: this.sessionId,
      session_event_sequence: this.eventSequence,
      event_type: eventType,
      event_data: eventData
    };

    this.supabase.from('events').insert(payload).then(({ error }) => {
      if (error) console.error(`Failed to log event ${eventType}:`, error);
    });
  }
  
  async endSession() {
    if (!this.sessionId) return;
    
    await this.supabase
        .from('sessions')
        .update({ end_time: new Date().toISOString() })
        .eq('id', this.sessionId);
    
    this.sessionId = null;
  }
}