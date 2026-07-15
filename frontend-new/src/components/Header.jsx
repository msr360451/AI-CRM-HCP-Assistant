export default function Header() {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (

        <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 shadow-lg">

            <div className="max-w-full px-8 py-5 flex items-center justify-between">

                {/* Left Side */}

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-3xl shadow-md">

                        🏥

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-white">

                            AI CRM HCP Assistant

                        </h1>

                        <p className="text-blue-100 text-sm mt-1">

                            Intelligent Healthcare Professional Interaction Management

                        </p>

                        <p className="text-blue-200 text-xs mt-1">

                            {today}

                        </p>

                    </div>

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-5">

                    <button
                        className="relative bg-white/20 hover:bg-white/30 transition p-3 rounded-full text-white text-xl"
                    >
                        🔔

                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

                    </button>

                    <div className="flex items-center gap-3 bg-white/20 rounded-full px-4 py-2">

                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl">

                            👤

                        </div>

                        <div>

                            <p className="text-white font-semibold">

                                Admin

                            </p>

                            <p className="text-blue-100 text-xs">

                                AI First CRM

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}