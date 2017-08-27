import IEventPosition from "./IEventPosition";
import IOutcome from "./IOutcome";

interface ISelection {
    id?: string;
    outcome?: IOutcome;
    outcomeId: string;
    eventPosition?: IEventPosition;
    eventPositionId: string;
    earnedPoints?: number;
    modifiedTimestamp?: number;
    scoreDropped?: boolean;
}
export default ISelection;
