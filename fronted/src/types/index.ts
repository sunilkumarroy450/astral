export interface Message {
  role: "user" | "assistant";
  content: string;
  data?: {
    table: {
      headers: string[];
      rows: string[][];
    };
    description: string;
  };
  timestamp: string;
  id?: string;
  liked?: boolean;
  disliked?: boolean;
}

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

export interface ApiResponse {
  message: Message;
  session?: Session;
}
