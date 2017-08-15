import IEventGamesCollection from "../interfaces/IEventGamesCollection";
import IEventGamesCollectionSettings from "../interfaces/IEventGamesCollectionSettings";
import Entity from "./Entity";
import EventGamesCollectionConfig from "./EventGamesCollectionConfig";

export default class EventGamesCollection extends Entity<IEventGamesCollection> implements IEventGamesCollection {
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
    public name?: string;
    public prefix?: string;
    public suffix?: string;
    public outcomeIds: string[];
    public eventPositionIds: string[];
    public createdGml?: boolean;
    public gameIds: string[];
    public checkTimestamp?: number;
    public createdTimestamp?: number;
    public createdOutcomes: boolean;
    public config?: EventGamesCollectionConfig;
    public templateIds?: string[];
    public settings: IEventGamesCollectionSettings;
}
