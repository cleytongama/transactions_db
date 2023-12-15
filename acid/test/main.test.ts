import { main } from "../src/connect";

test("Should connect database success", async ()=> {
    await expect(main()).resolves.toEqual({result: 2});
});