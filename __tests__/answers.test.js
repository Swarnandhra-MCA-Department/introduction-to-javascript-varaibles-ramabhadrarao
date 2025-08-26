import * as A from "../src/answers.js";

describe("JS Variables & Data Types", () => {
  test("studentName is a string", () => {
    expect(typeof A.studentName).toBe("string");
    expect(A.studentName.length).toBeGreaterThan(0);
  });

  test("age is a number", () => {
    expect(typeof A.age).toBe("number");
    expect(Number.isFinite(A.age)).toBe(true);
  });

  test("isEnrolled is a boolean", () => {
    expect(typeof A.isEnrolled).toBe("boolean");
  });

  test("score is a bigint", () => {
    expect(typeof A.score).toBe("bigint");
    expect(A.score > 9007199254740991n).toBe(true);
  });

  test("id is a symbol", () => {
    expect(typeof A.id).toBe("symbol");
  });

  test("favoriteColors is an array of strings", () => {
    expect(Array.isArray(A.favoriteColors)).toBe(true);
    expect(A.favoriteColors.every(x => typeof x === "string")).toBe(true);
  });

  test("profile is an object with name & age", () => {
    expect(typeof A.profile).toBe("object");
    expect(A.profile).not.toBeNull();
    expect(A.profile).toHaveProperty("name", A.studentName);
    expect(A.profile).toHaveProperty("age", A.age);
  });

  test("nothing is null", () => {
    expect(A.nothing).toBeNull();
  });

  test("notDefined is undefined", () => {
    expect(A.notDefined).toBeUndefined();
  });

  test("PI is a constant number", () => {
    expect(typeof A.PI).toBe("number");
    expect(() => { /* @ts-ignore */ A.PI = 4; }).toThrow();
  });
});
