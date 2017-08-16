interface IEventPosition {
    id: string;
    name: string;
    outcomeTypeNames: string[];
    sortOrder: number;
    status: string;
    eventGamesId: string;
    closeTimestamp?: number; // FIXME make non-optional?
    openTimestamp?: number; // FIXME make non-optional?
    description?: string; // FIXME make non-optional?
}
export default IEventPosition;
