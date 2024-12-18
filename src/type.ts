// src/types.ts

// Define the Activity interface with all properties
export interface Activity {
    id?: number;
    name: string;
    type: string;
    location: string;
    start_time: string;
    end_time: string;
    price: number;
    discount: number;
    max_participants: number;
    deadline: string;
    owner: string;        // Owner of the activity
    subscribed?: boolean;   // Indicates if the logged-in user is subscribed
    isOwner?: boolean;      // Indicates if the logged-in user is the owner
    desc?: string;
  }
  