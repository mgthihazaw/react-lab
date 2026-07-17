import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createProductSearchParams,
  defaultProductFilters,
  parseProductFilters,
} from "./productFilters";
import type { ProductFilters } from "./products.types";

describe("product filters URL parsing", () => {
  it("uses default product filters", () => {
    assert.deepEqual(parseProductFilters(new URLSearchParams()), {
      query: "",
      category: "all",
      sort: "relevance",
      page: 1,
    });
  });

  it("parses valid filters", () => {
    const params = new URLSearchParams("query=react&category=books&sort=price-asc&page=2");

    assert.deepEqual(parseProductFilters(params), {
      query: "react",
      category: "books",
      sort: "price-asc",
      page: 2,
    });
  });

  for (const page of ["abc", "0", "-2", "1.5"]) {
    it(`falls back for invalid page ${page}`, () => {
      const params = new URLSearchParams({
        page,
      });

      assert.equal(parseProductFilters(params).page, 1);
    });
  }

  it("falls back for unsupported sort values", () => {
    const params = new URLSearchParams({
      sort: "newest",
    });

    assert.equal(parseProductFilters(params).sort, "relevance");
  });

  it("trims query values", () => {
    const params = new URLSearchParams({
      query: "  react  ",
    });

    assert.equal(parseProductFilters(params).query, "react");
  });
});

describe("product filters URL serialization", () => {
  it("omits default values", () => {
    assert.equal(createProductSearchParams(defaultProductFilters).toString(), "");
  });

  it("serializes active filters", () => {
    const filters: ProductFilters = {
      query: "react",
      category: "books",
      sort: "price-asc",
      page: 2,
    };

    assert.equal(
      createProductSearchParams(filters).toString(),
      "query=react&category=books&sort=price-asc&page=2",
    );
  });

  it("round trips product filters", () => {
    const filters: ProductFilters = {
      query: "react",
      category: "books",
      sort: "price-desc",
      page: 3,
    };

    assert.deepEqual(parseProductFilters(createProductSearchParams(filters)), filters);
  });
});
