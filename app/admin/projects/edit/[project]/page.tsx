import {AdminProjectsEditPage} from "@/pages/AdminProjectsEditPage";

export default async function AdminProjectsEdit({params}:
                                                Readonly<{
                                                    params: Promise<{ project: string }>
                                                    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                                }>) {
    const {project} = await params
    return (
        <AdminProjectsEditPage projectId={project}/>
    );
}
