import { acceptance } from "helpers/qunit-helpers";

acceptance("TranslatedContent", { loggedIn: true });

test("TranslatedContent works", async assert => {
  await visit("/admin/plugins/translated-content");

  assert.ok(false, "it shows the TranslatedContent button");
});
