import IEventGamesCollectionScoring from "./IEventGamesCollectionScoring";

interface IEventGamesCollectionSetting {
    addOutcomesAfterOpen: boolean;
    lineupsUrl: string;
    exportUrl: string;
    hideSelections: boolean;
    scoring: IEventGamesCollectionScoring;
    taskIds: {
        check: string;
        close: string;
        finalize: string;
    };
}
export default IEventGamesCollectionSetting;
