# ๐งช Enzyme๋ฅผ ํตํ ๋ฆฌ์กํธ TDD

> References <br> <a href="https://learn-react-test.vlpt.us/#/04-enzyme?id=srcsetuptestsjs">4. Enzyme ์ฌ์ฉ๋ฒ</a> _.velopert_ <br> <a href="https://merrily-code.tistory.com/180">Enzyme ์ฌ์ฉ ์ Cannot read property 'child'... ๊ฐ ์ถ๋ ฅ๋  ๋</a> _.Chamming2_

> ๋ณธ ๋ ํฌ์์๋ ๊ธฐ์ด์ ์ธ ๋ด์ฉ๋ง ๋ค๋ฃน๋๋ค. ๋ณด๋ค ์์ธํ ์ฌ์ฉ๋ฒ์ <a href="https://airbnb.io/enzyme/docs/api/">๊ณต์ ๋ฌธ์</a>๋ฅผ ์ฐธ๊ณ ํด์ฃผ์ธ์.

## ๐ ๊ธฐ๋ณธ ๊ฐ๋

- **TDD**๋ **ํ์คํธ ์ฃผ๋ ๊ฐ๋ฐ**์ ์ฝ์์ด๋ฉฐ, ํ์คํธ๊ฐ ๊ฐ๋ฐ์ ์ด๋์ด๋๊ฐ๋ ํํ์ ๊ฐ๋ฐ๋ก ์ด๋ค.
- TDD์ ์ ์ฐจ๋ **์คํจํ๋ ํ์คํธ ์ฝ๋ ์์ฑ โก๏ธ ์ฝ๋๋ฅผ ์์ฑํ์ฌ ํ์คํธ ํต๊ณผ ์ํค๊ธฐ โก๏ธ ๋ฆฌํฉํ ๋ง**์ผ๋ก ๊ตฌ์ฑ๋๋ค.
- ๋ฆฌ์กํธ ์ฑ์ TDD ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ **Enzyme**๊ณผ **react-testing-library**๊ฐ ์๋ค.
  ๐ ์ ์๋ ์ฃผ๋ก ์ปดํฌ๋ํธ ๋ด๋ถ ๊ธฐ๋ฅ์ ์ง์คํ๋ฉฐ, ํ์๋ ์ฃผ๋ก ๋ ๋๋ง ๊ฒฐ๊ณผ์ ์ง์คํ๋ค.

## ๐พ Enzyme ์ฌ์ฉ ์ํ

- **Enzyme**๊ณผ **Enzyme** ์ด๋ํฐ๋ฅผ ์ค์นํ๋ค. Enzyme์ ๊ณต์์ ์ผ๋ก ๋ฆฌ์กํธ 17 ์ด์์ ๋ฒ์ ์ ์ง์ํ์ง ์์ผ๋ฏ๋ก, ๋น๊ณต์ ์ด๋ํฐ๋ฅผ ์ค์นํด์ผ ํ๋ค.
  (๋ฆฌ์กํธ 18 ์ด์์์๋ ํ์คํธ ์ `ReactDOM.render`์ด 18 ์ด์์ ๋ฒ์ ์์ ์ง์ํ์ง ์๋๋ค๋ ๊ฒฝ๊ณ ๊ฐ ๋ฐ ๊ฒ์ด๋ค. ์ฐธ๊ณ  ์ฐ๋๋ก ํ์.)

  ```bash
  $ yarn add enzyme @wojtekmaj/enzyme-adapter-react-17
  ```

- `setupTests.ts` ํ์ผ์ ๋ง๋ค์ด **์ด๋ํฐ๋ฅผ ์ํ**ํด์ค๋ค. (CRA ์ฑ์ ๊ฒฝ์ฐ ๊ธฐ์กด์ ๋ด์ฉ์ ์ง์์ฃผ๊ณ  ๋ค์ ์์ฑํด์ค๋ค.)

  ```typescript
  import { configure } from "enzyme";
  import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

  configure({ adapter: new Adapter() });
  ```

- **์ค๋์ท ํ์คํ**(๋ ๋๋ง์ ๊ฒฐ๊ณผ๊ฐ ์ด์ ์ ๋ ๋๋ง ๊ฒฐ๊ณผ์ ์ผ์นํ์ง์ ๋ํ ํ์คํธ)์ ํ๊ธฐ ์ํด์๋ ๋ณ๋๋ก `enzyme-to-json` ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ค์นํ์ฌ `package.json`์ `"jest"` ์์ฑ์ ์ถ๊ฐํด์ผ ํ๋ค.

  ```bash
  $ yarn add enzyme-to-json
  ```

  ```json
  "jest": {
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ]
  }
  ```

- ์ํ๋ ์ปดํฌ๋ํธ์ ๋ํ ํ์คํธ ํ์ผ์ ๋ง๋ค์ด ์ค๋ค. ํ์ผ๋ช์ `์ปดํฌ๋ํธ ํ์ผ๋ช.test.tsx`์ผ๋ก ์ง์ด์ค๋ค.

  ```typescript
  describe("<์ปดํฌ๋ํธ๋ช />", () => {
    // ์์ผ๋ก ํ์คํธ ์ผ์ด์ค๋ฅผ ์๋ ฅํ  ๊ณต๊ฐ
  });
  ```

- ํ์คํธ ์ผ์ด์ค๋ฅผ ์์ฑํ ๋ค ํ์คํธ ์คํํ๊ธฐ

  ```bash
  $ yarn test
  ```

## ๐ป Enzyme ์ฌ์ฉํ๊ธฐ

- ์ค๋์ท ํ์คํธ ์ผ์ด์ค ์์ฑ

  ```typescript
  // ์์ ์ปดํฌ๋ํธ (Profile.tsx)
  export default function Profile({
    username,
    name,
  }: {
    username: string;
    name: string;
  }) {
    return (
      <div>
        <b>{username}</b>
        <span>({name})</span>
      </div>
    );
  }
  ```

  ```typescript
  it("matches snapshot", () => {
    // mount : Enzyme์ ํตํด ๋ฆฌ์กํธ ์ปดํฌ๋ํธ๋ฅผ ๋ ๋๋งํ๋ฉฐ, ์ด๋ฅผ ํตํด ๋ง๋ค์ด์ง ๋ ๋๋ง๋ ๊ฐ์ wrapper๋ผ๊ณ  ํ๋ค.
    // ์ฐ๋ฆฌ๋ ์ด wrapper๋ฅผ ํตํด props ์กฐํ, DOM ์กฐํ, ์ํ ๊ฐ ์กฐํ ๋ฑ์ด ๊ฐ๋ฅํ๋ค.
    const wrapper = mount(<Profile username="uncyclocity" name="๋ฐฑ๊ดด" />);
    expect(wrapper).toMatchSnapshot();
  });
  ```

  - ํ์คํธ ์คํ ์, `src` ๋๋ ํ ๋ฆฌ ๋ด์ `__snapshots__` ๋๋ ํ ๋ฆฌ๊ฐ ์ถ๊ฐ๋๋ฉฐ, ์ค๋์ท์ด ์ ์ฅ๋๋ค.
  - ๋ ๋๋ง ๊ฒฐ๊ณผ๊ฐ ์ค๋์ท๊ณผ ๋ค๋ฅด๋ฉด ํ์คํธ๊ฐ ์คํจํ๋๋ฐ, ํ์ฌ ๋ ๋๋ง ๊ฒฐ๊ณผ๋ฅผ ์ค๋์ท ๋ด์ฉ์ผ๋ก ์ ์ฅํ๋ ค๋ฉด ์คํจ ๊ฒฐ๊ณผ๊ฐ ๋ฌ ํฐ๋ฏธ๋ ์ฐฝ์ u๋ฅผ ํด๋ฆญํ๋ฉด ๋๋ค.

- props์ DOM์ ๋ํ ํ์คํ

  ```typescript
  // ์์ ์ปดํฌ๋ํธ (Profile.tsx)
  export default function Profile({
    username,
    name,
  }: {
    username: string;
    name: string;
  }) {
    return (
      <div>
        <b>{username}</b>
        <span>({name})</span>
      </div>
    );
  }
  ```

  ```typescript
  it("username๊ณผ name ๋ ๋๋ง", () => {
    // mount ๋ฉ์๋๋ฅผ ํตํด wrapper ์์ฑ
    const wrapper = mount(<Profile username="uncyclocity" name="๋ฐฑ๊ดด" />);

    // wrapper.props ๋ฉ์๋๋ props ๊ฐ์ฒด๋ฅผ ๋ฐํํ๋ค.
    expect(wrapper.props().username).toBe("uncyclocity");
    expect(wrapper.props().name).toBe("๋ฐฑ๊ดด");

    // wrapper.find ๋ฉ์๋๋ ํ๋ผ๋ฏธํฐ๋ก ์ง์ ํ DOM ์์๋ฅผ ๋ฐํํ๋ค. ์๋ ์์๋ b ํ๊ทธ๋ฅผ ์ฐพ์ ๊ฒฝ์ฐ์ด๋ค.
    const boldElement = wrapper.find("b");
    // b ํ๊ทธ์ ์์์ด "uncyclocity" ๋ฌธ์์ด์ ๋ด๊ณ  ์๋์ง ํ์คํธ
    expect(boldElement.contains("uncyclocity")).toBe(true);

    const spanElement = wrapper.find("span");
    // span ํ๊ทธ์ ์์ ํ์คํธ๊ฐ "(๋ฐฑ๊ดด)"์ธ์ง ํ์คํธ
    expect(spanElement.text()).toBe("(๋ฐฑ๊ดด)");
  });
  ```

- ํด๋์คํ ์ปดํฌ๋ํธ์์์ ํ์คํ : ํจ์ํ๊ณผ ๋ฌ๋ฆฌ state ๊ฐ์ ์กฐํํ  ์ ์๋ค.

  ```typescript
  // ์์ ์ปดํฌ๋ํธ (Counter.tsx)
  import { Component } from "react";

  export default class Counter extends Component {
    state = {
      number: 0,
    };
    handleIncrease = () => {
      this.setState({
        number: this.state.number + 1,
      });
    };
    handleDecrease = () => {
      this.setState({
        number: this.state.number - 1,
      });
    };
    render() {
      return (
        <div>
          <h2>{this.state.number}</h2>
          <button onClick={this.handleIncrease}>+1</button>
          <button onClick={this.handleDecrease}>-1</button>
        </div>
      );
    }
  }
  ```

  ```typescript
  it("์ด๊ธฐ ๊ฐ 0 ์ฌ๋ถ", () => {
    // shallow๋ mount์ ๋ค๋ฅด๊ฒ ์ปดํฌ๋ํธ ๋ด๋ถ์ ์์ ์ปดํฌ๋ํธ๋ ๋ ๋๋งํ์ง ์๋๋ค.
    const wrapper: any = shallow(<Counter />);
    // wrapper.state ๋ฉ์๋๋ฅผ ํตํด state๋ฅผ ์กฐํ
    expect(wrapper.state().number).toBe(0);
  });

  it("handleIncrease ๋ฉ์๋๋ก state.number ๊ฐ 1 ์ฆ๊ฐ", () => {
    const wrapper: any = shallow(<Counter />);
    // wrapper.instance ๋ฉ์๋๋ฅผ ํตํด ์ปดํฌ๋ํธ ๋ด์ ํจ์ ์กฐํ
    wrapper.instance().handleIncrease();
    expect(wrapper.state().number).toBe(1);
  });

  it("๋ฒํผ DOM์ click ์ด๋ฒคํธ ์คํ์์ผ handleDecrease ๋ฉ์๋๋ก ๊ฐ 1 ๊ฐ์", () => {
    const wrapper = shallow(<Counter />);
    // wrapper.findWhere ๋ฉ์๋๋ฅผ ํตํด ํน์  DOM ์กฐํ
    const minusBtn = wrapper.findWhere(
      (node: ShallowWrapper<any, any, React.Component<{}, {}, any>>) =>
        node.type() === "button" && node.text() === "-1"
    );
    // simulate ๋ฉ์๋๋ ํน์  ์ด๋ฒคํธ๋ฅผ ์๋ฎฌ๋ ์ดํํ๋ค.
    minusBtn.simulate("click");
    expect(wrapper.find("h2").text()).toBe("-1");
  });
  ```

## ๐ญ ํด๋์คํ & ํจ์ํ ์ปดํฌ๋ํธ ์ฐจ์ด์ 

- ํด๋์คํ์ ์ง์ ์ ์ธ **์ธ์คํด์ค ๋ฉ์๋ ๋ฐ state ๊ฐ ์กฐํ**๊ฐ ๊ฐ๋ฅํ์ง๋ง, ํจ์ํ์ ๋ถ๊ฐ๋ฅํ๋ค.
- ํด๋์คํ์ wrapper๋ฅผ ๋ง๋ค ๋ `mount`, `shallow` ๋ชจ๋ ์ฌ์ฉ ๊ฐ๋ฅํ์ง๋ง, ํจ์ํ์ `mount`๋ฅผ ์ฌ์ฉํด์ผ ํ๋ค.
  ๐ `useEffect` Hook์ด `shallow`์์ ์๋ํ์ง ์์ผ๋ฉฐ, DOM์ ์ฐ๊ฒฐ๋์ด ์๋ ํจ์๊ฐ ์ด์  ํจ์๋ฅผ ๊ฐ๋ฆฌํค๊ธฐ ๋๋ฌธ์ด๋ค.
