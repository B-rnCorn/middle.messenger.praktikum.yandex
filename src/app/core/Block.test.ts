import {expect} from "chai";
import {Block} from "./Block";

export type MockedComponentProps = {
    blockPropsAndChildren: {}
}


describe("Block", () => {
  let ComponentMock: any,
    ComponentMockWithRender: any,
    isCalled: boolean;

    const TEST_STRING = "example string";

  beforeEach(() => {
    isCalled = false;
    ComponentMock = class MockedComponent extends Block<MockedComponentProps> {}
    ComponentMockWithRender = class MockedComponentWithRender extends Block<MockedComponentProps> {
        render() {
            const fragment = new DocumentFragment();
            const div = document.createElement("div");
            div.textContent = TEST_STRING;
            fragment.append(div);
            return fragment;
          }
    }
  });

  it('should run user overrided init', () => {
    ComponentMockWithRender = class extends ComponentMockWithRender {
        init() {
            isCalled = true;
        }
    }

    const component = new ComponentMockWithRender({blockPropsAndChildren: {}});

    expect(isCalled).to.be.true;
    expect(component.getContent().textContent).to.equal(TEST_STRING);
  })

  it('should run user overrided componentDidMount', () => {
    ComponentMock = class extends ComponentMockWithRender {
        componentDidMount() {
            isCalled = true;
        }
    }

    const component = new ComponentMock({blockPropsAndChildren: {}});
    component.dispatchComponentDidMount();

    expect(isCalled).to.be.true;
  })

  it("should run user overrided componentDidUpdate on .setProps()", () => {
    ComponentMock = class extends ComponentMock {
      componentDidUpdate() {
        isCalled = true;
        return true;
      }
    };
    const component = new ComponentMock({});
    component.setProps({test: TEST_STRING});

    expect(isCalled).to.be.true;
  });

  it("should be visible on .show()", () => {
    const component = new ComponentMockWithRender({});
    component.show();

    expect(component.getContent().style.display).to.equal("block");
  });

  it("should be visible and set flex on .show('flex')", () => {
    const component = new ComponentMockWithRender({});
    component.show('flex');

    expect(component.getContent().style.display).to.equal("flex");
  });

  it("should be hide on .hide()", () => {
    const component = new ComponentMockWithRender({});
    component.hide();

    expect(component.getContent().style.display).to.equal("none");
  });

  it("should split props to own, child and events", () => {
    const props = {test: TEST_STRING};
    const events = {'click': ()=> {}};
    const children = {children:new ComponentMock({props})}
    const component = new ComponentMockWithRender({
        blockEvents: {
            ...events,
        },
        blockPropsAndChildren: {
            ...children,
            ...props,
        }
    });

    expect(component.blockProps).to.have.property('test').with.equal(TEST_STRING);
    expect(component.children).to.have.property('children').with.instanceOf(ComponentMock);
    expect(component.blockEvents).to.have.property('click').with.instanceOf(Function);
  });

});