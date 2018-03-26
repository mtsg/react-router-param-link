import { it, describe } from "mocha";
import { expect } from "chai";
import { ReconfigureSettings, DOMWindow, JSDOM } from "jsdom";
import * as React from "react";
import { shallow, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { ParamLink } from "../src/ParamLink";
import { DOMInitializer } from "./helper/domInitializer";
import { TEST_LINK, LinkComponent } from "./helper/testLinkComponent";
configure({ adapter: new Adapter() });


describe("<ParamLink />", () => {
  const DOM = new DOMInitializer().DOM;

  describe("Test for file type links", () => {
    const LINK_COMPONENTS = TEST_LINK.file.linkComponents;

    linkComponentsTest(DOM, LINK_COMPONENTS);
  });
});


function linkComponentsTest(dom: JSDOM, linkComponents: LinkComponent[]) {
  for (const LINK_COMPONENT of linkComponents) {
    describe("browser link = " + LINK_COMPONENT.expected, () => {
      beforeEach(() => {
        const DOM_CONFIG: ReconfigureSettings = {
          windowTop: dom.window,
          url: window.location.origin + LINK_COMPONENT.expected
        };
        dom.reconfigure(DOM_CONFIG);
      });

      it("should parse to property with parameters.", () => {
        const WAPPER = shallow(<ParamLink to={LINK_COMPONENT.actual} />)
        expect(WAPPER.prop("to")).to.be.equal(LINK_COMPONENT.expected);
      });
    })
  }
}
