import React from "react";
import { useParams } from "react-router";

export default function PostPage() {
    const { postId } = useParams();
    return (
        <div>
            <h1> Post {postId} </h1>
        </div>
    );
    }
