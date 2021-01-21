import reducer from "./auth";
import * as actions from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      tokenId: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          tokenId: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actions.AUTH_SUCCESS,
          tokenId: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      tokenId: "some-token",
      userId: "some-user-id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
