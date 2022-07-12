# 🧪 Enzyme를 통한 리액트 TDD

> References <br> <a href="https://learn-react-test.vlpt.us/#/04-enzyme?id=srcsetuptestsjs">4. Enzyme 사용법</a> _.velopert_ <br> <a href="https://merrily-code.tistory.com/180">Enzyme 사용 시 Cannot read property 'child'... 가 출력될 때</a> _.Chamming2_

> 본 레포에서는 기초적인 내용만 다룹니다. 보다 자세한 사용법은 <a href="https://airbnb.io/enzyme/docs/api/">공식 문서</a>를 참고해주세요.

## 📃 기본 개념

- **TDD**는 **테스트 주도 개발**의 약자이며, 테스트가 개발을 이끌어나가는 형태의 개발론이다.
- TDD의 절차는 **실패하는 테스트 코드 작성 ➡️ 코드를 작성하여 테스트 통과 시키기 ➡️ 리팩토링**으로 구성된다.
- 리액트 앱의 TDD 라이브러리는 **Enzyme**과 **react-testing-library**가 있다.
  👉 전자는 주로 컴포넌트 내부 기능에 집중하며, 후자는 주로 렌더링 결과에 집중한다.

## 💾 Enzyme 사용 셋팅

- **Enzyme**과 **Enzyme** 어댑터를 설치한다. Enzyme은 공식적으로 리액트 17 이상의 버전을 지원하지 않으므로, 비공식 어댑터를 설치해야 한다.
  (리액트 18 이상에서는 테스트 시 `ReactDOM.render`이 18 이상의 버전에서 지원하지 않는다는 경고가 뜰 것이다. 참고 쓰도록 하자.)

  ```bash
  $ yarn add enzyme @wojtekmaj/enzyme-adapter-react-17
  ```

- `setupTests.ts` 파일을 만들어 **어댑터를 셋팅**해준다. (CRA 앱의 경우 기존의 내용을 지워주고 다시 작성해준다.)

  ```typescript
  import { configure } from "enzyme";
  import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

  configure({ adapter: new Adapter() });
  ```

- **스냅샷 테스팅**(렌더링의 결과가 이전의 렌더링 결과와 일치한지에 대한 테스트)을 하기 위해서는 별도로 `enzyme-to-json` 라이브러리를 설치하여 `package.json`에 `"jest"` 속성을 추가해야 한다.

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

- 원하는 컴포넌트에 대한 테스트 파일을 만들어 준다. 파일명은 `컴포넌트 파일명.test.tsx`으로 지어준다.

  ```typescript
  describe("<컴포넌트명 />", () => {
    // 앞으로 테스트 케이스를 입력할 공간
  });
  ```

- 테스트 케이스를 작성한 뒤 테스트 실행하기

  ```bash
  $ yarn test
  ```

## 💻 Enzyme 사용하기

- 스냅샷 테스트 케이스 작성

  ```typescript
  // 예시 컴포넌트 (Profile.tsx)
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
    // mount : Enzyme을 통해 리액트 컴포넌트를 렌더링하며, 이를 통해 만들어진 렌더링된 값을 wrapper라고 한다.
    // 우리는 이 wrapper를 통해 props 조회, DOM 조회, 상태 값 조회 등이 가능하다.
    const wrapper = mount(<Profile username="uncyclocity" name="백괴" />);
    expect(wrapper).toMatchSnapshot();
  });
  ```

  - 테스트 실행 시, `src` 디렉토리 내에 `__snapshots__` 디렉토리가 추가되며, 스냅샷이 저장된다.
  - 렌더링 결과가 스냅샷과 다르면 테스트가 실패하는데, 현재 렌더링 결과를 스냅샷 내용으로 저장하려면 실패 결과가 뜬 터미널 창에 u를 클릭하면 된다.

- props와 DOM에 대한 테스팅

  ```typescript
  // 예시 컴포넌트 (Profile.tsx)
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
  it("username과 name 렌더링", () => {
    // mount 메서드를 통해 wrapper 생성
    const wrapper = mount(<Profile username="uncyclocity" name="백괴" />);

    // wrapper.props 메서드는 props 객체를 반환한다.
    expect(wrapper.props().username).toBe("uncyclocity");
    expect(wrapper.props().name).toBe("백괴");

    // wrapper.find 메서드는 파라미터로 지정한 DOM 요소를 반환한다. 아래 예시는 b 태그를 찾을 경우이다.
    const boldElement = wrapper.find("b");
    // b 태그의 자식이 "uncyclocity" 문자열을 담고 있는지 테스트
    expect(boldElement.contains("uncyclocity")).toBe(true);

    const spanElement = wrapper.find("span");
    // span 태그의 자식 텍스트가 "(백괴)"인지 테스트
    expect(spanElement.text()).toBe("(백괴)");
  });
  ```

- 클래스형 컴포넌트에서의 테스팅 : 함수형과 달리 state 값을 조회할 수 있다.

  ```typescript
  // 예시 컴포넌트 (Counter.tsx)
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
  it("초기 값 0 여부", () => {
    // shallow는 mount와 다르게 컴포넌트 내부에 자식 컴포넌트는 렌더링하지 않는다.
    const wrapper: any = shallow(<Counter />);
    // wrapper.state 메서드를 통해 state를 조회
    expect(wrapper.state().number).toBe(0);
  });

  it("handleIncrease 메서드로 state.number 값 1 증가", () => {
    const wrapper: any = shallow(<Counter />);
    // wrapper.instance 메서드를 통해 컴포넌트 내의 함수 조회
    wrapper.instance().handleIncrease();
    expect(wrapper.state().number).toBe(1);
  });

  it("버튼 DOM의 click 이벤트 실행시켜 handleDecrease 메서드로 값 1 감소", () => {
    const wrapper = shallow(<Counter />);
    // wrapper.findWhere 메서드를 통해 특정 DOM 조회
    const minusBtn = wrapper.findWhere(
      (node: ShallowWrapper<any, any, React.Component<{}, {}, any>>) =>
        node.type() === "button" && node.text() === "-1"
    );
    // simulate 메서드는 특정 이벤트를 시뮬레이팅한다.
    minusBtn.simulate("click");
    expect(wrapper.find("h2").text()).toBe("-1");
  });
  ```

## 🎭 클래스형 & 함수형 컴포넌트 차이점

- 클래스형은 직접적인 **인스턴스 메서드 및 state 값 조회**가 가능하지만, 함수형은 불가능하다.
- 클래스형은 wrapper를 만들 때 `mount`, `shallow` 모두 사용 가능하지만, 함수형은 `mount`를 사용해야 한다.
  👉 `useEffect` Hook이 `shallow`에서 작동하지 않으며, DOM에 연결되어 있는 함수가 이전 함수를 가리키기 때문이다.
