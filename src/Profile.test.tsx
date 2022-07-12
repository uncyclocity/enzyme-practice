import { mount } from "enzyme";
import Profile from "./Profile";

describe("<Profile />", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<Profile username="uncyclocity" name="백괴" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders username and name", () => {
    const wrapper = mount(<Profile username="uncyclocity" name="백괴" />);
    expect(wrapper.props().username).toBe("uncyclocity");
    expect(wrapper.props().name).toBe("백괴");
    const boldElement = wrapper.find("b");
    expect(boldElement.contains("uncyclocity")).toBe(true);
    const spanElement = wrapper.find("span");
    expect(spanElement.text()).toBe("(백괴)");
  });
});
