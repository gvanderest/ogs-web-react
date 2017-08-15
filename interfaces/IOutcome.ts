import IPlayer from "./IPlayer";

interface IOutcome {
    id: string;
    name: string;
    externalId: string;
    closeTimestamp: number;
    availablePoints: number;
    plannedPoints: number;
    selectionCost: number;
    statsId: string;
    typeName: string;
    player?: IPlayer;
}
export default IOutcome;
