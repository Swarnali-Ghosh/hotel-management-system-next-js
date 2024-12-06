"use client";

import React from "react";
import { useRouter } from "next/navigation";

function LinkButton({ title, path, heading }: { title: string; path: string; heading: string }) {
    const router = useRouter();
    return (
        <div className="page-headings-with-button">
            <span style={{ color: "#6e8efb", fontSize: "1rem", fontWeight: "bold" }}>{heading}</span>
            <button className="submit-btn"
                onClick={() => router.push(path)}
            >{title}</button>
        </div>
    );
}

export default LinkButton;
