import "jest";
import Event from "../Event";

describe("Event class", () => {
    describe("boolean checks", () => {
        let event: Event = null;
        beforeEach(() => {
            event = new Event({
                id: "abc123",
            });
        });
        it("should be no status to begin with", () => {
            expect(event.isOpen()).toBeFalsy();
            expect(event.isClosed()).toBeFalsy();
            expect(event.isFinalized()).toBeFalsy();
        });
        it("should handle open status", () => {
            event.status = "o";
            expect(event.isOpen()).toBeTruthy();
            expect(event.isClosed()).toBeFalsy();
            expect(event.isFinalized()).toBeFalsy();
        });
        it("should handle closed status", () => {
            event.status = "c";
            expect(event.isOpen()).toBeFalsy();
            expect(event.isClosed()).toBeTruthy();
            expect(event.isFinalized()).toBeFalsy();
        });
        it("should handle finalized status", () => {
            event.status = "f";
            expect(event.isOpen()).toBeFalsy();
            expect(event.isClosed()).toBeFalsy();
            expect(event.isFinalized()).toBeTruthy();
        });
        it("should handle guaranteed", () => {
            expect(event.isGuaranteed()).toBeFalsy();
            event.ticketMin = 1;
            expect(event.isGuaranteed()).toBeTruthy();
            event.ticketMin = 2;
            expect(event.isGuaranteed()).toBeFalsy();
            event.ticketMin = 10;
            expect(event.isGuaranteed()).toBeFalsy();
        });
        it("should handle multi-entry", () => {
            expect(event.isMultiEntry()).toBeFalsy();
            event.ticketMaxPerUser = 1;
            expect(event.isMultiEntry()).toBeFalsy();
            event.ticketMaxPerUser = 2;
            expect(event.isMultiEntry()).toBeTruthy();
            event.ticketMaxPerUser = 10;
            expect(event.isMultiEntry()).toBeTruthy();
        });
        it("should handle featured", () => {
            expect(event.isFeatured()).toBeFalsy();
            event.featured = true;
            expect(event.isFeatured()).toBeTruthy();
            event.featured = false;
            expect(event.isFeatured()).toBeFalsy();
        });
        it("should handle user-created", () => {
            expect(event.isUserCreated()).toBeFalsy();
            event.adminId = "12345";
            expect(event.isUserCreated()).toBeTruthy();
        });
    });
});
