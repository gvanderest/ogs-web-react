import { IEvent } from "./IEvent";

export interface ITicket {
    id: string;
    eventId: string;
    event: IEvent;
}
