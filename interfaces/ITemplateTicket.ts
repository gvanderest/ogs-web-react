import IEventGamesCollection from "./IEventGamesCollection";
import ISelection from "./ISelection";
import ITicket from "./ITicket";

interface ITemplateTicket {
    id: string;
    externalId: string;
    eventGamesCollection?: IEventGamesCollection;
    selections?: ISelection[];
    selectionIds: string[];
    modifiedTimestamp: number;
    ticketIds: string[];
    tickets?: ITicket[];
}
export default ITemplateTicket;
