import { shallow, ShallowWrapper } from "enzyme";
import Counter from "./Counter";

describe("<Counter />", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper).toMatchSnapshot();
  });
  it("has initial number", () => {
    const wrapper: any = shallow(<Counter />);
    expect(wrapper.state().number).toBe(0);
  });
  it("increases", () => {
    const wrapper: any = shallow(<Counter />);
    wrapper.instance().handleIncrease();
    expect(wrapper.state().number).toBe(1);
  });
  it("decreases", () => {
    const wrapper: any = shallow(<Counter />);
    wrapper.instance().handleDecrease();
    expect(wrapper.state().number).toBe(-1);
  });
  it("calls handleIncrease", () => {
    const wrapper: any = shallow(<Counter />);
    const plusBtn = wrapper.findWhere(
      (node: ShallowWrapper<any, any, React.Component<{}, {}, any>>) =>
        node.type() === "button" && node.text() === "+1"
    );
    plusBtn.simulate("click");
    expect(wrapper.state().number).toBe(1);
  });
  it("calls handleDecrease", () => {
    const wrapper = shallow(<Counter />);
    const minusBtn = wrapper.findWhere(
      (node: ShallowWrapper<any, any, React.Component<{}, {}, any>>) =>
        node.type() === "button" && node.text() === "-1"
    );
    minusBtn.simulate("click");
    expect(wrapper.find("h2").text()).toBe("-1");
  });
});
