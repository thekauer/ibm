import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { Playlist } from "./Playlist";

describe("Playlist", () => {
  describe("fetch", () => {
    it("should render loading skeletons", async () => {
      render(<Playlist />);

      expect(screen.getAllByTestId("skeleton")[0]).toBeInTheDocument();
    });

    it("should render the songs after loading", async () => {
      render(<Playlist />);

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId("skeleton")
      );

      expect(screen.getByText("title_a")).toBeInTheDocument();
      expect(screen.getByText("title_ab")).toBeInTheDocument();
      expect(screen.getByText("title_c")).toBeInTheDocument();
      expect(screen.getByText("title_b")).toBeInTheDocument();
    });

    it("should render error when the request errors", async () => {
      server.use(rest.get("*/api", (req, res, ctx) => res(ctx.status(400))));

      render(<Playlist />);

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId("skeleton")
      );

      expect(screen.getByAltText("error")).toBeInTheDocument();
    });

    it('should show "Empty" when there are no songs', async () => {
      server.use(
        rest.get(`*/api`, async (req, res, ctx) =>
          res(
            ctx.json({
              playlist: [],
            })
          )
        )
      );

      render(<Playlist />);

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId("skeleton")
      );

      expect(screen.getByAltText("empty")).toBeInTheDocument();
    });
  });

  describe("search", () => {
    it("should only show search results only", async () => {
      render(<Playlist />);

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId("skeleton")
      );

      const search = screen.getByPlaceholderText("Song title");
      fireEvent.change(search, {
        target: { value: "title_a" },
      });

      expect(screen.getByText("title_a")).toBeInTheDocument();
      expect(screen.getByText("title_ab")).toBeInTheDocument();
      expect(screen.queryByText("title_b")).not.toBeInTheDocument();
      expect(screen.queryByText("title_c")).not.toBeInTheDocument();

      fireEvent.change(search, {
        target: { value: "title_ab" },
      });

      expect(screen.getByText("title_ab")).toBeInTheDocument();
      expect(screen.queryByText("title_a")).not.toBeInTheDocument();

      fireEvent.change(search, {
        target: { value: "" },
      });

      expect(screen.getByText("title_a")).toBeInTheDocument();
      expect(screen.getByText("title_ab")).toBeInTheDocument();
      expect(screen.getByText("title_b")).toBeInTheDocument();
      expect(screen.getByText("title_c")).toBeInTheDocument();
    });
  });

  describe("sort", () => {
    it("should sort by title by default", async () => {
      render(<Playlist />);

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId("skeleton")
      );

      const sort = screen.getByRole("columnheader", {
        name: /title/,
      });
      fireEvent.click(sort);
      fireEvent.click(sort);

      const rows = screen.getAllByRole("row");

      expect(rows[1]).toHaveTextContent("title_a");
      expect(rows[2]).toHaveTextContent("title_ab");
      expect(rows[3]).toHaveTextContent("title_b");
      expect(rows[4]).toHaveTextContent("title_c");
    });

    it("should sort by title in reverse", async () => {
      render(<Playlist />);

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId("skeleton")
      );

      const sort = screen.getByRole("columnheader", {
        name: /title/,
      });
      fireEvent.click(sort);

      const rows = screen.getAllByRole("row");

      expect(rows[1]).toHaveTextContent("title_c");
      expect(rows[2]).toHaveTextContent("title_b");
      expect(rows[3]).toHaveTextContent("title_ab");
      expect(rows[4]).toHaveTextContent("title_a");
    });

    it.each([/added/, /duration/, /by/])(
      "should sort by %s and in reverse",
      async (header) => {
        render(<Playlist />);

        await waitForElementToBeRemoved(() =>
          screen.queryAllByTestId("skeleton")
        );

        const sort = screen.getByRole("columnheader", {
          name: header,
        });
        let rows = screen.getAllByRole("row");
        fireEvent.click(sort);

        expect(rows[1]).toHaveTextContent("title_a");
        expect(rows[2]).toHaveTextContent("title_ab");
        expect(rows[3]).toHaveTextContent("title_b");
        expect(rows[4]).toHaveTextContent("title_c");

        fireEvent.click(sort);
        rows = screen.getAllByRole("row");

        expect(rows[1]).toHaveTextContent("title_c");
        expect(rows[2]).toHaveTextContent("title_b");
        expect(rows[3]).toHaveTextContent("title_ab");
        expect(rows[4]).toHaveTextContent("title_a");
      }
    );
  });

  describe("ui", () => {
    it("if the song has theme color it should use it for the its border color", async () => {
      server.use(
        rest.get(`*/api`, async (req, res, ctx) =>
          res(
            ctx.json({
              playlist: [
                {
                  guid: "1",
                  userName: "user_a",
                  title: "title_a",
                  avatarURL:
                    "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
                  durationInSec: 60,
                  theme: "#ff0000",
                  created: "01/01/2021",
                },
              ],
            })
          )
        )
      );

      render(<Playlist />);

      await waitForElementToBeRemoved(() =>
        screen.queryAllByTestId("skeleton")
      );

      const cell = screen.getByRole("cell", {
        name: /title_a/,
      });

      expect(cell).toHaveStyle("border-left: 5px solid #ff0000;");
    });

    describe("duration", () => {
      it("should show minutes and seconds", async () => {
        server.use(
          rest.get(`*/api`, async (req, res, ctx) =>
            res(
              ctx.json({
                playlist: [
                  {
                    guid: "1",
                    userName: "user_a",
                    title: "title_a",
                    avatarURL:
                      "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
                    durationInSec: 61,
                    theme: "#ff0000",
                    created: "01/01/2021",
                  },
                ],
              })
            )
          )
        );

        render(<Playlist />);

        await waitForElementToBeRemoved(() =>
          screen.queryAllByTestId("skeleton")
        );

        const row = screen.getByRole("row", {
          name: /title_a/,
        });

        expect(row).toHaveTextContent("1:01");
      });

      it("if the duration is less then a minute it should start with a zero", async () => {
        server.use(
          rest.get(`*/api`, async (req, res, ctx) =>
            res(
              ctx.json({
                playlist: [
                  {
                    guid: "1",
                    userName: "user_a",
                    title: "title_a",
                    avatarURL:
                      "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
                    durationInSec: 10,
                    theme: "#ff0000",
                    created: "01/01/2021",
                  },
                ],
              })
            )
          )
        );

        render(<Playlist />);

        await waitForElementToBeRemoved(() =>
          screen.queryAllByTestId("skeleton")
        );

        const row = screen.getByRole("row", {
          name: /title_a/,
        });

        expect(row).toHaveTextContent("0:10");
      });

      it("duration seconds should start with a zero if less than 10", async () => {
        server.use(
          rest.get(`*/api`, async (req, res, ctx) =>
            res(
              ctx.json({
                playlist: [
                  {
                    guid: "1",
                    userName: "user_a",
                    title: "title_a",
                    avatarURL:
                      "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
                    durationInSec: 3,
                    theme: "#ff0000",
                    created: "01/01/2021",
                  },
                ],
              })
            )
          )
        );

        render(<Playlist />);

        await waitForElementToBeRemoved(() =>
          screen.queryAllByTestId("skeleton")
        );

        const row = screen.getByRole("row", {
          name: /title_a/,
        });

        expect(row).toHaveTextContent("0:03");
      });

      it("should use the absolute value of the duration", async () => {
        server.use(
          rest.get(`*/api`, async (req, res, ctx) =>
            res(
              ctx.json({
                playlist: [
                  {
                    guid: "1",
                    userName: "user_a",
                    title: "title_a",
                    avatarURL:
                      "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
                    durationInSec: -59,
                    theme: "#ff0000",
                    created: "01/01/2021",
                  },
                ],
              })
            )
          )
        );

        render(<Playlist />);

        await waitForElementToBeRemoved(() =>
          screen.queryAllByTestId("skeleton")
        );

        const row = screen.getByRole("row", {
          name: /title_a/,
        });

        expect(row).toHaveTextContent("0:59");
      });
    });
  });
});
