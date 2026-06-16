export interface Tournament {
  TournamentID: number;
  TournamentName: string;
  Description?: string | null;
  Location?: string | null;
  StartDate: string;
  EndDate: string;
  PrizePool: number;
  Status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  CreatedAt?: string;
  CreatedByName?: string;
}

export interface CreateTournamentPayload {
  tournamentName: string;
  description?: string;
  location?: string;
  startDate: string;
  endDate: string;
  prizePool?: number;
}

export interface TournamentListResponse {
  message: string;
  data: Tournament[];
}

export interface TournamentResponse {
  message: string;
  data: Tournament;
}

export interface Round {
  RoundID: number;
  TournamentID: number;
  RoundName: string;
  RoundOrder: number;
  Status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
}

export interface CreateRoundPayload {
  roundName: string;
  roundOrder: number;
}

export interface RoundListResponse {
  message: string;
  data: Round[];
}

export interface RoundResponse {
  message: string;
  data: Round;
}

export interface Race {
  RaceID: number;
  RoundID: number;
  RaceName: string;
  RaceDate: string;
  Distance: number;
  MaxParticipants: number;
  Status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
}

export interface CreateRacePayload {
  raceName: string;
  raceDate: string;
  distance: number;
  maxParticipants: number;
}

export interface RaceListResponse {
  message: string;
  data: Race[];
}

export interface RaceResponse {
  message: string;
  data: Race;
}