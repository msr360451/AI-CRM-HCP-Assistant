export default function DashboardCards() {

    return (

        <div className="grid grid-cols-4 gap-5">

            {/* Card 1 */}

            <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500 text-sm">

                            Total Interactions

                        </p>

                        <h2 className="text-3xl font-bold mt-2">

                            28

                        </h2>

                    </div>

                    <div className="text-5xl">

                        📋

                    </div>

                </div>

            </div>

            {/* Card 2 */}

            <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500 text-sm">

                            Today's Visits

                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-blue-600">

                            6

                        </h2>

                    </div>

                    <div className="text-5xl">

                        📅

                    </div>

                </div>

            </div>

            {/* Card 3 */}

            <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500 text-sm">

                            Positive Meetings

                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-green-600">

                            21

                        </h2>

                    </div>

                    <div className="text-5xl">

                        😊

                    </div>

                </div>

            </div>

            {/* Card 4 */}

            <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500 text-sm">

                            Follow Ups

                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-orange-500">

                            5

                        </h2>

                    </div>

                    <div className="text-5xl">

                        📌

                    </div>

                </div>

            </div>

        </div>

    );

}