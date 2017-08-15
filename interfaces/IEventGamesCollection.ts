import IEventGamesCollectionConfig from "./IEventGamesCollectionConfig";
import IEventGamesCollectionSettings from "./IEventGamesCollectionSettings";

interface IEventGamesCollection {
    checkEventTimestamp?: number;
    closeEventTimestamp: number;
    createOutcomesTimestamp?: number;
    disableRecurrences?: boolean;
    finalizeEventTimestamp?: number;
    modifiedTimestamp?: number;
    openEventTimestamp?: number;
    resourceUri?: string;
    addOutcomesAfterOpen?: boolean;
    id: string;
    context: string;
    name?: string;
    prefix?: string;
    suffix?: string;
    outcomeIds: string[];
    eventPositionIds: string[];
    createdGml?: boolean;
    gameIds: string[];
    checkTimestamp?: number;
    createdTimestamp?: number;
    createdOutcomes: boolean;
    config?: IEventGamesCollectionConfig;
    templateIds?: string[];
    settings: IEventGamesCollectionSettings;
}
export default IEventGamesCollection;
