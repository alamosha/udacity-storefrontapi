import { CategoryModel } from "../../models/categoriesModel";
import db from "../../database";

const categoryModel = new CategoryModel();

describe("Categories Model Testing", () => {
  describe("Categories model class objects existence", () => {
    it("Check for index model", () => {
      expect(categoryModel.index).toBeDefined();
    });
    it("Check for create model", () => {
      expect(categoryModel.addCategory).toBeDefined();
    });
    it("Check for show model", () => {
      expect(categoryModel.show).toBeDefined();
    });
    it("Check for update model", () => {
      expect(categoryModel.editCategory).toBeDefined();
    });
    it("Check for delete model", () => {
      expect(categoryModel.deleteCategory).toBeDefined();
    });
  });

  describe("Categories models functionality", () => {
    it("Testing create category model", async () => {
      const createCat = await categoryModel.addCategory("New Category");
      expect(createCat.category_name).toBe("New Category");
    });
    it("testing category index model", async () => {
      const indexCat = await categoryModel.index();
      expect(indexCat.length).toBeGreaterThanOrEqual(3);
    });
    it("Testing show category model", async () => {
      const showCat = await categoryModel.show(1);
      expect(showCat.id).toBe(1);
    });
    it("Testing update category model", async () => {
      const updateCat = await categoryModel.editCategory(1, "Updated Category");
      expect(updateCat.category_name).toBe("Updated Category");
    });
    it("Testing delete category model", async () => {
      const deleteCat = await categoryModel.deleteCategory(1);
      expect(deleteCat.id).toBe(1);
    });
  });
});
