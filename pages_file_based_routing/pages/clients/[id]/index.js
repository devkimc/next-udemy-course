import React from "react";
import { useRouter } from "next/router";

export default function ClientProjectPage() {
    const router = useRouter();
    console.log(router.query);

    function loadProjectHandler() {
        router.push({
            pathname: "/clients/[id]/[clientprojectid]",
            query: { id: "max", clientprojectid: "projecta" },
        });
    }

    return (
        <div>
            ClientProjectPage
            <button onClick={loadProjectHandler}>Load Project A</button>
        </div>
    );
}
