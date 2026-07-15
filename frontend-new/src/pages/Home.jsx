import { useState } from "react";

import Header from "../components/Header";
import InteractionForm from "../components/InteractionForm";
import ChatPanel from "../components/ChatPanel";
import SaveButton from "../components/SaveButton";
import InteractionTable from "../components/InteractionTable";
import DashboardCards from "../components/DashboardCards";

export default function Home() {

    const [refresh, setRefresh] = useState(false);

    function refreshTable() {
        setRefresh(prev => !prev);
    }

    return (

        <div className="bg-gray-100 min-h-screen">

            <Header />

            <div className="grid grid-cols-12 gap-6 p-6">

                <div className="col-span-8 flex flex-col gap-5">

                    <DashboardCards />

                    <InteractionForm />

                    <SaveButton
                        refreshTable={refreshTable}
                    />

                    <InteractionTable
                        refresh={refresh}
                    />

                </div>

                <div className="col-span-4">

                    <ChatPanel />

                </div>

            </div>

        </div>

    );

}