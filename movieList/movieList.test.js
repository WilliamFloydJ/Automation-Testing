const { Builder, Capabilities, By } = require("selenium-webdriver");
require("chromedriver");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://127.0.0.1:5500/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

test("Item will be made", async () => {
  const inputMovie = await driver.findElement(By.xpath("//input"));
  const addMovieButton = await driver.findElement(By.xpath("//button"));

  inputMovie.sendKeys("Platoon");
  await driver.sleep(1000);
  addMovieButton.click();
  await driver.sleep(1000);

  const movieItem = await driver.findElement(By.xpath("//li"));
  expect(movieItem.isDisplayed).toBeTruthy();
});

test("list item should be crossed out", async () => {
  const movieText = await driver.findElement(By.xpath("//span"));
  await driver.sleep(1000);
  movieText.click();
  await driver.sleep(1000);
  expect(movieText.getAttribute("checked")).toBeTruthy();
});
test("When you add back a list item a notification pops up", async () => {
  const movieText = await driver.findElement(By.xpath("//span"));
  const message = await driver.findElement(By.xpath("//aside"));
  await driver.sleep(500);
  movieText.click();
  await driver.sleep(500);
  expect(await message.getText()).toContain("added back!");
});
test("list item should be deleted", async () => {
  const deleteButton = await driver.findElement(By.xpath("//li/button"));
  const movieList = await driver.findElement(By.xpath("//ul"));
  await driver.sleep(1000);
  deleteButton.click();
  await driver.sleep(1000);
  console.log(await movieList.getText());
  await driver.sleep(1000);
  expect(await movieList.getText()).toBe("");
});
