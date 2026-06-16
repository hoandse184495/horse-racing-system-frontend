export interface Horse {
  HorseID: number;
  OwnerID: number;
  HorseName: string;
  Age: number;
  Breed?: string | null;
  Gender: "Male" | "Female";
  HealthStatus?: string | null;
  Description?: string | null;
  ImageURL?: string | null;
  Status: "Pending" | "Approved" | "Rejected" | "Inactive";
  CreatedAt?: string;

  OwnerName?: string;
  OwnerEmail?: string;
}

export interface HorseListResponse {
  message: string;
  data: Horse[];
}

export interface HorseResponse {
  message: string;
  data: Horse;
}

export interface UpdateHorseStatusPayload {
  status: "Pending" | "Approved" | "Rejected" | "Inactive";
}