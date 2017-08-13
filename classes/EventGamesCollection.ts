import EventGamesCollectionConfig from "./EventGamesCollectionConfig";
import EventGamesCollectionScoring from "./EventGamesCollectionScoring";

export default class EventGamesCollection {
    public checkEventTimestamp?: number;
    public closeEventTimestamp: number;
    public createOutcomesTimestamp?: number;
    public disableRecurrences?: boolean;
    public finalizeEventTimestamp?: number;
    public modifiedTimestamp?: number;
    public openEventTimestamp?: number;
    public resourceUri?: string;
    public addOutcomesAfterOpen?: boolean;
    public id: string;
    public context: string;
    public hideSelections: boolean;
    public lineupsUrl: string;
    public name?: string;
    public prefix?: string;
    public suffix?: string;
    public scoring?: EventGamesCollectionScoring;
    public exportUrl: string;
    public outcomeIds: string[];
    public eventPositionIds: string[];
    public createdGml?: boolean;
    public gameIds: string[];
    public checkTimestamp?: number;
    public createdTimestamp?: number;
    public createdOutcomes: boolean;
    public config: EventGamesCollectionConfig;
    public templateIds?: string[];
}
