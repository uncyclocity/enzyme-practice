import { mount, ReactWrapper } from "enzyme";
import HookCounter from "./HookCounter";

describe("<HookCounter />", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<HookCounter />);
    expect(wrapper).toMatchSnapshot();
  });
  it("increases", () => {
    const wrapper = mount(<HookCounter />);
    const plusBtn = wrapper.findWhere(
      (node: ReactWrapper<any, any>) =>
        node.type() === "button" && node.text() === "+1"
    );
    plusBtn.simulate("click");
    plusBtn.simulate("click");
    const num = wrapper.find("h2");
    expect(num.text()).toBe("2");
  });
  it("decreases", () => {
    const wrapper = mount(<HookCounter />);
    const minusBtn = wrapper.findWhere(
      (node: ReactWrapper<any, any>) =>
        node.type() === "button" && node.text() === "-1"
    );
    minusBtn.simulate("click");
    minusBtn.simulate("click");
    const num = wrapper.find("h2");
    expect(num.text()).toBe("-2");
  });
});
