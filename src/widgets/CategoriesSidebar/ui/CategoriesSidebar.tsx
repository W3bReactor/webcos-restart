import React from "react";
import {getCategoriesApi} from "@/widgets/CategoriesSidebar/api/categoriesApi";
import {CategoriesSidebarClient} from "@/widgets/CategoriesSidebar/ui/CategoriesSidebarClient/CategoriesSidebarClient";

interface ICategoriesSidebar {
    className?: string;

}

export const CategoriesSidebar = async ({className}: ICategoriesSidebar) => {
    const response = await getCategoriesApi({size: 1, page: 0})

    return (
        <CategoriesSidebarClient
            className={className}
            initialCategories={response.success ? response.data.content : []}
        />

    );
}
