import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import sum from "./utils.js";

describe("Addition", () => {
	it("knows that 2 and 2 make 4", () => {
		expect(sum(2, 2)).toBe(4);
	});
});

import { shallow } from "enzyme";

describe("App", () => {
	it('should render correctly in "debug" mode', () => {
		const component = shallow(<App debug />);

		expect(component).toMatchSnapshot();
	});
});
