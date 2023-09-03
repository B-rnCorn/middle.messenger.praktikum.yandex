import {expect} from "chai";
import sinon from "sinon";

import { AppRouter } from "./AppRouter";
import { Routes } from "./Routes";
import { Block } from "../Block";
import { BlockProps } from "../types";

/*
interface BlockConstructable<P extends Record<string, any> = any> {
  new(props: P): Block<P>;
}*/

describe("Router", () => {
  const originalHistoryBack = global.window.history.back;
  const originalHistoryForward = global.window.history.forward;
  const router = AppRouter.getInstance();
  let mockedGetContent = sinon.fake.returns(document.createElement("div"));

  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === "function") {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
    global.window.history.forward = () => {
      if (typeof window.onpopstate === "function") {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
  });

  after(() => {
    global.window.history.back = originalHistoryBack;
    global.window.history.forward = originalHistoryForward;
  });

  beforeEach(() => {
    AppRouter.forceCreateNewInstance();
    //sinon.restore();
    mockedGetContent = sinon.fake.returns(document.createElement("div"));
  });

  const ComponentMock = class MockedComponent extends Block<BlockProps> {
    getContent = mockedGetContent;

    dispatchComponentDidMount = () => {};

    show = () => {};
  }

  it("should return Router instance on .use(pathname, block)", () => {
    const result = router.use(Routes.Login, ComponentMock, {});

    expect(result).to.eq(router);
  });

  it("should render a page on .start()", () => {
    router
        .use(Routes.Login, ComponentMock, {})
        .start();

    expect(mockedGetContent.callCount).to.eq(1);
  });

  it("should render a page on .back()", () => {
    router
        .use(Routes.Login, ComponentMock, {})
        .start();

    router.back();

    expect(mockedGetContent.callCount).to.eq(2);
  });

  it("should render a page on .forward()", () => {
    router
        .use(Routes.Login, ComponentMock, {})
        .start();

    router.forward();

    expect(mockedGetContent.callCount).to.eq(2);
  });

  it("should render a page on .forward()", () => {
    router
        .use(Routes.Login, ComponentMock, {})
        .start();

    router.go(Routes.Login);

    expect(mockedGetContent.callCount).to.eq(2);
  });
});