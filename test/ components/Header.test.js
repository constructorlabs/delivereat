import React from "react";
import Header from "../../src/components/Header";
import renderer from "react-test-renderer";

describe("Header", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
