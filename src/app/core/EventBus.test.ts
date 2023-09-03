import sinon from "sinon";
import {expect} from "chai";
import EventBus from "./EventBus";

describe("EventBus", () => {
  const firstListener = sinon.stub();
  const secondListener = sinon.stub();
  let eventBus: EventBus;
  const EVENT_NAME = "test event";

  beforeEach(() => {
    eventBus = new EventBus();
    firstListener.reset();
    secondListener.reset();
  });

  it("should trigger listener after subscription", () => {
    eventBus.on(EVENT_NAME, firstListener);
    eventBus.emit(EVENT_NAME);

    expect(firstListener.callCount).to.equal(1);
  });

  it("should trigger listener after subscription on each emit (3 times example)", () => {
    eventBus.on(EVENT_NAME, firstListener);
    eventBus.emit(EVENT_NAME);
    eventBus.emit(EVENT_NAME);
    eventBus.emit(EVENT_NAME);

    expect(firstListener.callCount).to.equal(3);
  });

  it("should not trigger listener without subscription", () => {
    eventBus.on(EVENT_NAME, secondListener);
    eventBus.emit(EVENT_NAME);

    expect(firstListener.callCount).to.equal(0);
    expect(secondListener.callCount).to.equal(1);
  });

  it("should not trigger listener after subscription deletion", () => {
    eventBus.on(EVENT_NAME, firstListener);
    eventBus.off(EVENT_NAME, firstListener);
    eventBus.emit(EVENT_NAME);

    expect(firstListener.callCount).to.equal(0);
  });

  it("should trigger listener with passed param", () => {
    eventBus.on(EVENT_NAME, firstListener);
    eventBus.emit(EVENT_NAME, EVENT_NAME);

    expect(firstListener.callCount).to.equal(1);
    expect(firstListener.lastCall.args[0]).to.equal(EVENT_NAME);
  });
});