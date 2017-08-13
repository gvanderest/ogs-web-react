import Player from "./Player";

export default class Outcome {
    public id: string;
    public name: string;
    public externalId: string;
    public closeTimestamp: number;
    public availablePoints: number;
    public plannedPoints: number;
    public selectionCost: number;
    public statsId: string;
    public typeName: string;
    public player?: Player;
    public injuryStatus?: string; // FIXME Move this to IPlayer exclusively
}