import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/products",
});

Object.defineProperty(globalThis, "window", {
  value: dom.window,
  configurable: true,
});

Object.defineProperty(globalThis, "document", {
  value: dom.window.document,
  configurable: true,
});

Object.defineProperty(globalThis, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});

Object.defineProperty(globalThis, "HTMLElement", {
  value: dom.window.HTMLElement,
  configurable: true,
});

Object.defineProperty(globalThis, "HTMLInputElement", {
  value: dom.window.HTMLInputElement,
  configurable: true,
});

Object.defineProperty(globalThis, "HTMLSelectElement", {
  value: dom.window.HTMLSelectElement,
  configurable: true,
});

const { QueryClient, QueryClientProvider } = await import("@tanstack/react-query");
const React = await import("react");
const { cleanup, fireEvent, render, screen, waitFor } = await import("@testing-library/react");
const { MemoryRouter, Route, Routes, useLocation } = await import("react-router-dom");
const { ProductsPage } = await import("./ProductsPage");

afterEach(() => {
  cleanup();
});

function LocationDisplay() {
  const location = useLocation();

  return <div aria-label="Current location">{location.pathname + location.search}</div>;
}

function renderProductsPage(initialEntry: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 0,
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path="/products"
            element={
              <>
                <ProductsPage />
                <LocationDisplay />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

async function waitForProducts() {
  await screen.findByText(/product\(s\) found/i);
}

describe("ProductsPage", () => {
  it("reflects URL values in filter controls", async () => {
    renderProductsPage("/products?query=react&category=books&sort=price-asc&page=2");

    assert.equal((screen.getByLabelText("Search catalog") as HTMLInputElement).value, "react");
    assert.equal((screen.getByLabelText("Category") as HTMLSelectElement).value, "books");
    assert.equal((screen.getByLabelText("Sort") as HTMLSelectElement).value, "price-asc");

    assert.match(screen.getByLabelText("Current location").textContent ?? "", /page=2/);
  });

  it("changes category in the URL and resets page", async () => {
    renderProductsPage("/products?query=react&category=books&sort=price-asc&page=2");

    fireEvent.change(screen.getByLabelText("Category"), {
      target: {
        value: "electronics",
      },
    });

    await waitFor(() => {
      assert.equal(
        screen.getByLabelText("Current location").textContent,
        "/products?query=react&category=electronics&sort=price-asc",
      );
    });
  });

  it("changes sort in the URL and resets page", async () => {
    renderProductsPage("/products?category=books&page=3");

    fireEvent.change(screen.getByLabelText("Sort"), {
      target: {
        value: "price-desc",
      },
    });

    await waitFor(() => {
      assert.equal(
        screen.getByLabelText("Current location").textContent,
        "/products?category=books&sort=price-desc",
      );
    });
  });

  it("pagination updates the page search parameter", async () => {
    renderProductsPage("/products");

    await waitForProducts();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      assert.equal(screen.getByLabelText("Current location").textContent, "/products?page=2");
    });
  });

  it("uses safe defaults for invalid URL values", async () => {
    renderProductsPage("/products?sort=unsupported&page=-2");

    assert.equal((screen.getByLabelText("Sort") as HTMLSelectElement).value, "relevance");

    await waitFor(() => {
      assert.equal(screen.getByText("Page 1 of 3").textContent, "Page 1 of 3");
    });
  });

  it("recreates the screen from the same URL on remount", async () => {
    const firstRender = renderProductsPage("/products?query=desk&category=office");

    await screen.findByText("Standing Desk");
    firstRender.unmount();

    renderProductsPage("/products?query=desk&category=office");

    assert.equal((screen.getByLabelText("Search catalog") as HTMLInputElement).value, "desk");
    assert.equal((screen.getByLabelText("Category") as HTMLSelectElement).value, "office");
    await screen.findByText("Standing Desk");
  });

  it("shows loading and empty states from the query result", async () => {
    renderProductsPage("/products?query=missing-product-name");

    assert.ok(screen.getByRole("status"));
    await screen.findByText("No products match these filters.");
  });
});
