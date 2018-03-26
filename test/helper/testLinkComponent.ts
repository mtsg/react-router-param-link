interface WholeTestLink {
  file: TestLink,
  dir: TestLink
}

interface TestLink {
  linkComponents: LinkComponent[];
}

export interface LinkComponent {
  actual: string;
  expected: string;
}

export const TEST_LINK: WholeTestLink = {
  file: {
    linkComponents: [
      { actual: "", expected: "" },
      { actual: "/user", expected: "/user" },
      { actual: "/user/:id", expected: "/user/1" },
      { actual: "/user/:id/profile", expected: "/user/1/profile" },
      { actual: "/user/:id/profile/:date", expected: "/user/1/profile/2017-03-22" }
    ]
  },
  dir: {
    linkComponents: [
      { actual: "", expected: "" },
      { actual: "/user", expected: "/user" },
      { actual: "/user/:id", expected: "/user/1/" },
      { actual: "/user/:id/profile/", expected: "/user/1/profile/" },
      { actual: "/user/:id/profile/:date/", expected: "/user/1/profile/2017-03-22/" }
    ]
  }
}
