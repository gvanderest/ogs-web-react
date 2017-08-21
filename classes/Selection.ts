import Outcome from "./Outcome";
import EventPosition from "./EventPosition";

export default class Selection {
    public id?: string;
    public outcome?: Outcome;
    public outcomeId: string;
    public eventPosition?: EventPosition;
    public eventPositionId: string;
    public earnedPoints?: number;
    public modifiedTimestamp?: number;
    public scoreDropped?: boolean;
}
