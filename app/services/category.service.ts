import { fetchAPI } from "../lib/api";
import { Category } from "../types";

const defaultCategories = [
    { name: "Running", imageUrl: "uploads/1770479554698-843317227.png", description: "Running category" },
    { name: "Tennis", imageUrl: "uploads/1768099978930-830834903.png", description: "Tennis category" },
    { name: "Basketball", imageUrl: "uploads/1770479554698-843317227.png", description: "Basketball category" }, // pakai gambar Running
    { name: "Football", imageUrl: "uploads/1775400168498-410812348.png", description: "Football category" },
    { name: "Badminton", imageUrl: "uploads/1775400068686-444367354.png", description: "Badminton category" },
    { name: "Swimming", imageUrl: "uploads/1775400100429-846603543.png", description: "Swimming category" }
];

export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const res = await fetchAPI<Category[]>("/categories");
        console.log("Categories from API:", res);
        
        const apiCategories = res.filter(cat => 
            defaultCategories.some(def => def.name === cat.name)
        );
        
        const result = defaultCategories.map(def => {
            const found = apiCategories.find(api => api.name === def.name);
            if (found) {
                return found;
            } else {
                return {
                    _id: `default-${def.name}`,
                    name: def.name,
                    description: def.description,
                    imageUrl: def.imageUrl,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    __v: 0
                } as Category;
            }
        });
        
        console.log("Final categories (with defaults):", result);
        return result;
    } catch (error) {
        console.error("Error fetching categories, using defaults:", error);
        return defaultCategories as Category[];
    }
};