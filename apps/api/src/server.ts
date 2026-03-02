import app from "./app.js";
import { PORT } from "./secrets.js";

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
