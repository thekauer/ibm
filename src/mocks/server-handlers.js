import { rest } from "msw";

const handlers = [
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
            theme: "#4d2042",
            created: "01/01/2021",
          },
          {
            guid: "2",
            userName: "user_ab",
            title: "title_ab",
            avatarURL:
              "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
            durationInSec: 65,
            theme: "#4d2042",
            created: "02/01/2021",
          },
          {
            guid: "3",
            userName: "user_b",
            title: "title_b",
            avatarURL:
              "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
            durationInSec: 70,
            theme: "#4d2042",
            created: "03/01/2021",
          },
          {
            guid: "4",
            userName: "user_c",
            title: "title_c",
            avatarURL:
              "https://robohash.org/istedolorumfugiat.png?size=50x50&set=set1",
            durationInSec: 75,
            theme: "#4d2042",
            created: "04/01/2021",
          },
        ],
      })
    )
  ),
];

export { handlers };
