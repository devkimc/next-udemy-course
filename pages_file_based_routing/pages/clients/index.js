import React from "react";
import Link from "next/link";

export default function ClientPage() {
    const clients = [
        { id: "max", name: "Maximilian" },
        { id: "manu", name: "Manuel" },
    ];
    return (
        <div>
            ClientPage
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        <Link
                            href={{
                                pathname: "/clients/[id]",
                                query: { id: client.id },
                            }}
                        >
                            {client.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
