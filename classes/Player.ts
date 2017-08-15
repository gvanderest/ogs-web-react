import IPlayer from "../interfaces/IPlayer";
import Entity from "./Entity";
import Team from "./Team";

export default class Player extends Entity<IPlayer> implements IPlayer {
    public id: string;
    public name?: string;
    public teamId: string;
    public externalId: string;
    public batterHandedness: string;
    public handedness: string;
    public injuryStatus: string;
    public team?: Team;
    public league: string;
}
