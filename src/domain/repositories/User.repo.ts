export interface UserRepository {
    ban(uid: string): Promise<void>; 
    suspend(uid: string, suspensionTime: Date): Promise<void>;
    activate(uid: string): Promise<void>;
  }
  