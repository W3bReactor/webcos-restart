import React from "react";
import {getProjectsApi} from "@/widgets/Projects";
import {AllProjectsClient} from "@/widgets/AllProjects/ui/AllProjectsClient/AllProjectsClient";

export const AllProjects = async () => {
    const response = await getProjectsApi({size: 5});

    return (
        <AllProjectsClient initialProjects={response.success ? response.data.content : []}/>
    );
}

