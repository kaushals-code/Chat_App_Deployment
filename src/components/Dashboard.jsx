import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getDBUser } from "../Auth";
import Sidebar from "./DashComp/Sidebar";
import EmptyState from "./EmptyState";
import Chat from "./DashComp/Chat";

function Dashboard() {

    const uid = getDBUser();

    if (!uid) {
        return <Navigate to="/login" replace />;
    }

    const [chatId, setChatId] = useState(null);

    return (
        <div className="app">

            <Sidebar
                onClick={(id) => {
                    setChatId(id);
                }}
            />

            {chatId
                ? <Chat key={chatId} id={chatId} />
                : <EmptyState />
            }

        </div>
    );
}

export default Dashboard;