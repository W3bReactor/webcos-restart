import React from "react";
import {getRecommendedArticlesApi} from "@/widgets/Blog/api/articlesApi";
import {BlogFeedClient} from "@/widgets/BlogFeed/ui/BlogFeedClient/BlogFeedClient";


export const BlogFeed = async () => {
    const response = await getRecommendedArticlesApi({size: 10, page: 0})

    return (

        <BlogFeedClient initialArticles={response.success ? response.data : []}/>
    );
}

