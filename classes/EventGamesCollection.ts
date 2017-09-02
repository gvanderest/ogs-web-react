import * as moment from "moment";

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

    /**
     * Return whether the EventGamesCollection is a tournament or not.
     */
    public isTournament(): boolean {
        return this.context === "PGA";
    }

    /**
     * Return whether the EventGamesCollection is open or not.
     */
    public isOpen(): boolean {
        const now = moment();
        const closeMoment = moment.unix(this.closeEventTimestamp);
        return now.isBefore(closeMoment);
    }

    /**
     * Return whether the EventGamesCollection is closed or not.
     */
    public isClosed(): boolean {
        const now = moment();
        const closeMoment = moment.unix(this.closeEventTimestamp);
        const finalizeMoment = moment.unix(this.finalizeEventTimestamp);
        return now.isBetween(closeMoment, finalizeMoment, null, "[]")
    }

    /**
     * Return whether the EventGamesCollection is finalized or not.
     */
    public isFinalized(): boolean {
        const now = moment();
        const finalizeMoment = moment.unix(this.finalizeEventTimestamp);
        return now.isSameOrAfter(finalizeMoment);
    }
}
