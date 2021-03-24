import clothingService from "./ClothingService.js";

describe("Clothing suggestions when raining", () => {
  test("Should return umbrella, coat, and boots_rain", () => {
    expect(clothingService(4201, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(4001, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(4200, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(6201, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(6001, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(6200, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(6000, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(4000, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(7101, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(7000, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(7102, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
    expect(clothingService(8000, 0)).toStrictEqual([
      "umbrella",
      "coat",
      "boots_rain"
    ]);
  });

  test("Should not return other stuff when raining", () => {
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["cap"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["shorts"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["short_sleeve_shirt"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["beanie"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["gloves"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["boots_snow"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["hoodie"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["jeans"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["long_sleeve_shirt"])
    );
    expect(clothingService(4201, 0)).toEqual(
      expect.not.arrayContaining(["sunglasses"])
    );
  });
});

describe("Clothing suggestions when snowing", () => {
  test("Should return beanie, gloves, and snow boots", () => {
    expect(clothingService(5101, 0)).toStrictEqual([
      "beanie",
      "gloves",
      "boots_snow"
    ]);
    expect(clothingService(5000, 0)).toStrictEqual([
      "beanie",
      "gloves",
      "boots_snow"
    ]);
    expect(clothingService(5100, 0)).toStrictEqual([
      "beanie",
      "gloves",
      "boots_snow"
    ]);
    expect(clothingService(5001, 0)).toStrictEqual([
      "beanie",
      "gloves",
      "boots_snow"
    ]);
  });
  test("Should not return other stuff", () => {
    expect(clothingService(5101, 0)).toEqual(
      expect.not.arrayContaining(["umbrella"])
    );
    expect(clothingService(5101, 0)).toEqual(
      expect.not.arrayContaining(["coat"])
    );
    expect(clothingService(5101, 0)).toEqual(
      expect.not.arrayContaining(["boots_rain"])
    );
    expect(clothingService(5101, 0)).toEqual(
      expect.not.arrayContaining(["hoodie"])
    );
    expect(clothingService(5101, 0)).toEqual(
      expect.not.arrayContaining(["jeans"])
    );
    expect(clothingService(5101, 0)).toEqual(
      expect.not.arrayContaining(["long_sleeve_shirt"])
    );
    expect(clothingService(5101, 0)).toEqual(
      expect.not.arrayContaining(["sunglasses"])
    );
  });
});

describe("Clothing suggestions when foggy", () => {
  test("Should return hoodie, jeans, and long sleeve shirt", () => {
    expect(clothingService(2100, 0)).toStrictEqual([
      "hoodie",
      "jeans",
      "long_sleeve_shirt"
    ]);
    expect(clothingService(2000, 0)).toStrictEqual([
      "hoodie",
      "jeans",
      "long_sleeve_shirt"
    ]);
  });
  test("Should not return other stuff", () => {
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["umbrella"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["coat"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["boots_rain"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["beanie"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["gloves"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["boots_snow"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["sunglasses"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["cap"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["shorts"])
    );
    expect(clothingService(2100, 0)).toEqual(
      expect.not.arrayContaining(["short_sleeve_shirt"])
    );
  });
});

describe("Clothing suggestions when cloudy", () => {
  test("Should return cap, shorts, and short sleeve shirt when over 15C", () => {
    expect(clothingService(1001, 16)).toStrictEqual([
      "cap",
      "shorts",
      "short_sleeve_shirt"
    ]);
    expect(clothingService(1102, 16)).toStrictEqual([
      "cap",
      "shorts",
      "short_sleeve_shirt"
    ]);
    expect(clothingService(1101, 16)).toStrictEqual([
      "cap",
      "shorts",
      "short_sleeve_shirt"
    ]);
  });
  test("Should not return other stuff when over 15C", () => {
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["umbrella"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["coat"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["boots_rain"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["beanie"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["gloves"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["boots_snow"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["sunglasses"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["hoodie"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["jeans"])
    );
    expect(clothingService(1001, 16)).toEqual(
      expect.not.arrayContaining(["long_sleeve_shirt"])
    );
  });
  test("Should return cap, shorts, and short sleeve shirt when under 15C", () => {
    expect(clothingService(1001, 15)).toStrictEqual([
      "hoodie",
      "jeans",
      "long_sleeve_shirt"
    ]);
    expect(clothingService(1102, 15)).toStrictEqual([
      "hoodie",
      "jeans",
      "long_sleeve_shirt"
    ]);
    expect(clothingService(1101, 15)).toStrictEqual([
      "hoodie",
      "jeans",
      "long_sleeve_shirt"
    ]);
  });

  test("Should not return other stuff when under 15C", () => {
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["umbrella"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["coat"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["boots_rain"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["beanie"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["gloves"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["boots_snow"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["sunglasses"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["cap"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["shorts"])
    );
    expect(clothingService(1001, 15)).toEqual(
      expect.not.arrayContaining(["short_sleeve_shirt"])
    );
  });
});

describe("Clothing suggestions when sunny", () => {
  test("Should return sunglasses, shorts, and short sleeve shirt when over 10C", () => {
    expect(clothingService(1100, 11)).toStrictEqual([
      "sunglasses",
      "shorts",
      "short_sleeve_shirt"
    ]);
    expect(clothingService(1000, 11)).toStrictEqual([
      "sunglasses",
      "shorts",
      "short_sleeve_shirt"
    ]);
  });
  test("Should not return other stuff when over 10C", () => {
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["beanie"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["boots_rain"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["boots_snow"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["cap"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["coat"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["gloves"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["hoodie"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["jeans"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["long_sleeve_shirt"])
    );
    expect(clothingService(1100, 11)).toEqual(
      expect.not.arrayContaining(["umbrella"])
    );
  });
  test("Should return hoodie, jeans, and long sleeve shirt when under 10C", () => {
    expect(clothingService(1100, 10)).toStrictEqual([
      "hoodie",
      "jeans",
      "long_sleeve_shirt"
    ]);
    expect(clothingService(1000, 10)).toStrictEqual([
      "hoodie",
      "jeans",
      "long_sleeve_shirt"
    ]);
  });
  test("Should not return other stuff when under 10C", () => {
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["beanie"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["boots_rain"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["boots_snow"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["cap"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["coat"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["gloves"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["short_sleeve_shirt"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["shorts"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["sunglasses"])
    );
    expect(clothingService(1100, 10)).toEqual(
      expect.not.arrayContaining(["umbrella"])
    );
  });
});
